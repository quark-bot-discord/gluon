/**
 * Manages all guilds belonging to this client.
 */
class GuildManager {
  /**
   * Creates a guild manager.
   * @param {Client} client The client instance.
   */
  constructor(client) {
    this._client = client;

    this.cache = new Map();
  }

  toJSON() {
    return [...this.cache.values()];
  }
}

module.exports = GuildManager;
