const bundleMember = require("./bundleMember");

function bundleVoiceState(voiceState) {
    const data = {};
    data.guild_id = voiceState.guild ? voiceState.guild.id.toString() : voiceState.guild_id.toString();
    data.channel_id = voiceState.channel ? voiceState.channel.id.toString() : voiceState.channel_id.toString();
    data.deaf = voiceState.deaf;
    data.mute = voiceState.mute;
    data.self_deaf = voiceState.self_deaf;
    data.self_mute = voiceState.self_mute;
    data.self_stream = voiceState.self_stream;
    data.self_video = voiceState.self_video;
    data.member = bundleMember(voiceState.member);
    data.user_id = voiceState.user ? voiceState.user.id.toString() : voiceState.user_id.toString();
    return data;
}

module.exports = bundleVoiceState;