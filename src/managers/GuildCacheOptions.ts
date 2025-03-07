import { GuildCacheOptions as GuildCacheOptionsType } from "../../typings/index.d.js";
import { GluonGuildCachingOptions, JsonTypes } from "#typings/enums.js";

class GuildCacheOptions implements GuildCacheOptionsType {
  #_cache_options;

  constructor(cache_options: number) {
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
  setMessageCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Message caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GluonGuildCachingOptions.Messages;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.Messages;
    return this;
  }

  /**
   * Whether to cache files or not.
   * @param {Boolean} option Whether to cache files or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setFileCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: File caching must be a boolean");

    if (option === true) this.#_cache_options |= GluonGuildCachingOptions.Files;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.Files;
    return this;
  }

  /**
   * Whether to cache voice states or not.
   * @param {Boolean} option Whether to cache voice states or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setVoiceStateCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Voice state caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GluonGuildCachingOptions.VoiceStates;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.VoiceStates;
    return this;
  }

  /**
   * Whether to cache members or not.
   * @param {Boolean} option Whether to cache members or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setMemberCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Member caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GluonGuildCachingOptions.Members;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.Members;
    return this;
  }

  /**
   * Whether to cache roles or not.
   * @param {Boolean} option Whether to cache roles or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setRoleCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Role caching must be a boolean");

    if (option === true) this.#_cache_options |= GluonGuildCachingOptions.Roles;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.Roles;
    return this;
  }

  /**
   * Whether to cache channels or not.
   * @param {Boolean} option Whether to cache channels or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setChannelCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Channel caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GluonGuildCachingOptions.Channels;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.Channels;
    return this;
  }

  /**
   * Whether to cache emojis or not.
   * @param {Boolean} option Whether to cache emojis or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setEmojiCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Emoji caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GluonGuildCachingOptions.Emojis;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.Emojis;
    return this;
  }

  /**
   * Whether to cache threads or not.
   * @param {Boolean} option Whether to cache threads or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setThreadCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Thread caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GluonGuildCachingOptions.Threads;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.Threads;
    return this;
  }

  /**
   * Whether to cache invites or not.
   * @param {Boolean} option Whether to cache invites or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setInviteCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Invite caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GluonGuildCachingOptions.Invites;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.Invites;
    return this;
  }

  /**
   * Whether to cache scheduled events or not.
   * @param {Boolean} option Whether to cache scheduled events or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setScheduledEventCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Scheduled event caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GluonGuildCachingOptions.ScheduledEvents;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.ScheduledEvents;
    return this;
  }

  setAuditLogCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Audit log caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GluonGuildCachingOptions.AuditLogs;
    else if (option === false)
      this.#_cache_options &= ~GluonGuildCachingOptions.AuditLogs;
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
      (this.#_cache_options & GluonGuildCachingOptions.Messages) ===
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
      (this.#_cache_options & GluonGuildCachingOptions.Files) ===
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
      (this.#_cache_options & GluonGuildCachingOptions.VoiceStates) ===
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
      (this.#_cache_options & GluonGuildCachingOptions.Members) ===
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
      (this.#_cache_options & GluonGuildCachingOptions.Roles) ===
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
      (this.#_cache_options & GluonGuildCachingOptions.Channels) ===
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
      (this.#_cache_options & GluonGuildCachingOptions.Emojis) ===
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
      (this.#_cache_options & GluonGuildCachingOptions.Threads) ===
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
      (this.#_cache_options & GluonGuildCachingOptions.Invites) ===
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
      (this.#_cache_options & GluonGuildCachingOptions.ScheduledEvents) ===
      GluonGuildCachingOptions.ScheduledEvents
    );
  }

  get auditLogCaching() {
    return (
      (this.#_cache_options & GluonGuildCachingOptions.AuditLogs) ===
      GluonGuildCachingOptions.AuditLogs
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
        ([key, value]: [string, string | GluonGuildCachingOptions]) =>
          `${value.toString().toUpperCase()}: ${(this.#_cache_options & Number(key)) === Number(key)}`,
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
  toJSON(format: JsonTypes) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return this.#_cache_options;
      }
    }
  }
}

export default GuildCacheOptions;
