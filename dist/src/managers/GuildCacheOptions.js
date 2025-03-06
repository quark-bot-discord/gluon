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
import { GluonGuildCachingOptions, JsonTypes } from "#typings/enums.js";
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
          GluonGuildCachingOptions.Messages,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.Messages,
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
          GluonGuildCachingOptions.Files,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.Files,
        "f",
      );
    return this;
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
          GluonGuildCachingOptions.VoiceStates,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.VoiceStates,
        "f",
      );
    return this;
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
          GluonGuildCachingOptions.Members,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.Members,
        "f",
      );
    return this;
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
          GluonGuildCachingOptions.Roles,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.Roles,
        "f",
      );
    return this;
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
          GluonGuildCachingOptions.Channels,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.Channels,
        "f",
      );
    return this;
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
          GluonGuildCachingOptions.Emojis,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.Emojis,
        "f",
      );
    return this;
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
          GluonGuildCachingOptions.Threads,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.Threads,
        "f",
      );
    return this;
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
          GluonGuildCachingOptions.Invites,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.Invites,
        "f",
      );
    return this;
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
          GluonGuildCachingOptions.ScheduledEvents,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _GuildCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
          ~GluonGuildCachingOptions.ScheduledEvents,
        "f",
      );
    return this;
  }
  /**
   * Returns whether to cache files or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get messageCaching() {
    return (
      (__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") &
        GluonGuildCachingOptions.Messages) ===
      GluonGuildCachingOptions.Messages
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
        GluonGuildCachingOptions.Files) ===
      GluonGuildCachingOptions.Files
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
        GluonGuildCachingOptions.VoiceStates) ===
      GluonGuildCachingOptions.VoiceStates
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
        GluonGuildCachingOptions.Members) ===
      GluonGuildCachingOptions.Members
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
        GluonGuildCachingOptions.Roles) ===
      GluonGuildCachingOptions.Roles
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
        GluonGuildCachingOptions.Channels) ===
      GluonGuildCachingOptions.Channels
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
        GluonGuildCachingOptions.Emojis) ===
      GluonGuildCachingOptions.Emojis
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
        GluonGuildCachingOptions.Threads) ===
      GluonGuildCachingOptions.Threads
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
        GluonGuildCachingOptions.Invites) ===
      GluonGuildCachingOptions.Invites
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
        GluonGuildCachingOptions.ScheduledEvents) ===
      GluonGuildCachingOptions.ScheduledEvents
    );
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `GuildCacheOptions { ${Object.entries(GluonGuildCachingOptions)
      .filter(([key]) => !isNaN(Number(key)))
      .map(
        ([key, value]) =>
          `${value.toString().toUpperCase()}: ${(__classPrivateFieldGet(this, _GuildCacheOptions__cache_options, "f") & Number(key)) === Number(key)}`,
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
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
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
