import Guild from "../structures/Guild.js";
import BaseCacheManager from "./BaseCacheManager.js";

/**
 * Manages all guilds belonging to this client.
 */
class GuildManager extends BaseCacheManager {
  #_client;
  /**
   * Creates a guild manager.
   * @param {Client} client The client instance.
   */
  constructor(client) {
    super(client);
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;
  }

  /**
   * Adds a guild to the cache.
   * @param {String} id The ID of the guild to cache
   * @param {Guild} guild The guild to cache.
   * @returns {Guild}
   * @public
   * @method
   * @throws {TypeError}
   * @override
   */
  set(id, guild) {
    if (!(guild instanceof Guild))
      throw new TypeError("GLUON: Guild must be an instance of Guild.");
    return super.set(id, guild);
  }
}

export default GuildManager;
