import GuildChannel from "./GuildChannel.js";
import util from "util";
import type {
  VoiceChannelCacheJSON,
  VoiceChannelDiscordJSON,
  VoiceChannelStorageJSON,
  VoiceChannel as VoiceChannelType,
  Client as ClientType,
} from "#typings/index.d.ts";
import {
  APIGuildStageVoiceChannel,
  APIGuildVoiceChannel,
  Snowflake,
} from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents a voice channel.
 * @extends {Channel}
 */
declare class VoiceChannel extends GuildChannel implements VoiceChannelType {
  #private;
  /**
   * Creates the structure for a voice channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the voice channel belongs to.
   * @param {Boolean?} [options.nocache] Whether the voice channel should be cached.
   */
  constructor(
    client: ClientType,
    data:
      | APIGuildVoiceChannel
      | APIGuildStageVoiceChannel
      | VoiceChannelCacheJSON
      | VoiceChannelDiscordJSON
      | VoiceChannelStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
  /**
   * The bitrate of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get bitrate(): number | undefined;
  /**
   * The user limit of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get userLimit(): number | undefined;
  /**
   * The region of the voice channel.
   * @type {String}
   * @readonly
   * @public
   */
  get rtcRegion(): string | undefined;
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
        bitrate: number | undefined;
        user_limit: number | undefined;
        rtc_region: string | undefined;
        id: Snowflake;
        type: import("#typings/discord.js").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        parent_id?: Snowflake | null;
        _attributes: number;
        _cache_options: number;
        messages: import("#typings/index.d.ts").MessageCacheJSON[];
        permission_overwrites: import("#typings/index.d.ts").PermissionOverwriteCacheJSON[];
      }
    | {
        bitrate: number | undefined;
        user_limit: number | undefined;
        rtc_region: string | undefined;
        id: Snowflake;
        type: import("#typings/discord.js").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        parent_id?: Snowflake | null;
        nsfw: boolean;
        messages: import("#typings/index.d.ts").MessageDiscordJSON[];
        permission_overwrites: import("#typings/index.d.ts").PermissionOverwriteDiscordJSON[];
      }
    | {
        bitrate: number | undefined;
        user_limit: number | undefined;
        rtc_region: string | undefined;
        id: Snowflake;
        type: import("#typings/discord.js").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        parent_id?: Snowflake | null;
        _attributes: number;
        _cache_options: number;
        messages: import("#typings/index.d.ts").MessageStorageJSON[];
        permission_overwrites: import("#typings/index.d.ts").PermissionOverwriteStorageJSON[];
      };
}
export default VoiceChannel;
