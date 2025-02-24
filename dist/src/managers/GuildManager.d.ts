import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all guilds belonging to this client.
 */
declare class GuildManager extends BaseCacheManager {
  #private;
  static identifier: string;
  /**
   * Creates a guild manager.
   * @param {Client} client The client instance.
   */
  constructor(client: any);
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
  set(id: any, guild: any): Map<any, any>;
  /**
   * Returns the cache manager.
   * @param {Client} client The client instance.
   * @returns {GuildManager}
   */
  static getCacheManager(client: any): GuildManager;
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
  static getGuild(client: any, guildId: any): any;
}
export default GuildManager;
