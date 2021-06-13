const { CHANNEL_TYPES } = require("../constants");
const TextChannel = require("../structures/TextChannel");
const Thread = require("../structures/Thread");
const VoiceChannel = require("../structures/VoiceChannel");

class GuildChannelsManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = {};

    }

    async fetch(channel_id) {

        try {

            const data = await this.client.request.makeRequest("getChannel", [channel_id]);
            switch (data.type) {
                case CHANNEL_TYPES.GUILD_TEXT:
                case CHANNEL_TYPES.GUILD_NEWS: {
                    return new TextChannel(this.client, data, this.guild.id);
                }
                case CHANNEL_TYPES.GUILD_VOICE:
                case CHANNEL_TYPES.GUILD_STAGE_VOICE: {
                    return new VoiceChannel(this.client, data, this.guild.id);
                }
                case CHANNEL_TYPES.GUILD_NEWS_THREAD:
                case CHANNEL_TYPES.GUILD_PUBLIC_THREAD:
                case CHANNEL_TYPES.GUILD_PRIVATE_THREAD: {
                    return new Thread(this.client, data, this.guild.id);
                }
            }

        } catch (error) {

            throw error;

        }

    }

}

module.exports = GuildChannelsManager;