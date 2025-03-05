import User from "./User.js";
import util from "util";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  APIGuildScheduledEvent,
  GuildScheduledEventEntityType,
  GuildScheduledEventStatus,
} from "discord-api-types/v10";
import type {
  ScheduledEvent as ScheduledEventType,
  ScheduledEventCacheJSON,
  ScheduledEventDiscordJSON,
  ScheduledEventStorageJSON,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
  UserCacheJSON,
  UserStorageJSON,
  UserDiscordJSON,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents an scheduled event.
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure}
 */
declare class ScheduledEvent implements ScheduledEventType {
  #private;
  /**
   * Creates the structure for a scheduled event.
   * @param {Client} client The client instance.
   * @param {Object} data Scheduled event data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this event belongs to.
   * @param {Boolean?} [options.nocache] Whether this event should be cached or not.
   */
  constructor(
    client: ClientType,
    data:
      | APIGuildScheduledEvent
      | ScheduledEventCacheJSON
      | ScheduledEventDiscordJSON
      | ScheduledEventStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
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
  get name(): string;
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
  get creator(): User | null;
  /**
   * The description of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get description(): string | null;
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
  get entityType(): GuildScheduledEventEntityType;
  /**
   * The status of the event.
   * @readonly
   * @type {String}
   * @public
   */
  get status(): GuildScheduledEventStatus;
  /**
   * The guild that this event belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): import("../../typings/index.d.ts").Guild | null;
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
  get scheduledEndTime(): number | null;
  /**
   * The number of users who have signed up for the event.
   * @type {Number}
   * @readonly
   * @public
   */
  get userCount(): number;
  /**
   * The location of the event.
   * @type {String?}
   * @readonly
   * @public
   */
  get location(): string;
  _decrementUserCount(): void;
  _incrementUserCount(): void;
  /**
   * Returns the URL of the event's image.
   * @param {String} id The id of the event.
   * @param {String?} [hash] The hash of the event's image.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getImageUrl(id: Snowflake, hash?: string | null): string | null;
  /**
   * Determines whether the scheduled event should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ): boolean;
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
  toJSON(format?: JsonTypes):
    | {
        id: string;
        guild_id: string;
        name: string;
        description: string | undefined;
        creator_id: string | undefined;
        creator: UserCacheJSON | UserStorageJSON;
        scheduled_start_time: number;
        scheduled_end_time: number | null;
        image: string | null;
        user_count: number;
        entity_type: GuildScheduledEventEntityType;
        status: GuildScheduledEventStatus;
        entity_metadata: {
          location: string;
        };
      }
    | {
        id: string;
        guild_id: string;
        name: string;
        description: string | undefined;
        creator_id: string | undefined;
        creator: UserDiscordJSON;
        scheduled_start_time: string;
        scheduled_end_time: string | null;
        image: string | null;
        user_count: number;
        entity_type: GuildScheduledEventEntityType;
        status: GuildScheduledEventStatus;
        entity_metadata: {
          location: string;
        };
      };
}
export default ScheduledEvent;
