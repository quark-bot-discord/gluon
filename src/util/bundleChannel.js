function bundleChannel(channel) {
    const data = {};
    data.id = channel.id.toString();
    data.type = channel.type;
    data.guild_id = channel.guild ? channel.guild.id.toString() : channel.guild_id.toString();
    data.name = channel.name;
    return data;
}

module.exports = bundleChannel;