class Channel {
    constructor(client, data, guild_id) {

        this.client = client;

        this.id = data.id;

        this.name = data.name;

        this.permission_overwrites = data.permission_overwrites;

        this.guild = client.guilds.cache[guild_id];

        this.type = data.type;

    }

}

module.exports = Channel;