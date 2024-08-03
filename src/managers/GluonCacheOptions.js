const {
  GLUON_GLOBAL_CACHE_ENUM,
  DEFAULT_USER_EXPIRY_SECONDS,
  DEFAULT_MESSAGE_EXPIRY_SECONDS,
} = require("../constants");

class GluonCacheOptions {
  #_cache_options;
  constructor() {
    this.#_cache_options = 0;
    this.userTTL = DEFAULT_USER_EXPIRY_SECONDS;
    this.messageTTL = DEFAULT_MESSAGE_EXPIRY_SECONDS;
  }
  //   increaseCacheBy = DEFAULT_INCREASE_CACHE_BY,

  /**
   * Set whether gluon should cache messages by default.
   * @param {Boolean} value Whether to cache messages or not.
   * @returns {GluonCacheOptions}
   */
  setCacheMessages(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache messages must be a boolean.");

    if (value === true)
      this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.MESSAGES;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.MESSAGES;

    return this;
  }

  /**
   * Set whether gluon should cache users by default.
   * @param {Boolean} value Whether to cache users or not.
   * @returns {GluonCacheOptions}
   */
  setCacheUsers(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache users must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.USERS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.USERS;

    return this;
  }

  /**
   * Set whether gluon should cache members by default.
   * @param {Boolean} value Whether to cache members or not.
   * @returns {GluonCacheOptions}
   */
  setCacheMembers(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache members must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.MEMBERS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.MEMBERS;

    return this;
  }

  /**
   * Set whether gluon should cache channels by default.
   * @param {Boolean} value Whether to cache channels or not.
   * @returns {GluonCacheOptions}
   */
  setCacheChannels(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache channels must be a boolean.");

    if (value === true)
      this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.CHANNELS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.CHANNELS;

    return this;
  }

  /**
   * Set whether gluon should cache guilds by default.
   * @param {Boolean} value Whether to cache guilds or not.
   * @returns {GluonCacheOptions}
   */
  setCacheGuilds(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache guilds must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.GUILDS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.GUILDS;

    return this;
  }

  /**
   * Set whether gluon should cache roles by default.
   * @param {Boolean} value Whether to cache roles or not.
   * @returns {GluonCacheOptions}
   */
  setCacheRoles(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache roles must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.ROLES;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.ROLES;

    return this;
  }

  /**
   * Set whether gluon should cache voice states by default.
   * @param {Boolean} value Whether to cache voice states or not.
   * @returns {GluonCacheOptions}
   */
  setCacheVoiceStates(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache voice states must be a boolean.");

    if (value === true)
      this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.VOICE_STATES;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.VOICE_STATES;

    return this;
  }

  /**
   * Set whether gluon should cache emojis by default.
   * @param {Boolean} value Whether to cache emojis or not.
   * @returns {GluonCacheOptions}
   */
  setCacheEmojis(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache emojis must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.EMOJIS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.EMOJIS;

    return this;
  }

  /**
   * Set whether gluon should cache invites by default.
   * @param {Boolean} value Whether to cache invites or not.
   * @returns {GluonCacheOptions}
   */
  setCacheInvites(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache invites must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.INVITES;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.INVITES;

    return this;
  }

  /**
   * Set whether gluon should cache scheduled events by default.
   * @param {Boolean} value Whether to cache scheduled events or not.
   * @returns {GluonCacheOptions}
   */
  setCacheScheduledEvents(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache scheduled events must be a boolean.");

    if (value === true)
      this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.SCHEDULED_EVENTS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.SCHEDULED_EVENTS;

    return this;
  }

  /**
   * Set the default TTL for users in the cache.
   * @param {Number} seconds The number of seconds to cache users for.
   * @returns {GluonCacheOptions}
   */
  setUserTTL(seconds) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: User TTL must be a number.");

    this.defaultUserExpiry = seconds;

    return this;
  }

  /**
   * Set the default TTL for messages in the cache.
   * @param {Number} seconds The number of seconds to cache messages for.
   * @returns {GluonCacheOptions}
   */
  setMessageTTL(seconds) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: Message TTL must be a number.");

    this.defaultMessageExpiry = seconds;

    return this;
  }

  addCacheRule(gluonCacheRule) {}
}

export default GluonCacheOptions;
