const Guild = require("../structures/Guild");
const Role = require("../structures/Role");

/**
 * Manages all roles belonging to a guild.
 */
class GuildRoleManager {

  #_client;
  #guild;
  #cache;

  /**
   * Creates a role manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this role manager belongs to.
   */
  constructor(client, guild) {
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

    /**
     * The cache of roles.
     * @type {Map<String, Role>}
     * @private
     */
    this.#cache = new Map();
  }

  /**
   * Fetches a role that belongs to this guild.
   * @param {String} role_id The id of the role to fetch.
   * @returns {Promise<Role>} The fetched role.
   */
  async fetch(role_id) {

    if (typeof role_id !== "string")
      throw new TypeError("GLUON: Role ID must be a string.");

    const cachedRole = this.#cache.get(role_id);
    if (this.#_client.cacheRoles == true) return cachedRole;

    const data = await this.#_client.request.makeRequest("getRoles", [
      this.#guild.id,
    ]);
    let matchedRole;
    for (let i = 0; i < data.length; i++) {
      const role = new Role(this.#_client, data[i], { guild_id: this.#guild.id });
      if (role.id == role_id) matchedRole = role;
    }

    return matchedRole;
  }

  /**
   * Gets a role from the cache.
   * @param {String} id The ID of the role to retrieve.
   * @returns {Role?}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Adds a role to the cache.
   * @param {String} id The ID of the role to cache
   * @param {Role} role The role to cache.
   * @returns {Role}
   */
  set(id, role) {
    if (!(role instanceof Role))
      throw new TypeError("GLUON: Role must be an instance of Role.");
    if (typeof id !== "string")
      throw new TypeError("GLUON: Role ID must be a string.");
    return this.#cache.set(id, role);
  }

  /**
   * Removes a role from the cache.
   * @param {String} id The ID of the role to remove.
   * @returns {Boolean}
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.delete(id);
  }

  /**
   * The number of roles in the cache.
   * @type {Number}
   * @readonly
   */
  get size() {
    return this.#cache.size;
  }

  toJSON() {
    return [...this.#cache.values()];
  }
}

module.exports = GuildRoleManager;
