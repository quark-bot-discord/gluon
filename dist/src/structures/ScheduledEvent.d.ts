import User from "./User.js";
import util from "util";
/**
 * Represents an scheduled event.
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure}
 */
declare class ScheduledEvent {
  #private;
  /**
   * Creates the structure for a scheduled event.
   * @param {Client} client The client instance.
   * @param {Object} data Scheduled event data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this event belongs to.
   * @param {Boolean?} [options.nocache] Whether this event should be cached or not.
   */
  constructor(client: any, data: any, { guildId, nocache }?: any);
  /**
   * The ID of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The guild ID of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The name of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get name(): any;
  /**
   * The ID of the user who created the event.
   * @type {String?}
   * @readonly
   * @public
   */
  get creatorId(): string | null;
  /**
   * The user who created the event.
   * @type {User?}
   * @readonly
   * @public
   */
  get creator(): User | undefined;
  /**
   * The description of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get description(): any;
  /**
   * The hash of the event's image, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalImageHash(): string | null;
  /**
   * The url of the events's image.
   * @readonly
   * @type {String?}
   * @public
   */
  get displayImageURL(): string | null;
  /**
   * Where the event is scheduled to take place.
   * @readonly
   * @type {String}
   * @public
   */
  get entityType(): "STAGE_INSTANCE" | "VOICE" | "EXTERNAL" | "UNKNOWN";
  /**
   * The status of the event.
   * @readonly
   * @type {String}
   * @public
   */
  get status(): "UNKNOWN" | "SCHEDULED" | "ACTIVE" | "COMPLETED" | "CANCELED";
  /**
   * The guild that this event belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): any;
  /**
   * The UNIX timestamp of the start time for the event.
   * @type {Number}
   * @readonly
   * @public
   */
  get scheduledStartTime(): number;
  /**
   * The UNIX timestamp of the end time for the event.
   * @type {Number?}
   * @readonly
   * @public
   */
  get scheduledEndTime(): number | undefined;
  /**
   * The number of users who have signed up for the event.
   * @type {Number}
   * @readonly
   * @public
   */
  get userCount(): any;
  /**
   * The location of the event.
   * @type {String?}
   * @readonly
   * @public
   */
  get location(): any;
  /**
   * Returns the URL of the event's image.
   * @param {String} id The id of the event.
   * @param {String?} [hash] The hash of the event's image.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getImageUrl(id: any, hash: any): string | null;
  /**
   * Determines whether the scheduled event should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions: any, guildCacheOptions: any): boolean;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format: any): {
    id: string;
    guild_id: string;
    name: any;
    description: any;
    creator_id: string | undefined;
    creator:
      | {
          id: string;
          avatar: string | null;
          _cached: any;
          bot: boolean;
          username: any;
          global_name: any;
          discriminator: string | null;
        }
      | {
          id: string;
          avatar: string | null;
          bot: boolean;
          username: any;
          global_name: any;
          discriminator: string | null;
          _cached?: undefined;
        };
    scheduled_start_time: number;
    scheduled_end_time: number | undefined;
    image: string | null;
    user_count: any;
    entity_type: number;
    status: number;
    entity_metadata: {
      location: any;
    };
  };
}
export default ScheduledEvent;
