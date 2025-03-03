import ClientType from "src/interfaces/Client.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  APIGuildCategoryChannel,
  APIGuildStageVoiceChannel,
  APIGuildVoiceChannel,
  APIThreadChannel,
} from "discord-api-types/v10";
import { AllChannels } from "typings/index.js";
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
    | APIGuildCategoryChannel,
  guildId: Snowflake,
  nocache?: boolean,
): AllChannels;
export default cacheChannel;
