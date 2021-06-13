class GuildMemberManager {

    constructor(client) {

        this.client = client;

        this.cache = new Map();

    }

}

module.exports = GuildMemberManager;