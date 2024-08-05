import hashjs from "hash.js";
import { GLUON_VERSION, NAME, TO_JSON_TYPES_ENUM } from "../constants.js";

class BaseCacheManager {
  #redisCache;
  #cache;
  constructor(client, { useRedis = false } = {}) {
    if (client.redis && useRedis === true) this.#redisCache = client.redis;
    else this.#cache = new Map();
  }

  /**
   * The key prefix for the cache.
   * @type {String}
   * @readonly
   */
  get #keyPrefix() {
    return `${NAME.toLowerCase()}.caches.v${GLUON_VERSION.split(".").slice(0, -1).join("_")}.`;
  }

  /**
   * Creates a hash of the key.
   * @param {String} key The key to hash.
   * @returns {String} The hashed key.
   * @public
   * @method
   */
  #getHash(key) {
    return hashjs.sha256().update(key).digest("hex");
  }

  /**
   * Wraps the key with the key prefix and hashes it.
   * @param {String} key The key.
   * @returns {String}
   */
  #getKey(key) {
    return `${this.#keyPrefix}${key}`;
  }

  /**
   * Gets a value from the cache.
   * @param {String} key The key to get.
   */
  get(key) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    if (this.#redisCache) return this.#redisCache.get(this.#getKey(key));
    else return this.#cache.get(key);
  }

  /**
   * Sets a value in the cache.
   * @param {String} key The key to set.
   * @param {Object} value The value to set.
   * @param {Number} expiry The expiry time in seconds.
   */
  set(key, value, expiry = 0) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    if (typeof value !== "object")
      throw new TypeError("GLUON: Value must be an object.");
    if (value && typeof value.toJSON !== "function")
      throw new TypeError("GLUON: Value must have a toJSON method.");
    if (typeof expiry !== "number")
      throw new TypeError("GLUON: Expiry must be a number.");
    if (this.#redisCache)
      return this.#redisCache.set(
        this.#getKey(key),
        value.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
        "EX",
        expiry,
      );
    else return this.#cache.set(key, value);
  }

  /**
   * Deletes a key from the cache.
   * @param {String} key The key to delete.
   */
  delete(key) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    if (this.#redisCache) return this.#redisCache.del(this.#getKey(key));
    else return this.#cache.delete(key);
  }

  /**
   * Clears the cache.
   */
  clear() {
    return this.#cache.clear();
  }

  /**
   * Returns the size of the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get size() {
    return this.#cache.size;
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    if (this.#redisCache) return [];
    switch (format) {
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return [...this.#cache.values()];
      }
    }
  }
}

export default BaseCacheManager;
