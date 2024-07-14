const { CHANNEL_TYPES } = require("../constants");
const ScheduledEvent = require("../structures/ScheduledEvent");
const TextChannel = require("../structures/TextChannel");
const Thread = require("../structures/Thread");
const VoiceChannel = require("../structures/VoiceChannel");

class GuildScheduledEventManager {
  constructor(client, guild) {
    this._client = client;

    this.guild = guild;

    this.cache = new Map();

    // this.list().then(() => null);
  }

  async list() {
    const data = await this._client.request.makeRequest(
      "getListGuildScheduledEvents",
      [this.guild.id],
    );

    const eventsList = [];

    for (let i = 0; i < data.length; i++)
      eventsList.push(new ScheduledEvent(this._client, data[i]));

    return eventsList;
  }

  async fetch(scheduled_event_id) {
    const cachedEvent = this.cache.get(scheduled_event_id.toString());
    if (cachedEvent) return cachedEvent;

    const data = await this._client.request.makeRequest(
      "getGuildScheduledEvent",
      [this.guild.id, scheduled_event_id],
    );

    return new ScheduledEvent(this._client, data);
  }

  toJSON() {
    return [...this.cache.values()];
  }
}

module.exports = GuildScheduledEventManager;
