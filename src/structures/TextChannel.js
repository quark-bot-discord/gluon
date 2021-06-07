const { CHANNEL_TYPES } = require("../constants");
const ChannelMessageManager = require("../managers/ChannelMessageManager");
const Channel = require("./Channel");

class TextChannel extends Channel {

    constructor(client, data, guild_id) {

        super(client, data, guild_id);

        this.messages = new ChannelMessageManager();
        
        this.client.guilds.cache[guild_id].channels.cache[this.id] = this;

    }
    /* https://discord.com/developers/docs/resources/channel#create-message */
    async send(content, options = {}) {
        // need something for files too
        const body = {};

        if (content) body.content = content;
        if (options.embed) body.embed = options.embed.toJSON();
        if (options.components) body.components = options.components.toJSON();

        return await this.client.request.makeRequest("postCreateMessage", [this.channel.id], body);

    }

}

module.exports = TextChannel;