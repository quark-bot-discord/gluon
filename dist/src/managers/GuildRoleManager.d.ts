import ClientType from "src/interfaces/Client.js";
import Role from "../structures/Role.js";
import BaseCacheManager from "./BaseCacheManager.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  GuildRoleManager as GuildRoleManagerType,
  Guild as GuildType,
  Role as RoleType,
  StructureIdentifiers,
} from "../../typings/index.d.js";
/**
 * Manages all roles belonging to a guild.
 */
declare class GuildRoleManager
  extends BaseCacheManager
  implements GuildRoleManagerType
{
  #private;
  static identifier: StructureIdentifiers;
  /**
   * Creates a role manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this role manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType);
  fetchFromRules(key: string): Promise<RoleType | null>;
  fetchWithRules(key: string): Promise<RoleType | null>;
  /**
   * Fetches a role that belongs to this guild.
   * @param {String} roleId The id of the role to fetch.
   * @returns {Promise<Role>} The fetched role.
   * @async
   * @public
   * @method
   * @throws {TypeError | Error}
   */
  fetch(roleId: Snowflake): Promise<Role | RoleType | null>;
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
  set(id: Snowflake, role: RoleType): void;
  get(id: Snowflake): RoleType | null;
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
  static getRole(
    client: ClientType,
    guildId: Snowflake,
    roleId: Snowflake,
  ): any;
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
  static getCacheManager(client: ClientType, guildId: Snowflake): any;
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
  static fetchRole(
    client: ClientType,
    guildId: Snowflake,
    roleId: Snowflake,
  ): Promise<any>;
}
export default GuildRoleManager;
