import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all roles belonging to a guild.
 */
declare class GuildRoleManager extends BaseCacheManager {
  #private;
  static identifier: string;
  /**
   * Creates a role manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this role manager belongs to.
   */
  constructor(client: any, guild: any);
  /**
   * Fetches a role that belongs to this guild.
   * @param {String} roleId The id of the role to fetch.
   * @returns {Promise<Role>} The fetched role.
   * @async
   * @public
   * @method
   * @throws {TypeError | Error}
   */
  fetch(roleId: any): Promise<any>;
  /**
   * Adds a role to the cache.
   * @param {String} id The ID of the role to cache
   * @param {Role} role The role to cache.
   * @returns {Role}
   * @public
   * @method
   * @throws {TypeError}
   * @override
   */
  set(id: any, role: any): Map<any, any>;
  /**
   * Returns a role from the cache.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @param {String} roleId The ID of the role.
   * @returns {Role?}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static getRole(client: any, guildId: any, roleId: any): any;
  /**
   * Returns the cache manager.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @returns {GuildRoleManager}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static getCacheManager(client: any, guildId: any): any;
  /**
   * Fetches a role, checking the cache first.
   * @param {String} guildId The id of the guild the role belongs to.
   * @param {String?} roleId The id of the role to fetch, or null to return all roles.
   * @returns {Promise<Role | Array<Role>>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   * @static
   */
  static fetchRole(client: any, guildId: any, roleId: any): Promise<any>;
}
export default GuildRoleManager;
