const { Guild } = require("../structures");

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
    this.#_client = client;

    this.#cache = new Map();
  }

  /**
   * Retrieves a guild from the cache.
   * @param {String} id The ID of the guild to fetch.
   * @returns {Guild?} The fetched guild.
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
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return this.#cache.delete(id);
  }

  toJSON() {
    return [...this.#cache.values()];
  }
}

module.exports = GuildManager;
