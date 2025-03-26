import Role from "#structures/Role.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildRoleManager as GuildRoleManagerType,
  Guild as GuildType,
  Role as RoleType,
  StructureIdentifiers,
  Client as ClientType,
} from "#typings/index.d.js";
import { Snowflake } from "#typings/discord.js";
/**
 * Manages all roles belonging to a guild.
 */
declare class GuildRoleManager
  extends BaseCacheManager<RoleType>
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
  fetch(roleId: Snowflake): Promise<RoleType | Role>;
  set(id: Snowflake, role: RoleType): void;
  get(id: Snowflake): RoleType | null;
  static getRole(
    client: ClientType,
    guildId: Snowflake,
    roleId: Snowflake,
  ): RoleType | null;
  static getCacheManager(
    client: ClientType,
    guildId: Snowflake,
  ): GuildRoleManagerType;
  static fetchRole(
    client: ClientType,
    guildId: Snowflake,
    roleId: Snowflake,
  ): Promise<RoleType | RoleType[]>;
}
export default GuildRoleManager;
