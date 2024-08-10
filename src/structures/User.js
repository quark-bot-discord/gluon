import getTimestamp from "../util/discord/getTimestampFromSnowflake.js";
import { CDN_BASE_URL, TO_JSON_TYPES_ENUM } from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import util from "util";

/**
 * Represents a Discord user.
 * @see {@link https://discord.com/developers/docs/resources/user}
 */
class User {
  #_client;
  #_id;
  #_attributes;
  #_avatar;
  #username;
  #global_name;
  #discriminator;
  #_cached;
  #overrideAvatar;
  /**
   * Creates a structure for a user.
   * @param {Client} client The client instance.
   * @param {Object} data The raw user data.
   * @param {Boolean?} nocache Whether the user should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/user#user-object}
   */
  constructor(
    client,
    data,
    { nocache = false, noDbStore = false } = {
      nocache: false,
      noDbStore: false,
    },
  ) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the user.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The attributes of the user.
     * @type {Number}
     * @private
     */
    this.#_attributes = 0;

    if (data.bot == true) this.#_attributes |= 0b1 << 0;

    if (data.avatar && data.avatar.startsWith("a_") == true)
      this.#_attributes |= 0b1 << 1;

    /**
     * The avatar of the user.
     * @type {BigInt?}
     * @private
     */
    this.#_avatar = data.avatar
      ? BigInt(`0x${data.avatar.replace("a_", "")}`)
      : null;

    /**
     * The username of the user.
     * @type {String}
     * @private
     */
    this.#username = data.username;

    /**
     * The global name of the user.
     * @type {String}
     * @private
     */
    this.#global_name = data.global_name;

    if (data.discriminator && data.discriminator != 0)
      /**
       * The discriminator of the user (only if user is a bot).
       * @type {Number?}
       * @private
       */
      this.#discriminator = Number(data.discriminator);

    /**
     * The UNIX (seconds) timestamp when this user was last cached.
     * @type {Number}
     * @private
     */
    if (data._cached) this.#_cached = data._cached;
    else this.#_cached = (new Date().getTime() / 1000) | 0;

    if (nocache === false && User.shouldCache(this.#_client._cacheOptions)) {
      this.#_client.users.set(data.id, this);
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
    this.#overrideAvatar = url;
  }

  /**
   * The ID of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The username of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get username() {
    return this.#username;
  }

  /**
   * The global name of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get globalName() {
    return this.#global_name;
  }

  /**
   * The discriminator of the user.
   * @type {String?}
   * @readonly
   * @public
   */
  get discriminator() {
    if (!this.#discriminator) return null;
    let formattedDiscriminator = String(this.#discriminator);
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
    return this.#_cached;
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
   * @private
   */
  get #_originalAvatarHash() {
    return this.#_avatar
      ? // eslint-disable-next-line quotes
        `${this.avatarIsAnimated ? "a_" : ""}${this.#_formattedAvatarHash}`
      : null;
  }

  /**
   * The hash of the users's avatar as a string.
   * @readonly
   * @type {String}
   * @private
   */
  get #_formattedAvatarHash() {
    if (!this.#_avatar) return null;

    let formattedHash = this.#_avatar.toString(16);

    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = `0${formattedHash}`;

    return formattedHash;
  }

  /**
   * The avatar URL of the user.
   * @readonly
   * @type {String}
   * @public
   */
  get displayAvatarURL() {
    if (this.#overrideAvatar) return this.#overrideAvatar;

    return User.getAvatarUrl(this.id, this.#_originalAvatarHash);
  }

  /**
   * The username of the user, including their discriminator if they are a bot (username#0001).
   * @readonly
   * @type {String}
   * @public
   */
  get tag() {
    return this.#discriminator
      ? `${this.#username}#${this.discriminator}`
      : this.#username;
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
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Whether the user has an animated avatar or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get avatarIsAnimated() {
    return (this.#_attributes & (0b1 << 1)) == 0b1 << 1;
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
   * @param {String?} hash The hash of the avatar.
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
        `${CDN_BASE_URL}/avatars/${id}/${hash}.${
          hash.startsWith("a_") == true ? "gif" : "png"
        }`
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
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT: {
        return {
          id: this.id,
          avatar: this.#_originalAvatarHash,
          _cached: this._cached,
          bot: this.bot,
          username: this.username,
          global_name: this.globalName,
          discriminator: this.discriminator,
        };
      }
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          avatar: this.#_originalAvatarHash,
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
