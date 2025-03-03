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
var _User_instances,
  _User__client,
  _User__id,
  _User__attributes,
  _User__avatar,
  _User_username,
  _User_global_name,
  _User_discriminator,
  _User__cached,
  _User_overrideAvatar,
  _User__formattedAvatarHash_get;
import getTimestamp from "../util/discord/getTimestampFromSnowflake.js";
import { CDN_BASE_URL, GLUON_DEBUG_LEVELS } from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import util from "util";
import { JsonTypes } from "../../typings/index.d.js";
/**
 * Represents a Discord user.
 * @see {@link https://discord.com/developers/docs/resources/user}
 */
class User {
  /**
   * Creates a structure for a user.
   * @param {Client} client The client instance.
   * @param {Object} data The raw user data.
   * @param {Object?} options Additional options for this structure.
   * @param {Boolean?} [options.nocache] Whether the user should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/user#user-object}
   */
  constructor(
    client,
    data,
    { nocache = false } = {
      nocache: false,
    },
  ) {
    _User_instances.add(this);
    _User__client.set(this, void 0);
    _User__id.set(this, void 0);
    _User__attributes.set(this, void 0);
    _User__avatar.set(this, void 0);
    _User_username.set(this, void 0);
    _User_global_name.set(this, void 0);
    _User_discriminator.set(this, void 0);
    _User__cached.set(this, void 0);
    // @ts-expect-error TS(7008): Member '#overrideAvatar' implicitly has an 'any' t... Remove this comment to see the full error message
    _User_overrideAvatar.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _User__client, client, "f");
    /**
     * The id of the user.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _User__id, BigInt(data.id), "f");
    /**
     * The attributes of the user.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _User__attributes, 0, "f");
    if (data.bot == true)
      __classPrivateFieldSet(
        this,
        _User__attributes,
        __classPrivateFieldGet(this, _User__attributes, "f") | (0b1 << 0),
        "f",
      );
    if (data.avatar && data.avatar.startsWith("a_") == true)
      __classPrivateFieldSet(
        this,
        _User__attributes,
        __classPrivateFieldGet(this, _User__attributes, "f") | (0b1 << 1),
        "f",
      );
    /**
     * The avatar of the user.
     * @type {BigInt?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _User__avatar,
      data.avatar ? BigInt(`0x${data.avatar.replace("a_", "")}`) : null,
      "f",
    );
    /**
     * The username of the user.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _User_username, data.username, "f");
    /**
     * The global name of the user.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _User_global_name, data.global_name, "f");
    if (data.discriminator && data.discriminator != 0)
      /**
       * The discriminator of the user (only if user is a bot).
       * @type {Number?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _User_discriminator,
        Number(data.discriminator),
        "f",
      );
    /**
     * The UNIX (seconds) timestamp when this user was last cached.
     * @type {Number}
     * @private
     */
    if ("_cached" in data)
      __classPrivateFieldSet(this, _User__cached, data._cached, "f");
    else
      __classPrivateFieldSet(
        this,
        _User__cached,
        (new Date().getTime() / 1000) | 0,
        "f",
      );
    const shouldCache = User.shouldCache(
      __classPrivateFieldGet(this, _User__client, "f")._cacheOptions,
    );
    if (nocache === false && shouldCache) {
      __classPrivateFieldGet(this, _User__client, "f").users.set(data.id, this);
      __classPrivateFieldGet(this, _User__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE USER ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _User__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE USER ${data.id} (${nocache} ${shouldCache})`,
      );
    }
  }
  /**
   * Overrides the user's avatar with a custom URL.
   * @param {String} url The URL of the avatar to override the user's avatar with.
   * @public
   * @method
   * @returns {void}
   */
  overrideAvatarURL(url) {
    __classPrivateFieldSet(this, _User_overrideAvatar, url, "f");
  }
  /**
   * The ID of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _User__id, "f"));
  }
  /**
   * The username of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get username() {
    return __classPrivateFieldGet(this, _User_username, "f");
  }
  /**
   * The global name of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get globalName() {
    return __classPrivateFieldGet(this, _User_global_name, "f");
  }
  /**
   * The discriminator of the user.
   * @type {String?}
   * @readonly
   * @public
   */
  get discriminator() {
    if (!__classPrivateFieldGet(this, _User_discriminator, "f")) return null;
    let formattedDiscriminator = String(
      __classPrivateFieldGet(this, _User_discriminator, "f"),
    );
    while (formattedDiscriminator.length != 4)
      // eslint-disable-next-line quotes
      formattedDiscriminator = `0${formattedDiscriminator}`;
    return formattedDiscriminator;
  }
  /**
   * The UNIX (seconds) timestamp when this user was last cached.
   * @type {Number}
   * @readonly
   * @public
   */
  get _cached() {
    return __classPrivateFieldGet(this, _User__cached, "f");
  }
  /**
   * The mention string for the user.
   * @type {String}
   * @readonly
   * @public
   */
  get mention() {
    return User.getMention(this.id);
  }
  /**
   * The hash of the users's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalAvatarHash() {
    return __classPrivateFieldGet(this, _User__avatar, "f")
      ? // eslint-disable-next-line quotes
        `${this.avatarIsAnimated ? "a_" : ""}${__classPrivateFieldGet(this, _User_instances, "a", _User__formattedAvatarHash_get)}`
      : null;
  }
  /**
   * The avatar URL of the user.
   * @readonly
   * @type {String}
   * @public
   */
  get displayAvatarURL() {
    if (__classPrivateFieldGet(this, _User_overrideAvatar, "f"))
      return __classPrivateFieldGet(this, _User_overrideAvatar, "f");
    return User.getAvatarUrl(this.id, this._originalAvatarHash);
  }
  /**
   * The username of the user, including their discriminator if they are a bot (username#0001).
   * @readonly
   * @type {String}
   * @public
   */
  get tag() {
    return __classPrivateFieldGet(this, _User_discriminator, "f")
      ? `${__classPrivateFieldGet(this, _User_username, "f")}#${this.discriminator}`
      : __classPrivateFieldGet(this, _User_username, "f");
  }
  /**
   * The UNIX (seconds) timestamp of when this user created their Discord account.
   * @readonly
   * @type {Number}
   * @public
   */
  get createdTimestamp() {
    return getTimestamp(this.id);
  }
  /**
   * Whether the user is a bot or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get bot() {
    return (
      (__classPrivateFieldGet(this, _User__attributes, "f") & (0b1 << 0)) ==
      0b1 << 0
    );
  }
  /**
   * Whether the user has an animated avatar or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get avatarIsAnimated() {
    return (
      (__classPrivateFieldGet(this, _User__attributes, "f") & (0b1 << 1)) ==
      0b1 << 1
    );
  }
  /**
   * Whether the user has an avatar or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get hasAvatar() {
    return __classPrivateFieldGet(this, _User__avatar, "f") !== null;
  }
  /**
   * Returns a mention string for the user.
   * @param {String} id The ID of the user to mention.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: User id must be a string.");
    return `<@${id}>`;
  }
  /**
   * Returns the URL to the user's avatar.
   * @param {String} id The ID of the user to get the avatar for.
   * @param {String?} [hash] The hash of the avatar.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getAvatarUrl(id, hash) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: User id must be a string.");
    if (hash && typeof hash !== "string")
      throw new TypeError("GLUON: Avatar hash must be a string.");
    return hash
      ? // eslint-disable-next-line quotes
        `${CDN_BASE_URL}/avatars/${id}/${hash}.${hash.startsWith("a_") == true ? "gif" : "png"}`
      : `${CDN_BASE_URL}/embed/avatars/${String((BigInt(id) >> 22n) % 6n)}.png`;
  }
  /**
   * Determines whether the user should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions) {
    if (!(gluonCacheOptions instanceof GluonCacheOptions))
      throw new TypeError(
        "GLUON: Gluon cache options must be a GluonCacheOptions.",
      );
    if (gluonCacheOptions.cacheUsers === false) return false;
    return true;
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<User: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_User__client = new WeakMap()),
  (_User__id = new WeakMap()),
  (_User__attributes = new WeakMap()),
  (_User__avatar = new WeakMap()),
  (_User_username = new WeakMap()),
  (_User_global_name = new WeakMap()),
  (_User_discriminator = new WeakMap()),
  (_User__cached = new WeakMap()),
  (_User_overrideAvatar = new WeakMap()),
  (_User_instances = new WeakSet()),
  (_User__formattedAvatarHash_get = function _User__formattedAvatarHash_get() {
    if (!__classPrivateFieldGet(this, _User__avatar, "f")) return null;
    let formattedHash = __classPrivateFieldGet(
      this,
      _User__avatar,
      "f",
    ).toString(16);
    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = `0${formattedHash}`;
    return formattedHash;
  }),
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
      case JsonTypes.CACHE_FORMAT: {
        return {
          id: this.id,
          avatar: this._originalAvatarHash,
          _cached: this._cached,
          bot: this.bot,
          username: this.username,
          global_name: this.globalName,
          discriminator: __classPrivateFieldGet(this, _User_discriminator, "f"),
        };
      }
      case JsonTypes.STORAGE_FORMAT:
        return {
          id: this.id,
          avatar: this._originalAvatarHash,
          _cached: this._cached,
          bot: this.bot,
          username: this.username,
          global_name: this.globalName,
          discriminator: __classPrivateFieldGet(this, _User_discriminator, "f"),
        };
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          avatar: this._originalAvatarHash,
          bot: this.bot,
          username: this.username,
          global_name: this.globalName,
          discriminator: this.discriminator,
        };
      }
    }
  }
}
export default User;
//# sourceMappingURL=User.js.map
