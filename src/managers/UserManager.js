const User = require("../structures/User");

class UserManager {

    constructor(client) {

        this.client = client;
        
        this.cache = new Map();

    }

    async fetch(user_id) {

        try {

            const data = await this.client.request.makeRequest("getUser", [user_id]);
            return new User(this.client, data);

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

}

module.exports = UserManager;