const { CHANNEL_TYPES } = require("../constants");
const ScheduledEvent = require("../structures/ScheduledEvent");
const TextChannel = require("../structures/TextChannel");
const Thread = require("../structures/Thread");
const VoiceChannel = require("../structures/VoiceChannel");

class GuildScheduledEventManager {

    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

        this.list().then(() => null);

    }

    async list() {

        const data = await this.client.request.makeRequest("getListGuildScheduledEvents", [this.guild.id]);

        let eventsList = [];

        for (let i = 0; i < data.length; i++)
            eventsList.push(new ScheduledEvent(this.client, data[i]));

        return eventsList;

    }

    async fetch(scheduled_event_id) {

        const cachedEvent = this.cache.get(scheduled_event_id);
        if (cachedEvent)
            return cachedEvent;

        const data = await this.client.request.makeRequest("getGuildScheduledEvent", [this.guild.id, scheduled_event_id]);

        return new ScheduledEvent(this.client, data);

    }

}

module.exports = GuildScheduledEventManager;