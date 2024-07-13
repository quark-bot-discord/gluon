const Client = require("../Client");
const Emoji = require("../structures/Emoji");
const Guild = require("../structures/Guild");

/**
 * Manages all emojis within a guild.
 */
class GuildEmojisManager {
  /**
   * Creates a guild emoji manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this emoji manager belongs to.
   */
  constructor(client, guild) {
    this._client = client;

    this.guild = guild;

    this.cache = new Map();
  }

  /**
   * Fetches a particular emoji that belongs to this guild.
   * @param {BigInt | String} emoji_id The id of the emoji to fetch.
   * @returns {Promise<Emoji>} The fetched emoji.
   */
  async fetch(emoji_id) {
    const cached = this.cache.get(emoji_id.toString());
    if (cached) return cached;

    const data = await this._client.request.makeRequest("getEmoji", [
      this.guild.id,
      emoji_id,
    ]);

    return new Emoji(this._client, data, this.guild.id.toString(), data.user);
  }

  toJSON() {
    return [...this.cache.values()];
  }
}

module.exports = GuildEmojisManager;
