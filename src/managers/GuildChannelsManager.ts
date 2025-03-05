import cacheChannel from "../util/gluon/cacheChannel.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildChannelsManager as GuildChannelsManagerType,
  Guild as GuildType,
  AllChannels,
  StructureIdentifiers,
  Client as ClientType,
} from "../../typings/index.d.js";
import { Snowflake } from "discord-api-types/globals";
import getGuild from "#src/util/gluon/getGuild.js";

/**
 * Manages all channels within a guild.
 */
class GuildChannelsManager
  extends BaseCacheManager<AllChannels>
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
   * Gets a channel from the cache.
   * @param {String} id The ID of the channel to get.
   * @returns {VoiceChannel | TextChannel | Thread | CategoryChannel | Channel | null}
   * @public
   * @method
   * @override
   */
  get(id: Snowflake): AllChannels | null {
    return super.get(id) as AllChannels | null;
  }

  fetchFromRules(key: string): Promise<AllChannels | null> {
    return super.fetchFromRules(key) as Promise<AllChannels | null>;
  }

  fetchWithRules(key: string): Promise<AllChannels | null> {
    return super.fetchWithRules(key) as Promise<AllChannels | null>;
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

    const cachedChannel = this.get(channel_id) as AllChannels | null;
    if (cachedChannel) return cachedChannel;

    const data = await this.#_client.request.makeRequest("getChannel", [
      channel_id,
    ]);

    if (!data) return null;

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

  /**
   * Returns the channel for a guild.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild to get the channel from.
   * @param {String} channelId The ID of the channel to get.
   * @returns {VoiceChannel | TextChannel | Thread | CategoryChannel | null}
   */
  static getChannel(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
  ) {
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
    return guild.channels.get(channelId);
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
  static getCacheManager(client: ClientType, guildId: Snowflake) {
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
