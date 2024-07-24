const User = require("./User");
const Member = require("./Member");
const Attachment = require("./Attachment");
const { PERMISSIONS, GLUON_CACHING_OPTIONS, BASE_URL } = require("../constants");
const checkPermission = require("../util/discord/checkPermission");
const Sticker = require("./Sticker");
const getTimestamp = require("../util/discord/getTimestampFromSnowflake");
const hash = require("hash.js");
const encryptMessage = require("../util/gluon/encryptMessage");
const MessagePollManager = require("../managers/MessagePollManager");
const MessageReactionManager = require("../managers/MessageReactionManager");

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
    {
      channel_id,
      guild_id,
      nocache = false,
      ignoreExisting = false,
      _parentStructure,
    } = { nocache: false, ignoreExisting: false }
  ) {
    let onlyfiles = false;

    /**
     * The client instance.
     * @type {Client}
     */
    this.#_client = client;

    /**
     * The id of the guild that this message belongs to.
     * @type {BigInt}
     */
    this.#_guild_id = BigInt(guild_id);

    /**
     * The id of the channel that this message belongs to.
     * @type {BigInt}
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
     */
    this.#_id = BigInt(data.id);

    // messages only ever need to be cached if logging is enabled
    // but this should always return a "refined" message, so commands can be handled
    if (data.author)
      /**
       * The message author.
       * @type {User}
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
       */
      this.#member = new Member(this.#_client, data.member, {
        user_id: data.author.id,
        guild_id,
        user: new User(this.#_client, data.author),
      });
    else if (data.author)
      this.#member = this.guild ? this.guild.members.get(data.author.id) : null;
    else if (existing?.member) this.#member = existing.member;

    // should only be stored if file logging is enabled
    /**
     * The message attachments.
     * @type {Attachment[]?}
     */
    this.#attachments = [];
    if (data.attachments != undefined)
      for (let i = 0; i < data.attachments.length; i++)
        this.#attachments.push(
          new Attachment(this.#_client, data.attachments[i], {
            _parentStructure: this,
          })
        );
    else if (existing?.attachments) this.#attachments = existing.attachments;

    if (this.#attachments.length == 0 && onlyfiles == true) nocache = true;

    /**
     * The message content.
     * @type {String?}
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
     */
    this.#poll = data.poll;
    if (this.#poll == undefined && existing && existing.poll != undefined)
      this.#poll = existing.poll;
    else if (this.#poll == undefined) this.#poll = undefined;

    if (this.#poll && existing && existing.pollResponses)
      /**
       * The poll responses.
       * @type {MessagePollManager?}
       */
      this.#pollResponses = existing.pollResponses;
    else if (this.#poll)
      this.#pollResponses = new MessagePollManager(data.pollResponses);

    if (existing?.reactions)
      /**
       * The message reactions.
       * @type {MessageReactionManager}
       */
      this.#reactions = existing.reactions;
    else
      this.#reactions = new MessageReactionManager(
        this.#_client,
        this.guild,
        data.messageReactions
      );

    /**
     * The message embeds.
     * @type {Object[]}
     */
    this.#embeds = data.embeds;
    if (this.#embeds == undefined && existing && existing.embeds != undefined)
      this.#embeds = existing.embeds;
    else if (this.#embeds == undefined) this.#embeds = [];

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
     */
    this.#reference = {};
    if (data.referenced_message)
      this.#reference.message_id = BigInt(data.referenced_message.id);
    else if (existing && existing.reference?.messageId)
      this.#reference.message_id = existing.reference.messageId;

    /**
     * The type of message.
     * @type {Number}
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
     */
    if (data.webhook_id) this.#webhook_id = BigInt(data.webhook_id);
    else if (existing?.webhookId) this.#webhook_id = existing.webhookId;

    /**
     * Stickers sent with this message.
     * @type {Sticker[]}
     */
    this.#sticker_items = [];
    if (data.sticker_items != undefined)
      for (let i = 0; i < data.sticker_items.length; i++)
        this.#sticker_items.push(
          new Sticker(this.#_client, data.sticker_items[i])
        );
    else if (existing && existing.stickerItems != undefined)
      this.#sticker_items = existing.stickerItems;

    /**
     * The snapshot data about the message.
     * @type {Object?}
     */
    if (data.message_snapshots) this.#message_snapshots = data.message_snapshots;
    else if (existing && existing.messageSnapshots != undefined)
      this.#message_snapshots = existing.messageSnapshots;

    /**
     * The parent structure that this message belongs to.
     * @type {Object}
     * @readonly
     */
    this._parentStructure = _parentStructure ?? this.channel;

    /* this.author && this.author.bot != true && !data.webhook_id && */
    if (nocache == false && this.#_client.cacheMessages == true) {
      this.channel?.messages.set(data.id, this);
      if (!this.channel)
        this.#_client.emit("debug", `${this.guildId} NO CHANNEL`);
    }
  }

  /**
   * The user who sent the message.
   * @type {User}
   * @readonly
   */
  get author() {
    return this.#author;
  }

  /**
   * The member who sent the message.
   * @type {Member?}
   * @readonly
   */
  get member() {
    return this.#member;
  }

  /**
   * Whether this message includes user mentions.
   * @readonly
   * @type {Boolean}
   */
  get mentions() {
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Whether this message includes role mentions.
   * @readonly
   * @type {Boolean}
   */
  get mentionRoles() {
    return (this.#_attributes & (0b1 << 1)) == 0b1 << 1;
  }

  /**
   * Whether this message mentions everyone.
   * @readonly
   * @type {Boolean}
   */
  get mentionEveryone() {
    return (this.#_attributes & (0b1 << 2)) == 0b1 << 2;
  }

  /**
   * Whether this message has been pinned.
   * @readonly
   * @type {Boolean}
   */
  get pinned() {
    return (this.#_attributes & (0b1 << 3)) == 0b1 << 3;
  }

  /**
   * Whether another message has replaced this original message.
   * @readonly
   * @type {Boolean}
   */
  get mirrored() {
    return (this.#_attributes & (0b1 << 4)) == 0b1 << 4;
  }

  /**
   * The UNIX (seconds) timestamp for when this message was created.
   * @readonly
   * @type {Number}
   */
  get timestamp() {
    return getTimestamp(this.id);
  }

  /**
   * The guild that this message belongs to.
   * @type {Guild?}
   * @readonly
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The guild that this message belongs to.
   * @type {String}
   * @readonly
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The channel that this message belongs to.
   * @type {Channel?}
   * @readonly
   */
  get channel() {
    return this.guild?.channels.get(this.channelId) || null;
  }

  /**
   * The channel that this message belongs to.
   * @type {String}
   * @readonly
   */
  get channelId() {
    return String(this.#_channel_id);
  }

  /**
   * The id of the message.
   * @type {String}
   * @readonly
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The message attachments.
   * @type {Attachment[]}
   * @readonly
   */
  get attachments() {
    return this.#attachments;
  }

  /**
   * The message content.
   * @type {String?}
   * @readonly
   */
  get content() {
    return this.#content;
  }

  /**
   * The message poll.
   * @type {Object?}
   * @readonly
   */
  get poll() {
    return this.#poll;
  }

  /**
   * The poll responses.
   * @type {MessagePollManager?}
   * @readonly
   */
  get pollResponses() {
    return this.#pollResponses;
  }

  /**
   * The message reactions.
   * @type {MessageReactionManager}
   * @readonly
   */
  get reactions() {
    return this.#reactions;
  }

  /**
   * The message embeds.
   * @type {Array<Embed>}
   * @readonly
   */
  get embeds() {
    return this.#embeds;
  }

  /**
   * The message that this message references.
   * @type {Object}
   * @readonly
   */
  get reference() {
    return { messageId: this.#reference.message_id };
  }

  /**
   * The type of message.
   * @type {Number}
   * @readonly
   */
  get type() {
    return this.#type;
  }

  /**
   * The id of the webhook this message is from.
   * @type {String?}
   * @readonly
   */
  get webhookId() {
    return this.#webhook_id ? String(this.#webhook_id) : null;
  }

  /**
   * Stickers sent with this message.
   * @type {Sticker[]}
   * @readonly
   */
  get stickerItems() {
    return this.#sticker_items;
  }

  /**
   * The snapshot data about the message.
   * @type {Object?}
   * @readonly
   */
  get messageSnapshots() {
    return this.#message_snapshots;
  }

  /**
   * The URL of the message.
   * @type {String}
   * @readonly
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
   */
  async reply(content, { embed, components, files } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.SEND_MESSAGES
      )
    )
      throw new Error("MISSING PERMISSIONS: SEND_MESSAGES");

    const body = {};

    if (content) body.content = content;
    if (embed) body.embeds = [embed];
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
      body
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
   */
  async edit(content, { embed, embeds, components, files } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.SEND_MESSAGES
      )
    )
      throw new Error("MISSING PERMISSIONS: SEND_MESSAGES");

    const body = {};

    if (content) body.content = content;
    if (embed) body.embeds = [embed];
    else if (embeds && embeds.length != 0) body.embeds = embeds;
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
      body
    );

    return new Message(this.#_client, data, {
      channel_id: this.channelId,
      guild_id: this.guildId,
    });
  }

  /**
   * Moves the message to long-term storage.
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
      }
    );

    this.channel.messages.delete(this.id);
  }

  toString() {
    return `<Message: ${this.id}>`;
  }

  toJSON() {
    return {
      id: this.id,
      author: this.author,
      member: this.member,
      content: this.content,
      _attributes: this.#_attributes,
      attachments: this.attachments,
      embeds: this.embeds,
      poll: this.poll,
      pollResponses: this.pollResponses,
      message_snapshots: this.messageSnapshots,
      type: this.type,
      referenced_message: this.reference?.messageId
        ? { id: this.reference.messageId }
        : undefined,
      sticker_items: this.stickerItems,
      messageReactions: this.reactions,
    };
  }
}

module.exports = Message;
