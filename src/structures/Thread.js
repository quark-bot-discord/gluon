const ChannelMessageManager = require("../managers/ChannelMessageManager");
const Channel = require("./Channel");

class Thread extends Channel {

    constructor(client, data, guild_id, nocache = false) {

        super(client, data, guild_id);

        this.messages = new ChannelMessageManager(client, this);

        this.owner_id = BigInt(data.owner_id);

        this.parent = this.guild?.channels.cache.get(data.parent_id) || null;

        if (!this.parent)
            this.parent_id = BigInt(data.parent_id);

        /* probably shouldnt cache archived threads */
        if (nocache == false && data.archived != true)
            this.guild?.channels.cache.set(data.id, this);

    }

    async send(content, { }) {
        // wtf is this
        return await this.client.request.makeRequest("postCreateMessage", [this.id]);

    }

}

module.exports = Thread;