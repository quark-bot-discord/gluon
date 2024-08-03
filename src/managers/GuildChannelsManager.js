import TextChannel from "../structures/TextChannel.js";
import Thread from "../structures/Thread.js";
import VoiceChannel from "../structures/VoiceChannel.js";
import cacheChannel from "../util/gluon/cacheChannel.js";
import BaseCacheManager from "./BaseCacheManager.js";

/**
 * Manages all channels within a guild.
 */
class GuildChannelsManager extends BaseCacheManager {
  #_client;
  #guild;

  /**
   * Creates a guild channel manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this channel manager belongs to.
   */
  constructor(client, guild) {
    super(client);
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The guild that this channel manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;
  }

  /**
   * Fetches a particular channel belonging to this guild.
   * @param {String} channel_id The id of the channel to fetch.
   * @returns {Promise<VoiceChannel> | Promise<Thread> | Promise<TextChannel>} The fetched channel.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(channel_id) {
    if (typeof channel_id !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");

    const cachedChannel = (await this.get(channel_id)) || null;
    if (cachedChannel) return cachedChannel;

    const data = await this.#_client.request.makeRequest("getChannel", [
      channel_id,
    ]);

    return cacheChannel(this.#_client, data, this.#guild.id);
  }

  /**
   * Adds a channel to the cache.
   * @param {String} id The ID of the channel to cache.
   * @param {VoiceChannel | TextChannel | Thread} channel The channel to cache.
   * @returns {VoiceChannel | TextChannel | Thread}
   * @public
   * @method
   * @throws {TypeError}
   * @override
   */
  set(id, channel) {
    if (
      !(
        channel instanceof VoiceChannel ||
        channel instanceof TextChannel ||
        channel instanceof Thread
      )
    )
      throw new TypeError(
        "GLUON: Channel must be a VoiceChannel, TextChannel or Thread instance.",
      );
    return super.set(id, channel);
  }
}

export default GuildChannelsManager;
