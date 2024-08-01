import getAvatarUrl from "../util/image/getAvatarUrl.js";
import getTimestamp from "../util/discord/getTimestampFromSnowflake.js";

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
    { nocache = false, ignoreNoCache = false, noDbStore = false } = {
      nocache: false,
      ignoreNoCache: false,
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

    if (
      nocache == false &&
      this.#_client.cacheUsers == true &&
      ignoreNoCache == false
    ) {
      this.#_client.users.set(data.id, this);
    }
  }

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
    return `<@${this.id}>`;
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

    return getAvatarUrl(this.id, this.#_originalAvatarHash);
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
  toJSON() {
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
}

export default User;
