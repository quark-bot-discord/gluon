const { CHANNEL_TYPES } = require("../constants");
const Channel = require("./Channel");

class VoiceChannel extends Channel {

    constructor(client, data, guild_id, nocache = false) {

        super(client, data, guild_id);

        const existing = this.guild?.channels.cache.get(data.id) || null;

        if (typeof data.bitrate == "number")
            this.bitrate = data.bitrate;
        else if (existing && typeof existing.bitrate)
            this.bitrate = existing.bitrate;

        if (typeof data.user_limit == "number")
            this.user_limit = data.user_limit;
        else if (existing && typeof existing.user_limit == "number")
            this.user_limit = existing.user_limit;

        if (typeof data.rtc_region == "string")
            this.rtc_region = data.rtc_region;
        else if (existing && typeof existing.rtc_region == "string")
            this.rtc_region = existing.rtc_region;

        if (nocache == false && this.client.cacheChannels == true)
            this.guild?.channels.cache.set(data.id, this);

    }

}

module.exports = VoiceChannel;