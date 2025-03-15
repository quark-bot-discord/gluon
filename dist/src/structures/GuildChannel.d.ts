import Message from "./Message.js";
import util from "util";
import { FileUpload } from "src/util.js";
import {
  APIGuildTextChannel,
  APIGuildVoiceChannel,
  APIWebhook,
  ChannelType,
  GuildTextChannelType,
  Snowflake,
} from "#typings/discord.js";
import type {
  GuildChannel as GuildChannelType,
  GuildChannelCacheJSON,
  GuildChannelDiscordJSON,
  GuildChannelStorageJSON,
  PermissionOverwrite as PermissionOverwriteType,
  Member as MemberType,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
  ChannelMessageManager as ChannelMessageManagerType,
  Embed,
  MessageComponents as MessageComponentsType,
  Client as ClientType,
  ChannelCacheOptions as ChannelCacheOptionsType,
} from "#typings/index.d.ts";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents a channel within Discord.
 * @see {@link https://discord.com/developers/docs/resources/channel}
 */
declare class GuildChannel implements GuildChannelType {
  #private;
  /**
   * Creates the base structure for a channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure}
   */
  constructor(
    client: ClientType,
    data:
      | APIGuildTextChannel<GuildTextChannelType>
      | APIGuildTextChannel<ChannelType.GuildForum>
      | APIGuildTextChannel<ChannelType.GuildMedia>
      | APIGuildVoiceChannel
      | GuildChannelStorageJSON
      | GuildChannelCacheJSON
      | GuildChannelDiscordJSON,
    {
      guildId,
    }: {
      guildId: Snowflake;
    },
  );
  /**
   * Sends a message to this channel.
   * @param {Object} [data] Embeds, components and files to include with the message.
   * @param {String?} [data.content] The content of the message.
   * @param {Array<Embed>?} [data.embeds] The embeds to include with the message.
   * @param {MessageComponents?} [data.components] The components to include with the message.
   * @param {Array<FileUpload>?} [data.files] The files to include with the message.
   * @param {Boolean} [data.suppressMentions] Whether to suppress mentions in the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
   * @method
   * @public
   * @async
   * @throws {Error | TypeError}
   */
  send({
    content,
    components,
    files,
    embeds,
    suppressMentions,
  }: {
    content?: string;
    components?: MessageComponentsType;
    files?: FileUpload[];
    embeds?: Embed[];
    suppressMentions?: boolean;
  }): Promise<Message>;
  /**
   * Returns the mention for this channel.
   * @type {String}
   * @readonly
   * @public
   */
  get mention(): string;
  /**
   * Whether this channel is marked as NSFW or not.
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get nsfw(): boolean;
  /**
   * The guild that this channel belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): import("#typings/index.d.ts").Guild | null;
  /**
   * The parent channel.
   * @type {Channel?}
   * @readonly
   * @public
   */
  get parent(): import("#typings/index.d.ts").AllChannels | null;
  /**
   * The ID of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The ID of the guild that this channel belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The ID of the parent channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get parentId(): string | null;
  /**
   * The type of channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get type(): ChannelType;
  /**
   * The name of the channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get name(): string;
  /**
   * The topic of the channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get topic(): string | null;
  /**
   * The permission overwrites for this channel.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get permissionOverwrites(): PermissionOverwriteType[];
  /**
   * The message send cooldown for the channel.
   * @type {Number?}
   * @readonly
   * @public
   */
  get rateLimitPerUser(): number | undefined;
  /**
   * The position of the channel.
   * @type {Number?}
   * @readonly
   * @public
   */
  get position(): number | undefined;
  /**
   * The cache options for this channel.
   * @type {ChannelCacheOptions}
   * @readonly
   * @public
   */
  get _cacheOptions(): ChannelCacheOptionsType;
  /**
   * The messages in this channel.
   * @type {ChannelMessageManager}
   * @readonly
   * @public
   */
  get messages(): ChannelMessageManagerType;
  /**
   * Returns the mention string for a channel.
   * @param {String} channelId The ID of the channel to mention.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(channelId: Snowflake): string;
  /**
   * Determines whether the channel should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ): boolean;
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
  static follow(
    client: ClientType,
    channelId: Snowflake,
    followChannelId: Snowflake,
  ): Promise<void>;
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
  static fetchWebhooks(
    client: ClientType,
    channelId: Snowflake,
  ): Promise<APIWebhook[]>;
  /**
   * Returns the permissions for a member in this channel.
   * @param {Member} member The member to check the permissions for.
   * @returns {String}
   */
  checkPermission(member: MemberType): string;
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
  ): GuildChannelStorageJSON | GuildChannelCacheJSON | GuildChannelDiscordJSON;
}
export default GuildChannel;
