import User from "./User.js";
import Member from "./Member.js";
import Attachment from "./Attachment.js";
import {
  PERMISSIONS,
  BASE_URL,
  TO_JSON_TYPES_ENUM,
  LIMITS,
  MESSAGE_FLAGS,
} from "../constants.js";
import checkPermission from "../util/discord/checkPermission.js";
import Sticker from "./Sticker.js";
import getTimestamp from "../util/discord/getTimestampFromSnowflake.js";
import MessageReactionManager from "../managers/MessageReactionManager.js";
import Poll from "./Poll.js";
import Embed from "../util/builder/embedBuilder.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import ChannelCacheOptions from "../managers/ChannelCacheOptions.js";
import util from "util";
import MessageComponents from "../util/builder/messageComponents.js";
import encryptStructure from "../util/gluon/encryptStructure.js";
import structureHashName from "../util/general/structureHashName.js";
import decryptStructure from "../util/gluon/decryptStructure.js";
import Client from "../Client.js";
import FileUpload from "../util/builder/fileUpload.js";
import GuildChannelsManager from "../managers/GuildChannelsManager.js";
import GuildManager from "../managers/GuildManager.js";

/**
 * A message belonging to a channel within a guild.
 */
class Message {
  #_client;
  #_guild_id;
  #_channel_id;
  #_id;
  #author;
  #member;
  #attachments;
  #content;
  #poll;
  #reactions;
  #embeds;
  #_attributes;
  #reference;
  #type;
  #webhook_id;
  #sticker_items;
  #message_snapshots;
  #edited_timestamp;
  #flags;
  /**
   * Creates the structure for a message.
   * @param {Client} client The client instance.
   * @param {Object} data Message data returned from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.channelId The id of the channel that the message belongs to.
   * @param {String} options.guildId The id of the guild that the channel belongs to.
   * @param {Boolean?} options.nocache Whether this message should be cached or not.
   * @param {Boolean?} options.ignoreExisting Whether to ignore existing messages in the cache.
   * @see {@link https://discord.com/developers/docs/resources/channel#message-object}
   */
  constructor(
    client,
    data,
    { channelId, guildId, nocache = false, ignoreExisting = false } = {
      nocache: false,
      ignoreExisting: false,
    },
  ) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");
    if (typeof ignoreExisting !== "boolean")
      throw new TypeError("GLUON: Ignore existing must be a boolean");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the guild that this message belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    /**
     * The id of the channel that this message belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_channel_id = BigInt(channelId);

    const existing =
      ignoreExisting != true
        ? this.channel?.messages.get(data.id) || null
        : null;

    /**
     * The id of the message.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The timestamp for when this message was last edited.
     * @type {Number?}
     * @private
     */
    if (data.edited_timestamp)
      this.#edited_timestamp =
        (new Date(data.edited_timestamp).getTime() / 1000) | 0;
    else if (existing?.editedTimestamp)
      this.#edited_timestamp = existing.editedTimestamp;

