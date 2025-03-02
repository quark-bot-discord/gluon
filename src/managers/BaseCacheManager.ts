// import hashjs from "hash.js";
// import { GLUON_VERSION, NAME } from "../constants.js";
import ClientType from "src/interfaces/Client.js";
import {
  BaseCacheManager as BaseCacheManagerType,
  JsonTypes,
  StaticManagerType,
} from "../../typings/index.d.js";

/**
 * The base cache manager for all cache managers.
 */
class BaseCacheManager implements BaseCacheManagerType {
  #cache;
  #expiryBucket;
  #structureType;
  static rules = {};

  /**
   * Creates a cache manager.
   * @param {Client} client The client instance.
   * @param {Object} options The options for the cache manager.
   * @param {Object} options.structureType The structure type for the cache manager.
   * @throws {TypeError}
   * @public
   * @constructor
   */
  constructor(
    client: ClientType,
    {
      structureType,
    }: {
      structureType: StaticManagerType;
    },
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!structureType)
      throw new TypeError("GLUON: Structure type must be provided.");

    /**
     * The cache for this manager.
     * @type {Map<String, Object>}
     * @private
     */
    this.#cache = new Map() as Map<string, unknown>;

    /**
     * The expiry bucket for this manager.
     * @type {Map<String, Set<String>>}
     * @private
     */
    this.#expiryBucket = new Map();

    /**
     * The structure type for this manager.
     * @type {Object}
     * @private
     */
    this.#structureType = structureType;
  }

  /**
   * The key prefix for the cache.
   * @type {String}
   * @readonly
   * @private
   */
  // get #keyPrefix() {
  //   return `${NAME.toLowerCase()}.caches.${this.#structureType.identifier}.v${GLUON_VERSION.split(".").slice(0, -1).join("_")}.`;
  // }

  /**
   * Creates a hash of the key.
   * @param {String} key The key to hash.
   * @returns {String} The hashed key.
   * @private
   * @method
   */
  // #getHash(key: string) {
  //   return hashjs.sha256().update(key).digest("hex");
  // }

  /**
   * Wraps the key with the key prefix and hashes it.
   * @param {String} key The key.
   * @returns {String}
   * @private
   * @method
   */
  // #getKey(key: string) {
  //   return `${this.#keyPrefix}${this.#getHash(key)}`;
  // }

  /**
   * Gets a value from the cache.
   * @param {String} key The key to get.
   * @param {Object} options The options for the get method.
   * @param {Boolean} options.useRules Whether to use rules or not.
   * @returns {Object?} The value from the cache.
   * @public
   * @method
   * @throws {TypeError}
   */
  get(key: string) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    const value = this.#cache.get(key);
    if (value) return value;
    else return null;
  }

  /**
   * Fetches a value from the rules cache.
   * @param {String} key The key to fetch.
   * @returns {Object?} The fetched value.
   * @public
   * @method
   * @throws {TypeError}
   * @async
   */
  fetchFromRules(key: string) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    return this.#_callFetches(key);
  }

  /**
   * Fetches a value from the cache or from the rules cache.
   * @param {String} key The key to fetch.
   * @returns {Object?} The fetched value.
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  async fetchWithRules(key: string) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    const value = this.get(key);
    if (value) return value;
    else return this.#_callFetches(key);
  }

  /**
   * Sets a value in the cache.
   * @param {String} key The key to set.
   * @param {Object} value The value to set.
   * @param {Number} expiry The expiry time in seconds.
   * @returns {void} The value that was set.
   * @public
   * @method
   * @throws {TypeError}
   */
  set(key: string, value: unknown, expiry = 0) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    if (typeof expiry !== "number")
      throw new TypeError("GLUON: Expiry must be a number.");
    this.#addToExpiryBucket(key, expiry);
    this.#cache.set(key, value);
  }

  /**
   * Adds a key to the expiry bucket.
   * @param {String} key The key to add to the expiry bucket.
   * @param {Number} expiry The expiry time in seconds.
   * @returns {void}
   * @public
   * @method
   */
  #addToExpiryBucket(key: string, expiry: number) {
    if (expiry === 0) return;
    const expiryDate = new Date(Date.now() + expiry * 1000);
    const bucket = `${expiryDate.getUTCDate()}_${expiryDate.getUTCHours()}_${expiryDate.getUTCMinutes()}`;
    if (!this.#expiryBucket.has(bucket))
      this.#expiryBucket.set(bucket, new Set());
    this.#expiryBucket.get(bucket).add(key);
  }

  /**
   * Expires a bucket.
   * @param {String} bucket The bucket to expire.
   * @returns {void}
   * @public
   * @method
   */
  expireBucket(bucket: string) {
    if (!this.#expiryBucket.has(bucket)) return;
    for (const key of this.#expiryBucket.get(bucket)) {
      try {
        const value = this.#cache.get(key);
        if (value) this.#_callRules(value);
      } catch (e) {
        console.error(e);
      }
      this.delete(key);
    }
    this.#expiryBucket.delete(bucket);
  }

  /**
   * Clears stale buckets.
   * @returns {void}
   * @public
   * @method
   */
  #clearStaleBuckets() {
    const now = new Date();
    const buckets = [...this.#expiryBucket.keys()];
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
   * @returns {Boolean} Whether the key was deleted or not.
   * @public
   * @method
   */
  delete(key: string) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    return this.#cache.delete(key);
  }

  /**
   * Clears the cache.
   * @returns {void}
   * @public
   * @method
   */
  clear() {
    return this.#cache.clear();
  }

  /**
   * The callback for expiring buckets.
   * @returns {void}
   * @public
   * @method
   */
  _intervalCallback() {
    const now = new Date();
    const bucket = `${now.getUTCDate()}_${now.getUTCHours()}_${now.getUTCMinutes()}`;
    this.expireBucket(bucket);
    if (now.getUTCMinutes() === 0) this.#clearStaleBuckets();
    return {
      i: this.#structureType.identifier,
    };
  }

  /**
   * Calls the rules on a value.
   * @param {Object} value The value to call the rules on.
   * @returns {void}
   * @public
   * @method
   */
  #_callRules(value: unknown) {
    const rules = Object.values(BaseCacheManager.rules);
    for (const rule of rules)
      if ((rule as any).structure === this.#structureType)
        (rule as any).store(value);
  }

  /**
   * Calls all the custom fetches.
   * @param {String} id The ID to fetch.
   * @returns {Object}
   * @public
   * @method
   * @async
   */
  async #_callFetches(id: string) {
    const rules = Object.values(BaseCacheManager.rules);
    let fetchValue;
    for (const rule of rules) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (rule.structure === this.#structureType)
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        fetchValue = await rule.retrieve(id, this);
      if (fetchValue) return fetchValue;
    }
    return null;
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
   * @returns {void}
   * @public
   * @method
   */
  forEach(callbackfn) {
    return this.#cache.forEach(callbackfn);
  }

  /**
   * Checks if a key exists in the cache.
   * @param {String} key The key to check.
   * @returns {Boolean} Whether the key exists or not.
   * @public
   * @method
   * @throws {TypeError}
   */
  has(key: string) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    return this.#cache.has(key);
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format?: JsonTypes) {
    switch (format) {
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return [...this.#cache.values()].map((value) => value.toJSON(format));
      }
    }
  }
}

export default BaseCacheManager;
