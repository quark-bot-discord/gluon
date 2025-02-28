import ClientType from "src/interfaces/Client.js";
import Guild from "../structures/Guild.js";
import BaseCacheManager from "./BaseCacheManager.js";
import { GuildManagerType } from "./interfaces/GuildManager.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { GuildType } from "src/structures/interfaces/Guild.js";

/**
 * Manages all guilds belonging to this client.
 */
class GuildManager extends BaseCacheManager implements GuildManagerType {
  #_client;
  static identifier = "guilds";
  /**
   * Creates a guild manager.
   * @param {Client} client The client instance.
   */
  constructor(client: ClientType) {
    super(client, { structureType: GuildManager });

    if (!client)
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
  set(id: Snowflake, guild: GuildType) {
    if (!(guild instanceof Guild))
      throw new TypeError("GLUON: Guild must be an instance of Guild.");
    return super.set(id, guild);
  }

  get(id: Snowflake) {
    return super.get(id) as GuildType | null;
  }

  /**
   * Returns the cache manager.
   * @param {Client} client The client instance.
   * @returns {GuildManager}
   */
  static getCacheManager(client: ClientType) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    return client.guilds;
  }

  /**
   * Gets a guild from the cache.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild to get.
   * @returns {Guild?}
   * @public
   * @method
   * @throws {TypeError}
   * @static
   */
  static getGuild(client: ClientType, guildId: Snowflake) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return client.guilds.get(guildId);
  }
}

export default GuildManager;