    // messages only ever need to be cached if logging is enabled
    // but this should always return a "refined" message, so commands can be handled
    if (data.author)
      /**
       * The message author.
       * @type {User}
       * @private
       */
      this.#author = new User(this.#_client, data.author, {
        nocache: !data.webhook_id || nocache,
        noDbStore: true,
      });
    else if (existing?.author) this.#author = existing.author;

    if (data.member)
      /**
       * The member who sent the message.
       * @type {Member?}
       * @private
       */
      this.#member = new Member(this.#_client, data.member, {
        userId: data.author.id,
        guildId,
        user: new User(this.#_client, data.author),
      });
    else if (data.author)
      this.#member = this.guild?.members.get(data.author.id) || null;
    else if (existing?.member) this.#member = existing.member;

    // should only be stored if file logging is enabled
    /**
     * The message attachments.
     * @type {Attachment[]?}
     * @private
     */
    this.#attachments = [];
    if (data.attachments != undefined)
      for (let i = 0; i < data.attachments.length; i++)
        this.#attachments.push(
          new Attachment(this.#_client, data.attachments[i], {
            channelId: this.channelId,
          }),
        );
    else if (existing?.attachments) this.#attachments = existing.attachments;

    /**
     * The message content.
     * @type {String?}
     * @private
     */
    if (this.channel._cacheOptions.contentCaching === true) {
      this.#content = data.content;
      if (!this.#content && existing && existing.content)
        this.#content = existing.content;
      else if (!this.#content) this.#content = null;
    }

    if (this.channel._cacheOptions.pollCaching === true) {
      /**
       * The message poll.
       * @type {Object?}
       * @private
       */
      if (data.poll)
        this.#poll = new Poll(this.#_client, data.poll, { guildId });
      else if (
        this.#poll == undefined &&
        existing &&
        existing.poll != undefined
      )
        this.#poll = existing.poll;
      else if (this.#poll == undefined) this.#poll = undefined;
    }

    if (this.channel._cacheOptions.reactionCaching === true) {
      if (existing?.reactions)
        /**
         * The message reactions.
         * @type {MessageReactionManager}
         * @private
         */
        this.#reactions = existing.reactions;
      else
        this.#reactions = new MessageReactionManager(
          this.#_client,
          this.guild,
          data.messageReactions,
        );
    }

    if (this.channel._cacheOptions.embedCaching === true) {
      /**
       * The message embeds.
       * @type {Embed[]}
       * @private
       */
      if (data.embeds) this.#embeds = data.embeds.map((e) => new Embed(e));
      else if (existing && existing.embeds != undefined)
        this.#embeds = existing.embeds;
      else if (this.#embeds == undefined) this.#embeds = [];
    }

    if (this.channel._cacheOptions.attributeCaching === true) {
      /**
       * The message attributes.
       * @type {Number}
       * @private
       */
      this.#_attributes = data._attributes || 0;

      if (data.mentions && data.mentions.length != 0)
        this.#_attributes |= 0b1 << 0;
      else if (
        data.mentions == undefined &&
        existing &&
        existing.mentions == true
      )
        this.#_attributes |= 0b1 << 0;

      if (data.mention_roles && data.mention_roles.length != 0)
        this.#_attributes |= 0b1 << 1;
      else if (
        data.mention_roles == undefined &&
        existing &&
        existing.mentionRoles == true
      )
        this.#_attributes |= 0b1 << 1;

      if (data.mention_everyone != undefined && data.mention_everyone == true)
        this.#_attributes |= 0b1 << 2;
      else if (
        data.mention_everyone == undefined &&
        existing &&
        existing.mentionEveryone == true
      )
        this.#_attributes |= 0b1 << 2;

      if (data.pinned != undefined && data.pinned == true)
        this.#_attributes |= 0b1 << 3;
      else if (data.pinned == undefined && existing && existing.pinned == true)
        this.#_attributes |= 0b1 << 3;

      if (data.mirrored != undefined && data.mirrored == true)
        this.#_attributes |= 0b1 << 4;
      else if (
        data.mirrored == undefined &&
        existing &&
        existing.mirrored == true
      )
        this.#_attributes |= 0b1 << 4;
    }

    if (this.channel._cacheOptions.referenceCaching === true) {
      /**
       * The message that this message references.
       * @type {Object}
       * @private
       */
      this.#reference = {};
      if (data.referenced_message)
        this.#reference.message_id = BigInt(data.referenced_message.id);
      else if (existing && existing.reference?.messageId)
        this.#reference.message_id = existing.reference.messageId;
    }

    /**
     * The flags of the message.
     * @type {Number}
     * @private
     */
    this.#flags = data.flags;

    /**
     * The type of message.
     * @type {Number}
     * @private
     */
    this.#type = data.type;
    if (
      typeof this.#type != "number" &&
      existing &&
      typeof existing.type == "number"
    )
      this.#type = existing.type;

    if (this.channel._cacheOptions.webhookCaching === true) {
      /**
       * The id of the webhook this message is from.
       * @type {BigInt?}
       * @private
       */
      if (data.webhook_id) this.#webhook_id = BigInt(data.webhook_id);
      else if (existing?.webhookId) this.#webhook_id = existing.webhookId;
    }

    if (this.channel._cacheOptions.stickerCaching === true) {
      /**
       * Stickers sent with this message.
       * @type {Sticker[]}
       * @private
       */
      this.#sticker_items = [];
      if (data.sticker_items != undefined)
        for (let i = 0; i < data.sticker_items.length; i++)
          this.#sticker_items.push(
            new Sticker(this.#_client, data.sticker_items[i]),
          );
      else if (existing && existing.stickerItems != undefined)
        this.#sticker_items = existing.stickerItems;
    }

    if (this.channel._cacheOptions.referenceCaching === true) {
      /**
       * The snapshot data about the message.
       * @type {Object?}
       * @private
       */
      if (data.message_snapshots)
        this.#message_snapshots = data.message_snapshots;
      else if (existing && existing.messageSnapshots != undefined)
        this.#message_snapshots = existing.messageSnapshots;
    }

    if (
      nocache === false &&
      Message.shouldCache(
        this.#_client._cacheOptions,
        this.guild._cacheOptions,
        this.channel._cacheOptions,
      ) &&
      ((this.#attachments.length !== 0 &&
        this.channel._cacheOptions.fileCaching === true) ||
        (this.#content && this.channel._cacheOptions.contentCaching === true) ||
        (this.#poll && this.channel._cacheOptions.pollCaching === true) ||
        (this.#reactions &&
          this.channel._cacheOptions.reactionCaching === true) ||
        (this.#embeds.length !== 0 &&
          this.channel._cacheOptions.embedCaching === true) ||
        (this.#_attributes !== 0 &&
          this.channel._cacheOptions.attributeCaching === true) ||
        (this.#reference.message_id &&
          this.channel._cacheOptions.referenceCaching === true) ||
        (this.#webhook_id &&
          this.channel._cacheOptions.webhookCaching === true) ||
        (this.#sticker_items.length !== 0 &&
          this.channel._cacheOptions.stickerCaching === true) ||
        (this.#message_snapshots &&
          this.channel._cacheOptions.referenceCaching === true))
    )
      this.channel?.messages.set(data.id, this);
  }

  /**
   * The timestamp for when this message was last edited.
   * @type {Number?}
   * @readonly
   * @public
   */
  get editedTimestamp() {
    return this.#edited_timestamp;
  }

  /**
   * The user who sent the message.
   * @type {User}
   * @readonly
   * @public
   */
  get author() {
    return this.#author;
  }

  /**
   * The id of the user who sent the message.
   * @type {String}
   * @readonly
   * @public
   */
  get authorId() {
    return this.#author.id;
  }

  /**
   * The member who sent the message.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member() {
    return this.#member;
  }

  /**
   * Whether this message includes user mentions.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mentions() {
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Whether this message includes role mentions.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mentionRoles() {
    return (this.#_attributes & (0b1 << 1)) == 0b1 << 1;
  }

  /**
   * Whether this message mentions everyone.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mentionEveryone() {
    return (this.#_attributes & (0b1 << 2)) == 0b1 << 2;
  }

  /**
   * Whether this message has been pinned.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get pinned() {
    return (this.#_attributes & (0b1 << 3)) == 0b1 << 3;
  }

  /**
   * Whether another message has replaced this original message.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mirrored() {
    return (this.#_attributes & (0b1 << 4)) == 0b1 << 4;
  }

  /**
   * The UNIX (seconds) timestamp for when this message was created.
   * @readonly
   * @type {Number}
   * @public
   */
  get timestamp() {
    return getTimestamp(this.id);
  }

  /**
   * The guild that this message belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The guild that this message belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The channel that this message belongs to.
   * @type {Channel?}
   * @readonly
   * @public
   */
  get channel() {
    return this.guild?.channels.get(this.channelId) || null;
  }

  /**
   * The channel that this message belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId() {
    return String(this.#_channel_id);
  }

  /**
   * The id of the message.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The message attachments.
   * @type {Attachment[]}
   * @readonly
   * @public
   */
  get attachments() {
    return this.#attachments;
  }

  /**
   * The message content.
   * @type {String?}
   * @readonly
   * @public
   */
  get content() {
    return this.#content;
  }

  /**
   * The message poll.
   * @type {Poll?}
   * @readonly
   * @public
   */
  get poll() {
    return this.#poll;
  }

  /**
   * The message reactions.
   * @type {MessageReactionManager}
   * @readonly
   * @public
   */
  get reactions() {
    return this.#reactions;
  }

  /**
   * The message embeds.
   * @type {Array<Embed>}
   * @readonly
   * @public
   */
  get embeds() {
    return this.#embeds;
  }

  /**
   * The message that this message references.
   * @type {Object}
   * @readonly
   * @public
   */
  get reference() {
    return {
      messageId: this.#reference.message_id
        ? String(this.#reference.message_id)
        : undefined,
    };
  }

  /**
   * The flags of the message.
   * @type {String[]}
   * @readonly
   * @public
   * @see {@link https://discord.com/developers/docs/resources/message#message-object-message-flags}
   */
  get flags() {
    const flags = [];
    if ((this.#flags & MESSAGE_FLAGS.CROSSPOSTED) === MESSAGE_FLAGS.CROSSPOSTED)
      flags.push("CROSSPOSTED");
    if (
      (this.#flags & MESSAGE_FLAGS.IS_CROSSPOST) ===
      MESSAGE_FLAGS.IS_CROSSPOST
    )
      flags.push("IS_CROSSPOST");
    if (
      (this.#flags & MESSAGE_FLAGS.SUPPRESS_EMBEDS) ===
      MESSAGE_FLAGS.SUPPRESS_EMBEDS
    )
      flags.push("SUPPRESS_EMBEDS");
    if (
      (this.#flags & MESSAGE_FLAGS.SOURCE_MESSAGE_DELETED) ===
      MESSAGE_FLAGS.SOURCE_MESSAGE_DELETED
    )
      flags.push("SOURCE_MESSAGE_DELETED");
    if ((this.#flags & MESSAGE_FLAGS.URGENT) === MESSAGE_FLAGS.URGENT)
      flags.push("URGENT");
    if ((this.#flags & MESSAGE_FLAGS.HAS_THREAD) === MESSAGE_FLAGS.HAS_THREAD)
      flags.push("HAS_THREAD");
    if ((this.#flags & MESSAGE_FLAGS.EPHEMERAL) === MESSAGE_FLAGS.EPHEMERAL)
      flags.push("EPHEMERAL");
    if ((this.#flags & MESSAGE_FLAGS.LOADING) === MESSAGE_FLAGS.LOADING)
      flags.push("LOADING");
    if (
      (this.#flags & MESSAGE_FLAGS.FAILED_TO_MENTION_SOME_ROLES_IN_THREAD) ===
      MESSAGE_FLAGS.FAILED_TO_MENTION_SOME_ROLES_IN_THREAD
    )
      flags.push("FAILED_TO_MENTION_SOME_ROLES_IN_THREAD");
    if (
      (this.#flags & MESSAGE_FLAGS.SUPPRESS_NOTIFICATIONS) ===
      MESSAGE_FLAGS.SUPPRESS_NOTIFICATIONS
    )
      flags.push("SUPPRESS_NOTIFICATIONS");
    if (
      (this.#flags & MESSAGE_FLAGS.IS_VOICE_MESSAGE) ===
      MESSAGE_FLAGS.IS_VOICE_MESSAGE
    )
      flags.push("IS_VOICE_MESSAGE");
    return flags;
  }

  /**
   * The raw flags of the message.
   * @type {Number}
   * @readonly
   * @public
   */
  get flagsRaw() {
    return this.#flags;
  }

  /**
   * The type of message.
   * @type {Number}
   * @readonly
   * @public
   */
  get type() {
    return this.#type;
  }

  /**
   * The id of the webhook this message is from.
   * @type {String?}
   * @readonly
   * @public
   */
  get webhookId() {
    return this.#webhook_id ? String(this.#webhook_id) : null;
  }

  /**
   * Stickers sent with this message.
   * @type {Sticker[]}
   * @readonly
   * @public
   */
  get stickerItems() {
    return this.#sticker_items;
  }

  /**
   * The snapshot data about the message.
   * @type {Object?}
   * @readonly
   * @public
   */
  get messageSnapshots() {
    return this.#message_snapshots;
  }

  /**
   * The URL of the message.
   * @type {String}
   * @readonly
   * @public
   */
  get url() {
    return Message.getUrl(this.guildId, this.channelId, this.id);
  }

  /**
   * The hash name for the message.
   * @type {String}
   * @readonly
   * @public
   */
  get hashName() {
    return Message.getHashName(this.guildId, this.channelId, this.id);
  }

  /**
   * The URL of the message.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} channelId The id of the channel that the message belongs to.
   * @param {String} messageId The id of the message.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getUrl(guildId, channelId, messageId) {
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID must be a string.");
    return `${BASE_URL}/channels/${guildId}/${channelId}/${messageId}`;
  }

  /**
   * Replies to the message.
   * @param {Object?} options Embeds, components and files to attach to the message.
   * @param {String?} options.content The message content.
   * @param {Embed?} options.embed Embed to send with the message.
   * @param {MessageComponents?} options.components Message components to send with the message.
   * @param {Array<FileUpload>?} options.files Array of file objects for files to send with the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
   * @method
   * @public
   * @async
   * @throws {Error | TypeError}
   */
  reply({ content, embeds, components, files, suppressMentions = false } = {}) {
    return Message.send(this.#_client, this.channelId, this.guildId, {
      content,
      reference: {
        message_id: this.id,
        channel_id: this.channelId,
        guild_id: this.guildId,
      },
      embeds,
      components,
      files,
      suppressMentions,
    });
  }

  /**
   * Edits the message, assuming it is sent by the client user.
   * @param {Object?} options Content, embeds and components to attach to the message.
   * @param {String?} options.content The message content.
   * @param {Embed?} options.embed Embed to send with the message.
   * @param {MessageComponents?} options.components Message components to send with the message.
   * @param {Array<Attachment>?} options.attachments Array of attachment objects for files to send with the message.
   * @param {Number?} options.flags The message flags.
   * @param {Object?} options.reference The message reference.
   * @param {String?} options.reference.message_id The id of the message to reference.
   * @param {String?} options.reference.channel_id The id of the channel to reference.
   * @param {String?} options.reference.guild_id The id of the guild to reference.
   * @param {FileUpload[]?} options.files Array of file objects for files to send with the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
   * @method
   * @public
   * @async
   * @throws {Error | TypeError}
   */
  edit(
    {
      components,
      files,
      content = this.content,
      embeds = this.embeds,
      attachments = this.attachments,
      flags = this.flagsRaw,
      reference = {
        message_id: this.reference.messageId,
        channel_id: this.channelId,
        guild_id: this.guildId,
      },
    } = {
      components: null,
      files: null,
      content: null,
      embeds: null,
      attachments: null,
      flags: null,
      reference: null,
    },
  ) {
    return Message.edit(this.#_client, this.channelId, this.id, this.guildId, {
      content,
      components,
      files,
      embeds,
      attachments,
      flags,
      reference,
    });
  }

  /**
   * Deletes the message.
   * @param {Object?} options The options for deleting the message.
   * @param {String?} options.reason The reason for deleting the message
   * @returns {Promise<void>}
   * @method
   * @public
   * @async
   */
  delete({ reason } = {}) {
    return Message.delete(this.#_client, this.channelId, this.id, { reason });
  }

  /**
   * Determines whether the message should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @param {ChannelCacheOptions} channelCacheOptions The cache options for the channel.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(
    gluonCacheOptions,
    guildCacheOptions,
    channelCacheOptions,
  ) {
    if (!(gluonCacheOptions instanceof GluonCacheOptions))
      throw new TypeError(
        "GLUON: Gluon cache options must be a GluonCacheOptions.",
      );
    if (!(guildCacheOptions instanceof GuildCacheOptions))
      throw new TypeError(
        "GLUON: Guild cache options must be a GuildCacheOptions.",
      );
    if (!(channelCacheOptions instanceof ChannelCacheOptions))
      throw new TypeError(
        "GLUON: Channel cache options must be a ChannelCacheOptions.",
      );
    if (gluonCacheOptions.cacheMessages === false) return false;
    if (guildCacheOptions.messageCaching === false) return false;
    if (channelCacheOptions.messageCaching === false) return false;
    return true;
  }

  /**
   * Posts a message to the specified channel.
   * @param {Client} client The client instance.
   * @param {String} channelId The id of the channel to send the message to.
   * @param {String} guildId The id of the guild which the channel belongs to.
   * @param {Object?} options Content, embeds, components and files to attach to the message.
   * @param {String?} options.content The message content.
   * @param {Embed[]} options.embeds Array of embeds to send with the message.
   * @param {MessageComponents?} options.components Message components to send with the message.
   * @param {Array<FileUpload>?} options.files Array of file objects for files to send with the message.
   * @param {Boolean?} options.suppressMentions Whether to suppress mentions in the message.
   * @returns {Promise<Message>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static async send(
    client,
    channelId,
    guildId,
    {
      content,
      embeds,
      components,
      files,
      reference,
      suppressMentions = false,
    } = {
      suppressMentions: false,
    },
  ) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");

    Message.sendValidation({ content, embeds, components, files, reference });

    if (typeof suppressMentions !== "boolean")
      throw new TypeError("GLUON: Suppress mentions is not a boolean.");

    if (
      !checkPermission(
        GuildChannelsManager.getChannel(
          client,
          guildId,
          channelId,
        ).checkPermission(await GuildManager.getGuild(client, guildId).me()),
        PERMISSIONS.SEND_MESSAGES,
      )
    )
      throw new Error("MISSING PERMISSIONS: SEND_MESSAGES");

    const body = {};

    if (content) body.content = content;

    if (embeds && embeds.length !== 0) body.embeds = embeds;
    if (components) body.components = components;
    if (files) body.files = files;
    if (suppressMentions === true) {
      body.allowed_mentions = {};
      body.allowed_mentions.parse = [];
    }
    if (reference) body.message_reference = reference;

    const data = await client.request.makeRequest(
      "postCreateMessage",
      [channelId],
      body,
    );

    return new Message(client, data, {
      channelId,
      guildId,
    });
  }

  /**
   * Edits a message.
   * @param {Client} client The client instance.
   * @param {String} channelId The id of the channel the message belongs to.
   * @param {String} messageId The id of the message.
   * @param {String} guildId The id of the guild the message belongs to.
   * @param {Object?} options The message options.
   * @param {String?} options.content The message content.
   * @param {Embed[]?} options.embeds Array of embeds to send with the message.
   * @param {MessageComponents?} options.components Message components to send with the message.
   * @param {Array<FileUpload>?} options.files Array of file objects for files to send with the message.
   * @param {Array<Attachment>?} options.attachments Array of attachment objects for existing attachments sent with the message.
   * @returns {Promise<Message>}
   */
  static async edit(
    client,
    channelId,
    messageId,
    guildId,
    { content, embeds, components, attachments, files } = {},
  ) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID is not a string.");

    Message.sendValidation({ content, embeds, components, attachments, files });

    if (
      !checkPermission(
        GuildChannelsManager.getChannel(
          client,
          guildId,
          channelId,
        ).checkPermission(await GuildManager.getGuild(client, guildId).me()),
        PERMISSIONS.SEND_MESSAGES,
      )
    )
      throw new Error("MISSING PERMISSIONS: SEND_MESSAGES");

    const body = {};

    body.content = content;
    body.embeds = embeds;
    body.components = components;
    body.attachments = attachments;
    body.files = files;

    const data = await client.request.makeRequest(
      "patchEditMessage",
      [channelId, messageId],
      body,
    );

    return new Message(client, data, {
      channelId,
      guildId,
    });
  }

  /**
   * Returns the hash name for the message.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} channelId The id of the channel that the message belongs to.
   * @param {String} messageId The id of the message.
   * @returns {String}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static getHashName(guildId, channelId, messageId) {
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID must be a string.");
    return structureHashName(guildId, channelId, messageId);
  }

  /**
   * Decrypts a message.
   * @param {Client} client The client instance.
   * @param {String} data The encrypted message data.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} channelId The id of the channel that the message belongs to.
   * @param {String} messageId The id of the message.
   * @returns {Message}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static decrypt(client, data, guildId, channelId, messageId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "string")
      throw new TypeError("GLUON: Data must be a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID must be a string.");
    return new Message(
      client,
      decryptStructure(data, messageId, channelId, guildId),
      { channelId, guildId },
    );
  }

  /**
   * Validates the message content, embeds, components and files.
   * @param {Object} options The message options.
   * @param {String} options.content The message content.
   * @param {Embed[]} options.embeds Array of embeds to send with the message.
   * @param {MessageComponents} options.components Message components to send with the message.
   * @param {Array<FileUpload>} options.files Array of file objects for files to send with the message.
   * @param {Array<Attachment>} options.attachments Array of attachment objects for existing attachments sent with the message.
   * @param {Number} options.flags The message flags.
   * @param {Object} options.reference The message reference.
   * @param {String} options.reference.message_id The id of the message to reference.
   * @param {String} options.reference.channel_id The id of the channel to reference.
   * @param {String} options.reference.guild_id The id of the guild to reference.
   * @returns {void}
   * @throws {Error | TypeError | RangeError}
   * @public
   * @static
   * @method
   */
  static sendValidation({
    content,
    embeds,
    components,
    files,
    attachments,
    flags,
    reference,
  } = {}) {
    if (!content && !embeds && !components && !files)
      throw new Error(
        "GLUON: Must provide content, embeds, components or files",
      );

    if (typeof content !== "undefined" && typeof content !== "string")
      throw new TypeError("GLUON: Content must be a string.");

    if (content && content.length > LIMITS.MAX_MESSAGE_CONTENT)
      throw new RangeError(
        `GLUON: Content exceeds ${LIMITS.MAX_MESSAGE_CONTENT} characters.`,
      );

    if (
      typeof embeds !== "undefined" &&
      (!Array.isArray(embeds) || !embeds.every((e) => e instanceof Embed))
    )
      throw new TypeError("GLUON: Embeds must be an array of embeds.");

    if (embeds && embeds.length > LIMITS.MAX_MESSAGE_EMBEDS)
      throw new RangeError(
        `GLUON: Embeds exceeds ${LIMITS.MAX_MESSAGE_EMBEDS}.`,
      );

    if (
      typeof components !== "undefined" &&
      !(components instanceof MessageComponents)
    )
      throw new TypeError("GLUON: Components must be an array of components.");

    if (
      typeof files !== "undefined" &&
      (!Array.isArray(files) || !files.every((f) => f instanceof FileUpload))
    )
      throw new TypeError("GLUON: Files must be an array of files.");

    if (files && files.length > LIMITS.MAX_MESSAGE_FILES)
      throw new RangeError(`GLUON: Files exceeds ${LIMITS.MAX_MESSAGE_FILES}.`);

    if (
      typeof attachments !== "undefined" &&
      (!Array.isArray(attachments) ||
        !attachments.every((a) => a instanceof Attachment))
    )
      throw new TypeError(
        "GLUON: Attachments must be an array of attachments.",
      );

    if (attachments && attachments.length > LIMITS.MAX_MESSAGE_FILES)
      throw new RangeError(
        `GLUON: Attachments exceeds ${LIMITS.MAX_MESSAGE_FILES}.`,
      );

    if (typeof flags !== "undefined" && typeof flags !== "number")
      throw new TypeError("GLUON: Flags must be a number.");

    if (typeof reference !== "undefined" && typeof reference !== "object")
      throw new TypeError("GLUON: Reference must be an object.");
    if (reference && typeof reference.message_id !== "string")
      throw new TypeError("GLUON: Reference message id must be a string.");
    if (reference && typeof reference.channel_id !== "string")
      throw new TypeError("GLUON: Reference channel id must be a string.");
    if (reference && typeof reference.guild_id !== "string")
      throw new TypeError("GLUON: Reference guild id must be a string.");
  }

  /**
   * Deletes one message.
   * @param {Client} client The client instance.
   * @param {String} channelId The id of the channel that the message belongs to.
   * @param {String} messageId The id of the message to delete.
   * @param {Object?} options
   * @param {String?} options.reason The reason for deleting the message.
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static async delete(client, channelId, messageId, { reason } = {}) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID is not a string.");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason is not a string.");

    const body = {};

    if (reason) body["X-Audit-Log-Reason"] = reason;

    await client.request.makeRequest(
      "deleteChannelMessage",
      [channelId, messageId],
      body,
    );
  }

  /**
   * Encrypts the message.
   * @returns {String}
   * @public
   * @method
   */
  encrypt() {
    return encryptStructure(this, this.id, this.channelId, this.guildId);
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Message: ${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        return {
          id: this.id,
          author: this.author.toJSON(format),
          member: this.member?.toJSON(format),
          content: this.content,
          _attributes: this.#_attributes,
          attachments: this.attachments.map((a) => a.toJSON(format)),
          embeds: this.embeds.map((e) => e.toJSON(format)),
          edited_timestamp: this.editedTimestamp
            ? this.editedTimestamp * 1000
            : null,
          poll: this.poll?.toJSON(format),
          message_snapshots: this.messageSnapshots,
          type: this.type,
          referenced_message: this.reference?.messageId
            ? {
                id: this.reference.messageId
                  ? this.reference.messageId
                  : undefined,
              }
            : undefined,
          sticker_items: this.stickerItems.map((s) => s.toJSON(format)),
          messageReactions: this.reactions.toJSON(format),
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          channel_id: this.channelId,
          author: this.author.toJSON(format),
          member: this.member?.toJSON(format),
          content: this.content,
          pinned: this.pinned,
          attachments: this.attachments.map((a) => a.toJSON(format)),
          embeds: this.embeds.map((e) => e.toJSON(format)),
          edited_timestamp: this.editedTimestamp
            ? this.editedTimestamp * 1000
            : null,
          poll: this.poll?.toJSON(format),
          message_snapshots: this.messageSnapshots,
          type: this.type,
          referenced_message: this.reference?.messageId
            ? {
                id: this.reference.messageId
                  ? this.reference.messageId
                  : undefined,
              }
            : undefined,
          sticker_items: this.stickerItems?.map((s) => s.toJSON(format)),
          reactions: this.reactions?.toJSON(format),
          mention_everyone: this.mentionEveryone,
          mention_roles: this.mentionRoles ? [""] : [],
          mentions: this.mentions ? [""] : [],
        };
      }
    }
  }
}

export default Message;
