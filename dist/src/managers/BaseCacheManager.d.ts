import {
  BaseCacheManager as BaseCacheManagerType,
  GluonCacheRuleSetStructure,
  JsonTypes,
  StaticManagerType,
  Client as ClientType,
} from "../../typings/index.d.js";
/**
 * The base cache manager for all cache managers.
 */
declare class BaseCacheManager implements BaseCacheManagerType {
  #private;
  static rules: GluonCacheRuleSetStructure;
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
  );
  /**
   * The key prefix for the cache.
   * @type {String}
   * @readonly
   * @private
   */
  /**
   * Creates a hash of the key.
   * @param {String} key The key to hash.
   * @returns {String} The hashed key.
   * @private
   * @method
   */
  /**
   * Wraps the key with the key prefix and hashes it.
   * @param {String} key The key.
   * @returns {String}
   * @private
   * @method
   */
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
  get(key: string): {} | null;
  /**
   * Fetches a value from the rules cache.
   * @param {String} key The key to fetch.
   * @returns {Object?} The fetched value.
   * @public
   * @method
   * @throws {TypeError}
   * @async
   */
  fetchFromRules(key: string): Promise<{} | null>;
  /**
   * Fetches a value from the cache or from the rules cache.
   * @param {String} key The key to fetch.
   * @returns {Object?} The fetched value.
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  fetchWithRules(key: string): Promise<{} | null>;
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
  set(key: string, value: unknown, expiry?: number): void;
  /**
   * Expires a bucket.
   * @param {String} bucket The bucket to expire.
   * @returns {void}
   * @public
   * @method
   */
  expireBucket(bucket: string): void;
  /**
   * Deletes a key from the cache.
   * @param {String} key The key to delete.
   * @returns {Boolean} Whether the key was deleted or not.
   * @public
   * @method
   */
  delete(key: string): boolean;
  /**
   * Clears the cache.
   * @returns {void}
   * @public
   * @method
   */
  clear(): void;
  /**
   * The callback for expiring buckets.
   * @returns {void}
   * @public
   * @method
   */
  _intervalCallback(): {
    i: import("../../typings/index.d.js").StructureIdentifiers;
  };
  /**
   * Returns the size of the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get size(): number;
  /**
   * Calls a function on each item in the cache.
   * @param {Function} callback Callback function to run on each item in the cache.
   * @returns {void}
   * @public
   * @method
   */
  forEach(callbackfn: unknown): void;
  /**
   * Checks if a key exists in the cache.
   * @param {String} key The key to check.
   * @returns {Boolean} Whether the key exists or not.
   * @public
   * @method
   * @throws {TypeError}
   */
  has(key: string): boolean;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format?: JsonTypes): any[];
}
export default BaseCacheManager;
