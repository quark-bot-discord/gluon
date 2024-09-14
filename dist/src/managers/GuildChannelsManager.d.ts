export default GuildChannelsManager;
/**
 * Manages all channels within a guild.
 */
declare class GuildChannelsManager extends BaseCacheManager {
    static identifier: string;
    /**
     * Returns the channel for a guild.
     * @param {Client} client The client instance.
     * @param {String} guildId The ID of the guild to get the channel from.
     * @param {String} channelId The ID of the channel to get.
     * @returns {VoiceChannel | TextChannel | Thread | CategoryChannel}
     */
    static getChannel(client: Client, guildId: string, channelId: string): VoiceChannel | TextChannel | Thread | CategoryChannel;
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
    public static getCacheManager(client: Client, guildId: string): GuildChannelsManager;
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
    public static fetchChannel(client: Client, guildId: string, channelId: string): Promise<TextChannel | VoiceChannel>;
    /**
     * Creates a guild channel manager.
     * @param {Client} client The client instance.
     * @param {Guild} guild The guild that this channel manager belongs to.
     */
    constructor(client: Client, guild: Guild);
    /**
     * Fetches a particular channel belonging to this guild.
     * @param {String} channel_id The id of the channel to fetch.
     * @returns {Promise<VoiceChannel> | Promise<Thread> | Promise<TextChannel>} The fetched channel.
     * @public
     * @async
     * @method
     * @throws {TypeError | Error}
     */
    public fetch(channel_id: string): Promise<VoiceChannel> | Promise<Thread> | Promise<TextChannel>;
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
    public override set(id: string, channel: VoiceChannel | TextChannel | Thread | Channel | CategoryChannel): VoiceChannel | TextChannel | Thread | Channel | CategoryChannel;
    #private;
}
import BaseCacheManager from "./BaseCacheManager.js";
import VoiceChannel from "../structures/VoiceChannel.js";
import Thread from "../structures/Thread.js";
import TextChannel from "../structures/TextChannel.js";
import Channel from "../structures/Channel.js";
import CategoryChannel from "../structures/CategoryChannel.js";
import Client from "../Client.js";
//# sourceMappingURL=GuildChannelsManager.d.ts.map