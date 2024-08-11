import Guild from "../structures/Guild.js";
import Role from "../structures/Role.js";
import BaseCacheManager from "./BaseCacheManager.js";

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
}

export default GuildRoleManager;
