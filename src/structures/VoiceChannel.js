const { CHANNEL_TYPES } = require("../constants");
const ChannelMessageManager = require("../managers/ChannelMessageManager");
const Channel = require("./Channel");

class VoiceChannel extends Channel {

    constructor(client, data, guild_id, nocache = false) {

        super(client, data, guild_id);

        const existing = client.guilds.cache.get(guild_id)?.channels.cache.get(data.id) || null;

        /**
         * The message manager for this channel.
         * @type {ChannelMessageManager}
         */
        this.messages = existing && existing.messages && existing.messages.cache ? existing.messages : new ChannelMessageManager(client, this);

        if (data.type == CHANNEL_TYPES.GUILD_STAGE_VOICE)
            this.stage = true;

        if (nocache == false && this.client.cacheChannels == true)
            this.guild?.channels.cache.set(data.id, this);

    }

}

module.exports = VoiceChannel;