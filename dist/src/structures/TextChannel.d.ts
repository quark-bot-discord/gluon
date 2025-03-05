import GuildChannel from "./GuildChannel.js";
import util from "util";
import { Snowflake } from "src/interfaces/gluon.js";
import type {
  TextChannel as TextChannelType,
  TextChannelCacheJSON,
  TextChannelDiscordJSON,
  TextChannelStorageJSON,
  Client as ClientType,
} from "../../typings/index.d.ts";
import {
  APIGuildTextChannel,
  ChannelType,
  GuildTextChannelType,
} from "discord-api-types/v10";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents a text channel within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
 */
declare class TextChannel extends GuildChannel implements TextChannelType {
  #private;
  /**
   * Creates the structure for a text channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @param {Boolean?} [options.nocache] Whether this channel should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
   */
  constructor(
    client: ClientType,
    data:
      | APIGuildTextChannel<GuildTextChannelType>
      | APIGuildTextChannel<ChannelType.GuildForum>
      | APIGuildTextChannel<ChannelType.GuildMedia>
      | TextChannelCacheJSON
      | TextChannelDiscordJSON
      | TextChannelStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
  /**
   * Bulk deletes all the message IDs provided.
   * @param {String[]} messages An array of message IDs, as strings.
   * @param {Object?} [options] Additional options for this method.
   * @param {String?} [options.reason] The reason for this action.
   * @returns {Promise<void>}
   * @method
   * @async
   * @public
   * @throws {Error | TypeError}
   */
  bulkDelete(
    messages: Snowflake[],
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
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
        id: import("discord-api-types/globals").Snowflake;
        type: ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        parent_id?: import("discord-api-types/globals").Snowflake | null;
        nsfw: boolean;
        messages: import("../../typings/index.d.ts").MessageCacheJSON[];
        permission_overwrites: import("../../typings/index.d.ts").PermissionOverwriteCacheJSON[];
      }
    | {
        id: import("discord-api-types/globals").Snowflake;
        type: ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        parent_id?: import("discord-api-types/globals").Snowflake | null;
        nsfw: boolean;
        messages: import("../../typings/index.d.ts").MessageDiscordJSON[];
        permission_overwrites: import("../../typings/index.d.ts").PermissionOverwriteDiscordJSON[];
      }
    | {
        id: import("discord-api-types/globals").Snowflake;
        type: ChannelType;
        name: string;
        topic?: string;
        rate_limit_per_user?: number;
        position?: number;
        parent_id?: import("discord-api-types/globals").Snowflake | null;
        _attributes: number;
        _cacheOptions: number;
        messages: import("../../typings/index.d.ts").MessageStorageJSON[];
        permission_overwrites: import("../../typings/index.d.ts").PermissionOverwriteStorageJSON[];
      };
}
export default TextChannel;
