import ClientType from "src/interfaces/Client.js";
import ScheduledEvent from "../structures/ScheduledEvent.js";
import BaseCacheManager from "./BaseCacheManager.js";
import { GuildScheduledEventManagerType } from "./interfaces/GuildScheduledEventManager.js";
import { GuildType } from "src/structures/interfaces/Guild.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { ScheduledEventType } from "src/structures/interfaces/ScheduledEvent.js";

class GuildScheduledEventManager
  extends BaseCacheManager
  implements GuildScheduledEventManagerType
{
  #_client;
  #guild;
  static identifier = "events";
  constructor(client: ClientType, guild: GuildType) {
    super(client, { structureType: GuildScheduledEventManager });

    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");

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
          guildId: this.#guild.id,
        }),
      );

    return eventsList;
  }

  /**
   * Fetches a scheduled event from the API.
   * @param {String} scheduledEventId The ID of the event to fetch.
   * @returns {Promise<ScheduledEvent>}
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  async fetch(scheduledEventId: Snowflake) {
    if (typeof scheduledEventId !== "string")
      throw new TypeError("GLUON: Scheduled event ID must be a string.");

    const cachedEvent = await this.get(scheduledEventId);
    if (cachedEvent) return cachedEvent;

    const data = await this.#_client.request.makeRequest(
      "getGuildScheduledEvent",
      [this.#guild.id, scheduledEventId],
    );

    return new ScheduledEvent(this.#_client, data, {
      guildId: this.#guild.id,
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
  set(id: Snowflake, event: ScheduledEventType) {
    if (!(event instanceof ScheduledEvent))
      throw new TypeError("GLUON: Event must be a ScheduledEvent instance.");
    return super.set(id, event);
  }

  get(id: Snowflake) {
    return super.get(id) as ScheduledEventType | null;
  }
}

export default GuildScheduledEventManager;
