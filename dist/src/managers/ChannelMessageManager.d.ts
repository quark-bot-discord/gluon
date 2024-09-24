export default ChannelMessageManager;
/**
 * Manages all messages within a channel.
 */
declare class ChannelMessageManager extends BaseCacheManager {
    static identifier: string;
    /**
     * Returns the cache manager.
     * @param {Client} client The client instance.
     * @param {String} guildId The ID of the guild.
     * @param {String} channelId The ID of the channel.
     * @returns {ChannelMessageManager}
     * @public
     * @static
     * @method
     * @throws {TypeError}
     */
    public static getCacheManager(client: Client, guildId: string, channelId: string): ChannelMessageManager;
    /**
     * Gets a message from the cache.
     * @param {Client} client The client instance.
     * @param {String} guildId The ID of the guild.
     * @param {String} channelId The ID of the channel.
     * @param {String} messageId The ID of the message.
     * @returns {Message}
     * @public
     * @static
     * @method
     * @throws {TypeError}
     */
    public static getMessage(client: Client, guildId: string, channelId: string, messageId: string): Message;
    /**
     * Fetches a message from the channel.
     * @param {Client} client The client instance.
     * @param {String} guildId The ID of the guild.
     * @param {String} channelId The ID of the channel.
     * @param {String} messageId The ID of the message.
     * @returns {Message}
     * @public
     * @async
     * @static
     * @method
     * @throws {TypeError | Error}
     */
    public static fetchMessage(client: Client, guildId: string, channelId: string, messageId: string): Message;
    /**
     * Fetches a collection of messages from the channel.
     * @param {Client} client The client instance.
     * @param {String} guildId The ID of the guild.
     * @param {String} channelId The ID of the channel.
     * @param {Object} options The options for fetching messages.
     * @param {String} options.around The ID of the message to fetch messages around.
     * @param {String} options.before The ID of the message to fetch messages before.
     * @param {String} options.after The ID of the message to fetch messages after.
     * @param {Number} options.limit The maximum number of messages to fetch.
     * @returns {Array<Message>}
     * @public
     * @async
     * @static
     * @method
     * @throws {TypeError | Error}
     */
    public static fetchMessages(client: Client, guildId: string, channelId: string, { around, before, after, limit }?: {
        around: string;
        before: string;
        after: string;
        limit: number;
    }): Array<Message>;
    /**
     * Bulk deletes channel messages.
     * @param {Client} client The client instance.
     * @param {String} channelId The id of the channel to purge messages in.
     * @param {Array<String>} messages An array of message ids to delete.
     * @param {Object} options
     * @returns {Promise<void>}
     * @public
     * @method
     * @async
     * @throws {TypeError}
     * @static
     */
    public static purgeChannelMessages(client: Client, guildId: any, channelId: string, messages: Array<string>, { reason }?: {}): Promise<void>;
    /**
     * Creates a channel message manager.
     * @param {Client} client The client instance.
     * @param {Guild} guild The guild that this message manager belongs to.
     * @param {Channel} channel The channel that is being managed.
     * @throws {TypeError}
     * @constructor
     * @public
     */
    constructor(client: Client, guild: Guild, channel: Channel);
    /**
     * The guild that this message manager belongs to.
     * @type {Guild}
     * @readonly
     */
    readonly get guild(): Guild;
    /**
     * Fetches a collection of messages or a singular message from the channel.
     * @param {Object | String} options Either an object of {@link https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params|options} or a message id.
     * @returns {Promise<Array<Message>> | Promise<Message>}
     * @public
     * @async
     * @method
     * @throws {TypeError | Error}
     */
    public fetch(options: any | string): Promise<Array<Message>> | Promise<Message>;
    /**
     * Fetches all the pinned messages that belong to the channel.
     * @returns {Promise<Array<Message>>}
     * @public
     * @async
     * @method
     */
    public fetchPinned(): Promise<Array<Message>>;
    /**
     * Adds a message to the cache.
     * @param {String} id The ID of the message to cache.
     * @param {Message} message The message to cache.
     * @returns {Message}
     * @public
     * @method
     * @throws {TypeError}
     * @override
     */
    public override set(id: string, message: Message): Message;
    #private;
}
import BaseCacheManager from "./BaseCacheManager.js";
import Message from "../structures/Message.js";
import Client from "../Client.js";
//# sourceMappingURL=ChannelMessageManager.d.ts.map