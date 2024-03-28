const Emoji = require("../structures/Emoji");

class GuildEmojisManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

    }

    async fetch(emoji_id) {

        const cached = this.cache.get(emoji_id.toString());
        if (cached)
            return cached;

        const data = await this.client.request.makeRequest("getEmoji", [this.guild.id, emoji_id]);

        return new Emoji(this.client, data, this.guild.id.toString(), data.user);

    }

}

module.exports = GuildEmojisManager;