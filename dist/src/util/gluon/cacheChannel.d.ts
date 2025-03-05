import { Snowflake } from "src/interfaces/gluon.js";
import {
  APIGuildCategoryChannel,
  APIGuildStageVoiceChannel,
  APIGuildVoiceChannel,
  APIThreadChannel,
  GatewayChannelCreateDispatchData,
} from "discord-api-types/v10";
import type { AllChannels, Client as ClientType } from "typings/index.d.ts";
/**
 * Automatically determines the channel type and caches the channel appropriately.
 * @param {Client} client The client instance.
 * @param {Object} data The raw channel data from Discord.
 * @param {String} guildId The id of the guild that the channel belongs to.
 * @param {Boolean?} nocache Whether the channel should be cached.
 * @returns {VoiceChannel | Thread | TextChannel}
 */
declare function cacheChannel(
  client: ClientType,
  data:
    | APIGuildVoiceChannel
    | APIGuildStageVoiceChannel
    | APIThreadChannel
    | APIGuildCategoryChannel
    | GatewayChannelCreateDispatchData,
  guildId: Snowflake,
  nocache?: boolean,
): AllChannels;
export default cacheChannel;
