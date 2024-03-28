const Member = require("../structures/Member");

class GuildMemberManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

    }

    async fetch(user_id) {

        const cached = this.cache.get(user_id.toString());
        if (cached)
            return cached;

        const data = await this.client.request.makeRequest("getGuildMember", [this.guild.id, user_id]);

        return new Member(this.client, data, user_id, this.guild.id.toString(), data.user);

    }

    async search(query) {

        const body = {};

        body.query = query;

        body.limit = 1000;

        const data = await this.client.request.makeRequest("getSearchGuildMembers", [this.guild.id], body);
        if (data.length != 0) {

            let members = [];

            for (let i = 0; i < data.length; i++)
                members.push(new Member(this.client, data[i], data[i].user.id, this.guild.id.toString(), data[i].user));

            return members;

        } else
            return null;

    }

    sweepMembers(cacheCount) {

        if (this.cache.size == 0)
            return;

        const currentCacheSize = this.cache.size;
        const currentCacheKeys = this.cache.keys();

        for (let cacheSize = currentCacheSize; cacheCount < cacheSize; cacheSize--)
            this.cache.delete(currentCacheKeys.next().value);

        return this.cache.size;

    }

}

module.exports = GuildMemberManager;