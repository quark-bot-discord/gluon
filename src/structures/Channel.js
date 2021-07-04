class Channel {
    constructor(client, data, guild_id) {

        this.client = client;

        this.id = BigInt(data.id);

        // uhh not sure if it is worth keeping this for now, might need it in the future though
        // this.permission_overwrites = data.permission_overwrites;

        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!guild)
            this.guild_id = BigInt(guild_id);

        this.type = data.type;

    }

}

module.exports = Channel;