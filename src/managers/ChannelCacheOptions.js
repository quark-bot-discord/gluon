const { GLUON_CHANNEL_CACHING_OPTIONS } = require("../constants");

class ChannelCacheOptions {
  #_cache_options;

  constructor(cache_options) {
    this.#_cache_options = cache_options ?? 0;
  }

  /**
   * Sets whether to cache messages or not.
   * @param {Boolean} option Whether to cache messages or not.
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
   */
  get messageCaching() {
    return (
      (this.#_cache_options & GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES) ===
      GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES
    );
  }

  toString() {
    return `ChannelCacheOptions { fileCaching: ${this.fileCaching}, messageCaching: ${this.messageCaching} }`;
  }

  toJSON() {
    return this.#_cache_options;
  }
}

module.exports = ChannelCacheOptions;
