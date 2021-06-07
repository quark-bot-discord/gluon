const GuildChannelsManager = require("../managers/GuildChannelsManager");
const GuildMemberManager = require("../managers/GuildMemberManager");
const GuildThreadsManager = require("../managers/GuildThreadsManager");
const GuildVoiceStatesManager = require("../managers/GuildVoiceStatesManager");

class Guild {

    constructor(client, data) {

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

        this.voice_states = new GuildVoiceStatesManager(data.voice_states);

        this.members = new GuildMemberManager(data.members);

        this.channels = new GuildChannelsManager(data.channels);

        this.threads = new GuildThreadsManager(data.threads);

        this.preferred_locale = data.preferred_locale;

        client.guilds.cache[this.id] = this;

    }

}

module.exports = Guild;