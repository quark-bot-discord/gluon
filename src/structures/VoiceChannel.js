const { CHANNEL_TYPES } = require("../constants");
const Channel = require("./Channel");

class VoiceChannel extends Channel {

    constructor(client, data, guild_id, nocache = false) {

        super(client, data, guild_id);

        if (data.type == CHANNEL_TYPES.GUILD_STAGE_VOICE) 
            this.stage = true;

        if (nocache == false && this.client.cacheChannels == true)
            this.client.guilds.cache.get(guild_id)?.channels.cache.set(data.id, this);

    }

}

module.exports = VoiceChannel;