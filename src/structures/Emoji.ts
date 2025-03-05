import { CDN_BASE_URL, GLUON_DEBUG_LEVELS } from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import util from "util";
import type {
  Emoji as EmojiType,
  EmojiCacheJSON,
  EmojiDiscordJSON,
  EmojiStorageJSON,
  GuildCacheOptions as GuildCacheOptionsType,
  GluonCacheOptions as GluonCacheOptionsType,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { APIEmoji, Snowflake } from "discord-api-types/v10";
import { JsonTypes } from "../../typings/enums.js";

/**
 * Represents an emoji.
 * @see {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure}
 */
class Emoji implements EmojiType {
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
   * @param {Boolean?} [options.nocache] Whether this emoji should be cached or not.
   */
  constructor(
    client: ClientType,
    data: APIEmoji | EmojiCacheJSON | EmojiDiscordJSON | EmojiStorageJSON,
    { guildId, nocache = false }: { guildId: Snowflake; nocache?: boolean },
  ) {
    if (!client)
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
    this.#_attributes = "_attributes" in data ? data._attributes : 0;

    if ("require_colons" in data && data.require_colons === true)
      this.#_attributes |= 0b1 << 0;
    else if ("require_colons" in data && data.require_colons === undefined)
      this.#_attributes |= 0b1 << 0;

    if ("managed" in data && data.managed === true)
      this.#_attributes |= 0b1 << 1;

    if ("animated" in data && data.animated === true)
      this.#_attributes |= 0b1 << 2;

    if (
      "available" in data &&
      data.available !== undefined &&
      data.available === true
    )
      this.#_attributes |= 0b1 << 3;
    else if ("available" in data && data.available === undefined)
      this.#_attributes |= 0b1 << 3;

    /**
     * The id of the guild that this emoji belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    if (!this.guild) {
      throw new Error(`GLUON: Guild ${this.guildId} cannot be found in cache`);
    }

    const shouldCache = Emoji.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (nocache === false && shouldCache && data.id) {
      this.#_client.guilds.get(guildId)?.emojis.set(data.id, this);
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE EMOJI ${guildId} ${data.id}`,
      );
    } else {
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE EMOJI ${guildId} ${data.id} (${nocache} ${shouldCache})`,
      );
    }
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
    return Emoji.isAnimated(this.#_attributes);
  }

  /**
   * Checks if the emoji is animated.
   * @param {Number} attributes The attributes of the emoji.
   * @returns {Boolean}
   */
  static isAnimated(attributes: number) {
    return (attributes & (0b1 << 2)) == 0b1 << 2;
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
    if (!this.name) {
      throw new Error("GLUON: Emoji name is required to mention the emoji.");
    }
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
  static getMention(name: string, id: Snowflake | null, animated?: boolean) {
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
   * @param {Boolean} [animated] Whether the emoji is animated.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getUrl(id: Snowflake, animated: boolean = false) {
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
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ) {
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
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(
    format?: JsonTypes,
  ): EmojiCacheJSON | EmojiDiscordJSON | EmojiStorageJSON {
    switch (format) {
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.CACHE_FORMAT: {
        return {
          id: this.id,
          name: this.name,
          _attributes: this.#_attributes,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
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
