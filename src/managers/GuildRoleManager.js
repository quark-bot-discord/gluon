const Client = require("../Client");
const Guild = require("../structures/Guild");
const Role = require("../structures/Role");

/**
 * Manages all roles belonging to a guild.
 */
class GuildRoleManager {
  /**
   * Creates a role manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this role manager belongs to.
   */
  constructor(client, guild) {
    this.client = client;

    this.guild = guild;

    this.cache = new Map();
  }

  /**
   * Fetches a role that belongs to this guild.
   * @param {BigInt | String} role_id The id of the role to fetch.
   * @returns {Promise<Role>} The fetched role.
   */
  async fetch(role_id) {
    const cachedRole = this.cache.get(role_id.toString()) || null;
    if (this.client.cacheRoles == true) return cachedRole;

    const data = await this.client.request.makeRequest("getRoles", [
      this.guild.id,
    ]);
    let matchedRole;
    for (let i = 0; i < data.length; i++) {
      const role = new Role(this.client, data[i], this.guild.id);
      if (role.id == role_id) matchedRole = role;
    }

    return matchedRole;
  }
}

module.exports = GuildRoleManager;
