const { GLUON_CACHING_OPTIONS } = require("../constants");
const Member = require("./Member");

class VoiceState {

    constructor(client, data, guild_id, nocache = false) {

        nocache = ((this.guild._cache_options & GLUON_CACHING_OPTIONS.NO_VOICE_STATE) == GLUON_CACHING_OPTIONS.NO_VOICE_STATE);

        this.client = client;

        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!this.guild)
            this.guild_id = BigInt(guild_id);

        this.channel = this.guild?.channels.cache.get(data.channel_id) || null;

        if (!this.channel)
            this.channel_id = BigInt(data.channel_id);

        this._attributes = 0;

        if (data.deaf == true)
            this._attributes |= (0b1 << 0);

        if (data.mute == true)
            this._attributes |= (0b1 << 1);

        if (data.self_deaf == true)
            this._attributes |= (0b1 << 2);

        if (data.self_mute == true)
            this._attributes |= (0b1 << 3);

        if (data.self_stream == true)
            this._attributes |= (0b1 << 4);

        if (data.self_video == true)
            this._attributes |= (0b1 << 5);

        if (data.member)
            this.member = new Member(this.client, data.member, data.user_id, data.guild_id, data.member.user, nocache);
        else
            this.member = this.guild?.members.cache.get(data.user_id) || null;

        this.user = this.client.users.cache.get(data.user_id) || null;

        if (!this.user)
            this.user_id = BigInt(data.user_id);

        if (nocache == false && this.client.cacheVoiceStates == true)
            this.guild?.voice_states.cache.set(data.user_id, this);

    }

    get deaf() {

        return (this._attributes & (0b1 << 0)) == (0b1 << 0);

    }

    get mute() {

        return (this._attributes & (0b1 << 1)) == (0b1 << 1);

    }

    get self_deaf() {

        return (this._attributes & (0b1 << 2)) == (0b1 << 2);

    }

    get self_mute() {

        return (this._attributes & (0b1 << 3)) == (0b1 << 3);

    }

    get self_stream() {

        return (this._attributes & (0b1 << 4)) == (0b1 << 4);

    }

    get self_video() {

        return (this._attributes & (0b1 << 5)) == (0b1 << 5);
        
    }

}

module.exports = VoiceState;