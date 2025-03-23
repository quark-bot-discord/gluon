import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildChannelsManager as GuildChannelsManagerType,
  Guild as GuildType,
  AllChannels,
  StructureIdentifiers,
  Client as ClientType,
} from "#typings/index.d.js";
import { Snowflake } from "#typings/discord.js";
/**
 * Manages all channels within a guild.
 */
declare class GuildChannelsManager
  extends BaseCacheManager<AllChannels>
  implements GuildChannelsManagerType
{
  #private;
  static identifier: StructureIdentifiers;
  /**
   * Creates a guild channel manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this channel manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType);
  /**
   * Gets a channel from the cache.
   * @param {String} id The ID of the channel to get.
   * @returns {VoiceChannel | TextChannel | Thread | CategoryChannel | Channel | null}
   * @public
   * @method
   * @override
   */
  get(id: Snowflake): AllChannels | null;
  fetchFromRules(key: string): Promise<AllChannels | null>;
  fetchWithRules(key: string): Promise<AllChannels | null>;
  /**
   * Fetches a particular channel belonging to this guild.
   * @param {String} channel_id The id of the channel to fetch.
   * @returns {Promise<VoiceChannel | Thread | TextChannel>} The fetched channel.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  fetch(channel_id: Snowflake): Promise<AllChannels | null>;
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
  set(id: Snowflake, channel: AllChannels, expiry?: number): void;
  static getChannel(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
  ): AllChannels | null;
  static getCacheManager(
    client: ClientType,
    guildId: Snowflake,
  ): GuildChannelsManagerType;
  static fetchChannel(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
  ): Promise<AllChannels>;
}
export default GuildChannelsManager;
