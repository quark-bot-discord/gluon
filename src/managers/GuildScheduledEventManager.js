const ScheduledEvent = require("../structures/ScheduledEvent");

class GuildScheduledEventManager {
  #_client;
  #guild;
  #cache;
  constructor(client, guild) {
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

    /**
     * The cache of scheduled events.
     * @type {Map<String, ScheduledEvent>}
     * @private
     */
    this.#cache = new Map();
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
      eventsList.push(new ScheduledEvent(this.#_client, data[i]));

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

    const cachedEvent = this.#cache.get(scheduled_event_id);
    if (cachedEvent) return cachedEvent;

    const data = await this.#_client.request.makeRequest(
      "getGuildScheduledEvent",
      [this.#guild.id, scheduled_event_id],
    );

    return new ScheduledEvent(this.#_client, data);
  }

  /**
   * Retrieves a scheduled event from the cache.
   * @param {String} id The ID of the event to retrieve.
   * @returns {ScheduledEvent?}
   * @public
   * @method
   * @throws {TypeError}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Cache a scheduled event.
   * @param {String} id The ID of the event to cache.
   * @param {ScheduledEvent} event The event to cache.
   * @returns {ScheduledEvent}
   * @throws {TypeError}
   * @public
   * @method
   */
  set(id, event) {
    if (!(event instanceof ScheduledEvent))
      throw new TypeError("GLUON: Event must be a ScheduledEvent instance.");
    if (typeof id !== "string")
      throw new TypeError("GLUON: Event ID must be a string.");
    return this.#cache.set(id, event);
  }

  /**
   * Deletes a scheduled event from the cache.
   * @param {String} id The ID of the event to delete.
   * @returns {Boolean}
   * @public
   * @method
   * @throws {TypeError}
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.delete(id);
  }

  /**
   * The number of scheduled events in the cache.
   * @param {Number}
   * @readonly
   * @public
   */
  get size() {
    return this.#cache.size;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return [...this.#cache.values()];
  }
}

module.exports = GuildScheduledEventManager;
