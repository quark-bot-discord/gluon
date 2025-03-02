import { GLUON_CHANNEL_CACHING_OPTIONS } from "../constants.js";
import {
  ChannelCacheOptions as ChannelCacheOptionsType,
  JsonTypes,
} from "../../typings/index.d.js";

/**
 * Represents the cache options for a channel.
 * All options are enabled by default.
 */
class ChannelCacheOptions implements ChannelCacheOptionsType {
  #_cache_options;

  /**
   * Creates the cache options for a channel.
   * @param {Number} cache_options The preset cache options for this channel.
   * @public
   * @constructor
   */
  constructor(cache_options?: number) {
    /**
     * The cache options for this channel.
     * @type {Number}
     * @private
     */
    this.#_cache_options =
      cache_options ??
      GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES |
        GLUON_CHANNEL_CACHING_OPTIONS.FILES |
        GLUON_CHANNEL_CACHING_OPTIONS.CONTENT |
        GLUON_CHANNEL_CACHING_OPTIONS.POLL |
        GLUON_CHANNEL_CACHING_OPTIONS.REACTIONS |
        GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS |
        GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES |
        GLUON_CHANNEL_CACHING_OPTIONS.REFERENCE |
        GLUON_CHANNEL_CACHING_OPTIONS.STICKER |
        GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK;
  }

  /**
   * Sets whether to cache messages or not.
   * @param {Boolean} option Whether to cache messages or not.
   * @public
   * @throws {TypeError}
   * @method
   */
  setMessageCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES;
  }

  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setFileCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.FILES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.FILES;
  }

  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setContentCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.CONTENT;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.CONTENT;
  }

  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setPollCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.POLL;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.POLL;
  }

  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setReactionCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.REACTIONS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.REACTIONS;
  }

  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setEmbedCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS;
  }

  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setAttributeCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES;
  }

  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setReferenceCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.REFERENCE;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.REFERENCE;
  }

  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setStickerCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.STICKER;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.STICKER;
  }

  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setWebhookCaching(option: boolean) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK;
  }

  /**
   * Disables all caching options.
   * @public
   * @method
   * @returns {void}
   */
  setDisableAll() {
    this.#_cache_options =
      this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES;
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get messageCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES) ===
      GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get fileCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.FILES) ===
      GLUON_CHANNEL_CACHING_OPTIONS.FILES
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get contentCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.CONTENT) ===
      GLUON_CHANNEL_CACHING_OPTIONS.CONTENT
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get pollCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.POLL) ===
      GLUON_CHANNEL_CACHING_OPTIONS.POLL
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get reactionCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.REACTIONS) ===
      GLUON_CHANNEL_CACHING_OPTIONS.REACTIONS
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get embedCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS) ===
      GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get attributeCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES) ===
      GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get referenceCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.REFERENCE) ===
      GLUON_CHANNEL_CACHING_OPTIONS.REFERENCE
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get stickerCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.STICKER) ===
      GLUON_CHANNEL_CACHING_OPTIONS.STICKER
    );
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get webhookCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK) ===
      GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK
    );
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `ChannelCacheOptions { ${Object.entries(
      GLUON_CHANNEL_CACHING_OPTIONS,
    )
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
  toJSON(format: JsonTypes) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      default: {
        return this.#_cache_options;
      }
    }
  }
}

export default ChannelCacheOptions;
