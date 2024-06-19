const { GLUON_CACHING_OPTIONS } = require("../constants");
const Member = require("./Member");

/**
 * Represents a voice state.
 */
class VoiceState {

    /**
     * Creates the structure for a voice state.
     * @param {Client} client The client instance.
     * @param {Object} data The raw voice state data from Discord.
     * @param {String} guild_id The id of the guild that the voice state belongs to.
     * @param {Boolean?} nocache Whether this voice state should be cached.
     */
    constructor(client, data, guild_id, nocache = false) {

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The guild that this voice state belongs to.
         * @type {Guild?}
         */
        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!this.guild)
            /**
             * The id of the guild that this voice state belongs to.
             * @type {BigInt?}
             */
            this.guild_id = BigInt(guild_id);

        if (this.guild)
            nocache = ((this.guild._cache_options & GLUON_CACHING_OPTIONS.NO_VOICE_STATE) == GLUON_CACHING_OPTIONS.NO_VOICE_STATE);

        const existing = this.guild?.voice_states.cache.get(data.user_id) || null;

        /**
         * The channel involved.
         * @type {Channel?}
         */
        this.channel = this.guild?.channels.cache.get(data.channel_id) || null;

        if (!this.channel)
            /**
             * The id of the channel involved.
             * @type {BigInt?}
             */
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

        if (data.suppress == true)
            this._attributes |= (0b1 << 6);

        if (data.member)
            /**
             * The member the voice state is about.
             * @type {Member?}
             */
            this.member = new Member(this.client, data.member, data.user_id, data.guild_id, data.member.user, nocache);
        else
            this.member = this.guild?.members.cache.get(data.user_id) || null;

        /**
         * The user the voice state is about.
         * @type {User?}
         */
        this.user = this.client.users.cache.get(data.user_id) || null;

        if (!this.user)
            /**
             * The id of the user the voice state is about.
             * @type {BigInt?}
             */
            this.user_id = BigInt(data.user_id);

        /**
         * The UNIX time the user joined the voice channel.
         * @type {Number}
         */
        if (typeof data.joined == "number")
            this.joined = data.joined;
        else if (existing && typeof existing.joined == "number")
            this.joined = existing.joined;
        else
            this.joined = (Date.now() / 1000) | 0;

        /**
         * The UNIX timestamp of when the user requested to speak.
         * @type {Number?}
         */
        if (data.request_to_speak_timestamp)
            this.request_to_speak_timestamp = (new Date(data.request_to_speak_timestamp).getTime() / 1000) | 0;

        if (nocache == false && this.client.cacheVoiceStates == true)
            this.guild?.voice_states.cache.set(data.user_id, this);

    }

    /**
     * Is server deafened?
     * @readonly
     * @type {Boolean}
     */
    get deaf() {

        return (this._attributes & (0b1 << 0)) == (0b1 << 0);

    }

    /**
     * Is server muted?
     * @readonly
     * @type {Boolean}
     */
    get mute() {

        return (this._attributes & (0b1 << 1)) == (0b1 << 1);

    }

    /**
     * Is self defeaned?
     * @readonly
     * @type {Boolean}
     */
    get self_deaf() {

        return (this._attributes & (0b1 << 2)) == (0b1 << 2);

    }

    /**
     * Is self muted?
     * @readonly
     * @type {Boolean}
     */
    get self_mute() {

        return (this._attributes & (0b1 << 3)) == (0b1 << 3);

    }

    /**
     * Is streaming?
     * @readonly
     * @type {Boolean}
     */
    get self_stream() {

        return (this._attributes & (0b1 << 4)) == (0b1 << 4);

    }

    /**
     * Is sharing video?
     * @readonly
     * @type {Boolean}
     */
    get self_video() {

        return (this._attributes & (0b1 << 5)) == (0b1 << 5);
        
    }

    /**
     * Is suppressed (for stage channels)?
     * @readonly
     * @type {Boolean}
     */
    get suppress() {

        return (this._attributes & (0b1 << 6)) == (0b1 << 6);

    }

}

module.exports = VoiceState;