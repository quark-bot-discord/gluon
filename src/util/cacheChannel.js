const { CHANNEL_TYPES } = require("../constants");
const TextChannel = require("../structures/TextChannel");
const Thread = require("../structures/Thread");
const VoiceChannel = require("../structures/VoiceChannel");

function cacheChannel(client, data, guild_id, nocache = false) {
    
    switch (data.type) {

        case CHANNEL_TYPES.GUILD_VOICE:
        case CHANNEL_TYPES.GUILD_STAGE_VOICE: {

            return new VoiceChannel(client, data, guild_id, nocache);

        }

        case CHANNEL_TYPES.GUILD_NEWS_THREAD:
        case CHANNEL_TYPES.GUILD_PUBLIC_THREAD:
        case CHANNEL_TYPES.GUILD_PRIVATE_THREAD: {

            return new Thread(client, data, guild_id, nocache);

        }

        default: {

            return new TextChannel(client, data, guild_id, nocache);

        }

    }

}

module.exports = cacheChannel;