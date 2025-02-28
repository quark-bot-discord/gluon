import ClientType from "src/interfaces/Client.js";
import CategoryChannel from "../../structures/CategoryChannel.js";
import TextChannel from "../../structures/TextChannel.js";
import Thread from "../../structures/Thread.js";
import VoiceChannel from "../../structures/VoiceChannel.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  AnyChannelType,
  ChannelTypes,
} from "src/structures/interfaces/Channel.js";

/**
 * Automatically determines the channel type and caches the channel appropriately.
 * @param {Client} client The client instance.
 * @param {Object} data The raw channel data from Discord.
 * @param {String} guildId The id of the guild that the channel belongs to.
 * @param {Boolean?} nocache Whether the channel should be cached.
 * @returns {VoiceChannel | Thread | TextChannel}
 */
function cacheChannel(
  client: ClientType,
  data: any,
  guildId: Snowflake,
  nocache = false,
): AnyChannelType {
  switch (data.type) {
    case ChannelTypes.GUILD_VOICE:
    case ChannelTypes.GUILD_STAGE_VOICE: {
      return new VoiceChannel(client, data, { guildId, nocache });
    }

    case ChannelTypes.GUILD_NEWS_THREAD:
    case ChannelTypes.GUILD_PUBLIC_THREAD:
    case ChannelTypes.GUILD_PRIVATE_THREAD: {
      return new Thread(client, data, { guildId, nocache });
    }

    case ChannelTypes.GUILD_CATEGORY: {
      return new CategoryChannel(client, data, { guildId, nocache });
    }

    default: {
      return new TextChannel(client, data, { guildId, nocache });
    }
  }
}

export default cacheChannel;
