const { CHANNEL_TYPES } = require("../constants");
const ChannelMessageManager = require("../managers/ChannelMessageManager");
const Channel = require("./Channel");

class Thread extends Channel {

    constructor(client, data, guild_id) {

        super(client, data, guild_id);

        this.messages = new ChannelMessageManager();

        this.owner_id = data.owner_id;

        this.parent_id = data.parent_id;
        
        /* probably shouldnt cache archived threads */
        this.client.guilds.cache[guild_id].threads.cache[this.id] = this;

    }

    async send(content, options) {

        return await this.client.request.makeRequest("postCreateMessage", [this.id]);

    }

}

module.exports = Thread;