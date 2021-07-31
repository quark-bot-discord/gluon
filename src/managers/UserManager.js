const { DEFAULT_USER_EXPIRY_SECONDS } = require("../constants");
const User = require("../structures/User");

class UserManager {

    constructor(client) {

        this.client = client;
        
        this.cache = new Map();

    }

    async fetch(user_id) {

        const cachedUser = this.cache.get(user_id);
        if (cachedUser)
            return cachedUser;

        try {

            const data = await this.client.request.makeRequest("getUser", [user_id]);
            return new User(this.client, data);

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    sweepUsers() {

        if (this.cache.size == 0)
            return;

        const newCache = new Map();

        this.cache.forEach((user, id) => {

            if (user.cached + DEFAULT_USER_EXPIRY_SECONDS > currentTime)
                newCache.set(id, user);

        });

        this.cache = newCache;

        return this.cache.size;

    }

}

module.exports = UserManager;