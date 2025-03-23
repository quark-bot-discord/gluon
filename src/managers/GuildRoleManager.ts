import Role from "#structures/Role.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildRoleManager as GuildRoleManagerType,
  Guild as GuildType,
  Role as RoleType,
  StructureIdentifiers,
  Client as ClientType,
} from "#typings/index.d.js";
import { APIRole, Snowflake } from "#typings/discord.js";
import getGuild from "#src/util/gluon/getGuild.js";

/**
 * Manages all roles belonging to a guild.
 */
class GuildRoleManager
  extends BaseCacheManager<RoleType>
  implements GuildRoleManagerType
{
  #_client;
  #guild;
  static identifier = "roles" as StructureIdentifiers;
  /**
   * Creates a role manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this role manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType) {
    super(client, { structureType: GuildRoleManager });

    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The guild that this role manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;
  }

  fetchFromRules(key: string): Promise<RoleType | null> {
    return super.fetchFromRules(key) as Promise<RoleType | null>;
  }

  fetchWithRules(key: string): Promise<RoleType | null> {
    return super.fetchWithRules(key) as Promise<RoleType | null>;
  }

  async fetch(roleId: Snowflake) {
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID must be a string.");

    const cachedRole = this.get(roleId);
    if (cachedRole) return cachedRole;

    const data = await this.#_client.request.makeRequest("getRoles", [
      this.#guild.id,
    ]);
    let matchedRole;
    for (let i = 0; i < data.length; i++) {
      const role = new Role(this.#_client, data[i], {
        guildId: this.#guild.id,
      });
      if (role.id == roleId) matchedRole = role;
    }

    if (!matchedRole) {
      throw new Error(`GLUON: Role ${roleId} not found.`);
    }

    return matchedRole;
  }

  set(id: Snowflake, role: RoleType) {
    if (!(role instanceof Role))
      throw new TypeError("GLUON: Role must be an instance of Role.");
    return super.set(id, role);
  }

  get(id: Snowflake) {
    return super.get(id) as RoleType | null;
  }

  static getRole(
    client: ClientType,
    guildId: Snowflake,
    roleId: Snowflake,
  ): RoleType | null {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");

    const guild = getGuild(client, guildId);

    if (!guild) {
      throw new Error(`GLUON: Guild ${guildId} not found in cache.`);
    }

    return guild.roles.get(roleId);
  }

  static getCacheManager(client: ClientType, guildId: Snowflake) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");

    const guild = getGuild(client, guildId);

    if (!guild) {
      throw new Error(`GLUON: Guild ${guildId} not found in cache.`);
    }

    return guild.roles;
  }

  static async fetchRole(
    client: ClientType,
    guildId: Snowflake,
    roleId: Snowflake,
  ): Promise<RoleType | RoleType[]> {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof roleId !== "undefined" && typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");

    if (roleId) {
      const cachedRole = GuildRoleManager.getRole(client, guildId, roleId);
      if (cachedRole) return cachedRole;
    } else {
      const cachedRoles = GuildRoleManager.getCacheManager(
        client,
        guildId,
      ).toJSON();
      if (cachedRoles && cachedRoles.length !== 0)
        return cachedRoles.map((role) => new Role(client, role, { guildId }));
    }

    const data = (await client.request.makeRequest("getRoles", [
      guildId,
    ])) as APIRole[];

    if (!roleId) return data.map((role) => new Role(client, role, { guildId }));

    let matchedRole;
    for (let i = 0; i < data.length; i++) {
      const role = new Role(client, data[i], { guildId });
      if (role.id === roleId) matchedRole = role;
    }

    if (!matchedRole) {
      throw new Error(`GLUON: Role ${roleId} not found.`);
    }

    return matchedRole;
  }
}

export default GuildRoleManager;
