const { CHANNEL_TYPES } = require("../constants");
const cacheChannel = require("../util/cacheChannel");

class GuildChannelsManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

    }

    async fetch(channel_id) {

        const cachedChannel = this.cache.get(channel_id.toString()) || null;
        if (this.client.cacheChannels == true)
            return cachedChannel;

        const data = await this.client.request.makeRequest("getChannel", [channel_id]);

        return cacheChannel(this.client, data, this.guild.id.toString());

    }

}

module.exports = GuildChannelsManager;