const { CHANNEL_TYPES } = require("../constants");
const bundleChannel = require("./bundleChannel");
const bundleEmoji = require("./bundleEmoji");
const bundleMember = require("./bundleMember");
const bundleRole = require("./bundleRole");
const bundleThread = require("./bundleThread");
const bundleVoiceState = require("./bundleVoiceState");
const threadTypes = [CHANNEL_TYPES.GUILD_PUBLIC_THREAD, CHANNEL_TYPES.GUILD_PRIVATE_THREAD, CHANNEL_TYPES.GUILD_NEWS_THREAD];

function bundleGuild(guild) {
    const data = {};
    data.id = guild.id.toString();
    data.name = guild.name;
    data.icon = guild.icon;
    data.owner_id = guild.owner_id.toString();
    data.joined_at = guild.joined_at;
    data.premium_tier = guild.premium_tier;
    data.unavailable = guild.unavailable;
    data.member_count = guild.member_count;
    data.preferred_locale = guild.preferred_locale;
    data._cache_options = guild._cache_options;
    data._attributes = guild._attributes;
    data.system_channel_id = guild.system_channel_id;
    data.rules_channel_id = guild.rules_channel_id;
    data.members = [];
    for (const member of guild.members.cache.values()) {
        const bundledMember = bundleMember(member);
        if (bundledMember)
            data.members.push(bundledMember);
    }
    data.channels = [];
    for (const channel of guild.channels.cache.values())
        if (!threadTypes.includes(channel.type))
            data.channels.push(bundleChannel(channel));
    data.threads = [];
    for (const channel of guild.channels.cache.values())
        if (threadTypes.includes(channel.type))
            data.threads.push(bundleThread(channel));
    data.voice_states = [];
    for (const voiceState of guild.voice_states.cache.values())
        data.voice_states.push(bundleVoiceState(voiceState));
    data.roles = [];
    for (const role of guild.roles.cache.values())
        data.roles.push(bundleRole(role));
    data.emojis = [];
    for (const emoji of guild.emojis.cache.values())
        data.emojis.push(bundleEmoji(emoji));
    return data;
}

module.exports = bundleGuild;