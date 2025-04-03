// import hashjs from "hash.js";
// import { GLUON_VERSION, NAME } from "../constants.js";
import type {
  BaseCacheManager as BaseCacheManagerType,
  StaticManagerType,
  Client as ClientType,
  BaseStructure,
} from "../../typings/index.d.ts";
import { JsonTypes } from "../../typings/enums.js";
import {
  aerospikeCount,
  aerospikeDelete,
  aerospikeForEach,
  aerospikeGet,
  aerospikeSet,
} from "#src/util/data/aerospikeStore.js";
import { Snowflake } from "#typings/discord.js";
import { PartialAerospikeBinValue } from "aerospike";

/**
 * The base cache manager for all cache managers.
 */
class BaseCacheManager<
  T extends BaseStructure<V>,
  V extends PartialAerospikeBinValue,
> implements BaseCacheManagerType<T, V>
{
  #structureType: StaticManagerType<T>;
  #parentId: Snowflake;

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
    guildId: Snowflake,
    {
      structureType,
    }: {
      structureType: StaticManagerType<T>;
    },
  ) {
    /**
     * The structure type for this manager.
     * @type {Object}
     * @private
     */
    this.#structureType = structureType;

    this.#parentId = guildId;
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
  async get(key: string) {
    const value = await aerospikeGet<T>(this.#structureType.identifier, key);
    if (value) return value;
    else return null;
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
  set(key: string, value: T, expiry = 0) {
    aerospikeSet<V>(
      this.#parentId,
      this.#structureType.identifier,
      key,
      value.toJSON(JsonTypes.CACHE_FORMAT),
      expiry,
    )
      .then(() => null)
      .catch((err) => {
        throw new Error(`GLUON: Failed to set value in cache: ${err}`);
      });
  }

  /**
   * Deletes a key from the cache.
   * @param {String} key The key to delete.
   * @returns {Boolean} Whether the key was deleted or not.
   * @public
   * @method
   */
  delete(key: string) {
    aerospikeDelete(this.#structureType.identifier, key)
      .then(() => null)
      .catch((err) => {
        throw new Error(`GLUON: Failed to delete value from cache: ${err}`);
      });
  }

  async flagForDeletion(key: string) {
    const value = await this.get(key);
    if (!value) return null;
    this.set(key, value, 60);
    return value;
  }

  /**
   * Returns the size of the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get size() {
    return aerospikeCount(this.#parentId, this.#structureType.identifier);
  }

  /**
   * Calls a function on each item in the cache.
   * @param {Function} callback Callback function to run on each item in the cache.
   * @returns {void}
   * @public
   * @method
   */
  async forEach(callbackfn: (value: V, key: string) => void) {
    return aerospikeForEach<V>(
      this.#parentId,
      this.#structureType.identifier,
      callbackfn,
    );
  }

  // /**
  //  * Returns the JSON representation of this structure.
  //  * @param {Number} [format] The format to return the data in.
  //  * @returns {Object}
  //  * @public
  //  * @method
  //  */
  // toJSON(format?: JsonTypes) {
  //   switch (format) {
  //     case JsonTypes.STORAGE_FORMAT:
  //     case JsonTypes.CACHE_FORMAT:
  //     case JsonTypes.DISCORD_FORMAT:
  //     default: {
  //       return [...this.#cache.values()].map((value) =>
  //         (value as T).toJSON(format),
  //       );
  //     }
  //   }
  // }
}

export default BaseCacheManager;
