const Member = require("../structures/Member");

class GuildMemberManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

    }

    async fetch(user_id) {

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

        try {

            const data = await this.client.request.makeRequest("getSearchGuildMembers", [this.guild.id], body);
            if (data.length != 0)
                return new Member(this.client, data[0], data[0].user.id, this.guild.id.toString(), data[0].user);
            else
                return null;

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    sweepMembers(cacheCount) {

        if (this.cache.size == 0)
            return;

        let counter = this.cache.size;

        const newCache = new Map();

        this.cache.forEach((member, id) => {

            if (counter <= cacheCount)
                newCache.set(id, member);

            counter--;

        });

        this.cache = newCache;

        return this.cache.size;

    }

}

module.exports = GuildMemberManager;