import User from "./User.js";
import Member from "./Member.js";
import Attachment from "./Attachment.js";
import {
  PERMISSIONS,
  GLUON_CACHING_OPTIONS,
  BASE_URL,
  TO_JSON_TYPES_ENUM,
} from "../constants.js";
import checkPermission from "../util/discord/checkPermission.js";
import Sticker from "./Sticker.js";
import getTimestamp from "../util/discord/getTimestampFromSnowflake.js";
import hash from "hash.js";
import encryptMessage from "../util/gluon/encryptMessage.js";
import MessagePollManager from "../managers/MessagePollManager.js";
import MessageReactionManager from "../managers/MessageReactionManager.js";
import Poll from "./Poll.js";
import Embed from "../util/builder/embedBuilder.js";

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
  #pollResponses;
  #reactions;
  #embeds;
  #_attributes;
  #reference;
  #type;
  #webhook_id;
  #sticker_items;
  #message_snapshots;
  #edited_timestamp;
  /**
   * Creates the structure for a message.
   * @param {Client} client The client instance.
   * @param {Object} data Message data returned from Discord.
   * @param {String} channel_id The id of the channel that the message belongs to.
   * @param {String} guild_id The id of the guild that the channel belongs to.
   * @param {Boolean?} nocache Whether this message should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#message-object}
   */
  constructor(
    client,
    data,
    { channel_id, guild_id, nocache = false, ignoreExisting = false } = {
      nocache: false,
      ignoreExisting: false,
    },
  ) {
    let onlyfiles = false;

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
    this.#_guild_id = BigInt(guild_id);

    /**
     * The id of the channel that this message belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_channel_id = BigInt(channel_id);

    const existing =
      ignoreExisting != true
        ? this.channel?.messages.get(data.id) || null
        : null;

    if (this.guild) {
      onlyfiles =
        (this.guild._cache_options & GLUON_CACHING_OPTIONS.FILES_ONLY) ==
        GLUON_CACHING_OPTIONS.FILES_ONLY;

      if (this.channel)
        nocache =
          (this.guild._cache_options & GLUON_CACHING_OPTIONS.NO_MESSAGES) ==
            GLUON_CACHING_OPTIONS.NO_MESSAGES ||
          (this.channel._cache_options & GLUON_CACHING_OPTIONS.NO_MESSAGES) ==
            GLUON_CACHING_OPTIONS.NO_MESSAGES;
    }

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
        user_id: data.author.id,
        guild_id,
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
            _parentStructure: this,
          }),
        );
    else if (existing?.attachments) this.#attachments = existing.attachments;

    if (this.#attachments.length == 0 && onlyfiles == true) nocache = true;

    /**
     * The message content.
     * @type {String?}
     * @private
     */
    if (onlyfiles != true) {
      this.#content = data.content;
      if (!this.#content && existing && existing.content)
        this.#content = existing.content;
      else if (!this.#content) this.#content = null;
    }

    /**
     * The message poll.
     * @type {Object?}
     * @private
     */
    if (data.poll)
      this.#poll = new Poll(this.#_client, data.poll, { guild_id });
    else if (this.#poll == undefined && existing && existing.poll != undefined)
      this.#poll = existing.poll;
    else if (this.#poll == undefined) this.#poll = undefined;

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

    /**
     * The message embeds.
     * @type {Embed[]}
     * @private
     */
    if (data.embeds) this.#embeds = data.embeds.map((e) => new Embed(e));
    else if (existing && existing.embeds != undefined)
      this.#embeds = existing.embeds;
    else if (this.#embeds == undefined) this.#embeds = [];

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

    /**
     * The id of the webhook this message is from.
     * @type {BigInt?}
     * @private
     */
    if (data.webhook_id) this.#webhook_id = BigInt(data.webhook_id);
    else if (existing?.webhookId) this.#webhook_id = existing.webhookId;

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

    /**
     * The snapshot data about the message.
     * @type {Object?}
     * @private
     */
    if (data.message_snapshots)
      this.#message_snapshots = data.message_snapshots;
    else if (existing && existing.messageSnapshots != undefined)
      this.#message_snapshots = existing.messageSnapshots;

    /* this.author && this.author.bot != true && !data.webhook_id && */
    if (nocache == false && this.#_client.cacheMessages == true) {
      this.channel?.messages.set(data.id, this);
      if (!this.channel)
        this.#_client.emit("debug", `${this.guildId} NO CHANNEL`);
    }
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
   * @type {Object?}
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
    return { messageId: String(this.#reference.message_id) };
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
    return `${BASE_URL}/channels/${this.guildId}/${this.channelId}/${this.id}`;
  }

  /**
   * Replies to the message.
   * @param {String} content The message content.
   * @param {Object?} options Embeds, components and files to attach to the message.
   * @param {Embed?} options.embed Embed to send with the message.
   * @param {MessageComponents?} options.components Message components to send with the message.
   * @param {Array<Object>?} options.files Array of file objects for files to send with the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
   * @method
   * @public
   * @async
   * @throws {Error | TypeError}
   */
  async reply(content, { embeds, components, files } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.SEND_MESSAGES,
      )
    )
      throw new Error("MISSING PERMISSIONS: SEND_MESSAGES");

    if (!content && !embeds && !components && !files)
      throw new Error(
        "GLUON: Must provide content, embeds, components or files",
      );

    if (typeof content !== "undefined" && typeof content !== "string")
      throw new TypeError("GLUON: Content must be a string.");

    if (typeof embeds !== "undefined" && !Array.isArray(embeds))
      throw new TypeError("GLUON: Embeds must be an array of embeds.");

    if (typeof components !== "undefined" && !Array.isArray(components))
      throw new TypeError("GLUON: Components must be an array of components.");

    if (typeof files !== "undefined" && !Array.isArray(files))
      throw new TypeError("GLUON: Files must be an array of files.");

    const body = {};

    if (content) body.content = content;
    if (embeds) body.embeds = embeds;
    if (components) body.components = components;
    if (files) body.files = files;

    body.message_reference = {
      message_id: this.id,
      channel_id: this.channelId,
      guild_id: this.guildId,
    };

    const data = await this.#_client.request.makeRequest(
      "postCreateMessage",
      [this.channelId],
      body,
    );

    return new Message(this.#_client, data, {
      channel_id: this.channelId,
      guild_id: this.guildId,
    });
  }

  /**
   * Edits the message, assuming it is sent by the client user.
   * @param {String} content The message content.
   * @param {Object?} options Embeds and components to attach to the message.
   * @param {Embed?} options.embed Embed to send with the message.
   * @param {MessageComponents?} options.components Message components to send with the message.
   * @param {Array<Object>?} options.files Array of file objects for files to send with the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
   * @method
   * @public
   * @async
   * @throws {Error | TypeError}
   */
  async edit(content, { embeds, components, files } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.SEND_MESSAGES,
      )
    )
      throw new Error("MISSING PERMISSIONS: SEND_MESSAGES");

    if (!content && !embeds && !components && !files)
      throw new Error(
        "GLUON: Must provide content, embeds, components or files",
      );

    if (typeof content !== "undefined" && typeof content !== "string")
      throw new TypeError("GLUON: Content must be a string.");

    if (typeof embeds !== "undefined" && !Array.isArray(embeds))
      throw new TypeError("GLUON: Embeds must be an array of embeds.");

    if (typeof components !== "undefined" && !Array.isArray(components))
      throw new TypeError("GLUON: Components must be an array of components.");

    if (typeof files !== "undefined" && !Array.isArray(files))
      throw new TypeError("GLUON: Files must be an array of files.");

    const body = {};

    if (content) body.content = content;
    if (embeds && embeds.length != 0) body.embeds = embeds;
    if (components) body.components = components;
    if (files) body.files = files;

    if (this.referenced_message)
      body.message_reference = {
        message_id: this.id,
        channel_id: this.channelId,
        guild_id: this.guildId,
      };

    const data = await this.#_client.request.makeRequest(
      "patchEditMessage",
      [this.channelId, this.id],
      body,
    );

    return new Message(this.#_client, data, {
      channel_id: this.channelId,
      guild_id: this.guildId,
    });
  }

  /**
   * Moves the message to long-term storage.
   * @returns {void}
   * @method
   * @public
   */
  shelf() {
    const encryptedMessage = encryptMessage(this);

    const key = hash
      .sha512()
      .update(`${this.guildId}_${this.channelId}_${this.id}`)
      .digest("hex");

    this.#_client.s3Messages.putObject(
      {
        Bucket: this.#_client.s3MessageBucket,
        Key: key,
        Body: encryptedMessage,
      },
      (err, data) => {
        if (err) console.error(err);
        else console.log(data);
      },
    );

    this.channel.messages.delete(this.id);
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Message: ${this.id}>`;
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
          member: this.member.toJSON(format),
          content: this.content,
          _attributes: this.#_attributes,
          attachments: this.attachments.map((a) => a.toJSON(format)),
          embeds: this.embeds.map((e) => e.toJSON(format)),
          edited_timestamp: this.editedTimestamp * 1000,
          poll: this.poll.toJSON(format),
          message_snapshots: this.messageSnapshots,
          type: this.type,
          referenced_message: this.reference?.messageId
            ? { id: this.reference.messageId }
            : undefined,
          sticker_items: this.stickerItems.map((s) => s.toJSON(format)),
          messageReactions: this.reactions.toJSON(format),
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          author: this.author.toJSON(format),
          member: this.member.toJSON(format),
          content: this.content,
          pinned: this.pinned,
          attachments: this.attachments.map((a) => a.toJSON(format)),
          embeds: this.embeds.map((e) => e.toJSON(format)),
          edited_timestamp: this.editedTimestamp * 1000,
          poll: this.poll.toJSON(format),
          message_snapshots: this.messageSnapshots,
          type: this.type,
          referenced_message: this.reference?.messageId
            ? { id: this.reference.messageId }
            : undefined,
          sticker_items: this.stickerItems.map((s) => s.toJSON(format)),
          reactions: this.reactions.toJSON(format),
          mention_everyone: this.mentionEveryone,
          mention_roles: this.mentionRoles ? [""] : [],
          mentions: this.mentions ? [""] : [],
        };
      }
    }
  }
}

export default Message;
