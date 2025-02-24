import CategoryChannel from "../structures/CategoryChannel.js";
import Channel from "../structures/Channel.js";
import TextChannel from "../structures/TextChannel.js";
import Thread from "../structures/Thread.js";
import VoiceChannel from "../structures/VoiceChannel.js";
import cacheChannel from "../util/gluon/cacheChannel.js";
import BaseCacheManager from "./BaseCacheManager.js";
import GuildManager from "./GuildManager.js";

/**
 * Manages all channels within a guild.
 */
class GuildChannelsManager extends BaseCacheManager {
  #_client;
  #guild;
  static identifier = "channels";
  /**
   * Creates a guild channel manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this channel manager belongs to.
   */
  constructor(client: any, guild: any) {
    super(client, { structureType: GuildChannelsManager });

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
     * The guild that this channel manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;
  }

  /**
   * Fetches a particular channel belonging to this guild.
   * @param {String} channel_id The id of the channel to fetch.
   * @returns {Promise<VoiceChannel | Thread | TextChannel>} The fetched channel.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(channel_id: any) {
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
   * @param {VoiceChannel | TextChannel | Thread | Channel | CategoryChannel} channel The channel to cache.
   * @returns {VoiceChannel | TextChannel | Thread | Channel | CategoryChannel}
   * @public
   * @method
   * @throws {TypeError}
   * @override
   */
  set(id: any, channel: any) {
    if (
      !(
        channel instanceof VoiceChannel ||
        channel instanceof TextChannel ||
        channel instanceof Thread ||
        channel instanceof CategoryChannel ||
        channel instanceof Channel
      )
    )
      throw new TypeError(
        "GLUON: Channel must be a VoiceChannel, TextChannel, CategoryChannel, Channel or Thread instance.",
      );
    return super.set(id, channel);
  }

  /**
   * Returns the channel for a guild.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild to get the channel from.
   * @param {String} channelId The ID of the channel to get.
   * @returns {VoiceChannel | TextChannel | Thread | CategoryChannel | null}
   */
  static getChannel(client: any, guildId: any, channelId: any) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    return GuildManager.getGuild(client, guildId).channels.get(channelId);
  }

  /**
   * Returns the cache manager for a guild.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild the cache manager belongs to.
   * @returns {GuildChannelsManager}
   * @throws {TypeError}
   * @public
   * @static
   * @method
   */
  static getCacheManager(client: any, guildId: any) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return GuildManager.getGuild(client, guildId).channels;
  }

  /**
   * Fetches a channel, checking the cache first.
   * @param {Client} client The client instance.
   * @param {String} guildId The id of the guild the channel belongs to.
   * @param {String} channelId The id of the channel to fetch.
   * @returns {Promise<TextChannel | VoiceChannel>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static async fetchChannel(client: any, guildId: any, channelId: any) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");

    const cached = GuildChannelsManager.getChannel(client, guildId, channelId);
    if (cached) return cached;

    const data = await client.request.makeRequest("getChannel", [channelId]);

    return cacheChannel(client, data, guildId);
  }
}

export default GuildChannelsManager;
