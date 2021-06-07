const Channel = require("./Channel");

class TextChannel extends Channel {

    constructor(client, data, guild_id) {

        // super(client, data, guild_id); ????

    }

    async send(content, options) {

        return await this.client.request.makeRequest("postCreateMessage", [this.id]);

    }

}

module.exports = TextChannel;