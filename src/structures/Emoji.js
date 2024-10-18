import Client from "../Client.js";
import { CDN_BASE_URL, TO_JSON_TYPES_ENUM } from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import util from "util";

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
   * @param {Object} options The options for this emoji.
   * @param {String} options.guildId The id of the guild that the emoji belongs to.
   * @param {Boolean?} options.nocache Whether this emoji should be cached or not.
   */
  constructor(client, data, { guildId, nocache = false } = { nocache: false }) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");

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
    this.#_guild_id = BigInt(guildId);

    if (
      nocache === false &&
      Emoji.shouldCache(
        this.#_client._cacheOptions,
        this.guild._cacheOptions,
      ) &&
      this.id
    )
      this.#_client.guilds.get(guildId)?.emojis.set(data.id, this);
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
    return this.id ? Emoji.getUrl(this.id, this.animated) : null;
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
    if (typeof name !== "string")
      throw new TypeError("GLUON: Emoji name must be a string.");
    if (id && typeof id !== "string")
      throw new TypeError("GLUON: Emoji id must be a string.");
    if (animated && typeof animated !== "boolean")
      throw new TypeError("GLUON: Emoji animated must be a boolean.");
    if (id) return `<${animated === true ? "a" : ""}:${name}:${id}>`;
    else return name;
  }

  /**
   * Returns the url for an emoji.
   * @param {String} id The id of the emoji.
   * @param {Boolean} animated Whether the emoji is animated.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getUrl(id, animated = false) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Emoji id must be a string.");
    if (typeof animated !== "boolean")
      throw new TypeError("GLUON: Emoji animated must be a boolean.");
    return `${CDN_BASE_URL}/emojis/${id}.${animated === true ? "gif" : "png"}`;
  }

  /**
   * Determines whether the emoji should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions, guildCacheOptions) {
    if (!(gluonCacheOptions instanceof GluonCacheOptions))
      throw new TypeError(
        "GLUON: Gluon cache options must be a GluonCacheOptions.",
      );
    if (!(guildCacheOptions instanceof GuildCacheOptions))
      throw new TypeError(
        "GLUON: Guild cache options must be a GuildCacheOptions.",
      );
    if (gluonCacheOptions.cacheEmojis === false) return false;
    if (guildCacheOptions.emojiCaching === false) return false;
    return true;
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
