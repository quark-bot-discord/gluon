import ScheduledEvent from "../structures/ScheduledEvent.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  ScheduledEvent as ScheduledEventType,
  StructureIdentifiers,
  Guild as GuildType,
  GuildScheduledEventManager as GuildScheduledEventManagerType,
  Client as ClientType,
} from "#typings/index.d.js";
import { APIGuildScheduledEvent, Snowflake } from "#typings/discord.js";
import getGuild from "#src/util/gluon/getGuild.js";

class GuildScheduledEventManager
  extends BaseCacheManager<ScheduledEventType>
  implements GuildScheduledEventManagerType
{
  #_client;
  #guild;
  static identifier = "events" as StructureIdentifiers;
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

  fetchFromRules(key: string): Promise<ScheduledEventType | null> {
    return super.fetchFromRules(key) as Promise<ScheduledEventType | null>;
  }

  fetchWithRules(key: string): Promise<ScheduledEventType | null> {
    return super.fetchWithRules(key) as Promise<ScheduledEventType | null>;
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
    const data = (await this.#_client.request.makeRequest(
      "getListGuildScheduledEvents",
      [this.#guild.id],
    )) as APIGuildScheduledEvent[];

    const eventsList = [];

    for (let i = 0; i < data.length; i++)
      eventsList.push(
        new ScheduledEvent(this.#_client, data[i], {
          guildId: this.#guild.id,
        }) as ScheduledEventType,
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
  fetch(scheduledEventId: Snowflake) {
    return GuildScheduledEventManager.fetchScheduledEvent(
      this.#_client,
      this.#guild.id,
      scheduledEventId,
    );
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

  static getScheduledEvent(
    client: ClientType,
    guildId: Snowflake,
    eventId: Snowflake,
  ) {
    const guild = getGuild(client, guildId);

    if (!guild) {
      throw new Error("GLUON: Guild not found in cache.");
    }

    return guild.scheduledEvents.get(eventId);
  }

  static async fetchScheduledEvent(
    client: ClientType,
    guildId: Snowflake,
    scheduledEventId: Snowflake,
  ) {
    if (typeof scheduledEventId !== "string")
      throw new TypeError("GLUON: Scheduled event ID must be a string.");

    const cachedEvent = GuildScheduledEventManager.getScheduledEvent(
      client,
      guildId,
      scheduledEventId,
    );
    if (cachedEvent) return cachedEvent;

    const data = (await client.request.makeRequest("getGuildScheduledEvent", [
      guildId,
      scheduledEventId,
    ])) as APIGuildScheduledEvent;

    return new ScheduledEvent(client, data, {
      guildId,
    }) as ScheduledEventType;
  }
}

export default GuildScheduledEventManager;
