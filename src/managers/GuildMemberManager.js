const Member = require("../structures/Member");

class GuildMemberManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

    }

    async fetch(user_id) {

        try {

            const data = await this.client.request.makeRequest("getGuildMember", [this.guild.id, user_id], body);
            return new Member(this.client, data, user_id, this.guild.id, data.user);

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

}

module.exports = GuildMemberManager;