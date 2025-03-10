import Channel from "./GuildChannel.js";
import util from "util";
import type {
  Thread as ThreadType,
  ThreadCacheJSON,
  ThreadDiscordJSON,
  ThreadStorageJSON,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
  Client as ClientType,
  TextChannel as TextChannelType,
  VoiceChannel as VoiceChannelType,
} from "#typings/index.d.ts";
import { APIThreadChannel, Snowflake } from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents a thread within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
 */
declare class Thread extends Channel implements ThreadType {
  #private;
  /**
   * Creates the structure for a thread.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this thread belongs to.
   * @param {Boolean?} [options.nocache] Whether this thread should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
   */
  constructor(
    client: ClientType,
    data:
      | APIThreadChannel
      | ThreadCacheJSON
      | ThreadDiscordJSON
      | ThreadStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
  /**
   * The ID of the member who created this thread.
   * @type {String}
   * @readonly
   * @public
   */
  get ownerId(): string;
  /**
   * The member who created this thread.
   * @type {Member?}
   * @readonly
   * @public
   */
  get owner(): import("#typings/index.d.ts").Member | null;
  /**
   * The ID of the text channel that this thread belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get parentId(): string;
  /**
   * The text channel that this thread belongs to.
   * @type {TextChannel?}
   * @readonly
   * @public
   */
  get parent(): TextChannelType | VoiceChannelType | null;
  /**
   * Determines whether the thread should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   * @override
   */
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ): boolean;
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
   * @override
   */
  toJSON(format: JsonTypes):
    | {
        owner_id: string;
        parent_id: string;
        id: Snowflake;
        type: import("#typings/discord.js").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        nsfw: boolean;
        messages: import("#typings/index.d.ts").MessageCacheJSON[];
        permission_overwrites: import("#typings/index.d.ts").PermissionOverwriteCacheJSON[];
      }
    | {
        owner_id: string;
        parent_id: string;
        id: Snowflake;
        type: import("#typings/discord.js").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        nsfw: boolean;
        messages: import("#typings/index.d.ts").MessageDiscordJSON[];
        permission_overwrites: import("#typings/index.d.ts").PermissionOverwriteDiscordJSON[];
      }
    | {
        owner_id: string;
        parent_id: string;
        id: Snowflake;
        type: import("#typings/discord.js").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        _attributes: number;
        _cacheOptions: number;
        messages: import("#typings/index.d.ts").MessageStorageJSON[];
        permission_overwrites: import("#typings/index.d.ts").PermissionOverwriteStorageJSON[];
      };
}
export default Thread;
