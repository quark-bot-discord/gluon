const { PERMISSIONS } = require("../constants");
const ChannelMessageManager = require("../managers/ChannelMessageManager");
const checkPermission = require("../util/discord/checkPermission");
const Message = require("./Message");

/**
 * Represents a channel within Discord.
 * @see {@link https://discord.com/developers/docs/resources/channel}
 */
class Channel {
  /**
   * Creates the base structure for a channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {String} guild_id The ID of the guild that this channel belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure}
   */
  constructor(client, data, guild_id) {
    /**
     * The client instance.
     * @type {Client}
     */
    this._client = client;

    /**
     * The id of the channel.
     * @type {BigInt}
     */
    this.id = BigInt(data.id);

    /**
     * The ID of the guild that this channel belongs to.
     * @type {BigInt}
     */
    this._guild_id = BigInt(guild_id);

    /**
     * The type of channel.
     * @type {Number}
     */
    this.type = data.type;

    const existing = this.guild?.channels.cache.get(data.id) || null;

    /**
     * The name of the channel.
     * @type {String}
     */
    if (typeof data.name == "string") this.name = data.name;
    else if (
      typeof data.name != "string" &&
      existing &&
      typeof existing.name == "string"
    )
      this.name = existing.name;

    /**
     * The topic of the channel.
     * @type {String?}
     */
    if (typeof data.topic == "string") this.topic = data.topic;
    else if (
      typeof data.topic != "string" &&
      existing &&
      typeof existing.topic == "string"
    )
      this.topic = existing.topic;

    /**
     * The message send cooldown for the channel.
     * @type {Number?}
     */
    if (typeof data.rate_limit_per_user == "number")
      this.rate_limit_per_user = data.rate_limit_per_user;
    else if (
      typeof data.rate_limit_per_user != "number" &&
      existing &&
      typeof existing.rate_limit_per_user == "number"
    )
      this.rate_limit_per_user = existing.rate_limit_per_user;

    if (typeof data.parent_id == "string") {
      /**
       * The id of the parent channel.
       * @type {BigInt?}
       */
      this._parent_id = BigInt(data.parent_id);
    } else if (
      typeof data.parent_id != "string" &&
      data.parent_id === undefined &&
      existing &&
      typeof existing._parent_id == "bigint"
    )
      this._parent_id = existing._parent_id;

    this._attributes = data._attributes ?? 0;

    if (data.nsfw !== undefined && data.nsfw == true)
      this._attributes |= 0b1 << 0;
    else if (data.nsfw === undefined && existing && existing.nsfw == true)
      this._attributes |= 0b1 << 0;

    if (data._cache_options) this._cache_options = data._cache_options;
    else if (!data._cache_options && existing && existing._cache_options)
      this._cache_options = existing._cache_options;
    else this._cache_options = 0;

    /**
     * The message manager for this channel.
     * @type {ChannelMessageManager}
     */
    this.messages =
      existing?.messages && existing.messages.cache
        ? existing.messages
        : new ChannelMessageManager(client, this);
  }

  /**
   * Whether this channel is marked as NSFW or not.
   * @readonly
   * @returns {Boolean}
   */
  get nsfw() {
    return (this._attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * The guild that this channel belongs to.
   * @type {Guild?}
   * @readonly
   */
  get guild() {
    return this._client.guilds.cache.get(this._guild_id.toString()) || null;
  }

  /**
   * Sends a message to this channel.
   * @param {String} content The message content.
   * @param {Object} param1 Embeds, components and files to include with the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
   */
  async send(
    content,
    { embed, components, files, embeds, suppressMentions = false } = {},
  ) {
    if (!checkPermission(await this.guild.me(), PERMISSIONS.SEND_MESSAGES))
      return null;

    const body = {};

    if (content) body.content = content;

    if (embed) body.embeds = [embed];
    else if (embeds && embeds.length != 0)
      body.embeds = embeds;
    if (components) body.components = components;
    if (files) body.files = files;
    if (suppressMentions == true) {
      body.allowed_mentions = {};
      body.allowed_mentions.parse = [];
    }

    const data = await this._client.request.makeRequest(
      "postCreateMessage",
      [this.id],
      body,
    );

    return new Message(
      this._client,
      data,
      String(this.id),
      String(this._guild_id),
      false,
    );
  }

  /**
   * The parent channel.
   * @type {Channel?}
   * @readonly
   */
  get parent() {
    return this._parent_id
      ? this.guild?.channels.cache.get(String(this._parent_id)) || null
      : null;
  }

  toJSON() {
    return {
      id: String(this.id),
      type: this.type,
      name: this.name,
      topic: this.topic,
      rate_limit_per_user: this.rate_limit_per_user,
      parent_id: this._parent_id ? String(this._parent_id) : undefined,
      _attributes: this._attributes,
      _cache_options: this._cache_options,
      messages: this.messages,
    };
  }
}

module.exports = Channel;
