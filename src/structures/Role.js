class Role {
    
    constructor(client, data, guild_id, nocache = false) {

        this.client = client;

        this.id = BigInt(data.id);

        this.position = data.position;

        this.permissions = BigInt(data.permissions);

        if (data.name == "Muted" || data.defaultMuteRole == true)
            this.defaultMuteRole = true;

        if (nocache == false && this.client.cacheRoles == true)
            this.client.guilds.cache.get(guild_id)?.roles.cache.set(data.id, this);

    }

}

module.exports = Role;