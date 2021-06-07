const GuildChannelsManager = require("../managers/GuildChannelsManager");
const GuildMemberManager = require("../managers/GuildMemberManager");
const GuildThreadsManager = require("../managers/GuildThreadsManager");
const GuildVoiceStatesManager = require("../managers/GuildVoiceStatesManager");
const Channel = require("./Channel");
const Member = require("./Member");

class Guild {

    constructor(client, data) {

        this.client = client;

        this.id = data.id;
        // needed for join/leave logging
        this.name = data.name;
        // needed for join/leave logging
        this.icon = data.icon;
        // needed for permissions checking and join/leave logging
        this.owner_id = data.owner_id;
        // useful to see how long a guild keeps the bot for
        this.joined_at = data.joined_at ? parseInt(new Date(data.joined_at).getTime() / 1000) : null;
        // only needed if file logging is enabled
        this.premium_tier = data.premium_tier || 0;

        if (data.unavailable == true)
            this.unavailable = data.unavailable;

        this.member_count = data.member_count || null;

        this.voice_states = new GuildVoiceStatesManager(client, data.voice_states);

        this.members = new GuildMemberManager(client, data.members);

        this.channels = new GuildChannelsManager(client);

        this.threads = new GuildThreadsManager(client, data.threads);

        this.preferred_locale = data.preferred_locale;

        this.client.guilds.cache[this.id] = this;


        data.members.map(member => new Member(client, member, member.user.id, this.id));

        data.channels.map(channel => new Channel(client, channel, this.id));

    }

}

module.exports = Guild;