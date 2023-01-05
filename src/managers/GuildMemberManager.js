const Member = require("../structures/Member");

class GuildMemberManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

    }

    async fetch(user_id) {

        const cached = this.cache.get(user_id.toString);
        if (cached)
            return cached;

        try {

            const data = await this.client.request.makeRequest("getGuildMember", [this.guild.id, user_id]);
            return new Member(this.client, data, user_id, this.guild.id.toString(), data.user);

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    async search(query) {

        const body = {};

        body.query = query;

        body.limit = 1000;

        try {

            const data = await this.client.request.makeRequest("getSearchGuildMembers", [this.guild.id], body);
            if (data.length != 0) {

                let members = [];

                for (let i = 0; i < data.length; i++)
                    members.push(new Member(this.client, data[i], data[i].user.id, this.guild.id.toString(), data[i].user));

                return members;

            } else
                return null;

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    sweepMembers(cacheCount) {

        if (this.cache.size == 0)
            return;

        const currentCacheSize = this.cache.size;
        const currentCacheKeys = this.cache.keys();

        for (let i = 0, cacheSize = currentCacheSize; cacheCount < cacheSize; i++, cacheSize--)
            this.cache.delete(currentCacheKeys[i]);

        return this.cache.size;

    }

}

module.exports = GuildMemberManager;