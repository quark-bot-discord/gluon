import { CDN_BASE_URL } from "../constants.js";

/**
 * Represents an emoji.
 * @see {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure}
 */
class Emoji {
  #_client;
  #_id;
  #name;
  #_attributes;
  #_guild_id;
  /**
   * Creates the structure for an emoji.
   * @param {Client} client The client instance.
   * @param {Object} data The raw emoji data from Discord.
   * @param {String} guild_id The id of the guild that the emoji belongs to.
   * @param {Boolean?} nocache Whether this emoji should be cached or not.
   */
  constructor(
    client,
    data,
    { guild_id, nocache = false } = { nocache: false },
  ) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the emoji (if it is custom).
     * @type {BigInt?}
     * @private
     */
    this.#_id = data.id ? BigInt(data.id) : null;

    /**
     * The name of the emoji (if it is custom).
     * @type {String?}
     * @private
     */
    this.#name = data.name;

    /**
     * The attributes of the emoji.
     * @type {Number}
     * @private
     */
    this.#_attributes = data._attributes ?? 0;

    if (data.require_colons !== undefined && data.require_colons == true)
      this.#_attributes |= 0b1 << 0;

    if (data.managed !== undefined && data.managed == true)
      this.#_attributes |= 0b1 << 1;

    if (data.animated !== undefined && data.animated == true)
      this.#_attributes |= 0b1 << 2;

    if (data.available !== undefined && data.available == true)
      this.#_attributes |= 0b1 << 3;

    /**
     * The id of the guild that this emoji belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guild_id);

    if (nocache == false && this.#_client.cacheEmojis == true && this.id)
      this.#_client.guilds.get(guild_id)?.emojis.set(data.id, this);
  }

  /**
   * Whether the emoji requires colons.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get requireColons() {
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Whether the emoji is managed.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get managed() {
    return (this.#_attributes & (0b1 << 1)) == 0b1 << 1;
  }

  /**
   * Whether the emoji is animated.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get animated() {
    return (this.#_attributes & (0b1 << 2)) == 0b1 << 2;
  }

  /**
   * Whether the emoji is available.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get available() {
    return (this.#_attributes & (0b1 << 3)) == 0b1 << 3;
  }

  /**
   * The mention string for the emoji.
   * @type {String}
   * @readonly
   * @public
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
   * @public
   */
  get url() {
    return `${CDN_BASE_URL}/emojis/${this.id}.${
      this.animated == true ? "gif" : "png"
    }`;
  }

  /**
   * The id of the guild that this emoji belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The guild that this emoji belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The id of the emoji, if it is custom.
   * @type {String?}
   * @readonly
   * @public
   */
  get id() {
    return this.#_id ? String(this.#_id) : null;
  }

  /**
   * The name of the emoji.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Emoji: ${this.id ?? this.name}>`;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      _attributes: this.#_attributes,
    };
  }
}

export default Emoji;
