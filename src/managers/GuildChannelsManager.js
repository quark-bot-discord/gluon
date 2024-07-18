const TextChannel = require("../structures/TextChannel");
const Thread = require("../structures/Thread");
const VoiceChannel = require("../structures/VoiceChannel");
const cacheChannel = require("../util/gluon/cacheChannel");

/**
 * Manages all channels within a guild.
 */
class GuildChannelsManager {
  /**
   * Creates a guild channel manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this channel manager belongs to.
   */
  constructor(client, guild) {
    this._client = client;

    this.guild = guild;

    this.cache = new Map();
  }

  /**
   * Fetches a particular channel belonging to this guild.
   * @param {BigInt | String} channel_id The id of the channel to fetch.
   * @returns {Promise<VoiceChannel> | Promise<Thread> | Promise<TextChannel>} The fetched channel.
   */
  async fetch(channel_id) {
    const cachedChannel = this.cache.get(channel_id.toString()) || null;
    if (this._client.cacheChannels == true) return cachedChannel;

    const data = await this._client.request.makeRequest("getChannel", [
      channel_id,
    ]);

    return cacheChannel(this._client, data, this.guild.id.toString());
  }

  toJSON() {
    return [...this.cache.values()];
  }
}

module.exports = GuildChannelsManager;
