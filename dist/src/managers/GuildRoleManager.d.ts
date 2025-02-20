export default GuildRoleManager;
/**
 * Manages all roles belonging to a guild.
 */
declare class GuildRoleManager extends BaseCacheManager {
    static identifier: string;
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
    public static getRole(client: Client, guildId: string, roleId: string): Role | null;
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
    public static getCacheManager(client: Client, guildId: string): GuildRoleManager;
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
    public static fetchRole(client: any, guildId: string, roleId: string | null): Promise<Role | Array<Role>>;
    /**
     * Creates a role manager.
     * @param {Client} client The client instance.
     * @param {Guild} guild The guild that this role manager belongs to.
     */
    constructor(client: Client, guild: Guild);
    /**
     * Fetches a role that belongs to this guild.
     * @param {String} roleId The id of the role to fetch.
     * @returns {Promise<Role>} The fetched role.
     * @async
     * @public
     * @method
     * @throws {TypeError | Error}
     */
    public fetch(roleId: string): Promise<Role>;
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
    public override set(id: string, role: Role): Role;
    #private;
}
import BaseCacheManager from "./BaseCacheManager.js";
import Role from "../structures/Role.js";
import Client from "../Client.js";
//# sourceMappingURL=GuildRoleManager.d.ts.map