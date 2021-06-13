const { CDN_BASE_URL } = require("../constants");

class User {

    constructor(client, data) {

        this.client = client;

        this.avatar = data.avatar || null;

        if (data.bot == true)
            this.bot = data.bot;

        this.id = data.id;

        this.username = data.username;

        this.discriminator = data.discriminator;

        // should only cache if actually needed - TBD
        this.client.users.cache.set(this.id, this);

    }
    // better to use the one in the member class, as it accounts for guild avatars too
    get displayAvatarURL() {

        return this.avatar ?
            `${CDN_BASE_URL}/avatars/${this.id}/${this.avatar}.png` :
            `${CDN_BASE_URL}/embed/avatars/${this.discriminator % 5}.png`;

    }

    get tag() {
        
        return this.username + "#" + this.discriminator;

    }

    get createdTimestamp() {

        return (((this.id >> 22) + 1420070400000) / 1000) | 0;

    }

}

module.exports = User;