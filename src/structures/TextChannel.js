const ChannelMessageManager = require("../managers/ChannelMessageManager");
const Channel = require("./Channel");
const Message = require("./Message");

class TextChannel extends Channel {

    constructor(client, data, guild_id, nocache = false) {

        super(client, data, guild_id);

        this.messages = new ChannelMessageManager(client, this);

        if (nocache == false && this.client.cacheChannels == true)
            this.guild?.channels.cache.set(data.id, this);
        else if (this.client.cacheChannels != true)
            this.guilds?.channels.cache.set(data.id, data.name);

    }
    /* https://discord.com/developers/docs/resources/channel#create-message */
    async send(content, { embed, components, files } = {}) {

        const body = {};

        if (content)
            body.content = content;

        if (embed)
            body.embed = embed.toJSON();
        if (components)
            body.components = components.toJSON();
        if (files)
            body.files = files;

        try {

            const data = await this.client.request.makeRequest("postCreateMessage", [this.id], body);
            return new Message(this.client, data, this.id.toString(), this.guild?.id.toString() || this.guild_id.toString(), false);

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    async bulkDelete(messages) {

        const body = {};

        body.messages = messages;

        try {

            await this.client.request.makeRequest("postBulkDeleteMessages", [this.id], body);
            return true;

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

}

module.exports = TextChannel;