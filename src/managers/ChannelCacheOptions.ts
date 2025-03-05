import type { ChannelCacheOptions as ChannelCacheOptionsType } from "../../typings/index.d.ts";
import { GluonChannelCachingOptions, JsonTypes } from "../../typings/enums.js";

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
      GluonChannelCachingOptions.Messages |
        GluonChannelCachingOptions.Files |
        GluonChannelCachingOptions.Content |
        GluonChannelCachingOptions.Poll |
        GluonChannelCachingOptions.Reactions |
        GluonChannelCachingOptions.Embeds |
        GluonChannelCachingOptions.Attributes |
        GluonChannelCachingOptions.Reference |
        GluonChannelCachingOptions.Sticker |
        GluonChannelCachingOptions.Webhook;
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
      this.#_cache_options |= GluonChannelCachingOptions.Messages;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Messages;
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
      this.#_cache_options |= GluonChannelCachingOptions.Files;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Files;
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
      this.#_cache_options |= GluonChannelCachingOptions.Content;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Content;
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
      this.#_cache_options |= GluonChannelCachingOptions.Poll;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Poll;
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
      this.#_cache_options |= GluonChannelCachingOptions.Reactions;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Reactions;
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
      this.#_cache_options |= GluonChannelCachingOptions.Embeds;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Embeds;
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
      this.#_cache_options |= GluonChannelCachingOptions.Attributes;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Attributes;
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
      this.#_cache_options |= GluonChannelCachingOptions.Reference;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Reference;
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
      this.#_cache_options |= GluonChannelCachingOptions.Sticker;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Sticker;
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
      this.#_cache_options |= GluonChannelCachingOptions.Webhook;
    else if (option === false)
      this.#_cache_options &= ~GluonChannelCachingOptions.Webhook;
  }

  /**
   * Disables all caching options.
   * @public
   * @method
   * @returns {void}
   */
  setDisableAll() {
    this.#_cache_options =
      this.#_cache_options & GluonChannelCachingOptions.Messages;
  }

  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get messageCaching() {
    return (
      (this.#_cache_options & GluonChannelCachingOptions.Messages) ===
      GluonChannelCachingOptions.Messages
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
      (this.#_cache_options & GluonChannelCachingOptions.Files) ===
      GluonChannelCachingOptions.Files
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
      (this.#_cache_options & GluonChannelCachingOptions.Content) ===
      GluonChannelCachingOptions.Content
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
      (this.#_cache_options & GluonChannelCachingOptions.Poll) ===
      GluonChannelCachingOptions.Poll
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
      (this.#_cache_options & GluonChannelCachingOptions.Reactions) ===
      GluonChannelCachingOptions.Reactions
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
      (this.#_cache_options & GluonChannelCachingOptions.Embeds) ===
      GluonChannelCachingOptions.Embeds
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
      (this.#_cache_options & GluonChannelCachingOptions.Attributes) ===
      GluonChannelCachingOptions.Attributes
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
      (this.#_cache_options & GluonChannelCachingOptions.Reference) ===
      GluonChannelCachingOptions.Reference
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
      (this.#_cache_options & GluonChannelCachingOptions.Sticker) ===
      GluonChannelCachingOptions.Sticker
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
      (this.#_cache_options & GluonChannelCachingOptions.Webhook) ===
      GluonChannelCachingOptions.Webhook
    );
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `ChannelCacheOptions { ${Object.entries(GluonChannelCachingOptions)
      .map(
        ([key, value]: [string, string | GluonChannelCachingOptions]) =>
          `${key}: ${(this.#_cache_options & Number(value)) === Number(value)}`,
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
