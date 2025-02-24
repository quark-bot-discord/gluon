import { TO_JSON_TYPES_ENUM } from "../constants.js";
import util from "util";
import { MessageType } from "./interfaces/Message.js";
import ClientType from "src/interfaces/Client.js";
/**
 * A message belonging to a channel within a guild.
 */
declare class Message implements MessageType {
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
    data: any,
    { channelId, guildId, nocache, ignoreExisting }?: any,
  );
  /**
   * The timestamp for when this message was last edited.
   * @type {Number?}
   * @readonly
   * @public
   */
  get editedTimestamp(): any;
  /**
   * The user who sent the message.
   * @type {User}
   * @readonly
   * @public
   */
  get author(): any;
  /**
   * The id of the user who sent the message.
   * @type {String}
   * @readonly
   * @public
   */
  get authorId(): any;
  /**
   * The member who sent the message.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member(): any;
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
  get guild(): any;
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
  get channel(): any;
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
  get attachments(): any;
  /**
   * The message content.
   * @type {String?}
   * @readonly
   * @public
   */
  get content(): any;
  /**
   * The message poll.
   * @type {Poll?}
   * @readonly
   * @public
   */
  get poll(): any;
  /**
   * The message reactions.
   * @type {MessageReactionManager}
   * @readonly
   * @public
   */
  get reactions(): any;
  /**
   * The message embeds.
   * @type {Array<Embed>}
   * @readonly
   * @public
   */
  get embeds(): any;
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
  get flags(): string[];
  /**
   * The raw flags of the message.
   * @type {Number}
   * @readonly
   * @public
   */
  get flagsRaw(): any;
  /**
   * The type of message.
   * @type {Number}
   * @readonly
   * @public
   */
  get type(): any;
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
  get stickerItems(): any;
  /**
   * The snapshot data about the message.
   * @type {Array<Message>?}
   * @readonly
   * @public
   */
  get messageSnapshots(): Message[] | null;
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
  static getUrl(guildId: any, channelId: any, messageId: any): string;
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
  }?: any): Promise<Message>;
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
  edit(options?: {
    components?: any;
    files?: any[] | undefined;
    content?: string | undefined;
    embeds?: any[] | undefined;
    attachments?: any[] | undefined;
    flags?: number | undefined;
    reference?:
      | {
          messageId: string | null;
          channelId: string;
          guildId: string;
        }
      | undefined;
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
  delete({ reason }?: any): Promise<void>;
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
    gluonCacheOptions: any,
    guildCacheOptions: any,
    channelCacheOptions: any,
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
    channelId: any,
    guildId: any,
    { content, embeds, components, files, reference, suppressMentions }?: any,
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
    channelId: any,
    messageId: any,
    guildId: any,
    { content, embeds, components, attachments, files }?: any,
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
  static getHashName(guildId: any, channelId: any, messageId: any): string;
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
    data: any,
    guildId: any,
    channelId: any,
    messageId: any,
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
  }?: any): void;
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
    client: any,
    guildId: any,
    channelId: any,
    messageId: any,
    { reason }?: any,
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
  toJSON(format: TO_JSON_TYPES_ENUM):
    | {
        id: string;
        author: any;
        member: any;
        content: any;
        _attributes: any;
        attachments: any;
        embeds: any;
        edited_timestamp: number | null;
        poll: any;
        message_snapshots: any[] | undefined;
        type: any;
        referenced_message:
          | {
              id: string | undefined;
            }
          | undefined;
        sticker_items: any;
        messageReactions: any;
        channel_id?: undefined;
        pinned?: undefined;
        reactions?: undefined;
        mention_everyone?: undefined;
        mention_roles?: undefined;
        mentions?: undefined;
      }
    | {
        id: string;
        channel_id: string;
        author: any;
        member: any;
        content: any;
        pinned: boolean;
        attachments: any;
        embeds: any;
        edited_timestamp: number | null;
        poll: any;
        message_snapshots: any[] | undefined;
        type: any;
        referenced_message:
          | {
              id: string | undefined;
            }
          | undefined;
        sticker_items: any;
        reactions: any;
        mention_everyone: boolean;
        mention_roles: string[];
        mentions: string[];
        _attributes?: undefined;
        messageReactions?: undefined;
      };
}
export default Message;
