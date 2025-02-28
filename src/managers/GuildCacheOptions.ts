import {
  GLUON_GUILD_CACHING_OPTIONS,
  TO_JSON_TYPES_ENUM,
} from "../constants.js";
import { GuildCacheOptionsType } from "./interfaces/GuildCacheOptions.js";

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
  setFileCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: File caching must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.FILES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.FILES;
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
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES;
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
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.MEMBERS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.MEMBERS;
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

    if (option === true)
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.ROLES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.ROLES;
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
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.CHANNELS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.CHANNELS;
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
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.EMOJIS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.EMOJIS;
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
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.THREADS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.THREADS;
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
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.INVITES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.INVITES;
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
      this.#_cache_options |= GLUON_GUILD_CACHING_OPTIONS.SCHEDULED_EVENTS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.SCHEDULED_EVENTS;
    return this;
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
  // @ts-expect-error TS(2300): Duplicate identifier 'messageCaching'.
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
   * Returns whether to cache scheduled events or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get scheduledEventCaching() {
    return (
      (this.#_cache_options & GLUON_GUILD_CACHING_OPTIONS.SCHEDULED_EVENTS) ===
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
        ([key, value]) => `${key}: ${(this.#_cache_options & value) === value}`,
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
  toJSON(format: TO_JSON_TYPES_ENUM) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return this.#_cache_options;
      }
    }
  }
}

export default GuildCacheOptions;
