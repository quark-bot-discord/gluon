import CategoryChannel from "../../structures/CategoryChannel.js";
import TextChannel from "../../structures/TextChannel.js";
import Thread from "../../structures/Thread.js";
import VoiceChannel from "../../structures/VoiceChannel.js";
import { ChannelType } from "discord-api-types/v10";
/**
 * Automatically determines the channel type and caches the channel appropriately.
 * @param {Client} client The client instance.
 * @param {Object} data The raw channel data from Discord.
 * @param {String} guildId The id of the guild that the channel belongs to.
 * @param {Boolean?} nocache Whether the channel should be cached.
 * @returns {VoiceChannel | Thread | TextChannel}
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
