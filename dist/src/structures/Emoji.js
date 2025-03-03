var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _Emoji__client,
  _Emoji__id,
  _Emoji_name,
  _Emoji__attributes,
  _Emoji__guild_id;
import { CDN_BASE_URL, GLUON_DEBUG_LEVELS } from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import util from "util";
import { JsonTypes } from "../../typings/index.d.js";
/**
 * Represents an emoji.
 * @see {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure}
 */
class Emoji {
  /**
   * Creates the structure for an emoji.
   * @param {Client} client The client instance.
   * @param {Object} data The raw emoji data from Discord.
   * @param {Object} options The options for this emoji.
   * @param {String} options.guildId The id of the guild that the emoji belongs to.
   * @param {Boolean?} [options.nocache] Whether this emoji should be cached or not.
   */
  constructor(client, data, { guildId, nocache = false }) {
    _Emoji__client.set(this, void 0);
    _Emoji__id.set(this, void 0);
    _Emoji_name.set(this, void 0);
    _Emoji__attributes.set(this, void 0);
    _Emoji__guild_id.set(this, void 0);
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
    __classPrivateFieldSet(this, _Emoji__client, client, "f");
    /**
     * The id of the emoji (if it is custom).
     * @type {BigInt?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Emoji__id,
      data.id ? BigInt(data.id) : null,
      "f",
    );
    /**
     * The name of the emoji (if it is custom).
     * @type {String?}
     * @private
     */
    __classPrivateFieldSet(this, _Emoji_name, data.name, "f");
    /**
     * The attributes of the emoji.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Emoji__attributes,
      "_attributes" in data ? data._attributes : 0,
      "f",
    );
    if ("require_colons" in data && data.require_colons === true)
      __classPrivateFieldSet(
        this,
        _Emoji__attributes,
        __classPrivateFieldGet(this, _Emoji__attributes, "f") | (0b1 << 0),
        "f",
      );
    else if ("require_colons" in data && data.require_colons === undefined)
      __classPrivateFieldSet(
        this,
        _Emoji__attributes,
        __classPrivateFieldGet(this, _Emoji__attributes, "f") | (0b1 << 0),
        "f",
      );
    if ("managed" in data && data.managed === true)
      __classPrivateFieldSet(
        this,
        _Emoji__attributes,
        __classPrivateFieldGet(this, _Emoji__attributes, "f") | (0b1 << 1),
        "f",
      );
    if ("animated" in data && data.animated === true)
      __classPrivateFieldSet(
        this,
        _Emoji__attributes,
        __classPrivateFieldGet(this, _Emoji__attributes, "f") | (0b1 << 2),
        "f",
      );
    if (
      "available" in data &&
      data.available !== undefined &&
      data.available === true
    )
      __classPrivateFieldSet(
        this,
        _Emoji__attributes,
        __classPrivateFieldGet(this, _Emoji__attributes, "f") | (0b1 << 3),
        "f",
      );
    else if ("available" in data && data.available === undefined)
      __classPrivateFieldSet(
        this,
        _Emoji__attributes,
        __classPrivateFieldGet(this, _Emoji__attributes, "f") | (0b1 << 3),
        "f",
      );
    /**
     * The id of the guild that this emoji belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Emoji__guild_id, BigInt(guildId), "f");
    const shouldCache = Emoji.shouldCache(
      __classPrivateFieldGet(this, _Emoji__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (nocache === false && shouldCache && this.id) {
      __classPrivateFieldGet(this, _Emoji__client, "f")
        .guilds.get(guildId)
        ?.emojis.set(data.id, this);
      __classPrivateFieldGet(this, _Emoji__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE EMOJI ${guildId} ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _Emoji__client, "f")._emitDebug(
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
    return (
      (__classPrivateFieldGet(this, _Emoji__attributes, "f") & (0b1 << 0)) ==
      0b1 << 0
    );
  }
  /**
   * Whether the emoji is managed.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get managed() {
    return (
      (__classPrivateFieldGet(this, _Emoji__attributes, "f") & (0b1 << 1)) ==
      0b1 << 1
    );
  }
  /**
   * Whether the emoji is animated.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get animated() {
    return Emoji.isAnimated(
      __classPrivateFieldGet(this, _Emoji__attributes, "f"),
    );
  }
  /**
   * Checks if the emoji is animated.
   * @param {Number} attributes The attributes of the emoji.
   * @returns {Boolean}
   */
  static isAnimated(attributes) {
    return (attributes & (0b1 << 2)) == 0b1 << 2;
  }
  /**
   * Whether the emoji is available.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get available() {
    return (
      (__classPrivateFieldGet(this, _Emoji__attributes, "f") & (0b1 << 3)) ==
      0b1 << 3
    );
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
    return String(__classPrivateFieldGet(this, _Emoji__guild_id, "f"));
  }
  /**
   * The guild that this emoji belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _Emoji__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The id of the emoji, if it is custom.
   * @type {String?}
   * @readonly
   * @public
   */
  get id() {
    return __classPrivateFieldGet(this, _Emoji__id, "f")
      ? String(__classPrivateFieldGet(this, _Emoji__id, "f"))
      : null;
  }
  /**
   * The name of the emoji.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return __classPrivateFieldGet(this, _Emoji_name, "f");
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
   * @param {Boolean} [animated] Whether the emoji is animated.
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
  [((_Emoji__client = new WeakMap()),
  (_Emoji__id = new WeakMap()),
  (_Emoji_name = new WeakMap()),
  (_Emoji__attributes = new WeakMap()),
  (_Emoji__guild_id = new WeakMap()),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.CACHE_FORMAT: {
        return {
          id: this.id,
          name: this.name,
          _attributes: __classPrivateFieldGet(this, _Emoji__attributes, "f"),
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
//# sourceMappingURL=Emoji.js.map
