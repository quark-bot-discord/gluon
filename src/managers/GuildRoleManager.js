import Client from "../Client.js";
import Role from "../structures/Role.js";
import BaseCacheManager from "./BaseCacheManager.js";
import GuildManager from "./GuildManager.js";

/**
 * Manages all roles belonging to a guild.
 */
class GuildRoleManager extends BaseCacheManager {
  #_client;
  #guild;
  static identifier = "roles";
  /**
   * Creates a role manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this role manager belongs to.
   */
  constructor(client, guild) {
    super(client, { structureType: GuildRoleManager });
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

  /**
   * Fetches a role that belongs to this guild.
   * @param {String} role_id The id of the role to fetch.
   * @returns {Promise<Role>} The fetched role.
   * @async
   * @public
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(role_id) {
    if (typeof role_id !== "string")
      throw new TypeError("GLUON: Role ID must be a string.");

    const cachedRole = await this.get(role_id);
    if (cachedRole) return cachedRole;

    const data = await this.#_client.request.makeRequest("getRoles", [
      this.#guild.id,
    ]);
    let matchedRole;
    for (let i = 0; i < data.length; i++) {
      const role = new Role(this.#_client, data[i], {
        guild_id: this.#guild.id,
      });
      if (role.id == role_id) matchedRole = role;
    }

    return matchedRole;
  }

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
  set(id, role) {
    if (!(role instanceof Role))
      throw new TypeError("GLUON: Role must be an instance of Role.");
    return super.set(id, role);
  }

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
  static getRole(client, guildId, roleId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client is not a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");
    return GuildManager.getGuild(client, guildId).roles.get(roleId);
  }

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
  static getCacheManager(client, guildId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client is not a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    return GuildManager.getGuild(client, guildId).roles;
  }

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
  static async fetchRole(client, guildId, roleId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client is not a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof roleId !== "undefined" && typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");

    const guild = client.guilds.get(guildId);

    if (roleId) {
      const cachedRole = GuildRoleManager.getRole(client, guildId, roleId);
      if (cachedRole) return cachedRole;
    } else {
      const cachedRoles = GuildRoleManager.getCacheManager(
        client,
        guildId,
      ).toJSON();
      if (cachedRoles && cachedRoles.length !== 0) return cachedRoles;
    }

    const data = await client.request.makeRequest("getRoles", [guildId]);

    if (!roleId)
      return data.map((role) => new Role(client, role, { guild_id: guildId }));

    let matchedRole;
    for (let i = 0; i < data.length; i++) {
      const role = new Role(client, data[i], { guild_id: guildId });
      if (role.id === roleId) matchedRole = role;
    }

    return matchedRole;
  }
}

export default GuildRoleManager;
