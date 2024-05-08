const Client = require("../Client");
const User = require("../structures/User");

/**
 * Manages all the users belonging to a client.
 */
class UserManager {

    /**
     * Creates a user manager.
     * @param {Client} client The client instance.
     */
    constructor(client) {

        this.client = client;

        this.cache = new Map();

    }

    /**
     * Fetches a particular user.
     * @param {BigInt | String} user_id The id of the user to fetch.
     * @returns {Promise<User>} The fetched user.
     */
    async fetch(user_id) {

        const cachedUser = this.cache.get(user_id.toString());
        if (cachedUser)
            return cachedUser;

        const data = await this.client.request.makeRequest("getUser", [user_id]);

        return new User(this.client, data);

    }

    /**
     * Sweeps all users flagged for deletion.
     * @param {Number} currentTime The current UNIX time.
     * @returns {Number} The number of remaining cached users.
     */
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