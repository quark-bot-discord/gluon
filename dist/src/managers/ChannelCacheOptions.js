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
import { GluonChannelCachingOptions, JsonTypes } from "../../typings/enums.js";
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
        GluonChannelCachingOptions.Messages |
          GluonChannelCachingOptions.Files |
          GluonChannelCachingOptions.Content |
          GluonChannelCachingOptions.Poll |
          GluonChannelCachingOptions.Reactions |
          GluonChannelCachingOptions.Embeds |
          GluonChannelCachingOptions.Attributes |
          GluonChannelCachingOptions.Reference |
          GluonChannelCachingOptions.Sticker |
          GluonChannelCachingOptions.Webhook,
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
          GluonChannelCachingOptions.Messages,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Messages,
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
          GluonChannelCachingOptions.Files,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Files,
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
          GluonChannelCachingOptions.Content,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Content,
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
          GluonChannelCachingOptions.Poll,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Poll,
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
          GluonChannelCachingOptions.Reactions,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Reactions,
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
          GluonChannelCachingOptions.Embeds,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Embeds,
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
          GluonChannelCachingOptions.Attributes,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Attributes,
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
          GluonChannelCachingOptions.Reference,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Reference,
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
          GluonChannelCachingOptions.Sticker,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Sticker,
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
          GluonChannelCachingOptions.Webhook,
        "f",
      );
    else if (option === false)
      __classPrivateFieldSet(
        this,
        _ChannelCacheOptions__cache_options,
        __classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
          ~GluonChannelCachingOptions.Webhook,
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
        GluonChannelCachingOptions.Messages,
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
        GluonChannelCachingOptions.Messages) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GluonChannelCachingOptions.Files) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GluonChannelCachingOptions.Content) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GluonChannelCachingOptions.Poll) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GluonChannelCachingOptions.Reactions) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GluonChannelCachingOptions.Embeds) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GluonChannelCachingOptions.Attributes) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GluonChannelCachingOptions.Reference) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GluonChannelCachingOptions.Sticker) ===
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
      (__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") &
        GluonChannelCachingOptions.Webhook) ===
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
        ([key, value]) =>
          `${value}: ${(__classPrivateFieldGet(this, _ChannelCacheOptions__cache_options, "f") & Number(key)) === Number(key)}`,
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
