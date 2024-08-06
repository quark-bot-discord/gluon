import { CDN_BASE_URL, TO_JSON_TYPES_ENUM } from "../constants.js";

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

    if (data.require_colons !== undefined && data.require_colons === true)
      this.#_attributes |= 0b1 << 0;
    else if (data.require_colons === undefined) this.#_attributes |= 0b1 << 0;

    if (data.managed !== undefined && data.managed === true)
      this.#_attributes |= 0b1 << 1;

    if (data.animated !== undefined && data.animated === true)
      this.#_attributes |= 0b1 << 2;

    if (data.available !== undefined && data.available === true)
      this.#_attributes |= 0b1 << 3;
    else if (data.available === undefined) this.#_attributes |= 0b1 << 3;

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
    return Emoji.getMention(this.name, this.id, this.animated);
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
   * Returns the mention string for an emoji.
   * @param {String} name The name of the emoji.
   * @param {String?} id The id of the emoji.
   * @param {Boolean?} animated Whether the emoji is animated.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(name, id, animated) {
    if (id) return `<${animated == true ? "a" : ""}:${name}:${id}>`;
    else return name;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Emoji: ${this.id ?? this.name}>`;
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
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT: {
        return {
          id: this.id,
          name: this.name,
          _attributes: this.#_attributes,
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          name: this.name,
          animated: this.animated,
          managed: this.managed,
          require_colons: this.requireColons,
          available: this.available,
        };
      }
    }
  }
}

export default Emoji;
