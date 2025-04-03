import { cacheChannel } from "../util/gluon/cacheChannel.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildChannelsManager as GuildChannelsManagerType,
  Guild as GuildType,
  AllChannels,
  StructureIdentifiers,
  Client as ClientType,
  AllChannelJSON,
} from "#typings/index.d.js";
import { Snowflake } from "#typings/discord.js";
import getGuild from "#src/util/gluon/getGuild.js";

/**
 * Manages all channels within a guild.
 */
class GuildChannelsManager
  extends BaseCacheManager<AllChannels, AllChannelJSON>
  implements GuildChannelsManagerType
{
  #_client;
  #guild;
  static identifier = "channels" as StructureIdentifiers;
  /**
   * Creates a guild channel manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this channel manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType) {
    super(client, guild.id, { structureType: GuildChannelsManager });

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
  async fetch(channel_id: Snowflake) {
    if (typeof channel_id !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");

    const cachedChannel = (await this.get(channel_id)) as AllChannels | null;
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
  set(id: Snowflake, channel: AllChannels, expiry?: number) {
    return super.set(id, channel, expiry);
  }

  static getChannel(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
  ): Promise<AllChannels | null> {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error("GLUON: Guild not found in cache.");
    }
    return (guild.channels as GuildChannelsManager).get(channelId);
  }

  static getCacheManager(
    client: ClientType,
    guildId: Snowflake,
  ): GuildChannelsManagerType {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error("GLUON: Guild not found in cache.");
    }
    return guild.channels;
  }

  static async fetchChannel(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
  ) {
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
