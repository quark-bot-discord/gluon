import User from "./User.js";
import { CDN_BASE_URL } from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import util from "util";
import {
  APIGuildScheduledEvent,
  GuildScheduledEventEntityType,
  GuildScheduledEventStatus,
  Snowflake,
} from "#typings/discord.js";
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
} from "#typings/index.d.ts";
import { GluonDebugLevels, JsonTypes } from "#typings/enums.js";

/**
 * Represents an scheduled event.
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure}
 */
class ScheduledEvent implements ScheduledEventType {
  #_client;
  #_id;
  #_guild_id;
  #name;
  #_creator_id;
  #creator;
  #scheduled_start_time;
  #scheduled_end_time;
  #_image;
  #user_count;
  #_attributes;
  #location;
  #description;
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
    { guildId, nocache = false }: { guildId: Snowflake; nocache?: boolean },
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the scheduled event.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The id of the guild that this event belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    if (!this.guild) {
      throw new Error(`GLUON: Guild ${guildId} cannot be found in cache`);
    }

    /**
     * The name of the scheduled event.
     * @type {String}
     * @private
     */
    this.#name = data.name;

    if (data.creator_id)
      /**
       * The id of the user who created the event.
       * @type {BigInt?}
       * @private
       */
      this.#_creator_id = BigInt(data.creator_id);

    if (data.creator)
      /**
       * The user who created the event.
       * @type {User?}
       * @private
       */
      this.#creator = new User(this.#_client, data.creator);

    /**
     * The UNIX timestamp of the start time for the event.
     * @type {Number}
     * @private
     */
    this.#scheduled_start_time =
      (new Date(data.scheduled_start_time).getTime() / 1000) | 0;

    if (data.scheduled_end_time)
      /**
       * The UNIX timestamp of the end time for the event.
       * @type {Number?}
       * @private
       */
      this.#scheduled_end_time =
        (new Date(data.scheduled_end_time).getTime() / 1000) | 0;

    /**
     * The hash of the event's image.
     * @type {BigInt?}
     * @private
     */
    this.#_image = data.image ? BigInt(`0x${data.image}`) : null;

    if (data.description) this.#description = data.description;

    /**
     * The number of users who have signed up for the event.
     * @type {Number}
     * @private
     */
    this.#user_count = data.user_count ?? 0;

    /**
     * The attributes of the event.
     * @type {Number}
     * @private
     */
    this.#_attributes = 0;

    switch (data.entity_type) {
      case 1: {
        // STAGE_INSTANCE
        this.#_attributes |= 0b1 << 0;
        break;
      }
      case 2: {
        // VOICE
        this.#_attributes |= 0b1 << 1;
        break;
      }
      case 3: {
        // EXTERNAL
        this.#_attributes |= 0b1 << 2;
        break;
      }
      default:
        break;
    }

    switch (data.status) {
      case 1: {
        // SCHEDULED
        this.#_attributes |= 0b1 << 3;
        break;
      }
      case 2: {
        // ACTIVE
        this.#_attributes |= 0b1 << 4;
        break;
      }
      case 3: {
        // COMPLETED
        this.#_attributes |= 0b1 << 5;
        break;
      }
      case 4: {
        // CANCELED
        this.#_attributes |= 0b1 << 6;
        break;
      }
      default:
        break;
    }

    if (this.entityType == GuildScheduledEventEntityType.External) {
      /**
       * The location of the event.
       * @type {String?}
       * @private
       */
      this.#location =
        data.entity_metadata?.location ??
        ("location" in data ? data.location : undefined);
    }

