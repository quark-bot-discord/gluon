import ScheduledEvent from "../structures/ScheduledEvent.js";
import BaseCacheManager from "./BaseCacheManager.js";

class GuildScheduledEventManager extends BaseCacheManager {
  #_client;
  #guild;
  static identifier = "events";
  constructor(client, guild) {
    super(client, { structureType: GuildScheduledEventManager });
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The guild that this manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;
  }

  /**
   * Retrieves all scheduled events for this guild.
   * @returns {Promise<Array<ScheduledEvent>>}
   * @async
   * @method
   * @public
   * @throws {Error}
   */
  async list() {
    const data = await this.#_client.request.makeRequest(
      "getListGuildScheduledEvents",
      [this.#guild.id],
    );

    const eventsList = [];

    for (let i = 0; i < data.length; i++)
      eventsList.push(
        new ScheduledEvent(this.#_client, data[i], {
          guild_id: this.#guild.id,
        }),
      );

    return eventsList;
  }

  /**
   * Fetches a scheduled event from the API.
   * @param {String} scheduled_event_id The ID of the event to fetch.
   * @returns {Promise<ScheduledEvent>}
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  async fetch(scheduled_event_id) {
    if (typeof scheduled_event_id !== "string")
      throw new TypeError("GLUON: Scheduled event ID must be a string.");

    const cachedEvent = await this.get(scheduled_event_id);
    if (cachedEvent) return cachedEvent;

    const data = await this.#_client.request.makeRequest(
      "getGuildScheduledEvent",
      [this.#guild.id, scheduled_event_id],
    );

    return new ScheduledEvent(this.#_client, data, {
      guild_id: this.#guild.id,
    });
  }

  /**
   * Cache a scheduled event.
   * @param {String} id The ID of the event to cache.
   * @param {ScheduledEvent} event The event to cache.
   * @returns {ScheduledEvent}
   * @throws {TypeError}
   * @public
   * @method
   * @override
   */
  set(id, event) {
    if (!(event instanceof ScheduledEvent))
      throw new TypeError("GLUON: Event must be a ScheduledEvent instance.");
    return super.set(id, event);
  }
}

export default GuildScheduledEventManager;
