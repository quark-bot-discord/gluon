import {
  APIGuildCategoryChannel,
  APIGuildStageVoiceChannel,
  APIGuildVoiceChannel,
  APIThreadChannel,
  GatewayChannelCreateDispatchData,
  Snowflake,
} from "#typings/discord.js";
import type { AllChannels, Client as ClientType } from "typings/index.d.ts";
/**
 * Caches a channel based on its type and returns the appropriate channel instance.
 *
 * @param client - The client instance used to create the channel.
 * @param data - The data of the channel to be cached. This can be one of several types:
 *   - `APIGuildVoiceChannel`
 *   - `APIGuildStageVoiceChannel`
 *   - `APIThreadChannel`
 *   - `APIGuildCategoryChannel`
 *   - `GatewayChannelCreateDispatchData`
 * @param guildId - The ID of the guild to which the channel belongs.
 * @param nocache - Optional flag to indicate whether the channel should not be cached. Defaults to `false`.
 * @returns An instance of the appropriate channel type:
 *   - `VoiceChannel` for voice and stage voice channels
 *   - `Thread` for announcement, public, and private threads
 *   - `CategoryChannel` for category channels
 *   - `TextChannel` for all other channel types
 */
export declare function cacheChannel(
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
