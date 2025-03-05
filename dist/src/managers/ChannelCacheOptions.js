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
var _ChannelCacheOptions__cache_options;
import { GLUON_CHANNEL_CACHING_OPTIONS } from "../constants.js";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents the cache options for a channel.
 * All options are enabled by default.
 */
class ChannelCacheOptions {
  /**
   * Creates the cache options for a channel.
   * @param {Number} cache_options The preset cache options for this channel.
   * @public
   * @constructor
   */
  constructor(cache_options) {
    _ChannelCacheOptions__cache_options.set(this, void 0);
    /**
     * The cache options for this channel.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _ChannelCacheOptions__cache_options,
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
          GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK,
      "f",
    );
  }
  /**
   * Sets whether to cache messages or not.
   * @param {Boolean} option Whether to cache messages or not.
   * @public
   * @throws {TypeError}
   * @method
   */
  setMessageCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES,
        "f",
      );
  }
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setFileCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.FILES,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.FILES,
        "f",
      );
  }
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setContentCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.CONTENT,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.CONTENT,
        "f",
      );
  }
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setPollCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.POLL,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.POLL,
        "f",
      );
  }
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setReactionCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.REACTIONS,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.REACTIONS,
        "f",
      );
  }
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setEmbedCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS,
        "f",
      );
  }
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setAttributeCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES,
        "f",
      );
  }
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setReferenceCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.REFERENCE,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.REFERENCE,
        "f",
      );
  }
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setStickerCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.STICKER,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.STICKER,
        "f",
      );
  }
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setWebhookCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");
    if (option === true)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") |
          GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK,
        "f",
      );
  }
  /**
   * Disables all caching options.
   * @public
   * @method
   * @returns {void}
   */
  setDisableAll() {
    __classPrivateFieldSet(
      this,
      _ChannelCacheOptions__cache_options,
      __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES,
      "f",
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.FILES) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.CONTENT) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.POLL) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.REACTIONS) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.REFERENCE) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.STICKER) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK) ===
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
        ([key, value]) =>
          `${key}: ${(__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") & value) === value}`,
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
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      default: {
        return __classPrivateFieldGet(
          this,
          _ChannelCacheOptions__cache_options,
          "f",
        );
      }
    }
  }
}
_ChannelCacheOptions__cache_options = new WeakMap();
export default ChannelCacheOptions;
//# sourceMappingURL=ChannelCacheOptions.js.map
