const Message = require("../structures/Message");

class ChannelMessageManager {

    constructor(client, channel) {

        this.client = client;

        this.channel = channel;

        this.cache = new Map();

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

            const cachedMessage = this.channel.cache.get(options);
            if (cachedMessage)
                return cachedMessage;

            try {

                const data = await this.client.request.makeRequest("getChannelMessage", [this.channel.id, options]);
                return new Message(this.client, data, this.channel);

            } catch (error) {

                throw error;

            }

        }

    }

    sweepMessages() {

        this.cache.forEach((message, id) => {

            const x = this.channel.guild.member_count < 500000 ? this.channel.guild.member_count / 500000 : 499999;
            /* creates an "S-Curve" for how many messages should be cached */
            /* more members => assume more activity => therefore more messages to be cached */
            /* minimum of 50 messages to be cached, and a maximum of 1000 */
            /* having greater than 500000 members has no effect */
            const cache = (Math.floor(1 / (1 + Math.pow(x / (1 - x), -2))) * 1000) + 50;

        });

    }

}

module.exports = ChannelMessageManager;