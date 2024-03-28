const Role = require("../structures/Role");

class GuildRoleManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

    }

    async fetch(role_id) {

        const cachedRole = this.cache.get(role_id.toString()) || null;
        if (this.client.cacheRoles == true)
            return cachedRole;

        const data = await this.client.request.makeRequest("getRoles", [this.guild.id]);
        let matchedRole;
        for (let i = 0; i < data.length; i++) {
            const role = new Role(this.client, data[i], this.guild.id);
            if (role.id == role_id)
                matchedRole = role;
        }

        return matchedRole;

    }

}

module.exports = GuildRoleManager;