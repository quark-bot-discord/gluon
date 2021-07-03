const { CDN_BASE_URL } = require("../constants");

class User {

    constructor(client, data, nocache = false) {

        this.client = client;

        const existing = this.client.users.cache.get(data.id) || null;

        this.id = BigInt(data.id);

        if (data.avatar != undefined)
            this.avatar = data.avatar;
        else if (data.avatar !== null && existing && existing.avatar)
            this.avatar = existing.avatar;

        if (data.bot == true)
            this.bot = data.bot;

        this.username = data.username;

        this.discriminator = data.discriminator;

        // should only cache if actually needed - TBD
        if (nocache == false && this.client.cacheUsers == true)
            this.client.users.cache.set(data.id, this);

    }
    // better to use the one in the member class, as it accounts for guild avatars too
    get displayAvatarURL() {

        return this.avatar ?
            `${CDN_BASE_URL}/avatars/${this.id}/${this.avatar}.${this.avatar.startsWith("a_") ? "gif" : "png"}` :
            `${CDN_BASE_URL}/embed/avatars/${this.discriminator % 5}.png`;

    }

    get tag() {
        
        return this.username + "#" + this.discriminator;

    }

    get createdTimestamp() {

        return ((Number((BigInt.asUintN(64, this.id)) >> 22n) + 1420070400000) / 1000) | 0;

    }

}

module.exports = User;