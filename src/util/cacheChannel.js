const { CHANNEL_TYPES } = require("../constants");
const TextChannel = require("../structures/TextChannel");
const VoiceChannel = require("../structures/VoiceChannel");

function cacheChannel(client, data, guild_id) {
    switch (data.type) {

        case CHANNEL_TYPES.GUILD_TEXT: {

            return new TextChannel(client, data, guild_id);

        }

        case CHANNEL_TYPES.GUILD_VOICE:
        case CHANNEL_TYPES.GUILD_STAGE_VOICE: {

            return new VoiceChannel(client, data, guild_id);

        }

    }

}

module.exports = cacheChannel;