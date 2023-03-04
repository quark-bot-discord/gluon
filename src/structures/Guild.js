const { AUDIT_LOG_TYPES, PERMISSIONS, CDN_BASE_URL } = require("../constants");
const GuildChannelsManager = require("../managers/GuildChannelsManager");
const GuildMemberManager = require("../managers/GuildMemberManager");
const GuildRoleManager = require("../managers/GuildRoleManager");
const GuildVoiceStatesManager = require("../managers/GuildVoiceStatesManager");
const cacheChannel = require("../util/cacheChannel");
const checkPermission = require("../util/checkPermission");
const AuditLog = require("./AuditLog");
const Member = require("./Member");
const Role = require("./Role");
const Thread = require("./Thread");
const VoiceState = require("./VoiceState");

/**
 * Represents a Discord guild.
 * @see {@link https://discord.com/developers/docs/resources/guild}
 */
class Guild {

    /**
     * Creates the structure for a guild.
     * @constructor
     * @param {Client} client The client instance.
     * @param {Object} data Raw guild data.
     * @param {Boolean?} nocache Whether this guild should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object}
     */
    constructor(client, data, nocache = false) {

        if (data.unavailable == true) {

            this.id = BigInt(data.id);

            this.unavailable = true;

            if (nocache == false && this.client.cacheGuilds == true)
                this.client.guilds.cache.set(data.id, this);

        }

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        const existing = this.client.guilds.cache.get(data.id) || null;

        /**
         * The id of the message.
         * @type {BigInt}
         */
        this.id = BigInt(data.id);

        // needed for join/leave logging
        /**
         * The name of the guild.
         * @type {String}
         */
        this.name = data.name;

        // needed for join/leave logging
        /**
         * The guild icon hash.
         * @type {String?}
         */
        this.icon = data.icon;

        // needed for permissions checking and join/leave logging
        /**
         * The id of the guild owner.
         * @type {BigInt}
         */
        this.owner_id = BigInt(data.owner_id);

        // useful to see how long a guild keeps the bot for
        if (data.joined_at)
            /**
             * UNIX (seconds) timestamp for when the bot user was added to this guild.
             * @type {Number?}
             */
            this.joined_at = data.joined_at ? (new Date(data.joined_at).getTime() / 1000) | 0 : null;
        else if (existing && existing.joined_at)
            this.joined_at = existing.joined_at;

        // only needed if file logging is enabled
        /**
         * The premium tier level of this guild.
         * @type {Number}
         */
        this.premium_tier = data.premium_tier;

        if (data.unavailable == true)
            /**
             * Whether this guild is unavailable or not.
             * @type {Boolean?}
             */
            this.unavailable = data.unavailable;

        if (data.member_count)
            /**
             * The member count of this guild.
             * @type {Number}
             */
            this.member_count = data.member_count;
        else if (existing && existing.member_count)
            this.member_count = existing.member_count;
        else
            this.member_count = 2;

        /**
         * The voice state manager of this guild.
         * @type {GuildVoiceStatesManager}
         */
        this.voice_states = existing ? existing.voice_states : new GuildVoiceStatesManager(this.client, data.voice_states);

        /**
         * The member manager of this guild.
         * @type {GuildMemberManager}
         */
        this.members = existing ? existing.members : new GuildMemberManager(this.client, this);

        /**
         * The channel manager of this guild.
         * @type {GuildChannelsManager}
         */
        this.channels = existing ? existing.channels : new GuildChannelsManager(this.client, this);

        /**
         * The role manager of this guild.
         * @type {GuildRoleManager}
         */
        this.roles = existing ? existing.roles : new GuildRoleManager(this.client);

        /**
         * The locale of this guild, if set up as a community.
         * @type {String}
         */
        this.preferred_locale = data.preferred_locale;

        if (nocache == false && this.client.cacheGuilds == true)
            this.client.guilds.cache.set(data.id, this);

        if (data.members)
            for (let i = 0; i < data.members.length && this.client.cacheMembers == true; i++)
                new Member(this.client, data.members[i], data.members[i].user.id, data.id, data.members[i].user, nocache);

        if (data.channels)
            for (let i = 0; i < data.channels.length && this.client.cacheChannels == true; i++)
                cacheChannel(this.client, data.channels[i], data.id, nocache);

        if (data.threads)
            for (let i = 0; i < data.threads.length && this.client.cacheChannels == true; i++)
                new Thread(this.client, data.threads[i], data.id, nocache);

        if (data.voice_states)
            for (let i = 0; i < data.voice_states.length && this.client.cacheVoiceStates == true; i++)
                new VoiceState(this.client, data.voice_states[i], data.id, nocache);

        if (data.roles)
            for (let i = 0; i < data.roles.length && this.client.cacheRoles == true; i++)
                new Role(this.client, data.roles[i], data.id, nocache);

    }

    /**
     * The icon URL of the guild.
     * @readonly
     * @type {String?}
     */
    get displayIconURL() {

        return this.icon ?
            `${CDN_BASE_URL}/icons/${this.id}/${this.icon}.${this.icon.startsWith("a_") ? "gif" : "png"}` :
            null;

    }

    /**
     * Returns the client member for this guild.
     * @returns {Promise<Member>}
     */
    async me() {

        const cached = this.members.cache.get(this.client.user.id.toString());

        if (cached)
            return cached;

        return await this.members.fetch(this.client.user.id);

    }

