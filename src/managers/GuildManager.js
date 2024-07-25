import Guild from "../structures/Guild.js";

/**
 * Manages all guilds belonging to this client.
 */
class GuildManager {
  #_client;
  #cache;
  /**
   * Creates a guild manager.
   * @param {Client} client The client instance.
   */
  constructor(client) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The cache of guilds.
     * @type {Map<String, Guild>}
     * @private
     */
    this.#cache = new Map();
  }

  /**
   * Retrieves a guild from the cache.
   * @param {String} id The ID of the guild to fetch.
   * @returns {Guild?} The fetched guild.
   * @public
   * @method
   * @throws {TypeError}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Guild id must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Adds a guild to the cache.
   * @param {String} id The ID of the guild to cache
   * @param {Guild} guild The guild to cache.
   * @returns {Guild}
   * @public
   * @method
   * @throws {TypeError}
   */
  set(id, guild) {
    if (!(guild instanceof Guild))
      throw new TypeError("GLUON: Guild must be an instance of Guild.");
    if (typeof id !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return this.#cache.set(id, guild);
  }

  /**
   * Deletes a guild from the cache.
   * @param {String} id The ID of the guild to delete.
   * @returns {Boolean}
   * @public
   * @method
   * @throws {TypeError}
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return this.#cache.delete(id);
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
   * @public
   * @method
   */
  toJSON() {
    return [...this.#cache.values()];
  }
}

export default GuildManager;
