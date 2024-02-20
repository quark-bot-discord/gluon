class Role {
    
    constructor(client, data, guild_id, nocache = false) {

        this.client = client;

        this.id = BigInt(data.id);

        this.name = data.name;

        this.color = data.color;

        this.position = data.position;

        this.permissions = BigInt(data.permissions);

        this._attributes = 0;

        if (data.hoist == true)
            this._attributes |= (0b1 << 0);

        if (data.managed == true)
            this._attributes |= (0b1 << 1);

        if (data.mentionable == true)
            this._attributes |= (0b1 << 2);

        if (data.tags)
            this.tags = data.tags;

        if (nocache == false && this.client.cacheRoles == true)
            this.client.guilds.cache.get(guild_id)?.roles.cache.set(data.id, this);

    }

    get hoist() {

        return (this._attributes & (0b1 << 0)) == (0b1 << 0);

    }

    get managed() {

        return (this._attributes & (0b1 << 1)) == (0b1 << 1);

    }

    get mentionable() {

        return (this._attributes & (0b1 << 2)) == (0b1 << 2);

    }

}

module.exports = Role;