import ClientType from "src/interfaces/Client.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildManager as GuildManagerType,
  Guild as GuildType,
  StructureIdentifiers,
} from "../../typings/index.d.js";
import { Snowflake } from "discord-api-types/globals";
/**
 * Manages all guilds belonging to this client.
 */
declare class GuildManager
  extends BaseCacheManager
  implements GuildManagerType
{
  #private;
  static identifier: StructureIdentifiers;
  /**
   * Creates a guild manager.
   * @param {Client} client The client instance.
   */
  constructor(client: ClientType);
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
  set(id: Snowflake, guild: GuildType): void;
  get(id: Snowflake): GuildType | null;
  fetchFromRules(key: string): Promise<GuildType | null>;
  fetchWithRules(key: string): Promise<GuildType | null>;
  /**
   * Returns the cache manager.
   * @param {Client} client The client instance.
   * @returns {GuildManager}
   */
  static getCacheManager(client: ClientType): any;
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
  static getGuild(client: ClientType, guildId: Snowflake): any;
}
export default GuildManager;
