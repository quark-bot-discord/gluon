import BaseCacheManager from "./BaseCacheManager.js";
import {
  ScheduledEvent as ScheduledEventType,
  StructureIdentifiers,
  Guild as GuildType,
  GuildScheduledEventManager as GuildScheduledEventManagerType,
  Client as ClientType,
} from "#typings/index.d.js";
import { Snowflake } from "#typings/discord.js";
declare class GuildScheduledEventManager
  extends BaseCacheManager<ScheduledEventType>
  implements GuildScheduledEventManagerType
{
  #private;
  static identifier: StructureIdentifiers;
  constructor(client: ClientType, guild: GuildType);
  fetchFromRules(key: string): Promise<ScheduledEventType | null>;
  fetchWithRules(key: string): Promise<ScheduledEventType | null>;
  /**
   * Retrieves all scheduled events for this guild.
   * @returns {Promise<Array<ScheduledEvent>>}
   * @async
   * @method
   * @public
   * @throws {Error}
   */
  list(): Promise<ScheduledEventType[]>;
  /**
   * Fetches a scheduled event from the API.
   * @param {String} scheduledEventId The ID of the event to fetch.
   * @returns {Promise<ScheduledEvent>}
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  fetch(scheduledEventId: Snowflake): Promise<ScheduledEventType | null>;
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
  set(id: Snowflake, event: ScheduledEventType): void;
  get(id: Snowflake): ScheduledEventType | null;
}
export default GuildScheduledEventManager;
