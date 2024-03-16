const Message = require("../structures/Message");
const getTimestamp = require("../util/getTimestampFromSnowflake");

class ChannelMessageManager {

    constructor(client, channel) {

        this.client = client;

        this.channel = channel;

        this.cache = new Map();

    }

    async fetch(options) {

        if (typeof options == "object") {

            if (this.cache.size != 0) {
                let cachedMessages = [];
                this.cache.forEach((key, value) => {
                    if (options.before && value.id < options.before)
                        cachedMessages.push(value);
                });
            }

            const body = {};

            if (options.around)
                body.around = options.around;

            if (options.before)
                body.before = options.before;

            if (options.after)
                body.after = options.after;

            if (options.limit)
                body.limit = options.limit;

            const data = await this.client.request.makeRequest("getChannelMessages", [this.channel.id], body);
            let messages = [];
            for (let i = 0; i < data.length; i++)
                messages.push(new Message(this.client, data[i], data[i].channel_id, this.channel.guild.id.toString()));
            return messages;

        } else if (typeof options == "string" || typeof options == "bigint") {

            const cachedMessage = this.cache.get(options);
            if (cachedMessage)
                return cachedMessage;

            const data = await this.client.request.makeRequest("getChannelMessage", [this.channel.id, options]);

            return new Message(this.client, data, this.channel.id.toString(), this.channel.guild.id.toString());

        }

    }

    sweepMessages(cacheCount, currentTime) {

        if (this.cache.size == 0)
            return;

        const currentCacheSize = this.cache.size;
        const currentCacheKeys = this.cache.keys();
        const currentCacheValues = this.cache.values();

        for (let i = 0, cacheSize = currentCacheSize; i < currentCacheSize; i++) {
            const currentCacheValue = currentCacheValues.next().value;
            if (currentCacheValue)
                if ((currentCacheValue.timestamp + this.client.defaultMessageExpiry < currentTime) || (cacheCount != 0 ? cacheSize > cacheCount : false)) {
                    if (this.client.increasedCache.get(this.channel.guild_id?.toString() || this.channel.guild.id.toString()))
                        currentCacheValue.shelf();
                    else {
                        this.cache.delete(currentCacheKeys.next().value);
                        cacheSize--;
                    }
                }
        }

        return this.cache.size;

    }

}

module.exports = ChannelMessageManager;