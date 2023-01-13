const { CHANNEL_TYPES } = require("../constants");
const TextChannel = require("../structures/TextChannel");
const Thread = require("../structures/Thread");
const VoiceChannel = require("../structures/VoiceChannel");

class GuildChannelsManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

    }

    async fetch(channel_id) {

        const cachedChannel = this.guild.channels.cache.get(channel_id) || null;
        if (this.client.cacheChannels == true)
            return cachedChannel;

        const data = await this.client.request.makeRequest("getChannel", [channel_id]);
        switch (data.type) {
            case CHANNEL_TYPES.GUILD_TEXT:
            case CHANNEL_TYPES.GUILD_NEWS:
            case CHANNEL_TYPES.GUILD_FORUM: {
                return new TextChannel(this.client, data, this.guild.id.toString());
            }
            case CHANNEL_TYPES.GUILD_VOICE:
            case CHANNEL_TYPES.GUILD_STAGE_VOICE: {
                return new VoiceChannel(this.client, data, this.guild.id.toString());
            }
            case CHANNEL_TYPES.GUILD_NEWS_THREAD:
            case CHANNEL_TYPES.GUILD_PUBLIC_THREAD:
            case CHANNEL_TYPES.GUILD_PRIVATE_THREAD: {
                return new Thread(this.client, data, this.guild.id.toString());
            }
            default: {
                return new TextChannel(this.client, data, this.guild.id.toString());
            }
        }

    }

}

module.exports = GuildChannelsManager;