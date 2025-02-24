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
var _GuildCacheOptions__cache_options;
import {
  GLUON_GUILD_CACHING_OPTIONS,
  TO_JSON_TYPES_ENUM,
} from "../constants.js";
class GuildCacheOptions {
  constructor(cache_options) {
    _GuildCacheOptions__cache_options.set(this, void 0);
    /**
     * The cache options for this guild.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _GuildCacheOptions__cache_options,
      cache_options ?? 0,
      "f",
    );
  }
  /**
   * Whether to cache messages or not.
   * @param {Boolean} option Whether to cache messages or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setMessageCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Message caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.MESSAGES,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.MESSAGES,
        "f",
      );
    return this;
  }
  /**
   * Whether to cache files or not.
   * @param {Boolean} option Whether to cache files or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setFileCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: File caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.FILES,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.FILES,
        "f",
      );
  }
  /**
   * Whether to cache voice states or not.
   * @param {Boolean} option Whether to cache voice states or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setVoiceStateCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Voice state caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES,
        "f",
      );
  }
  /**
   * Whether to cache members or not.
   * @param {Boolean} option Whether to cache members or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setMemberCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Member caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.MEMBERS,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.MEMBERS,
        "f",
      );
  }
  /**
   * Whether to cache roles or not.
   * @param {Boolean} option Whether to cache roles or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setRoleCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Role caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.ROLES,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.ROLES,
        "f",
      );
  }
  /**
   * Whether to cache channels or not.
   * @param {Boolean} option Whether to cache channels or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setChannelCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Channel caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.CHANNELS,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.CHANNELS,
        "f",
      );
  }
  /**
   * Whether to cache emojis or not.
   * @param {Boolean} option Whether to cache emojis or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setEmojiCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Emoji caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.EMOJIS,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.EMOJIS,
        "f",
      );
  }
  /**
   * Whether to cache threads or not.
   * @param {Boolean} option Whether to cache threads or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setThreadCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Thread caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.THREADS,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.THREADS,
        "f",
      );
  }
  /**
   * Whether to cache invites or not.
   * @param {Boolean} option Whether to cache invites or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setInviteCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Invite caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.INVITES,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.INVITES,
        "f",
      );
  }
  /**
   * Whether to cache scheduled events or not.
   * @param {Boolean} option Whether to cache scheduled events or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setScheduledEventCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Scheduled event caching must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") |
          GLUON_GUILD_CACHING_OPTIONS.SCHEDULED_EVENTS,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GLUON_GUILD_CACHING_OPTIONS.SCHEDULED_EVENTS,
        "f",
      );
  }
  /**
   * Returns whether to cache files or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  // @ts-expect-error TS(2300): Duplicate identifier 'messageCaching'.
  get messageCaching() {
    return (
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.MESSAGES) ===
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
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.FILES) ===
      GLUON_GUILD_CACHING_OPTIONS.FILES
    );
  }
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  // @ts-expect-error TS(2300): Duplicate identifier 'messageCaching'.
  get messageCaching() {
    return (
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.MESSAGES) ===
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
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES) ===
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
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.MEMBERS) ===
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
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.ROLES) ===
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
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.CHANNELS) ===
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
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.EMOJIS) ===
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
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.THREADS) ===
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
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.INVITES) ===
      GLUON_GUILD_CACHING_OPTIONS.INVITES
    );
  }
  /**
   * Returns whether to cache scheduled events or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get scheduledEventCaching() {
    return (
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GLUON_GUILD_CACHING_OPTIONS.SCHEDULED_EVENTS) ===
      GLUON_GUILD_CACHING_OPTIONS.SCHEDULED_EVENTS
    );
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `GuildCacheOptions { ${Object.entries(GLUON_GUILD_CACHING_OPTIONS)
      .map(
        ([key, value]) =>
          `${key}: ${(__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") & value) === value}`,
      )
      .join(", ")} }`;
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
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return __classPrivateFieldGet(
          this,
          _GuildCacheOptions__cache_options,
          "f",
        );
      }
    }
  }
}
_GuildCacheOptions__cache_options = new WeakMap();
export default GuildCacheOptions;
//# sourceMappingURL=GuildCacheOptions.js.map
