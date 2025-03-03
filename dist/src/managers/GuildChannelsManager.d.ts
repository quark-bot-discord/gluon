import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildChannelsManager as GuildChannelsManagerType,
  Guild as GuildType,
  AllChannels,
  StructureIdentifiers,
  Client as ClientType,
} from "../../typings/index.d.js";
import { Snowflake } from "discord-api-types/globals";
/**
 * Manages all channels within a guild.
 */
declare class GuildChannelsManager
  extends BaseCacheManager
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
  ): any;
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
  static getCacheManager(client: ClientType, guildId: Snowflake): any;
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
  static fetchChannel(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
  ): Promise<any>;
}
export default GuildChannelsManager;
