import Message from "../structures/Message.js";
import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all messages within a channel.
 */
declare class ChannelMessageManager extends BaseCacheManager {
  #private;
  static identifier: string;
  /**
   * Creates a channel message manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this message manager belongs to.
   * @param {Channel} channel The channel that is being managed.
   * @throws {TypeError}
   * @constructor
   * @public
   */
  constructor(client: any, guild: any, channel: any);
  /**
   * The guild that this message manager belongs to.
   * @type {Guild}
   * @readonly
   */
  get guild(): any;
  /**
   * The channel that is being managed.
   * @type {TextChannel | VoiceChannel | Thread}
   * @readonly
   * @public
   */
  get channel(): any;
  /**
   * Fetches a collection of messages or a singular message from the channel.
   * @param {Object | String} options Either an object of {@link https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params|options} or a message id.
   * @returns {Promise<Array<Message>> | Promise<Message>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  fetch(options: any): Promise<any>;
  /**
   * Fetches all the pinned messages that belong to the channel.
   * @returns {Promise<Array<Message>>}
   * @public
   * @async
   * @method
   */
  fetchPinned(): Promise<Message[]>;
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
  set(id: any, message: any): Map<any, any>;
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
  static getCacheManager(client: any, guildId: any, channelId: any): any;
  /**
   * Gets a message from the cache.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @param {String} channelId The ID of the channel.
   * @param {String} messageId The ID of the message.
   * @returns {Message?}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static getMessage(
    client: any,
    guildId: any,
    channelId: any,
    messageId: any,
  ): any;
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
  static fetchMessage(
    client: any,
    guildId: any,
    channelId: any,
    messageId: any,
  ): Promise<any>;
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
  static fetchMessages(
    client: any,
    guildId: any,
    channelId: any,
    { around, before, after, limit }?: any,
  ): Promise<Message[]>;
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
  static purgeChannelMessages(
    client: any,
    guildId: any,
    channelId: any,
    messages: any,
    { reason }?: any,
  ): Promise<void>;
}
export default ChannelMessageManager;
