import { CHANNEL_TYPES } from "../../constants.js";
import TextChannel from "../../structures/TextChannel.js";
import Thread from "../../structures/Thread.js";
import VoiceChannel from "../../structures/VoiceChannel.js";

/**
 * Automatically determines the channel type and caches the channel appropriately.
 * @param {Client} client The client instance.
 * @param {Object} data The raw channel data from Discord.
 * @param {String} guild_id The id of the guild that the channel belongs to.
 * @param {Boolean?} nocache Whether the channel should be cached.
 * @returns {VoiceChannel | Thread | TextChannel}
 */
function cacheChannel(client, data, guild_id, nocache = false) {
  switch (data.type) {
    case CHANNEL_TYPES.GUILD_VOICE:
    case CHANNEL_TYPES.GUILD_STAGE_VOICE: {
      return new VoiceChannel(client, data, { guild_id, nocache });
    }

    case CHANNEL_TYPES.GUILD_NEWS_THREAD:
    case CHANNEL_TYPES.GUILD_PUBLIC_THREAD:
    case CHANNEL_TYPES.GUILD_PRIVATE_THREAD: {
      return new Thread(client, data, { guild_id, nocache });
    }

    default: {
      return new TextChannel(client, data, { guild_id, nocache });
    }
  }
}

export default cacheChannel;
