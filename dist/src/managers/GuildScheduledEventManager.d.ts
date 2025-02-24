import ScheduledEvent from "../structures/ScheduledEvent.js";
import BaseCacheManager from "./BaseCacheManager.js";
declare class GuildScheduledEventManager extends BaseCacheManager {
  #private;
  static identifier: string;
  constructor(client: any, guild: any);
  /**
   * Retrieves all scheduled events for this guild.
   * @returns {Promise<Array<ScheduledEvent>>}
   * @async
   * @method
   * @public
   * @throws {Error}
   */
  list(): Promise<ScheduledEvent[]>;
  /**
   * Fetches a scheduled event from the API.
   * @param {String} scheduledEventId The ID of the event to fetch.
   * @returns {Promise<ScheduledEvent>}
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  fetch(scheduledEventId: any): Promise<any>;
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
  set(id: any, event: any): Map<any, any>;
}
export default GuildScheduledEventManager;
