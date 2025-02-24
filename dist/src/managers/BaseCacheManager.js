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
var _BaseCacheManager_instances,
  _a,
  _BaseCacheManager_cache,
  _BaseCacheManager_expiryBucket,
  _BaseCacheManager_structureType,
  _BaseCacheManager_keyPrefix_get,
  _BaseCacheManager_getHash,
  _BaseCacheManager_getKey,
  _BaseCacheManager_addToExpiryBucket,
  _BaseCacheManager_clearStaleBuckets,
  _BaseCacheManager__callRules,
  _BaseCacheManager__callFetches;
import hashjs from "hash.js";
import { GLUON_VERSION, NAME, TO_JSON_TYPES_ENUM } from "../constants.js";
import Client from "../Client.js";
/**
 * The base cache manager for all cache managers.
 */
class BaseCacheManager {
  /**
   * Creates a cache manager.
   * @param {Client} client The client instance.
   * @param {Object} options The options for the cache manager.
   * @param {Object} options.structureType The structure type for the cache manager.
   * @throws {TypeError}
   * @public
   * @constructor
   */
  constructor(client, { structureType } = {}) {
    _BaseCacheManager_instances.add(this);
    _BaseCacheManager_cache.set(this, void 0);
    _BaseCacheManager_expiryBucket.set(this, void 0);
    _BaseCacheManager_structureType.set(this, void 0);
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client.");
    if (!structureType)
      throw new TypeError("GLUON: Structure type must be provided.");
    /**
     * The cache for this manager.
     * @type {Map<String, Object>}
     * @private
     */
    __classPrivateFieldSet(this, _BaseCacheManager_cache, new Map(), "f");
    /**
     * The expiry bucket for this manager.
     * @type {Map<String, Set<String>>}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _BaseCacheManager_expiryBucket,
      new Map(),
      "f",
    );
    /**
     * The structure type for this manager.
     * @type {Object}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _BaseCacheManager_structureType,
      structureType,
      "f",
    );
  }
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
  get(key) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    const value = __classPrivateFieldGet(
      this,
      _BaseCacheManager_cache,
      "f",
    ).get(key);
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
  fetchFromRules(key) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    return __classPrivateFieldGet(
      this,
      _BaseCacheManager_instances,
      "m",
      _BaseCacheManager__callFetches,
    ).call(this, key);
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
  async fetchWithRules(key) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    const value = this.get(key);
    if (value) return value;
    else
      return __classPrivateFieldGet(
        this,
        _BaseCacheManager_instances,
        "m",
        _BaseCacheManager__callFetches,
      ).call(this, key);
  }
  /**
   * Sets a value in the cache.
   * @param {String} key The key to set.
   * @param {Object} value The value to set.
   * @param {Number} expiry The expiry time in seconds.
   * @returns {Object} The value that was set.
   * @public
   * @method
   * @throws {TypeError}
   */
  set(key, value, expiry = 0) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    if (typeof expiry !== "number")
      throw new TypeError("GLUON: Expiry must be a number.");
    __classPrivateFieldGet(
      this,
      _BaseCacheManager_instances,
      "m",
      _BaseCacheManager_addToExpiryBucket,
    ).call(this, key, expiry);
    return __classPrivateFieldGet(this, _BaseCacheManager_cache, "f").set(
      key,
      value,
    );
  }
  /**
   * Expires a bucket.
   * @param {String} bucket The bucket to expire.
   * @returns {void}
   * @public
   * @method
   */
  expireBucket(bucket) {
    if (
      !__classPrivateFieldGet(this, _BaseCacheManager_expiryBucket, "f").has(
        bucket,
      )
    )
      return;
    for (const key of __classPrivateFieldGet(
      this,
      _BaseCacheManager_expiryBucket,
      "f",
    ).get(bucket)) {
      try {
        const value = __classPrivateFieldGet(
          this,
          _BaseCacheManager_cache,
          "f",
        ).get(key);
        if (value)
          __classPrivateFieldGet(
            this,
            _BaseCacheManager_instances,
            "m",
            _BaseCacheManager__callRules,
          ).call(this, value);
      } catch (e) {
        console.error(e);
      }
      this.delete(key);
    }
    __classPrivateFieldGet(this, _BaseCacheManager_expiryBucket, "f").delete(
      bucket,
    );
  }
  /**
   * Deletes a key from the cache.
   * @param {String} key The key to delete.
   * @returns {Boolean} Whether the key was deleted or not.
   * @public
   * @method
   */
  delete(key) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    return __classPrivateFieldGet(this, _BaseCacheManager_cache, "f").delete(
      key,
    );
  }
  /**
   * Clears the cache.
   * @returns {void}
   * @public
   * @method
   */
  clear() {
    return __classPrivateFieldGet(this, _BaseCacheManager_cache, "f").clear();
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
    if (now.getUTCMinutes() === 0)
      __classPrivateFieldGet(
        this,
        _BaseCacheManager_instances,
        "m",
        _BaseCacheManager_clearStaleBuckets,
      ).call(this);
    return {
      i: __classPrivateFieldGet(this, _BaseCacheManager_structureType, "f")
        .identifier,
    };
  }
  /**
   * Returns the size of the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get size() {
    return __classPrivateFieldGet(this, _BaseCacheManager_cache, "f").size;
  }
  /**
   * Calls a function on each item in the cache.
   * @param {Function} callback Callback function to run on each item in the cache.
   * @returns {void}
   * @public
   * @method
   */
  forEach(callback) {
    return __classPrivateFieldGet(this, _BaseCacheManager_cache, "f").forEach(
      callback,
    );
  }
  /**
   * Checks if a key exists in the cache.
   * @param {String} key The key to check.
   * @returns {Boolean} Whether the key exists or not.
   * @public
   * @method
   * @throws {TypeError}
   */
  has(key) {
    if (typeof key !== "string")
      throw new TypeError("GLUON: Key must be a string.");
    return __classPrivateFieldGet(this, _BaseCacheManager_cache, "f").has(key);
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
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return [
          ...__classPrivateFieldGet(
            this,
            _BaseCacheManager_cache,
            "f",
          ).values(),
        ].map((value) => value.toJSON(format));
      }
    }
  }
}
(_a = BaseCacheManager),
  (_BaseCacheManager_cache = new WeakMap()),
  (_BaseCacheManager_expiryBucket = new WeakMap()),
  (_BaseCacheManager_structureType = new WeakMap()),
  (_BaseCacheManager_instances = new WeakSet()),
  (_BaseCacheManager_keyPrefix_get =
    function _BaseCacheManager_keyPrefix_get() {
      return `${NAME.toLowerCase()}.caches.${__classPrivateFieldGet(this, _BaseCacheManager_structureType, "f").identifier}.v${GLUON_VERSION.split(".").slice(0, -1).join("_")}.`;
    }),
  (_BaseCacheManager_getHash = function _BaseCacheManager_getHash(key) {
    return hashjs.sha256().update(key).digest("hex");
  }),
  (_BaseCacheManager_getKey = function _BaseCacheManager_getKey(key) {
    return `${__classPrivateFieldGet(this, _BaseCacheManager_instances, "a", _BaseCacheManager_keyPrefix_get)}${__classPrivateFieldGet(this, _BaseCacheManager_instances, "m", _BaseCacheManager_getHash).call(this, key)}`;
  }),
  (_BaseCacheManager_addToExpiryBucket =
    function _BaseCacheManager_addToExpiryBucket(key, expiry) {
      if (expiry === 0) return;
      const expiryDate = new Date(Date.now() + expiry * 1000);
      const bucket = `${expiryDate.getUTCDate()}_${expiryDate.getUTCHours()}_${expiryDate.getUTCMinutes()}`;
      if (
        !__classPrivateFieldGet(this, _BaseCacheManager_expiryBucket, "f").has(
          bucket,
        )
      )
        __classPrivateFieldGet(this, _BaseCacheManager_expiryBucket, "f").set(
          bucket,
          new Set(),
        );
      __classPrivateFieldGet(this, _BaseCacheManager_expiryBucket, "f")
        .get(bucket)
        .add(key);
    }),
  (_BaseCacheManager_clearStaleBuckets =
    function _BaseCacheManager_clearStaleBuckets() {
      const now = new Date();
      const buckets = [
        ...__classPrivateFieldGet(
          this,
          _BaseCacheManager_expiryBucket,
          "f",
        ).keys(),
      ];
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
    }),
  (_BaseCacheManager__callRules = function _BaseCacheManager__callRules(value) {
    const rules = Object.values(_a.rules);
    for (const rule of rules)
      if (
        rule.structure ===
        __classPrivateFieldGet(this, _BaseCacheManager_structureType, "f")
      )
        rule.store(value);
  }),
  (_BaseCacheManager__callFetches =
    /**
     * Calls all the custom fetches.
     * @param {String} id The ID to fetch.
     * @returns {Object}
     * @public
     * @method
     * @async
     */
    async function _BaseCacheManager__callFetches(id) {
      const rules = Object.values(_a.rules);
      let fetchValue;
      for (const rule of rules) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (
          rule.structure ===
          __classPrivateFieldGet(this, _BaseCacheManager_structureType, "f")
        )
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          fetchValue = await rule.retrieve(id, this);
        if (fetchValue) return fetchValue;
      }
      return null;
    });
BaseCacheManager.rules = {};
export default BaseCacheManager;
//# sourceMappingURL=BaseCacheManager.js.map
