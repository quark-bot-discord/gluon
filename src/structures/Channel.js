const { PERMISSIONS } = require("../constants");
const ChannelCacheOptions = require("../managers/ChannelCacheOptions");
const ChannelMessageManager = require("../managers/ChannelMessageManager");
const checkPermission = require("../util/discord/checkPermission");
const Message = require("./Message");

/**
 * Represents a channel within Discord.
 * @see {@link https://discord.com/developers/docs/resources/channel}
 */
class Channel {
  #_client;
  #_id;
  #_guild_id;
  #type;
  #name;
  #topic;
  #rate_limit_per_user;
  #_parent_id;
  #_attributes;
  #_cacheOptions;
  #messages;
  /**
   * Creates the base structure for a channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {String} guild_id The ID of the guild that this channel belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure}
   */
  constructor(client, data, { guild_id } = {}) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the channel.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The ID of the guild that this channel belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guild_id);

    /**
     * The type of channel.
     * @type {Number}
     * @private
     */
    this.#type = data.type;

    const existing = this.guild?.channels.get(data.id) || null;

    /**
     * The name of the channel.
     * @type {String}
     * @private
     */
    if (typeof data.name == "string") this.#name = data.name;
    else if (
      typeof data.name != "string" &&
      existing &&
      typeof existing.name == "string"
    )
      this.#name = existing.name;

    /**
     * The topic of the channel.
     * @type {String?}
     * @private
     */
    if (typeof data.topic == "string") this.#topic = data.topic;
    else if (
      typeof data.topic != "string" &&
      existing &&
      typeof existing.topic == "string"
    )
      this.#topic = existing.topic;

    /**
     * The message send cooldown for the channel.
     * @type {Number?}
     * @private
     */
    if (typeof data.rate_limit_per_user == "number")
      this.#rate_limit_per_user = data.rate_limit_per_user;
    else if (
      typeof data.rate_limit_per_user != "number" &&
      existing &&
      typeof existing.rateLimitPerUser == "number"
    )
      this.#rate_limit_per_user = existing.rateLimitPerUser;

    if (typeof data.parent_id == "string") {
      /**
       * The id of the parent channel.
       * @type {BigInt?}
       * @private
       */
      this.#_parent_id = BigInt(data.parent_id);
    } else if (
      typeof data.parent_id != "string" &&
      data.parent_id === undefined &&
      existing &&
      typeof existing.parentId == "string"
    )
      this.#_parent_id = existing.parentId;

    /**
     * The attributes of the channel.
     * @type {Number}
     * @private
     */
    this.#_attributes = data._attributes ?? 0;

    if (data.nsfw !== undefined && data.nsfw == true)
      this.#_attributes |= 0b1 << 0;
    else if (data.nsfw === undefined && existing && existing.nsfw == true)
      this.#_attributes |= 0b1 << 0;

    /**
     * The cache options for this channel.
     * @type {ChannelCacheOptions}
     * @private
     */
    this.#_cacheOptions = existing?._cacheOptions
      ? existing._cacheOptions
      : new ChannelCacheOptions(data._cacheOptions);

    /**
     * The message manager for this channel.
     * @type {ChannelMessageManager}
     * @private
     */
    this.#messages = existing?.messages
      ? existing.messages
      : new ChannelMessageManager(client, this);
  }

  /**
   * Sends a message to this channel.
   * @param {String} content The message content.
   * @param {Object} param1 Embeds, components and files to include with the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
   * @method
   * @public
   * @async
   * @throws {Error | TypeError}
   */
  async send(
    content,
    { components, files, embeds, suppressMentions = false } = {},
  ) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.SEND_MESSAGES,
      )
    )
      return null;

    if (!content && !embeds && !components && !files)
      throw new Error(
        "GLUON: No content, embeds, components or files provided.",
      );

    if (typeof content !== "undefined" && typeof content !== "string")
      throw new TypeError("GLUON: Content must be a string.");

    if (typeof suppressMentions !== "boolean")
      throw new TypeError("GLUON: Suppress mentions must be a boolean.");

    if (
      typeof components !== "undefined" &&
      !Array.isArray(components) &&
      components.every((c) => c instanceof ActionRow)
    )
      throw new TypeError("GLUON: Components must be an array.");

    if (
      typeof files !== "undefined" &&
      !Array.isArray(files) &&
      files.every((f) => f instanceof File)
    )
      throw new TypeError("GLUON: Files must be an array.");

    if (
      typeof embeds !== "undefined" &&
      !Array.isArray(embeds) &&
      embeds.every((e) => e instanceof Embed)
    )
      throw new TypeError("GLUON: Embeds must be an array.");

    const body = {};

    if (content) body.content = content;

    if (embeds) body.embeds = embeds;
    if (components) body.components = components;
    if (files) body.files = files;
    if (suppressMentions == true) {
      body.allowed_mentions = {};
      body.allowed_mentions.parse = [];
    }

    const data = await this.#_client.request.makeRequest(
      "postCreateMessage",
      [this.id],
      body,
    );

    return new Message(this.#_client, data, {
      channel_id: this.id,
      guild_id: this.guildId,
      nocache: false,
    });
  }

  /**
   * Returns the mention for this channel.
   * @type {String}
   * @readonly
   * @public
   */
  get mention() {
    return `<#${this.id}>`;
  }

  /**
   * Whether this channel is marked as NSFW or not.
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get nsfw() {
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * The guild that this channel belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The parent channel.
   * @type {Channel?}
   * @readonly
   * @public
   */
  get parent() {
    return this.parentId
      ? this.guild?.channels.get(this.parentId) || null
      : null;
  }

  /**
   * The ID of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The ID of the guild that this channel belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The ID of the parent channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get parentId() {
    return this.#_parent_id ? String(this.#_parent_id) : null;
  }

  /**
   * The type of channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get type() {
    return this.#type;
  }

  /**
   * The name of the channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * The topic of the channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get topic() {
    return this.#topic;
  }

  /**
   * The message send cooldown for the channel.
   * @type {Number?}
   * @readonly
   * @public
   */
  get rateLimitPerUser() {
    return this.#rate_limit_per_user;
  }

  /**
   * The cache options for this channel.
   * @type {ChannelCacheOptions}
   * @readonly
   * @public
   */
  get _cacheOptions() {
    return this.#_cacheOptions;
  }

  /**
   * The messages in this channel.
   * @type {ChannelMessageManager}
   * @readonly
   * @public
   */
  get messages() {
    return this.#messages;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Channel: ${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      topic: this.topic,
      rate_limit_per_user: this.rateLimitPerUser,
      parent_id: this.parentId ?? undefined,
      _attributes: this.#_attributes,
      _cacheOptions: this._cacheOptions,
      messages: this.messages,
    };
  }
}

module.exports = Channel;
