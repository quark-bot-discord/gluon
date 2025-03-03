import GuildChannel from "./GuildChannel.js";
import util from "util";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  JsonTypes,
  VoiceChannelCacheJSON,
  VoiceChannelDiscordJSON,
  VoiceChannelStorageJSON,
  VoiceChannel as VoiceChannelType,
  Client as ClientType,
} from "../../typings/index.d.js";
import {
  APIGuildStageVoiceChannel,
  APIGuildVoiceChannel,
} from "discord-api-types/v10";
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
  get bitrate(): any;
  /**
   * The user limit of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get userLimit(): any;
  /**
   * The region of the voice channel.
   * @type {String}
   * @readonly
   * @public
   */
  get rtcRegion(): any;
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
        bitrate: any;
        user_limit: any;
        rtc_region: any;
        id: import("discord-api-types/globals").Snowflake;
        type: import("discord-api-types/v10").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        parent_id?: import("discord-api-types/globals").Snowflake | null;
        nsfw: boolean;
        messages: import("../../typings/index.d.js").MessageCacheJSON[];
        permission_overwrites: import("../../typings/index.d.js").PermissionOverwriteCacheJSON[];
      }
    | {
        bitrate: any;
        user_limit: any;
        rtc_region: any;
        id: import("discord-api-types/globals").Snowflake;
        type: import("discord-api-types/v10").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        parent_id?: import("discord-api-types/globals").Snowflake | null;
        nsfw: boolean;
        messages: import("../../typings/index.d.js").MessageDiscordJSON[];
        permission_overwrites: import("../../typings/index.d.js").PermissionOverwriteDiscordJSON[];
      }
    | {
        bitrate: any;
        user_limit: any;
        rtc_region: any;
        id: import("discord-api-types/globals").Snowflake;
        type: import("discord-api-types/v10").ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        parent_id?: import("discord-api-types/globals").Snowflake | null;
        _attributes: number;
        _cacheOptions: number;
        messages: import("../../typings/index.d.js").MessageStorageJSON[];
        permission_overwrites: import("../../typings/index.d.js").PermissionOverwriteStorageJSON[];
      };
}
export default VoiceChannel;
