const Client = require("../Client");

/**
 * Manages all guilds belonging to this client.
 */
class GuildManager {

    /**
     * Creates a guild manager.
     * @param {Client} client The client instance.
     */
    constructor(client) {

        this.client = client;

        this.cache = new Map();
        
    }

}

module.exports = GuildManager;