import hashjs from "hash.js";
import { GLUON_VERSION, NAME, TO_JSON_TYPES_ENUM } from "../constants.js";

class BaseCacheManager {
  #redisCache;
  #cache;
  constructor(client, { useRedis = false, identifier = "cache" } = {}) {
    if (client.redis && useRedis === true) this.#redisCache = client.redis;
    else this.#cache = new Map();

    this.expiryBucket = new Map();

    this.identifier = identifier;
  }

  /**
   * The key prefix for the cache.
   * @type {String}
   * @readonly
   */
  get #keyPrefix() {
    return `${NAME.toLowerCase()}.caches.${this.identifier}.v${GLUON_VERSION.split(".").slice(0, -1).join("_")}.`;
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
    return `${this.#keyPrefix}${this.#getHash(key)}`;
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
    else {
      this.addToExpiryBucket(key, expiry);
      return this.#cache.set(key, value);
    }
  }

  /**
   * Adds a key to the expiry bucket.
   * @param {String} key The key to add to the expiry bucket.
   * @param {Number} expiry The expiry time in seconds.
   * @returns {void}
   */
  addToExpiryBucket(key, expiry) {
    if (expiry === 0) return;
    const expiryDate = new Date(Date.now() + expiry * 1000);
    const bucket = `${expiryDate.getUTCDate()}_${expiryDate.getUTCHours()}_${expiryDate.getUTCMinutes()}`;
    if (!this.expiryBucket.has(bucket))
      this.expiryBucket.set(bucket, new Set());
    this.expiryBucket.get(bucket).add(key);
  }

  /**
   * Expires a bucket.
   * @param {String} bucket The bucket to expire.
   * @returns {void}
   */
  expireBucket(bucket) {
    if (!this.expiryBucket.has(bucket)) return;
    for (const key of this.expiryBucket.get(bucket)) {
      this.delete(key);
    }
    this.expiryBucket.delete(bucket);
  }

  /**
   * Clears stale buckets.
   * @returns {void}
   */
  clearStaleBuckets() {
    const now = new Date();
    const buckets = [...this.expiryBucket.keys()];
    for (const bucket of buckets) {
      const [date, hour, minute] = bucket.split("_").map(Number);
      if (now.getUTCDate() > date) {
        this.expireBucket(bucket);
        continue;
      } else if (now.getUTCDate() === date && now.getUTCHours() > hour) {
        this.expireBucket(bucket);
        continue;
      } else if (
        now.getUTCDate() === date &&
        now.getUTCHours() === hour &&
        now.getUTCMinutes() > minute
      ) {
        this.expireBucket(bucket);
        continue;
      }
    }
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
   * @returns {void}
   */
  clear() {
    return this.#cache.clear();
  }

  /**
   * The callback for expiring buckets.
   * @returns {void}
   */
  _intervalCallback() {
    const now = new Date();
    const bucket = `${now.getUTCDate()}_${now.getUTCHours()}_${now.getUTCMinutes()}`;
    this.expireBucket(bucket);
    if (now.getUTCMinutes() === 0) this.clearStaleBuckets();
    return {
      i: this.identifier,
    };
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
   * Calls a function on each item in the cache.
   * @param {Function} callback Callback function to run on each item in the cache.
   */
  forEach(callback) {
    return this.#cache.forEach(callback);
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
