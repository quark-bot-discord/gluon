const User = require("../structures/User");

class UserManager {

    constructor(client) {

        this.client = client;

        this.cache = new Map();

    }

    async fetch(user_id) {

        const cachedUser = this.cache.get(user_id.toString());
        if (cachedUser)
            return cachedUser;

        const data = await this.client.request.makeRequest("getUser", [user_id]);

        return new User(this.client, data);

    }

    sweepUsers(currentTime) {

        if (this.cache.size == 0)
            return;

        const currentCacheSize = this.cache.size;
        const currentCacheKeys = this.cache.keys();
        const currentCacheValues = this.cache.values();

        for (let i = 0; i < currentCacheSize; i++)
            if ((currentCacheValues.next().value.cached || 0) + this.client.defaultUserExpiry < currentTime)
                this.cache.delete(currentCacheKeys.next().value);

        return this.cache.size;

    }

}

module.exports = UserManager;