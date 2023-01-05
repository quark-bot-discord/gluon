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

    sweepUsers(currentTime) {

        if (this.cache.size == 0)
            return;

        const currentCacheSize = this.cache.size;
        const currentCacheKeys = this.cache.keys();
        const currentCacheValues = this.cache.values();

        for (let i = 0; i < currentCacheSize; i++)
            if (currentCacheValues[i].cached + DEFAULT_USER_EXPIRY_SECONDS < currentTime)
                this.cache.delete(currentCacheKeys[i]);

        return this.cache.size;

    }

}

module.exports = UserManager;