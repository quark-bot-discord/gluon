const Member = require("./Member");

class VoiceState {

    constructor(client, data, guild_id, nocache = false) {

        this.client = client;

        this.guild = this.client.guilds.cache.get(guild_id);

        this.channel = this.guild.channels.cache.get(data.channel_id);

        this.deaf = data.deaf;

        this.mute = data.mute;

        this.self_deaf = data.self_deaf;

        this.self_mute = data.self_mute;

        this.self_stream = data.self_stream || false;

        this.self_video = data.self_video;

        this.member = this.guild.members.cache.get(data.user_id) || new Member(this.client, data.member, data.user_id, data.guild_id);

        this.user = this.client.users.cache.get(data.user_id);

        if (nocache == false && this.client.cacheVoiceStates == true)
            this.guild.voice_states.cache.set(data.user_id, this);

    }

}

module.exports = VoiceState;