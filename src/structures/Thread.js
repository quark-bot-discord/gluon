const { CHANNEL_TYPES } = require("../constants");
const ChannelMessageManager = require("../managers/ChannelMessageManager");
const Channel = require("./Channel");

class Thread extends Channel {

    constructor(client, data, guild_id, nocache = false) {

        super(client, data, guild_id);

        this.messages = new ChannelMessageManager();

        this.owner_id = BigInt(data.owner_id);

        this.parent_id = BigInt(data.parent_id);
        
        /* probably shouldnt cache archived threads */
        if (nocache == false)
            this.client.guilds.cache.get(guild_id).threads.cache.set(data.id, this);

    }

    async send(content, { }) {
        // wtf is this
        return await this.client.request.makeRequest("postCreateMessage", [this.id]);

    }

}

module.exports = Thread;