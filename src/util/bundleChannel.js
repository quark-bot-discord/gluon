const bundleMessage = require("./bundleMessage");

function bundleChannel(channel) {
    const data = {};
    data.id = channel.id.toString();
    data.type = channel.type;
    data.guild_id = channel.guild ? channel.guild.id.toString() : channel.guild_id.toString();
    data.name = channel.name;
    if (channel.messages) {
        data.messages = [];
        for (const message of channel.messages.cache.values())
            data.messages.push(bundleMessage(message));
    }
    return data;
}

module.exports = bundleChannel;