const { CHANNEL_TYPES } = require("../constants");
const TextChannel = require("../structures/TextChannel");
const VoiceChannel = require("../structures/VoiceChannel");

function cacheChannel(client, data, guild_id, nocache = false) {
    
    switch (data.type) {

        case CHANNEL_TYPES.GUILD_TEXT:
        case CHANNEL_TYPES.GUILD_NEWS:
        case CHANNEL_TYPES.GUILD_FORUM: {

            return new TextChannel(client, data, guild_id, nocache);

        }

        case CHANNEL_TYPES.GUILD_VOICE:
        case CHANNEL_TYPES.GUILD_STAGE_VOICE: {

            return new VoiceChannel(client, data, guild_id, nocache);

        }

        default: {

            return new TextChannel(client, data, guild_id, nocache);

        }

    }

}

module.exports = cacheChannel;