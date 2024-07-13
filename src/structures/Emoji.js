const { CDN_BASE_URL } = require("../constants");

/**
 * Represents an emoji.
 * @see {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure}
 */
class Emoji {
  /**
   * Creates the structure for an emoji.
   * @param {Client} client The client instance.
   * @param {Object} data The raw emoji data from Discord.
   * @param {String} guild_id The id of the guild that the emoji belongs to.
   * @param {Boolean?} nocache Whether this emoji should be cached or not.
   */
  constructor(client, data, guild_id, nocache = false) {
    /**
     * The client instance.
     * @type {Client}
     */
    this._client = client;

    /**
     * The id of the emoji (if it is custom).
     * @type {BigInt?}
     */
    this.id = data.id ? BigInt(data.id) : null;

    /**
     * The name of the emoji (if it is custom).
     * @type {String?}
     */
    this.name = data.name;

    this._attributes = data._attributes ?? 0;

    if (data.require_colons !== undefined && data.require_colons == true)
      this._attributes |= 0b1 << 0;

    if (data.managed !== undefined && data.managed == true)
      this._attributes |= 0b1 << 1;

    if (data.animated !== undefined && data.animated == true)
      this._attributes |= 0b1 << 2;

    if (data.available !== undefined && data.available == true)
      this._attributes |= 0b1 << 3;

    this.guild = this._client.guilds.cache.get(guild_id) || null;

    if (!this.guild) this.guild_id = BigInt(guild_id);

    if (nocache == false && this._client.cacheEmojis == true && this.id)
      this._client.guilds.cache.get(guild_id)?.emojis.cache.set(data.id, this);
  }

  /**
   * Whether the emoji requires colons.
   * @type {Boolean}
   * @readonly
   */
  get require_colons() {
    return (this._attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Whether the emoji is managed.
   * @type {Boolean}
   * @readonly
   */
  get managed() {
    return (this._attributes & (0b1 << 1)) == 0b1 << 1;
  }

  /**
   * Whether the emoji is animated.
   * @type {Boolean}
   * @readonly
   */
  get animated() {
    return (this._attributes & (0b1 << 2)) == 0b1 << 2;
  }

  /**
   * Whether the emoji is available.
   * @type {Boolean}
   * @readonly
   */
  get available() {
    return (this._attributes & (0b1 << 3)) == 0b1 << 3;
  }

  /**
   * The mention string for the emoji.
   * @type {String}
   * @readonly
   */
  get mention() {
    if (this.id)
      return `<${this.animated == true ? "a" : ""}:${this.name}:${this.id}>`;
    else return this.name;
  }

  /**
   * The url for the emoji.
   * @type {String}
   * @readonly
   */
  get url() {
    return `${CDN_BASE_URL}/emojis/${this.id}.${
      this.animated == true ? "gif" : "png"
    }`;
  }

  toJSON() {
    return {
      id: this.id ? String(this.id) : undefined,
      name: this.name,
      _attributes: this._attributes,
    };
  }
}

module.exports = Emoji;
