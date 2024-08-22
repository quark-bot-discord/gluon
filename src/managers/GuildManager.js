import Client from "../Client.js";
import Guild from "../structures/Guild.js";
import BaseCacheManager from "./BaseCacheManager.js";

/**
 * Manages all guilds belonging to this client.
 */
class GuildManager extends BaseCacheManager {
  #_client;
  static identifier = "guilds";
  /**
   * Creates a guild manager.
   * @param {Client} client The client instance.
   */
  constructor(client) {
    super(client, { structureType: GuildManager });

    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");

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

  /**
   * Returns the cache manager.
   * @param {Client} client The client instance.
   * @returns {GuildManager}
   */
  static getCacheManager(client) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    return client.guilds;
  }

  static getGuild(client, guildId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return client.guilds.get(guildId);
  }
}

export default GuildManager;
