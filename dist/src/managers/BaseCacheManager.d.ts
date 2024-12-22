export default BaseCacheManager;
/**
 * The base cache manager for all cache managers.
 */
declare class BaseCacheManager {
    static rules: {};
    /**
     * Creates a cache manager.
     * @param {Client} client The client instance.
     * @param {Object} options The options for the cache manager.
     * @param {Object} options.structureType The structure type for the cache manager.
     * @throws {TypeError}
     * @public
     * @constructor
     */
    constructor(client: Client, { structureType }?: {
        structureType: any;
    });
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
    public get(key: string): any | null;
    /**
     * Fetches a value from the rules cache.
     * @param {String} key The key to fetch.
     * @returns {Object?} The fetched value.
     * @public
     * @method
     * @throws {TypeError}
     * @async
     */
    public fetchFromRules(key: string): any | null;
    /**
     * Fetches a value from the cache or from the rules cache.
     * @param {String} key The key to fetch.
     * @returns {Object?} The fetched value.
     * @public
     * @method
     * @async
     * @throws {TypeError}
     */
    public fetchWithRules(key: string): any | null;
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
    public set(key: string, value: any, expiry?: number): any;
    /**
     * Expires a bucket.
     * @param {String} bucket The bucket to expire.
     * @returns {void}
     * @public
     * @method
     */
    public expireBucket(bucket: string): void;
    /**
     * Deletes a key from the cache.
     * @param {String} key The key to delete.
     * @returns {Boolean} Whether the key was deleted or not.
     * @public
     * @method
     */
    public delete(key: string): boolean;
    /**
     * Clears the cache.
     * @returns {void}
     * @public
     * @method
     */
    public clear(): void;
    /**
     * The callback for expiring buckets.
     * @returns {void}
     * @public
     * @method
     */
    public _intervalCallback(): void;
    /**
     * Returns the size of the cache.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get size(): number;
    /**
     * Calls a function on each item in the cache.
     * @param {Function} callback Callback function to run on each item in the cache.
     * @returns {void}
     * @public
     * @method
     */
    public forEach(callback: Function): void;
    /**
     * Checks if a key exists in the cache.
     * @param {String} key The key to check.
     * @returns {Boolean} Whether the key exists or not.
     * @public
     * @method
     * @throws {TypeError}
     */
    public has(key: string): boolean;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} [format] The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format?: number): any;
    #private;
}
import Client from "../Client.js";
//# sourceMappingURL=BaseCacheManager.d.ts.map