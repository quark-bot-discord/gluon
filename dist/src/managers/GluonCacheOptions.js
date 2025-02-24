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
var _GluonCacheOptions__cache_options,
  _GluonCacheOptions_userTTL,
  _GluonCacheOptions_messageTTL;
import {
  GLUON_GLOBAL_CACHE_ENUM,
  DEFAULT_USER_EXPIRY_SECONDS,
  DEFAULT_MESSAGE_EXPIRY_SECONDS,
} from "../constants.js";
class GluonCacheOptions {
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
  } = {}) {
    _GluonCacheOptions__cache_options.set(this, void 0);
    _GluonCacheOptions_userTTL.set(this, void 0);
    _GluonCacheOptions_messageTTL.set(this, void 0);
    __classPrivateFieldSet(this, _GluonCacheOptions__cache_options, 0, "f");
    __classPrivateFieldSet(
      this,
      _GluonCacheOptions_userTTL,
      DEFAULT_USER_EXPIRY_SECONDS,
      "f",
    );
    __classPrivateFieldSet(
      this,
      _GluonCacheOptions_messageTTL,
      DEFAULT_MESSAGE_EXPIRY_SECONDS,
      "f",
    );
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
  setCacheMessages(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache messages must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.MESSAGES,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.MESSAGES,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.MESSAGES) ===
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
  setCacheUsers(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache users must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.USERS,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.USERS,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.USERS) ===
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
  setCacheMembers(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache members must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.MEMBERS,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.MEMBERS,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.MEMBERS) ===
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
  setCacheChannels(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache channels must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.CHANNELS,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.CHANNELS,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.CHANNELS) ===
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
  setCacheGuilds(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache guilds must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.GUILDS,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.GUILDS,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.GUILDS) ===
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
  setCacheRoles(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache roles must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.ROLES,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.ROLES,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.ROLES) ===
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
  setCacheVoiceStates(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache voice states must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.VOICE_STATES,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.VOICE_STATES,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.VOICE_STATES) ===
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
  setCacheEmojis(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache emojis must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.EMOJIS,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.EMOJIS,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.EMOJIS) ===
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
  setCacheInvites(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache invites must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.INVITES,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.INVITES,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.INVITES) ===
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
  setCacheScheduledEvents(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache scheduled events must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GLUON_GLOBAL_CACHE_ENUM.SCHEDULED_EVENTS,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GLUON_GLOBAL_CACHE_ENUM.SCHEDULED_EVENTS,
        "f",
      );
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
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GLUON_GLOBAL_CACHE_ENUM.SCHEDULED_EVENTS) ===
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
  setUserTTL(seconds) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: User TTL must be a number.");
    __classPrivateFieldSet(this, _GluonCacheOptions_userTTL, seconds, "f");
    return this;
  }
  /**
   * Get the default TTL for users in the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get userTTL() {
    return __classPrivateFieldGet(this, _GluonCacheOptions_userTTL, "f");
  }
  /**
   * Set the default TTL for messages in the cache.
   * @param {Number} seconds The number of seconds to cache messages for.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setMessageTTL(seconds) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: Message TTL must be a number.");
    __classPrivateFieldSet(this, _GluonCacheOptions_messageTTL, seconds, "f");
    return this;
  }
  /**
   * Get the default TTL for messages in the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get messageTTL() {
    return __classPrivateFieldGet(this, _GluonCacheOptions_messageTTL, "f");
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `GluonCacheOptions { ${Object.entries(GLUON_GLOBAL_CACHE_ENUM)
      .map(
        ([key, value]) =>
          `${key}: ${(__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") & value) === value}`,
      )
      .join(
        ", ",
      )}, USER_TTL: ${__classPrivateFieldGet(this, _GluonCacheOptions_userTTL, "f")}, MESSAGE_TTL: ${__classPrivateFieldGet(this, _GluonCacheOptions_messageTTL, "f")} }`;
  }
}
(_GluonCacheOptions__cache_options = new WeakMap()),
  (_GluonCacheOptions_userTTL = new WeakMap()),
  (_GluonCacheOptions_messageTTL = new WeakMap());
export default GluonCacheOptions;
//# sourceMappingURL=GluonCacheOptions.js.map
