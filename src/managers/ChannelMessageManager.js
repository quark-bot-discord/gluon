const Message = require("../structures/Message");

class ChannelMessageManager {

    constructor(client, channel) {

        this.client = client;

        this.channel = channel;

        this.cache = {};

    }

    async fetch(options) {

        if (typeof options == "object") {

            const body = {};

            if (options.around)
                body.around = options.around;

            if (options.before)
                body.before = options.before;

            if (options.after)
                body.after = options.after;

            if (options.limit)
                body.limit = options.limit;

            try {

                const data = await this.client.request.makeRequest("getChannelMessages", [this.channel.id], body);
                let messages = [];
                for (let i = 0; i < data.length; i++)
                    messages.push(new Message(this.client, data[i], data[i].channel_id, this.channel.guild.id));
                return messages;

            } catch (error) {

                throw error;

            }

        } else if (typeof options == "string") {

            try {

                const data = await this.client.request.makeRequest("getChannelMessage", [this.channel.id, options]);
                return new Message(this.client, data, this.channel);

            } catch (error) {

                throw error;

            }

        }

    }

}

module.exports = ChannelMessageManager;