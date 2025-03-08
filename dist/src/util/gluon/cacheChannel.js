import CategoryChannel from "../../structures/CategoryChannel.js";
import TextChannel from "../../structures/TextChannel.js";
import Thread from "../../structures/Thread.js";
import VoiceChannel from "../../structures/VoiceChannel.js";
import { ChannelType } from "#typings/discord.js";
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
function cacheChannel(client, data, guildId, nocache = false) {
  switch (data.type) {
    case ChannelType.GuildVoice:
    case ChannelType.GuildStageVoice: {
      return new VoiceChannel(client, data, { guildId, nocache });
    }
    case ChannelType.AnnouncementThread:
    case ChannelType.PublicThread:
    case ChannelType.PrivateThread: {
      return new Thread(client, data, { guildId, nocache });
    }
    case ChannelType.GuildCategory: {
      return new CategoryChannel(client, data, { guildId, nocache });
    }
    default: {
      return new TextChannel(client, data, { guildId, nocache });
    }
  }
}
export default cacheChannel;
//# sourceMappingURL=cacheChannel.js.map
