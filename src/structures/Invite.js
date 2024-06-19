const User = require("./User");

/**
 * Represents a guild invite.
 */
class Invite {
    /**
     * 
     * @param {Client} client The client instance.
     * @param {Object} data The raw invite data from Discord.
     * @param {String} guild_id The id of the guild that the invite belongs to.
     * @param {Boolean?} nocache Whether this invite should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-structure}
     */
    constructor(client, data, guild_id, nocache = false) {

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The guild that this role belongs to.
         * @type {Guild?}
         */
        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!this.guild)
            /**
             * The id of the guild that this role belongs to.
             * @type {BigInt?}
             */
            this.guild_id = BigInt(guild_id);

        /**
         * The code for the invite.
         * @type {String}
         */
        this.code = data.code;

        /**
         * The channel the invite is directed to.
         * @type {(TextChannel | VoiceChannel)?}
         */
        this.channel = this.guild && (data.channel || data.channel_id) ? this.guild.channels.cache.get(data.channel?.id || data.channel_id) : null;

        if (!this.channel && (data.channel || data.channel_id))
            /**
             * The id of the channel the invite is directed to.
             * @type {BigInt?}
             */
            this.channel_id = BigInt(data.channel?.id || data.channel_id);

        if (data.inviter)
            /**
             * The user who created the invite.
             * @type {User?}
             */
            this.inviter = new User(this.client, data.inviter, { nocache });

        if (typeof data.uses == "number")
            /**
             * The number of times the invite has been used.
             * @type {Number?}
             */
            this.uses = data.uses;

        if (data.expires_at)
            /**
             * The UNIX timestamp of when the invite expires.
             * @type {Number?}
             */
            this.expires = ((new Date(data.expires_at).getTime() / 1000) | 0);
        else if (typeof data.expires == "number")
            this.expires = data.expires;
        else if (typeof data.max_age == "number" && data.max_age != 0 && data.created_at)
            this.expires = ((new Date(data.created_at).getTime() / 1000) | 0) + data.max_age;

        if (typeof data.max_uses == "number")
            /**
             * The maximum number of uses allowed for the invite.
             * @type {Number?}
             */
            this.maxUses = data.max_uses;

        if (nocache == false && this.client.cacheInvites == true && this.code && ((this.expires && this.expires > (Date.now() / 1000)) || !this.expires))
            this.guild?.invites.cache.set(data.code, this);
        else
            this.client.emit("debug", `NOT CACHING INVITE ${this.code} ${this.expires} ${(Date.now() / 1000) | 0}`);

    }

    get id() {

        return this.code;

    }
};

module.exports = Invite;