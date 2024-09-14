export default Channel;
/**
 * Represents a channel within Discord.
 * @see {@link https://discord.com/developers/docs/resources/channel}
 */
declare class Channel {
    /**
     * Returns the mention string for a channel.
     * @param {String} channelId The ID of the channel to mention.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getMention(channelId: string): string;
    /**
     * Determines whether the channel should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions, guildCacheOptions: GuildCacheOptions): boolean;
    /**
     * Follows a news channel.
     * @param {Client} client The client instance.
     * @param {String} channelId The ID of the channel.
     * @param {String} followChannelId THe ID of the channel to follow.
     * @returns {Promise<void>}
     * @public
     * @static
     * @async
     * @method
     * @throws {TypeError}
     */
    public static follow(client: Client, channelId: string, followChannelId: string): Promise<void>;
    /**
     * Returns an array of webhooks for the specified channel.
     * @param {Client} client The client instance.
     * @param {String} channelId The ID of the channel.
     * @returns {Promise<Array<Object>>}
     * @public
     * @static
     * @async
     * @method
     */
    public static fetchWebhooks(client: Client, channelId: string): Promise<Array<any>>;
    /**
     * Creates the base structure for a channel.
     * @param {Client} client The client instance.
     * @param {Object} data Raw channel data.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The ID of the guild that this channel belongs to.
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure}
     */
    constructor(client: Client, data: any, { guildId }?: {
        guildId: string;
    });
    /**
     * Sends a message to this channel.
     * @param {Object} data Embeds, components and files to include with the message.
     * @param {String?} data.content The content of the message.
     * @param {Array<Embed>?} data.embeds The embeds to include with the message.
     * @param {Array<MessageComponents>?} data.components The components to include with the message.
     * @param {Array<FileUpload>?} data.files The files to include with the message.
     * @param {Boolean} data.suppressMentions Whether to suppress mentions in the message.
     * @returns {Promise<Message>}
     * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
     * @method
     * @public
     * @async
     * @throws {Error | TypeError}
     */
    public send({ content, components, files, embeds, suppressMentions }?: {
        content: string | null;
        embeds: Array<Embed> | null;
        components: Array<MessageComponents> | null;
        files: Array<FileUpload> | null;
        suppressMentions: boolean;
    }): Promise<Message>;
    /**
     * Returns the mention for this channel.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get mention(): string;
    /**
     * Whether this channel is marked as NSFW or not.
     * @readonly
     * @returns {Boolean}
     * @public
     */
    public readonly get nsfw(): boolean;
    /**
     * The guild that this channel belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * The parent channel.
     * @type {Channel?}
     * @readonly
     * @public
     */
    public readonly get parent(): Channel;
    /**
     * The ID of the channel.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The ID of the guild that this channel belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The ID of the parent channel.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get parentId(): string;
    /**
     * The type of channel.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get type(): number;
    /**
     * The name of the channel.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get name(): string;
    /**
     * The topic of the channel.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get topic(): string;
    /**
     * The permission overwrites for this channel.
     * @type {Array<Object>}
     * @readonly
     * @public
     */
    public readonly get permissionOverwrites(): any[];
    /**
     * The message send cooldown for the channel.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get rateLimitPerUser(): number;
    /**
     * The cache options for this channel.
     * @type {ChannelCacheOptions}
     * @readonly
     * @public
     */
    public readonly get _cacheOptions(): ChannelCacheOptions;
    /**
     * The messages in this channel.
     * @type {ChannelMessageManager}
     * @readonly
     * @public
     */
    public readonly get messages(): ChannelMessageManager;
    /**
     * Returns the permissions for a member in this channel.
     * @param {Member} member The member to check the permissions for.
     * @returns {String}
     */
    checkPermission(member: Member): string;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} format The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format: number): any;
    #private;
}
import Message from "./Message.js";
import ChannelCacheOptions from "../managers/ChannelCacheOptions.js";
import ChannelMessageManager from "../managers/ChannelMessageManager.js";
import Member from "./Member.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Client from "../Client.js";
//# sourceMappingURL=Channel.d.ts.map