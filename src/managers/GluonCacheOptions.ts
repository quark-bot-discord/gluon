import {
  GLUON_GLOBAL_CACHE_ENUM,
  DEFAULT_USER_EXPIRY_SECONDS,
  DEFAULT_MESSAGE_EXPIRY_SECONDS,
} from "../constants.js";
import { GluonCacheOptionsType } from "./interfaces/GluonCacheOptions.js";

class GluonCacheOptions implements GluonCacheOptionsType {
  #_cache_options;
  #userTTL;
  #messageTTL;
  constructor({
    userTTL,
    messageTTL,
    cacheMessages,
    cacheUsers,
    cacheMembers,
    cacheChannels,
    cacheGuilds,
    cacheRoles,
    cacheVoiceStates,
    cacheEmojis,
    cacheInvites,
    cacheScheduledEvents,
  }: {
    userTTL?: number;
    messageTTL?: number;
    cacheMessages?: boolean;
    cacheUsers?: boolean;
    cacheMembers?: boolean;
    cacheChannels?: boolean;
    cacheGuilds?: boolean;
    cacheRoles?: boolean;
    cacheVoiceStates?: boolean;
    cacheEmojis?: boolean;
    cacheInvites?: boolean;
    cacheScheduledEvents?: boolean;
  } = {}) {
    this.#_cache_options = 0;

    this.#userTTL = DEFAULT_USER_EXPIRY_SECONDS;
    this.#messageTTL = DEFAULT_MESSAGE_EXPIRY_SECONDS;

    if (userTTL) this.setUserTTL(userTTL);
    if (messageTTL) this.setMessageTTL(messageTTL);
    if (cacheMessages) this.setCacheMessages(cacheMessages);
    if (cacheUsers) this.setCacheUsers(cacheUsers);
    if (cacheMembers) this.setCacheMembers(cacheMembers);
    if (cacheChannels) this.setCacheChannels(cacheChannels);
    if (cacheGuilds) this.setCacheGuilds(cacheGuilds);
    if (cacheRoles) this.setCacheRoles(cacheRoles);
    if (cacheVoiceStates) this.setCacheVoiceStates(cacheVoiceStates);
    if (cacheEmojis) this.setCacheEmojis(cacheEmojis);
    if (cacheInvites) this.setCacheInvites(cacheInvites);
    if (cacheScheduledEvents)
      this.setCacheScheduledEvents(cacheScheduledEvents);
  }