    /**
     * Bans a user with the given id from the guild.
     * @param {BigInt} user_id The id of the user to ban.
     * @param {Object?} options Ban options.
     * @returns {void?}
     */
    async ban(user_id, { reason, days } = {}) {

        if (!checkPermission(await this.me().catch(() => null), PERMISSIONS.BAN_MEMBERS))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;
        // number of days to delete messages for (0-7) 
        if (days)
            body.delete_message_days = days;

        await this.client.request.makeRequest("putCreateGuildBan", [this.id, user_id], body);

    }

    /**
     * Unbans a user with the given id from the guild.
     * @param {BigInt} user_id The id of the user to unban.
     * @param {Object?} options Unban options.
     * @returns {void?}
     */
    async unban(user_id, { reason } = {}) {

        if (!checkPermission(await this.me().catch(() => null), PERMISSIONS.BAN_MEMBERS))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        await this.client.request.makeRequest("deleteRemoveGuildBan", [this.id, user_id], body);

    }

    /**
     * Kicks a user with the given id from the guild.
     * @param {BigInt} user_id The id of the user to kick.
     * @param {Object?} options Kick options.
     * @returns {void?}
     */
    async kick(user_id, { reason } = {}) {

        if (!checkPermission(await this.me().catch(() => null), PERMISSIONS.KICK_MEMBERS))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        await this.client.request.makeRequest("deleteGuildMember", [this.id, user_id], body);

    }

    /**
     * Removes the given role from the given member.
     * @param {BigInt} user_id The id of the user.
     * @param {BigInt} role_id The id of the role.
     * @param {Object?} options Remove role options.
     * @returns {void?}
     */
    async removeMemberRole(user_id, role_id, { reason } = {}) {

        if (!checkPermission(await this.me().catch(() => null), PERMISSIONS.MANAGE_ROLES))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        await this.client.request.makeRequest("deleteRemoveMemberRole", [this.id, user_id, role_id], body);

    }

    /**
     * Fetches audit logs.
     * @param {Object?} options Audit log fetch options.
     * @returns {Promise<AuditLog[]?>}
     */
    async fetchAuditLogs({ limit, type, user_id, before }) {

        if (!checkPermission(await this.me().catch(() => null), PERMISSIONS.VIEW_AUDIT_LOG))
            return null;

        const body = {};

        if (limit)
            body.limit = limit;
        else
            body.limit = 1;

        if (type)
            body.action_type = AUDIT_LOG_TYPES[type];

        if (user_id)
            body.user_id = user_id.toString();

        if (before)
            body.before = before.toString();

        const data = await this.client.request.makeRequest("getGuildAuditLog", [this.id], body);

        if (type && AUDIT_LOG_TYPES[type] && data && data.audit_log_entries[0] && data.audit_log_entries[0].action_type != AUDIT_LOG_TYPES[type])
            return null;

        if (!data || data.audit_log_entries.length == 0)
            return null;

        return data.audit_log_entries.map(e => new AuditLog(this.client, e, data.users));

    }

    /**
     * Fetches the guild invites.
     * @returns {Promise<Object[]?>}
     */
    async fetchInvites() {

        if (!checkPermission(await this.me().catch(() => null), PERMISSIONS.MANAGE_GUILD))
            return null;

        const data = await this.client.request.makeRequest("getGuildInvites", [this.id]);

        return data;

    }

    /**
     * Fetches all the guild channels.
     * @returns {Promise<Channel[]>}
     */
    async fetchChannels() {

        const data = await this.client.request.makeRequest("getGuildChannels", [this.id]);

        let channels = [];
        for (let i = 0; i < data.length; i++)
            channels.push(cacheChannel(this.client, data[i], this.id.toString()));

        return channels;

    }

    /**
     * Fetches the ban for the provided user id.
     * @param {BigInt} user_id The id of the user to fetch the ban of.
     * @returns {Promise<Object?>}
     */
    async fetchBan(user_id) {

        if (!checkPermission(await this.me().catch(() => null), PERMISSIONS.BAN_MEMBERS))
            return null;

        const data = await this.client.request.makeRequest("getGuildBan", [this.id, user_id]);

        return data;

    }

    /**
     * Leaves the guild.
     */
    async leave() {

        await this.client.request.makeRequest("deleteLeaveGuild", [this.id]);

    }

    /**
     * Calculates the number of messages that should be cached per channel for this guild.
     * @returns {Number}
     */
    calculateMessageCacheCount() {

        const x = (this.member_count < 500000 ? this.member_count : 499999) / 500000;
        /* creates an "S-Curve" for how many messages should be cached */
        /* more members => assume more activity => therefore more messages to be cached */
        /* minimum of 50 messages to be cached, and a maximum of 1000 */
        /* having greater than 500000 members has no effect */
        const shouldCacheCount = (Math.floor(1 / (1 + Math.pow(x / (1 - x), -2))) * 1000) + 50;

        return shouldCacheCount;

    }

    /**
     * Calculates the number of members that should be cached for this guild.
     * @returns {Number}
     */
    calculateMemberCacheCount() {

        const x = this.member_count < 500000 ? this.member_count : 499999;
        /* creates a slope for how many members should stay cached */
        /* more members => smaller percentage of users active => a smaller percentage of users should be cached */
        /* a maximum of 500 seems suitable */
        const shouldCacheCount = Math.floor((1 - Math.sqrt(x / 501000)) * x);

        return shouldCacheCount;

    }

}

module.exports = Guild;