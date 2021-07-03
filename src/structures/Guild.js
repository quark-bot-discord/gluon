const { AUDIT_LOG_TYPES } = require("../constants");
const GuildChannelsManager = require("../managers/GuildChannelsManager");
const GuildMemberManager = require("../managers/GuildMemberManager");
const GuildVoiceStatesManager = require("../managers/GuildVoiceStatesManager");
const cacheChannel = require("../util/cacheChannel");
const AuditLog = require("./AuditLog");
const Member = require("./Member");
const Thread = require("./Thread");
const VoiceState = require("./VoiceState");

class Guild {

    constructor(client, data, nocache = false) {

        this.client = client;

        const existing = this.client.guilds.cache.get(data.id) || null;

        this.id = BigInt(data.id);
        // needed for join/leave logging
        this.name = data.name;
        // needed for join/leave logging
        if (data.icon != null)
            this.icon = data.icon;
        // needed for permissions checking and join/leave logging
        this.owner_id = BigInt(data.owner_id);
        // useful to see how long a guild keeps the bot for
        if (data.joined_at)
            this.joined_at = data.joined_at ? (new Date(data.joined_at).getTime() / 1000) | 0 : null;
        else if (existing && existing.joined_at)
            this.joined_at = existing.joined_at;
        // only needed if file logging is enabled
        this.premium_tier = data.premium_tier;

        if (data.unavailable == true)
            this.unavailable = data.unavailable;

        if (data.member_count)
            this.member_count = data.member_count;
        else if (existing && existing.member_count)
            this.member_count = existing.member_count;
        else
            this.member_count = 2;

        this.voice_states = existing ? existing.voice_states : new GuildVoiceStatesManager(this.client, data.voice_states);

        this.members = existing ? existing.members : new GuildMemberManager(this.client);

        this.channels = existing ? existing.channels : new GuildChannelsManager(this.client, this);

        this.preferred_locale = data.preferred_locale;

        if (nocache == false && this.client.cacheGuilds == true)
            this.client.guilds.cache.set(data.id, this);

        for (let i = 0; i < data.members.length && this.client.cacheMembers == true; i++)
            new Member(this.client, data.members[i], data.members[i].user.id, data.id, data.members[i].user, nocache);

        for (let i = 0; i < data.channels.length && this.client.cacheChannels == true; i++)
            cacheChannel(this.client, data.channels[i], data.id, nocache);

        for (let i = 0; i < data.threads.length && this.client.cacheChannels == true; i++)
            new Thread(this.client, data.threads[i], data.id, nocache);

        for (let i = 0; i < data.voice_states.length && this.client.cacheVoiceStates == true; i++)
            new VoiceState(this.client, data.voice_states[i], data.id, nocache);

    }

    async ban(user_id, { reason, days }) {
        if (!user_id) throw Error('No userID was provided');
        const body = {};

        if (reason)
            body.reason = reason;
        // number of days to delete messages for (0-7) 
        if (days)
            body.delete_message_days = days;

        try {

            await this.client.request.makeRequest("putCreateGuildBan", [this.id, user_id], body);

        } catch (error) {

            this.client.error(error.stack.toString());
            throw error;

        }
    }

    async fetchAuditLogs({ limit, type }) {

        const body = {};

        if (limit)
            body.limit = limit;
        else
            body.limit = 1;

        if (type)
            body.type = AUDIT_LOG_TYPES[type];

        try {

            const data = await this.client.request.makeRequest("getGuildAuditLog", [this.id], body);

            if (type && AUDIT_LOG_TYPES[type] && data && data.audit_log_entries[0] && data.audit_log_entries[0].action_type != AUDIT_LOG_TYPES[type])
                return null;

            if (!data)
                return null;

            // currently only one log is ever fetched, but best to make it easy to allow multiple if needed in the future
            return [new AuditLog(this.client, data.audit_log_entries[0])];

        } catch (error) {

            this.client.error(error.stack.toString());
            throw error;

        }

    }

    async fetchInvites() {

        try {

            const data = await this.client.request.makeRequest("getGuildInvites", [this.id]);
            return data;

        } catch (error) {

            this.client.error(error.stack.toString());
            throw error;

        }

    }

    calculateCacheCount() {

        const x = this.member_count < 500000 ? this.member_count / 500000 : 499999;
        /* creates an "S-Curve" for how many messages should be cached */
        /* more members => assume more activity => therefore more messages to be cached */
        /* minimum of 50 messages to be cached, and a maximum of 1000 */
        /* having greater than 500000 members has no effect */
        const shouldCacheCount = (Math.floor(1 / (1 + Math.pow(x / (1 - x), -2))) * 1000) + 50;

        return shouldCacheCount;

    }

}

module.exports = Guild;