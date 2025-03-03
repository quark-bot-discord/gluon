import Guild from "../structures/Guild.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildManager as GuildManagerType,
  Guild as GuildType,
  StructureIdentifiers,
  Client as ClientType,
} from "../../typings/index.d.js";
import { Snowflake } from "discord-api-types/globals";

/**
 * Manages all guilds belonging to this client.
 */
class GuildManager extends BaseCacheManager implements GuildManagerType {
  // eslint-disable-next-line no-unused-private-class-members
  #_client; // keep just for standardization
  static identifier = "guilds" as StructureIdentifiers;
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

  fetchFromRules(key: string): Promise<GuildType | null> {
    return super.fetchFromRules(key) as Promise<GuildType | null>;
  }

  fetchWithRules(key: string): Promise<GuildType | null> {
    return super.fetchWithRules(key) as Promise<GuildType | null>;
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