    const shouldCache = ScheduledEvent.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (nocache === false && shouldCache) {
      this.guild.scheduledEvents.set(data.id, this);
      this.#_client._emitDebug(
        GluonDebugLevels.Info,
        `CACHE SCHEDULEDEVENT ${guildId} ${data.id}`,
      );
    } else {
      this.#_client._emitDebug(
        GluonDebugLevels.Info,
        `NO CACHE SCHEDULEDEVENT ${guildId} ${data.id} (${nocache} ${shouldCache})`,
      );
    }
  }

  /**
   * The ID of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The guild ID of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The name of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * The ID of the user who created the event.
   * @type {String?}
   * @readonly
   * @public
   */
  get creatorId() {
    return this.#_creator_id ? String(this.#_creator_id) : null;
  }

  /**
   * The user who created the event.
   * @type {User?}
   * @readonly
   * @public
   */
  get creator() {
    return this.#creator ?? null;
  }

  /**
   * The description of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get description() {
    return this.#description ?? null;
  }

  /**
   * The hash of the event's image, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalImageHash() {
    return this.#_image
      ? // eslint-disable-next-line quotes
        `${this.#_formattedImageHash}`
      : null;
  }

  /**
   * The hash of the event's image as a string.
   * @readonly
   * @type {String}
   * @private
   */
  get #_formattedImageHash() {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    let formattedHash = this.#_image.toString(16);

    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = `0${formattedHash}`;

    return formattedHash;
  }

  /**
   * The url of the events's image.
   * @readonly
   * @type {String?}
   * @public
   */
  get displayImageURL() {
    return ScheduledEvent.getImageUrl(this.id, this._originalImageHash);
  }

  /**
   * Where the event is scheduled to take place.
   * @readonly
   * @type {String}
   * @public
   */
  get entityType() {
    if ((this.#_attributes & (0b1 << 0)) == 0b1 << 0)
      return GuildScheduledEventEntityType.StageInstance;
    else if ((this.#_attributes & (0b1 << 1)) == 0b1 << 1)
      return GuildScheduledEventEntityType.Voice;
    else if ((this.#_attributes & (0b1 << 2)) == 0b1 << 2)
      return GuildScheduledEventEntityType.External;

    throw new Error("GLUON: Unknown entity type.");
  }

  /**
   * The status of the event.
   * @readonly
   * @type {String}
   * @public
   */
  get status() {
    if ((this.#_attributes & (0b1 << 3)) == 0b1 << 3)
      return GuildScheduledEventStatus.Scheduled;
    else if ((this.#_attributes & (0b1 << 4)) == 0b1 << 4)
      return GuildScheduledEventStatus.Active;
    else if ((this.#_attributes & (0b1 << 5)) == 0b1 << 5)
      return GuildScheduledEventStatus.Completed;
    else if ((this.#_attributes & (0b1 << 6)) == 0b1 << 6)
      return GuildScheduledEventStatus.Canceled;

    throw new Error("GLUON: Unknown status.");
  }

  /**
   * The guild that this event belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The UNIX timestamp of the start time for the event.
   * @type {Number}
   * @readonly
   * @public
   */
  get scheduledStartTime() {
    return this.#scheduled_start_time;
  }

  /**
   * The UNIX timestamp of the end time for the event.
   * @type {Number?}
   * @readonly
   * @public
   */
  get scheduledEndTime() {
    return this.#scheduled_end_time ?? null;
  }

  /**
   * The number of users who have signed up for the event.
   * @type {Number}
   * @readonly
   * @public
   */
  get userCount() {
    return this.#user_count;
  }

  /**
   * The location of the event.
   * @type {String?}
   * @readonly
   * @public
   */
  get location() {
    return (this.#location as string) ?? null;
  }

  _decrementUserCount() {
    this.#user_count--;
  }

  _incrementUserCount() {
    this.#user_count++;
  }

  /**
   * Returns the URL of the event's image.
   * @param {String} id The id of the event.
   * @param {String?} [hash] The hash of the event's image.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getImageUrl(id: Snowflake, hash?: string | null) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Event id must be a string.");
    if (hash && typeof hash !== "string")
      throw new TypeError("GLUON: Event hash must be a string.");
    return hash
      ? `${CDN_BASE_URL}/guild-events/${id}/${hash}.${
          hash.startsWith("a_") ? "gif" : "png"
        }`
      : null;
  }

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
  ) {
    if (!(gluonCacheOptions instanceof GluonCacheOptions))
      throw new TypeError(
        "GLUON: Gluon cache options must be a GluonCacheOptions.",
      );
    if (!(guildCacheOptions instanceof GuildCacheOptions))
      throw new TypeError(
        "GLUON: Guild cache options must be a GuildCacheOptions.",
      );
    if (gluonCacheOptions.cacheScheduledEvents === false) return false;
    if (guildCacheOptions.scheduledEventCaching === false) return false;
    return true;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<ScheduledEvent: ${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format?: JsonTypes) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          id: this.id,
          guild_id: this.guildId,
          name: this.name,
          description: this.description ?? undefined,
          creator_id: this.creatorId ?? undefined,
          creator: this.creator?.toJSON(format) as
            | UserCacheJSON
            | UserStorageJSON,
          scheduled_start_time: this.scheduledStartTime * 1000,
          scheduled_end_time: this.scheduledEndTime
            ? this.scheduledEndTime * 1000
            : null,
          image: this._originalImageHash,
          user_count: this.userCount,
          entity_type: this.entityType,
          status: this.status,
          entity_metadata: {
            location: this.location as string,
          },
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          guild_id: this.guildId,
          name: this.name,
          description: this.description ?? undefined,
          creator_id: this.creatorId ?? undefined,
          creator: this.creator?.toJSON(format) as UserDiscordJSON,
          scheduled_start_time: new Date(
            this.scheduledStartTime * 1000,
          ).toISOString(),
          scheduled_end_time: this.scheduledEndTime
            ? new Date(this.scheduledEndTime * 1000).toISOString()
            : null,
          image: this._originalImageHash,
          user_count: this.userCount,
          entity_type: this.entityType,
          status: this.status,
          entity_metadata: {
            location: this.location as string,
          },
        };
      }
    }
  }
}

export default ScheduledEvent;
