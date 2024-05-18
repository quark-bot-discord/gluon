const { AUDIT_LOG_TYPES, PERMISSIONS } = require("../constants");
const GuildChannelsManager = require("../managers/GuildChannelsManager");
const GuildEmojisManager = require("../managers/GuildEmojisManager");
const GuildInviteManager = require("../managers/GuildInviteManager");
const GuildMemberManager = require("../managers/GuildMemberManager");
const GuildRoleManager = require("../managers/GuildRoleManager");
const GuildScheduledEventManager = require("../managers/GuildScheduledEventManager");
const GuildVoiceStatesManager = require("../managers/GuildVoiceStatesManager");
const cacheChannel = require("../util/cacheChannel");
const checkPermission = require("../util/checkPermission");
const getGuildIcon = require("../util/getGuildIcon");
const AuditLog = require("./AuditLog");
const Emoji = require("./Emoji");
const Invite = require("./Invite");
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
        if (this.name === undefined && existing && existing.name)
            this.name = existing.name;
        else if (!this.name)
            this.name = null;

        /**
         * The description of the guild.
         * @type {String?}
         */
        this.description = data.description;
        if (this.description === undefined && existing && existing.description)
            this.description = existing.description;
        else if (!this.description)
            this.description = null;

        // needed for join/leave logging
        /**
         * The guild icon hash.
         * @type {String?}
         */
        this.icon = data.icon; // can this be converted to a bigint?
        if (this.icon === undefined && existing && existing.icon)
            this.icon = existing.icon;
        else if (!this.icon)
            this.icon = null;


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
            this.joined_at = (new Date(data.joined_at).getTime() / 1000) | 0;
        else if (existing && existing.joined_at)
            this.joined_at = existing.joined_at;

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
        this.roles = existing ? existing.roles : new GuildRoleManager(this.client, this);

        this.scheduled_events = existing ? existing.scheduled_events : new GuildScheduledEventManager(this.client, this);

        /**
         * The emoji manager of this guild.
         * @type {GuildEmojisManager}
         */
        this.emojis = existing ? existing.emojis : new GuildEmojisManager(this.client, this);

        /**
         * The invite manager of this guild.
         * @type {GuildInviteManager}
         */
        this.invites = existing ? existing.invites : new GuildInviteManager(this.client, this);

        if (data.system_channel_id !== undefined)
            this.system_channel_id = data.system_channel_id ? BigInt(data.system_channel_id) : null;
        else if (data.system_channel_id === undefined && existing && existing.system_channel_id)
            this.system_channel_id = BigInt(existing.system_channel_id);

        if (data.rules_channel_id !== undefined)
            this.rules_channel_id = data.rules_channel_id ? BigInt(data.rules_channel_id) : null;
        else if (data.rules_channel_id === undefined && existing && existing.rules_channel_id)
            this.rules_channel_id = BigInt(existing.rules_channel_id);

        if (typeof data.premium_subscription_count == "number")
            this.premium_subscription_count = data.premium_subscription_count;
        else if (typeof data.premium_subscription_count != "number" && existing && existing.premium_subscription_count)
            this.premium_subscription_count = existing.premium_subscription_count;
        else
            this.premium_subscription_count = 0;

        this._attributes = data._attributes ?? data.system_channel_flags;

        if (typeof data.mfa_level == "number" || (existing && typeof existing.mfa_level == "number")) {
            const mfaLevel = typeof data.mfa_level == "number" ? data.mfa_level : existing.mfa_level;
            switch (mfaLevel) {
                case 0:
                    // none
                    this._attributes |= (0b1 << 6);
                    break;
                case 1:
                    // elevated
                    this._attributes |= (0b1 << 7);
                    break;
            }
        }

        if (typeof data.verification_level == "number" || (existing && typeof existing.verification_level == "number")) {
            const verificationLevel = typeof data.verification_level == "number" ? data.verification_level : existing.verification_level;
            switch (verificationLevel) {
                case 0:
                    // none
                    this._attributes |= (0b1 << 8);
                    break;
                case 1:
                    // low
                    this._attributes |= (0b1 << 9);
                    break;
                case 2:
                    // medium
                    this._attributes |= (0b1 << 10);
                    break;
                case 3:
                    // high
                    this._attributes |= (0b1 << 11);
                    break;
                case 4:
                    // very high
                    this._attributes |= (0b1 << 12);
                    break;
            }
        }

        if (typeof data.default_message_notifications == "number" || (existing && typeof existing.default_message_notifications == "number")) {
            const defaultMessageNotifications = typeof data.default_message_notifications == "number" ? data.default_message_notifications : existing.default_message_notifications;
            switch (defaultMessageNotifications) {
                case 0:
                    // all messages
                    this._attributes |= (0b1 << 13);
                    break;
                case 1:
                    // only mentions
                    this._attributes |= (0b1 << 14);
                    break;
            }
        }

        if (typeof data.explicit_content_filter == "number" || (existing && typeof existing.explicit_content_filter == "number")) {
            const explicitContentFilter = typeof data.explicit_content_filter == "number" ? data.explicit_content_filter : existing.explicit_content_filter;
            switch (explicitContentFilter) {
                case 0:
                    // disabled
                    this._attributes |= (0b1 << 15);
                    break;
                case 1:
                    // members without roles
                    this._attributes |= (0b1 << 16);
                    break;
                case 2:
                    // all members
                    this._attributes |= (0b1 << 17);
                    break;
            }
        }

        if (typeof data.nsfw_level == "number" || (existing && typeof existing.nsfw_level == "number")) {
            const nsfwLevel = typeof data.nsfw_level == "number" ? data.nsfw_level : existing.nsfw_level;
            switch (nsfwLevel) {
                case 0:
                    // default
                    this._attributes |= (0b1 << 18);
                    break;
                case 1:
                    // explicit
                    this._attributes |= (0b1 << 19);
                    break;
                case 2:
                    // safe
                    this._attributes |= (0b1 << 20);
                    break;
                case 3:
                    // age restricted
                    this._attributes |= (0b1 << 21);
                    break;
            }
        }

        if (data && typeof data.premium_tier == "number" || (existing && typeof existing.premium_tier == "number")) {
            const premiumTier = typeof data.premium_tier == "number" ? data.premium_tier : existing.premium_tier;
            switch (premiumTier) {
                case 0:
                    // none
                    this._attributes |= (0b1 << 22);
                    break;
                case 1:
                    // tier 1
                    this._attributes |= (0b1 << 23);
                    break;
                case 2:
                    // tier 2
                    this._attributes |= (0b1 << 24);
                    break;
                case 3:
                    // tier 3
                    this._attributes |= (0b1 << 25);
                    break;
            }
        }

        if (typeof data.premium_progress_bar_enabled == "boolean" && data.premium_progress_bar_enabled == true)
            this._attributes |= (0b1 << 26);
        else if (existing && typeof existing.premium_progress_bar_enabled == "boolean" && existing.premium_progress_bar_enabled == true)
            this._attributes |= (0b1 << 26);

        /**
         * The locale of this guild, if set up as a community.
         * @type {String}
         */
        this.preferred_locale = data.preferred_locale;
        if (!this.preferred_locale && existing && existing.preferred_locale)
            this.preferred_locale = existing.preferred_locale;
        else if (!this.preferred_locale)
            this.preferred_locale = null;

        if (data._cache_options)
            this._cache_options = data._cache_options;
        else if (!data._cache_options && existing && existing._cache_options)
            this._cache_options = existing._cache_options;
        else
            this._cache_options = 0;

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

        // if (data.scheduled_events)
        //     for (let i = 0; i < data.roles.length && this.client.cacheRoles == true; i++)
        //         new Role(this.client, data.roles[i], data.id, nocache);

        if (data.emojis)
            for (let i = 0; i < data.emojis.length && this.client.cacheEmojis == true; i++)
                new Emoji(this.client, data.emojis[i], data.id, nocache);

        if (data.invites)
            for (let i = 0; i < data.invites.length && this.client.cacheInvites == true; i++)
                new Invite(this.client, data.invites[i], data.id, nocache);

    }

    /**
     * The icon URL of the guild.
     * @readonly
     * @type {String?}
     */
    get displayIconURL() {

        return getGuildIcon(this.icon, this.id);

    }

    /**
     * System channel flags.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
     * @readonly
     * @type {String}
     */
    get system_channel_flags() {

        let flags = [];

        if ((this._attributes & (0b1 << 0)) == (0b1 << 0))
            flags.push("SUPPRESS_JOIN_NOTIFICATIONS");
        if ((this._attributes & (0b1 << 1)) == (0b1 << 1))
            flags.push("SUPPRESS_PREMIUM_SUBSCRIPTIONS");
        if ((this._attributes & (0b1 << 2)) == (0b1 << 2))
            flags.push("SUPPRESS_GUILD_REMINDER_NOTIFICATIONS");
        if ((this._attributes & (0b1 << 3)) == (0b1 << 3))
            flags.push("SUPPRESS_JOIN_NOTIFICATION_REPLIES");
        if ((this._attributes & (0b1 << 4)) == (0b1 << 4))
            flags.push("SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS");
        if ((this._attributes & (0b1 << 5)) == (0b1 << 5))
            flags.push("SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES");

        return flags;

    }

    /**
     * Server MFA level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
     * @readonly
     * @type {String}
     */
    get mfa_level() {

        if ((this._attributes & (0b1 << 6)) == (0b1 << 6))
            return "NONE";
        else if ((this._attributes & (0b1 << 7)) == (0b1 << 7))
            return "ELEVATED";

    }

    /**
     * Server verification level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
     * @readonly
     * @type {String}
     */
    get verification_level() {

        if ((this._attributes & (0b1 << 8)) == (0b1 << 8))
            return "NONE";
        else if ((this._attributes & (0b1 << 9)) == (0b1 << 9))
            return "LOW";
        else if ((this._attributes & (0b1 << 10)) == (0b1 << 10))
            return "MEDIUM";
        else if ((this._attributes & (0b1 << 11)) == (0b1 << 11))
            return "HIGH";
        else if ((this._attributes & (0b1 << 12)) == (0b1 << 12))
            return "VERY_HIGH";

    }

    /**
     * Default notification setting.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
     * @readonly
     * @type {String}
     */
    get default_message_notifications() {

        if ((this._attributes & (0b1 << 13)) == (0b1 << 13))
            return "ALL_MESSAGES";
        else if ((this._attributes & (0b1 << 14)) == (0b1 << 14))
            return "ONLY_MENTIONS";

    }

    /**
     * Explicit content filter level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
     * @readonly
     * @type {String}
     */
    get explicit_content_filter() {

        if ((this._attributes & (0b1 << 15)) == (0b1 << 15))
            return "DISABLED";
        else if ((this._attributes & (0b1 << 16)) == (0b1 << 16))
            return "MEMBERS_WITHOUT_ROLES";
        else if ((this._attributes & (0b1 << 17)) == (0b1 << 17))
            return "ALL_MEMBERS";

    }

    /**
     * Server NSFW level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
     * @readonly
     * @type {String}
     */
    get nsfw_level() {

        if ((this._attributes & (0b1 << 18)) == (0b1 << 18))
            return "DEFAULT";
        else if ((this._attributes & (0b1 << 19)) == (0b1 << 19))
            return "EXPLICIT";
        else if ((this._attributes & (0b1 << 20)) == (0b1 << 20))
            return "SAFE";
        else if ((this._attributes & (0b1 << 21)) == (0b1 << 21))
            return "AGE_RESTRICTED";

    }

    /**
     * Server boost level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier}
     * @readonly
     * @type {Number}
     */
    get premium_tier() {

        if ((this._attributes & (0b1 << 22)) == (0b1 << 22))
            return 0;
        else if ((this._attributes & (0b1 << 23)) == (0b1 << 23))
            return 1;
        else if ((this._attributes & (0b1 << 24)) == (0b1 << 24))
            return 2;
        else if ((this._attributes & (0b1 << 25)) == (0b1 << 25))
            return 3;

    }

    /**
     * Whether the guild has the boost progress bar enabled.
     * @readonly
     * @type {Boolean}
     */
    get premium_progress_bar_enabled() {

        return (this._attributes & (0b1 << 26)) == (0b1 << 26);

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
        const shouldCacheCount = Math.floor((1 / (1 + Math.pow(x / (1 - x), -2))) * 1000) + 50;

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