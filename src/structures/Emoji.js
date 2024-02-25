class Emoji {
    
    constructor(client, data, guild_id, nocache = false) {

        this.client = client;

        this.id = BigInt(data.id);

        this.name = data.name;

        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!this.guild)
            this.guild_id = BigInt(guild_id);

        if (nocache == false && this.client.cacheEmojis == true)
            this.client.guilds.cache.get(guild_id)?.emojis.cache.set(data.id, this);

    }

}

module.exports = Emoji;