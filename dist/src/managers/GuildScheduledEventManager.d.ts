export default GuildScheduledEventManager;
declare class GuildScheduledEventManager extends BaseCacheManager {
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
    public list(): Promise<Array<ScheduledEvent>>;
    /**
     * Fetches a scheduled event from the API.
     * @param {String} scheduledEventId The ID of the event to fetch.
     * @returns {Promise<ScheduledEvent>}
     * @async
     * @method
     * @public
     * @throws {TypeError | Error}
     */
    public fetch(scheduledEventId: string): Promise<ScheduledEvent>;
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
    public override set(id: string, event: ScheduledEvent): ScheduledEvent;
    #private;
}
import BaseCacheManager from "./BaseCacheManager.js";
import ScheduledEvent from "../structures/ScheduledEvent.js";
//# sourceMappingURL=GuildScheduledEventManager.d.ts.map