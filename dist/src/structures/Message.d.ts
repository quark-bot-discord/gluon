export default Message;
/**
 * A message belonging to a channel within a guild.
 */
declare class Message {
    [x: number]: () => string;
    /**
     * The URL of the message.
     * @param {String} guildId The id of the guild that the message belongs to.
     * @param {String} channelId The id of the channel that the message belongs to.
     * @param {String} messageId The id of the message.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getUrl(guildId: string, channelId: string, messageId: string): string;
    /**
     * Determines whether the message should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
     * @param {ChannelCacheOptions} channelCacheOptions The cache options for the channel.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions, guildCacheOptions: GuildCacheOptions, channelCacheOptions: ChannelCacheOptions): boolean;
    /**
     * Posts a message to the specified channel.
     * @param {Client} client The client instance.
     * @param {String} channelId The id of the channel to send the message to.
     * @param {String} guildId The id of the guild which the channel belongs to.
     * @param {Object?} [options] Content, embeds, components and files to attach to the message.
     * @param {String?} [options.content] The message content.
     * @param {Embed[]} [options.embeds] Array of embeds to send with the message.
     * @param {MessageComponents?} [options.components] Message components to send with the message.
     * @param {Array<FileUpload>?} [options.files] Array of file objects for files to send with the message.
     * @param {Boolean?} [options.suppressMentions] Whether to suppress mentions in the message.
     * @returns {Promise<Message>}
     * @public
     * @method
     * @async
     * @throws {TypeError}
     */
    public static send(client: Client, channelId: string, guildId: string, { content, embeds, components, files, reference, suppressMentions, }?: any | null): Promise<Message>;
    /**
     * Edits a message.
     * @param {Client} client The client instance.
     * @param {String} channelId The id of the channel the message belongs to.
     * @param {String} messageId The id of the message.
     * @param {String} guildId The id of the guild the message belongs to.
     * @param {Object?} [options] The message options.
     * @param {String?} [options.content] The message content.
     * @param {Embed[]?} [options.embeds] Array of embeds to send with the message.
     * @param {MessageComponents?} [options.components] Message components to send with the message.
     * @param {Array<FileUpload>?} [options.files] Array of file objects for files to send with the message.
     * @param {Array<Attachment>?} [options.attachments] Array of attachment objects for existing attachments sent with the message.
     * @returns {Promise<Message>}
     */
    static edit(client: Client, channelId: string, messageId: string, guildId: string, { content, embeds, components, attachments, files }?: any | null): Promise<Message>;
    /**
     * Returns the hash name for the message.
     * @param {String} guildId The id of the guild that the message belongs to.
     * @param {String} channelId The id of the channel that the message belongs to.
     * @param {String} messageId The id of the message.
     * @returns {String}
     * @public
     * @static
     * @method
     * @throws {TypeError}
     */
    public static getHashName(guildId: string, channelId: string, messageId: string): string;
    /**
     * Decrypts a message.
     * @param {Client} client The client instance.
     * @param {String} data The encrypted message data.
     * @param {String} guildId The id of the guild that the message belongs to.
     * @param {String} channelId The id of the channel that the message belongs to.
     * @param {String} messageId The id of the message.
     * @returns {Message}
     * @public
     * @static
     * @method
     * @throws {TypeError}
     */
    public static decrypt(client: Client, data: string, guildId: string, channelId: string, messageId: string): Message;
    /**
     * Validates the message content, embeds, components and files.
     * @param {Object} [options] The message options.
     * @param {String} [options.content] The message content.
     * @param {Embed[]} [options.embeds] Array of embeds to send with the message.
     * @param {MessageComponents} [options.components] Message components to send with the message.
     * @param {Array<FileUpload>} [options.files] Array of file objects for files to send with the message.
     * @param {Array<Attachment>} [options.attachments] Array of attachment objects for existing attachments sent with the message.
     * @param {Number} [options.flags] The message flags.
     * @param {Object} [options.reference] The message reference.
     * @param {String} [options.reference.message_id] The id of the message to reference.
     * @param {String} [options.reference.channel_id] The id of the channel to reference.
     * @param {String} [options.reference.guild_id] The id of the guild to reference.
     * @returns {void}
     * @throws {Error | TypeError | RangeError}
     * @public
     * @static
     * @method
     */
    public static sendValidation({ content, embeds, components, files, attachments, flags, reference, }?: {
        content?: string;
        embeds?: Embed[];
        components?: MessageComponents;
        files?: Array<FileUpload>;
        attachments?: Array<Attachment>;
        flags?: number;
        reference?: {
            message_id?: string;
            channel_id?: string;
            guild_id?: string;
        };
    }): void;
    /**
     * Deletes one message.
     * @param {Client} client The client instance.
     * @param {String} channelId The id of the channel that the message belongs to.
     * @param {String} messageId The id of the message to delete.
     * @param {Object?} [options]
     * @param {String?} [options.reason] The reason for deleting the message.
     * @returns {Promise<void>}
     * @public
     * @method
     * @async
     * @throws {TypeError}
     */
    public static delete(client: Client, guildId: any, channelId: string, messageId: string, { reason }?: string | null): Promise<void>;
    /**
     * Creates the structure for a message.
     * @param {Client} client The client instance.
     * @param {Object} data Message data returned from Discord.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.channelId The id of the channel that the message belongs to.
     * @param {String} options.guildId The id of the guild that the channel belongs to.
     * @param {Boolean?} [options.nocache] Whether this message should be cached or not.
     * @param {Boolean?} [options.ignoreExisting] Whether to ignore existing messages in the cache.
     * @see {@link https://discord.com/developers/docs/resources/channel#message-object}
     */
    constructor(client: Client, data: any, { channelId, guildId, nocache, ignoreExisting }?: {
        channelId: string;
        guildId: string;
        nocache?: boolean | null;
        ignoreExisting?: boolean | null;
    });
    /**
     * The timestamp for when this message was last edited.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get editedTimestamp(): number | null;
    /**
     * The user who sent the message.
     * @type {User}
     * @readonly
     * @public
     */
    public readonly get author(): User;
    /**
     * The id of the user who sent the message.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get authorId(): string;
    /**
     * The member who sent the message.
     * @type {Member?}
     * @readonly
     * @public
     */
    public readonly get member(): Member | null;
    /**
     * Whether this message includes user mentions.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get mentions(): boolean;
    /**
     * Whether this message includes role mentions.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get mentionRoles(): boolean;
    /**
     * Whether this message mentions everyone.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get mentionEveryone(): boolean;
    /**
     * Whether this message has been pinned.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get pinned(): boolean;
    /**
     * Whether another message has replaced this original message.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get mirrored(): boolean;
    /**
     * The UNIX (seconds) timestamp for when this message was created.
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get timestamp(): number;
    /**
     * The guild that this message belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild | null;
    /**
     * The guild that this message belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The channel that this message belongs to.
     * @type {Channel?}
     * @readonly
     * @public
     */
    public readonly get channel(): Channel | null;
    /**
     * The channel that this message belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get channelId(): string;
    /**
     * The id of the message.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The message attachments.
     * @type {Attachment[]}
     * @readonly
     * @public
     */
    public readonly get attachments(): Attachment[];
    /**
     * The message content.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get content(): string | null;
    /**
     * The message poll.
     * @type {Poll?}
     * @readonly
     * @public
     */
    public readonly get poll(): Poll | null;
    /**
     * The message reactions.
     * @type {MessageReactionManager}
     * @readonly
     * @public
     */
    public readonly get reactions(): MessageReactionManager;
    /**
     * The message embeds.
     * @type {Array<Embed>}
     * @readonly
     * @public
     */
    public readonly get embeds(): Array<Embed>;
    /**
     * The message that this message references.
     * @type {Object}
     * @readonly
     * @public
     */
    public readonly get reference(): any;
    /**
     * The flags of the message.
     * @type {String[]}
     * @readonly
     * @public
     * @see {@link https://discord.com/developers/docs/resources/message#message-object-message-flags}
     */
    public readonly get flags(): string[];
    /**
     * The raw flags of the message.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get flagsRaw(): number;
    /**
     * The type of message.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get type(): number;
    /**
     * The id of the webhook this message is from.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get webhookId(): string | null;
    /**
     * Stickers sent with this message.
     * @type {Sticker[]}
     * @readonly
     * @public
     */
    public readonly get stickerItems(): Sticker[];
    /**
     * The snapshot data about the message.
     * @type {Array<Message>?}
     * @readonly
     * @public
     */
    public readonly get messageSnapshots(): Array<Message> | null;
    /**
     * The URL of the message.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get url(): string;
    /**
     * The hash name for the message.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get hashName(): string;
    /**
     * Replies to the message.
     * @param {Object?} [options] Embeds, components and files to attach to the message.
     * @param {String?} [options.content] The message content.
     * @param {Embed?} [options.embed] Embed to send with the message.
     * @param {MessageComponents?} [options.components] Message components to send with the message.
     * @param {Array<FileUpload>?} [options.files] Array of file objects for files to send with the message.
     * @returns {Promise<Message>}
     * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
     * @method
     * @public
     * @async
     * @throws {Error | TypeError}
     */
    public reply({ content, embeds, components, files, suppressMentions }?: any | null): Promise<Message>;
    /**
     * Edits the message, assuming it is sent by the client user.
     * @param {Object?} [options] Content, embeds and components to attach to the message.
     * @param {String?} [options.content] The message content.
     * @param {Embed?} [options.embed] Embed to send with the message.
     * @param {MessageComponents?} [options.components] Message components to send with the message.
     * @param {Array<Attachment>?} [options.attachments] Array of attachment objects for files to send with the message.
     * @param {Number?} [options.flags] The message flags.
     * @param {Object?} [options.reference] The message reference.
     * @param {String?} [options.reference.message_id] The id of the message to reference.
     * @param {String?} [options.reference.channel_id] The id of the channel to reference.
     * @param {String?} [options.reference.guild_id] The id of the guild to reference.
     * @param {FileUpload[]?} [options.files] Array of file objects for files to send with the message.
     * @returns {Promise<Message>}
     * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
     * @method
     * @public
     * @async
     * @throws {Error | TypeError}
     */
    public edit({ components, files, content, embeds, attachments, flags, reference, }?: any | null): Promise<Message>;
    /**
     * Deletes the message.
     * @param {Object?} [options] The options for deleting the message.
     * @param {String?} [options.reason] The reason for deleting the message
     * @returns {Promise<void>}
     * @method
     * @public
     * @async
     */
    public delete({ reason }?: any | null): Promise<void>;
    /**
     * Encrypts the message.
     * @returns {String}
     * @public
     * @method
     */
    public encrypt(): string;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} [format] The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format?: number): any;
    #private;
}
import User from "./User.js";
import Member from "./Member.js";
import Attachment from "./Attachment.js";
import Poll from "./Poll.js";
import MessageReactionManager from "../managers/MessageReactionManager.js";
import Embed from "../util/builder/embedBuilder.js";
import Sticker from "./Sticker.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import ChannelCacheOptions from "../managers/ChannelCacheOptions.js";
import Client from "../Client.js";
import MessageComponents from "../util/builder/messageComponents.js";
import FileUpload from "../util/builder/fileUpload.js";
//# sourceMappingURL=Message.d.ts.map