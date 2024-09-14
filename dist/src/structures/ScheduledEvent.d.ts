export default ScheduledEvent;
/**
 * Represents an scheduled event.
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure}
 */
declare class ScheduledEvent {
    /**
     * Returns the URL of the event's image.
     * @param {String} id The id of the event.
     * @param {String?} hash The hash of the event's image.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getImageUrl(id: string, hash: string | null): string;
    /**
     * Determines whether the scheduled event should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions, guildCacheOptions: GuildCacheOptions): boolean;
    /**
     * Creates the structure for a scheduled event.
     * @param {Client} client The client instance.
     * @param {Object} data Scheduled event data from Discord.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The ID of the guild that this event belongs to.
     * @param {Boolean?} options.nocache Whether this event should be cached or not.
     */
    constructor(client: Client, data: any, { guildId, nocache }?: {
        guildId: string;
        nocache: boolean | null;
    });
    /**
     * The ID of the event.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The guild ID of the event.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The name of the event.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get name(): string;
    /**
     * The ID of the user who created the event.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get creatorId(): string;
    /**
     * The user who created the event.
     * @type {User?}
     * @readonly
     * @public
     */
    public readonly get creator(): User;
    /**
     * The description of the event.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get description(): string;
    /**
     * The url of the events's image.
     * @readonly
     * @type {String?}
     * @public
     */
    public readonly get displayImageURL(): string;
    /**
     * Where the event is scheduled to take place.
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get entityType(): string;
    /**
     * The status of the event.
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get status(): string;
    /**
     * The guild that this event belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * The UNIX timestamp of the start time for the event.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get scheduledStartTime(): number;
    /**
     * The UNIX timestamp of the end time for the event.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get scheduledEndTime(): number;
    /**
     * The number of users who have signed up for the event.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get userCount(): number;
    /**
     * The location of the event.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get location(): string;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} format The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format: number): any;
    #private;
}
import User from "./User.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Client from "../Client.js";
//# sourceMappingURL=ScheduledEvent.d.ts.map