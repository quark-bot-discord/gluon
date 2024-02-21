class Emoji {
    
    constructor(client, data, guild_id, nocache = false) {

        this.client = client;

        this.id = BigInt(data.id);

        this.name = data.name;

        if (nocache == false && this.client.cacheEmojis == true)
            this.client.guilds.cache.get(guild_id)?.emojis.cache.set(data.id, this);

    }

}

module.exports = Emoji;