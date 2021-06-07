class User {

    constructor(client, data) {

        this.avatar = data.avatar || null;

        if (data.bot == true)
            this.bot = data.bot;

        this.id = data.id;

        this.username = data.username;

        this.discriminator = data.discriminator;

        client.users.cache[this.id] = this;

        return this;

    }

}

module.exports = User;