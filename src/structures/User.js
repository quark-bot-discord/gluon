class User {

    constructor(client, data) {

        this.avatar = data.avatar || null;

        this.bot = data.bot || false;

        this.id = data.id;

        this.username = data.username;

        client.users.cache[this.id] = this;

    }

}

module.exports = User;