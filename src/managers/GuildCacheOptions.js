const { GLUON_GUILD_CACHING_OPTIONS } = require("../constants");

class GuildCacheOptions {
  #_cache_options;

  constructor(cache_options) {
    /**
     * The cache options for this guild.
     * @type {Number}
     * @private
     */
    this.#_cache_options = cache_options ?? 0;
  }

  /**
   * Whether to cache messages or not.
   * @param {Boolean} option Whether to cache messages or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  set messageCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.MESSAGES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.MESSAGES;
    return this;
  }

  /**
   * Whether to cache files or not.
   * @param {Boolean} option Whether to cache files or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  set fileCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.FILES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.FILES;
  }

  /**
   * Whether to cache voice states or not.
   * @param {Boolean} option Whether to cache voice states or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  set voiceStateCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES;
  }

  /**
   * Whether to cache members or not.
   * @param {Boolean} option Whether to cache members or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  set memberCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.MEMBERS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.MEMBERS;
  }

  /**
   * Whether to cache roles or not.
   * @param {Boolean} option Whether to cache roles or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  set roleCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.ROLES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.ROLES;
  }

  /**
   * Whether to cache channels or not.
   * @param {Boolean} option Whether to cache channels or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  set channelCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.CHANNELS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.CHANNELS;
  }

  /**
   * Whether to cache emojis or not.
   * @param {Boolean} option Whether to cache emojis or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  set emojiCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.EMOJIS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.EMOJIS;
  }

  /**
   * Whether to cache threads or not.
   * @param {Boolean} option Whether to cache threads or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  set threadCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.THREADS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.THREADS;
  }

  /**
   * Whether to cache invites or not.
   * @param {Boolean} option Whether to cache invites or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  set inviteCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.INVITES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.INVITES;
  }

  /**
   * Returns whether to cache files or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get messageCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.MESSAGES) ===
      GLUON_GUILD_CACHING_OPTIONS.MESSAGES
    );
  }

  /**
   * Returns whether to cache files or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get fileCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.FILES) ===
      GLUON_GUILD_CACHING_OPTIONS.FILES
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get messageCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.MESSAGES) ===
      GLUON_GUILD_CACHING_OPTIONS.MESSAGES
    );
  }

  /**
   * Returns whether to cache voice states or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get voiceStateCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES) ===
      GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES
    );
  }

  /**
   * Returns whether to cache members or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get memberCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.MEMBERS) ===
      GLUON_GUILD_CACHING_OPTIONS.MEMBERS
    );
  }

  /**
   * Returns whether to cache roles or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get roleCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.ROLES) ===
      GLUON_GUILD_CACHING_OPTIONS.ROLES
    );
  }

  /**
   * Returns whether to cache channels or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get channelCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.CHANNELS) ===
      GLUON_GUILD_CACHING_OPTIONS.CHANNELS
    );
  }

  /**
   * Returns whether to cache emojis or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get emojiCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.EMOJIS) ===
      GLUON_GUILD_CACHING_OPTIONS.EMOJIS
    );
  }

  /**
   * Returns whether to cache threads or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get threadCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.THREADS) ===
      GLUON_GUILD_CACHING_OPTIONS.THREADS
    );
  }

  /**
   * Returns whether to cache invites or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get inviteCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.INVITES) ===
      GLUON_GUILD_CACHING_OPTIONS.INVITES
    );
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `GuildCacheOptions { fileCaching: ${this.fileCaching}, messageCaching: ${this.messageCaching}, voiceStateCaching: ${this.voiceStateCaching}, memberCaching: ${this.memberCaching}, roleCaching: ${this.roleCaching}, channelCaching: ${this.channelCaching}, emojiCaching: ${this.emojiCaching}, threadCaching: ${this.threadCaching}, inviteCaching: ${this.inviteCaching} }`;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return this.#_cache_options;
  }
}

module.exports = GuildCacheOptions;
