import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all channels within a guild.
 */
declare class GuildChannelsManager extends BaseCacheManager {
  #private;
  static identifier: string;
  /**
   * Creates a guild channel manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this channel manager belongs to.
   */
  constructor(client: any, guild: any);
  /**
   * Fetches a particular channel belonging to this guild.
   * @param {String} channel_id The id of the channel to fetch.
   * @returns {Promise<VoiceChannel | Thread | TextChannel>} The fetched channel.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  fetch(channel_id: any): Promise<any>;
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
  set(id: any, channel: any): Map<any, any>;
  /**
   * Returns the channel for a guild.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild to get the channel from.
   * @param {String} channelId The ID of the channel to get.
   * @returns {VoiceChannel | TextChannel | Thread | CategoryChannel | null}
   */
  static getChannel(client: any, guildId: any, channelId: any): any;
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
  static getCacheManager(client: any, guildId: any): any;
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
  static fetchChannel(client: any, guildId: any, channelId: any): Promise<any>;
}
export default GuildChannelsManager;
