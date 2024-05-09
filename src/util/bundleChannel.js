const bundleMessage = require("./bundleMessage");

/**
 * Copies all the channel data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for a channel as the "data" parameter to reconstruct this.
 * @param {Channel | TextChannel | VoiceChannel} channel A channel to bundle.
 * @returns {Object}
 */
function bundleChannel(channel) {
    const data = {};
    data.id = channel.id.toString();
    data.type = channel.type;
    data.name = channel.name;
    data.topic = channel.topic;
    data.rate_limit_per_user = channel.rate_limit_per_user;
    data.parent_id = channel.parent_id?.toString();
    data._attributes = channel._attributes;
    data._cache_options = channel._cache_options;
    if (channel.messages) {
        data.messages = [];
        for (const message of channel.messages.cache.values())
            data.messages.push(bundleMessage(message));
    }
    if (channel.bitrate)
        data.bitrate = channel.bitrate;
    if (channel.user_limit)
        data.user_limit = channel.user_limit;
    if (channel.rtc_region)
        data.rtc_region = channel.rtc_region;
    return data;
}

module.exports = bundleChannel;