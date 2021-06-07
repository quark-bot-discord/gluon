const GuildChannelsManager = require("../managers/GuildChannelsManager");
const GuildMemberManager = require("../managers/GuildMemberManager");
const GuildThreadsManager = require("../managers/GuildThreadsManager");
const GuildVoiceStatesManager = require("../managers/GuildVoiceStatesManager");

class Guild {

    constructor(client, data) {

        this.id = data.id;

        this.name = data.name;

        this.icon = data.icon;

        this.owner_id = data.owner_id;

        this.joined_at = data.joined_at ? parseInt(new Date(data.joined_at).getTime() / 1000) : null;

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