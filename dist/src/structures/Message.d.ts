import User from "./User.js";
import Attachment from "./Attachment.js";
import Embed from "../util/builder/embedBuilder.js";
import util from "util";
import MessageComponents from "../util/builder/messageComponents.js";
import type {
  MessageCacheJSON,
  MessageDiscordJSON,
  MessageStorageJSON,
  Message as MessageTypeClass,
  Attachment as AttachmentType,
  Sticker as StickerType,
  Poll as PollType,
  MessageReactionManager as MessageReactionManagerType,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
  ChannelCacheOptions as ChannelCacheOptionsType,
  Embed as EmbedType,
  FileUpload,
  Client as ClientType,
  VoiceChannel as VoiceChannelType,
  Thread as ThreadType,
  TextChannel as TextChannelType,
} from "#typings/index.d.ts";
import { APIMessage, MessageType, Snowflake } from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
/**
 * A message belonging to a channel within a guild.
 */
declare class Message implements MessageTypeClass {
  #private;
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
  constructor(
    client: ClientType,
    data:
      | APIMessage
      | MessageStorageJSON
      | MessageCacheJSON
      | MessageDiscordJSON,
    {
      channelId,
      guildId,
      nocache,
      ignoreExisting,
    }: {
      channelId: Snowflake;
      guildId: Snowflake;
      nocache?: boolean;
      ignoreExisting?: boolean;
    },
  );
  /**
   * The timestamp for when this message was last edited.
   * @type {Number?}
   * @readonly
   * @public
   */
  get editedTimestamp(): number | null;
  /**
   * The user who sent the message.
   * @type {User}
   * @readonly
   * @public
   */
  get author(): User;
  /**
   * The id of the user who sent the message.
   * @type {String}
   * @readonly
   * @public
   */
  get authorId(): string;
  /**
   * The member who sent the message.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member(): import("#typings/index.d.ts").Member | null;
  /**
   * Whether this message includes user mentions.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mentions(): boolean;
  /**
   * Whether this message includes role mentions.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mentionRoles(): boolean;
  /**
   * Whether this message mentions everyone.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mentionEveryone(): boolean;
  /**
   * Whether this message has been pinned.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get pinned(): boolean;
  /**
   * Whether another message has replaced this original message.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mirrored(): boolean;
  /**
   * The UNIX (seconds) timestamp for when this message was created.
   * @readonly
   * @type {Number}
   * @public
   */
  get timestamp(): number;
  /**
   * The guild that this message belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): import("#typings/index.d.ts").Guild | null;
  /**
   * The guild that this message belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The channel that this message belongs to.
   * @type {Channel?}
   * @readonly
   * @public
   */
  get channel(): TextChannelType | VoiceChannelType | ThreadType | null;
  /**
   * The channel that this message belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId(): string;
  /**
   * The id of the message.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The message attachments.
   * @type {Attachment[]}
   * @readonly
   * @public
   */
  get attachments(): AttachmentType[];
  /**
   * The message content.
   * @type {String?}
   * @readonly
   * @public
   */
  get content(): string | null;
  /**
   * The message poll.
   * @type {Poll?}
   * @readonly
   * @public
   */
  get poll(): PollType | null;
  /**
   * The message reactions.
   * @type {MessageReactionManager}
   * @readonly
   * @public
   */
  get reactions(): MessageReactionManagerType;
  /**
   * The message embeds.
   * @type {Array<Embed>}
   * @readonly
   * @public
   */
  get embeds(): EmbedType[];
  /**
   * The message that this message references.
   * @type {Object}
   * @readonly
   * @public
   */
  get reference(): {
    messageId: string | null;
  };
  /**
   * The flags of the message.
   * @type {String[]}
   * @readonly
   * @public
   * @see {@link https://discord.com/developers/docs/resources/message#message-object-message-flags}
   */
  get flags(): number;
  /**
   * The type of message.
   * @type {Number}
   * @readonly
   * @public
   */
  get type(): MessageType;
  /**
   * The id of the webhook this message is from.
   * @type {String?}
   * @readonly
   * @public
   */
  get webhookId(): string | null;
  /**
   * Stickers sent with this message.
   * @type {Sticker[]}
   * @readonly
   * @public
   */
  get stickerItems(): StickerType[];
  /**
   * The snapshot data about the message.
   * @type {Array<Message>?}
   * @readonly
   * @public
   */
  get messageSnapshots(): MessageTypeClass[];
  /**
   * The URL of the message.
   * @type {String}
   * @readonly
   * @public
   */
  get url(): string;
  /**
   * The hash name for the message.
   * @type {String}
   * @readonly
   * @public
   */
  get hashName(): string;
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
  static getUrl(
    guildId: Snowflake,
    channelId: Snowflake,
    messageId: Snowflake,
  ): string;
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
  reply({
    content,
    embeds,
    components,
    files,
    suppressMentions,
  }: {
    content?: string;
    embeds?: Embed[];
    components?: MessageComponents;
    files?: FileUpload[];
    suppressMentions?: boolean;
  }): Promise<Message>;
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
  edit(options: {
    components?: MessageComponents;
    files?: FileUpload[];
    content?: string;
    embeds?: Embed[];
    attachments?: Attachment[];
  }): Promise<Message>;
  /**
   * Deletes the message.
   * @param {Object?} [options] The options for deleting the message.
   * @param {String?} [options.reason] The reason for deleting the message
   * @returns {Promise<void>}
   * @method
   * @public
   * @async
   */
  delete({ reason }?: { reason?: string }): Promise<void>;
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
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
    channelCacheOptions: ChannelCacheOptionsType,
  ): boolean;
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
  static send(
    client: ClientType,
    channelId: Snowflake,
    guildId: Snowflake,
    {
      content,
      embeds,
      components,
      files,
      reference,
      suppressMentions,
    }: {
      content?: string;
      embeds?: EmbedType[];
      components?: MessageComponents;
      files?: FileUpload[];
      reference?: {
        message_id: Snowflake;
        channel_id: Snowflake;
        guild_id: Snowflake;
      };
      suppressMentions?: boolean;
    },
  ): Promise<Message>;
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
  static edit(
    client: ClientType,
    channelId: Snowflake,
    messageId: Snowflake,
    guildId: Snowflake,
    {
      content,
      embeds,
      components,
      attachments,
      files,
    }: {
      content?: string | null;
      embeds?: EmbedType[];
      components?: MessageComponents;
      attachments?: AttachmentType[];
      files?: FileUpload[];
    },
  ): Promise<Message>;
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
  static getHashName(
    guildId: Snowflake,
    channelId: Snowflake,
    messageId: Snowflake,
  ): string;
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
  static decrypt(
    client: ClientType,
    data: string,
    guildId: Snowflake,
    channelId: Snowflake,
    messageId: Snowflake,
  ): Message;
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
  static sendValidation({
    content,
    embeds,
    components,
    files,
    attachments,
    flags,
    reference,
  }?: {
    content?: string | null;
    embeds?: EmbedType[];
    components?: MessageComponents;
    files?: FileUpload[];
    attachments?: AttachmentType[];
    flags?: number;
    reference?: {
      message_id: Snowflake;
      channel_id: Snowflake;
      guild_id: Snowflake;
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
  static delete(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
    messageId: Snowflake,
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Encrypts the message.
   * @returns {String}
   * @public
   * @method
   */
  encrypt(): string;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(
    format?: JsonTypes,
  ): MessageCacheJSON | MessageStorageJSON | MessageDiscordJSON;
}
export default Message;
