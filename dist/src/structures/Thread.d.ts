import ClientType from "src/interfaces/Client.js";
import Channel from "./GuildChannel.js";
import util from "util";
import {
  Thread as ThreadType,
  ThreadCacheJSON,
  ThreadDiscordJSON,
  ThreadStorageJSON,
  JsonTypes,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
} from "../../typings/index.d.js";
import { Snowflake } from "discord-api-types/globals";
import { APIThreadChannel } from "discord-api-types/v10";
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
  get owner(): any;
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
  get parent(): any;
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
        type: import("discord-api-types/v10").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        nsfw: boolean;
        messages: import("../../typings/index.d.js").MessageCacheJSON[];
        permission_overwrites: import("../../typings/index.d.js").PermissionOverwriteCacheJSON[];
      }
    | {
        owner_id: string;
        parent_id: string;
        id: Snowflake;
        type: import("discord-api-types/v10").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        nsfw: boolean;
        messages: import("../../typings/index.d.js").MessageDiscordJSON[];
        permission_overwrites: import("../../typings/index.d.js").PermissionOverwriteDiscordJSON[];
      }
    | {
        owner_id: string;
        parent_id: string;
        id: Snowflake;
        type: import("discord-api-types/v10").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        _attributes: number;
        _cacheOptions: number;
        messages: import("../../typings/index.d.js").MessageStorageJSON[];
        permission_overwrites: import("../../typings/index.d.js").PermissionOverwriteStorageJSON[];
      };
}
export default Thread;
