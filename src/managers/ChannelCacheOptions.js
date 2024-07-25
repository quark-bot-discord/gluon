import { GLUON_CHANNEL_CACHING_OPTIONS } from "../constants.js";

class ChannelCacheOptions {
  #_cache_options;

  constructor(cache_options) {
    /**
     * The cache options for this channel.
     * @type {Number}
     * @private
     */
    this.#_cache_options = cache_options ?? 0;
  }

  /**
   * Sets whether to cache messages or not.
   * @param {Boolean} option Whether to cache messages or not.
   * @public
   * @throws {TypeError}
   */
  set messageCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES;
  }

  /**
   * Sets whether to cache files or not.
   * @param {Boolean} option Whether to cache files or not.
   * @public
   * @throws {TypeError}
   */
  set fileCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this.#_cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.FILES;
    else if (option === false)
      this.#_cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.FILES;
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
  get messageCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES) ===
      GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES
    );
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `ChannelCacheOptions { fileCaching: ${this.fileCaching}, messageCaching: ${this.messageCaching} }`;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return this.#_cache_options;
  }
}

export default ChannelCacheOptions;