  /**
   * Set whether gluon should cache messages by default.
   * @param {Boolean} value Whether to cache messages or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheMessages(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache messages must be a boolean.");

    if (value === true)
      this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.MESSAGES;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.MESSAGES;

    return this;
  }

  /**
   * Get whether gluon should cache messages by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheMessages() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.MESSAGES) ===
      GLUON_GLOBAL_CACHE_ENUM.MESSAGES
    );
  }

  /**
   * Set whether gluon should cache users by default.
   * @param {Boolean} value Whether to cache users or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheUsers(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache users must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.USERS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.USERS;

    return this;
  }

  /**
   * Get whether gluon should cache users by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheUsers() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.USERS) ===
      GLUON_GLOBAL_CACHE_ENUM.USERS
    );
  }

  /**
   * Set whether gluon should cache members by default.
   * @param {Boolean} value Whether to cache members or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheMembers(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache members must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.MEMBERS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.MEMBERS;

    return this;
  }

  /**
   * Get whether gluon should cache members by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheMembers() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.MEMBERS) ===
      GLUON_GLOBAL_CACHE_ENUM.MEMBERS
    );
  }

  /**
   * Set whether gluon should cache channels by default.
   * @param {Boolean} value Whether to cache channels or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheChannels(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache channels must be a boolean.");

    if (value === true)
      this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.CHANNELS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.CHANNELS;

    return this;
  }

  /**
   * Get whether gluon should cache channels by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheChannels() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.CHANNELS) ===
      GLUON_GLOBAL_CACHE_ENUM.CHANNELS
    );
  }

  /**
   * Set whether gluon should cache guilds by default.
   * @param {Boolean} value Whether to cache guilds or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheGuilds(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache guilds must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.GUILDS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.GUILDS;

    return this;
  }

  /**
   * Get whether gluon should cache guilds by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheGuilds() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.GUILDS) ===
      GLUON_GLOBAL_CACHE_ENUM.GUILDS
    );
  }

  /**
   * Set whether gluon should cache roles by default.
   * @param {Boolean} value Whether to cache roles or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheRoles(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache roles must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.ROLES;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.ROLES;

    return this;
  }

  /**
   * Get whether gluon should cache roles by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheRoles() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.ROLES) ===
      GLUON_GLOBAL_CACHE_ENUM.ROLES
    );
  }

  /**
   * Set whether gluon should cache voice states by default.
   * @param {Boolean} value Whether to cache voice states or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheVoiceStates(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache voice states must be a boolean.");

    if (value === true)
      this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.VOICE_STATES;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.VOICE_STATES;

    return this;
  }

  /**
   * Get whether gluon should cache voice states by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheVoiceStates() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.VOICE_STATES) ===
      GLUON_GLOBAL_CACHE_ENUM.VOICE_STATES
    );
  }

  /**
   * Set whether gluon should cache emojis by default.
   * @param {Boolean} value Whether to cache emojis or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheEmojis(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache emojis must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.EMOJIS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.EMOJIS;

    return this;
  }

  /**
   * Get whether gluon should cache emojis by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheEmojis() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.EMOJIS) ===
      GLUON_GLOBAL_CACHE_ENUM.EMOJIS
    );
  }

  /**
   * Set whether gluon should cache invites by default.
   * @param {Boolean} value Whether to cache invites or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheInvites(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache invites must be a boolean.");

    if (value === true) this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.INVITES;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.INVITES;

    return this;
  }

  /**
   * Get whether gluon should cache invites by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheInvites() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.INVITES) ===
      GLUON_GLOBAL_CACHE_ENUM.INVITES
    );
  }

  /**
   * Set whether gluon should cache scheduled events by default.
   * @param {Boolean} value Whether to cache scheduled events or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheScheduledEvents(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache scheduled events must be a boolean.");

    if (value === true)
      this.#_cache_options |= GLUON_GLOBAL_CACHE_ENUM.SCHEDULED_EVENTS;
    else this.#_cache_options &= ~GLUON_GLOBAL_CACHE_ENUM.SCHEDULED_EVENTS;

    return this;
  }

  /**
   * Get whether gluon should cache scheduled events by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheScheduledEvents() {
    return (
      (this.#_cache_options & GLUON_GLOBAL_CACHE_ENUM.SCHEDULED_EVENTS) ===
      GLUON_GLOBAL_CACHE_ENUM.SCHEDULED_EVENTS
    );
  }

  /**
   * Set the default TTL for users in the cache.
   * @param {Number} seconds The number of seconds to cache users for.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setUserTTL(seconds: number) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: User TTL must be a number.");

    this.#userTTL = seconds;

    return this;
  }

  /**
   * Get the default TTL for users in the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get userTTL() {
    return this.#userTTL;
  }

  /**
   * Set the default TTL for messages in the cache.
   * @param {Number} seconds The number of seconds to cache messages for.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setMessageTTL(seconds: number) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: Message TTL must be a number.");

    this.#messageTTL = seconds;

    return this;
  }

  /**
   * Get the default TTL for messages in the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get messageTTL() {
    return this.#messageTTL;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `GluonCacheOptions { ${Object.entries(GLUON_GLOBAL_CACHE_ENUM)
      .map(
        ([key, value]) => `${key}: ${(this.#_cache_options & value) === value}`,
      )
      .join(
        ", ",
      )}, USER_TTL: ${this.#userTTL}, MESSAGE_TTL: ${this.#messageTTL} }`;
  }
}

export default GluonCacheOptions;
