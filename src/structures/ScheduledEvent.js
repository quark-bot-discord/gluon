import User from "./User.js";
import getEventImage from "../util/image/getEventImage.js";

/**
 * Represents an scheduled event.
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure}
 */
class ScheduledEvent {
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
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data Scheduled event data from Discord.
   */
  constructor(
    client,
    data,
    { guild_id, nocache = false } = { nocache: false },
  ) {
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
    this.#_guild_id = BigInt(guild_id);

    // const existing = this.guild?.scheduledEvents.get(data.id) || null;

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

    if (this.entityType == "EXTERNAL")
      /**
       * The location of the event.
       * @type {String?}
       * @private
       */
      this.#location = data.location ?? data.entity_metadata.location;

    if (nocache == false && this.#_client.cacheScheduledEvents == true)
      this.guild?.scheduled_events.set(data.id, this);
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
    return this.#creator;
  }

  /**
   * The hash of the event's image, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @private
   */
  get #_originalImageHash() {
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
    return getEventImage(this.id, this.#_originalImageHash);
  }

  /**
   * Where the event is scheduled to take place.
   * @readonly
   * @type {String}
   * @public
   */
  get entityType() {
    if ((this.#_attributes & (0b1 << 0)) == 0b1 << 0) return "STAGE_INSTANCE";
    else if ((this.#_attributes & (0b1 << 1)) == 0b1 << 1) return "VOICE";
    else if ((this.#_attributes & (0b1 << 2)) == 0b1 << 2) return "EXTERNAL";
    else return "UNKNOWN";
  }

  /**
   * The status of the event.
   * @readonly
   * @type {String}
   * @public
   */
  get status() {
    if ((this.#_attributes & (0b1 << 3)) == 0b1 << 3) return "SCHEDULED";
    else if ((this.#_attributes & (0b1 << 4)) == 0b1 << 4) return "ACTIVE";
    else if ((this.#_attributes & (0b1 << 5)) == 0b1 << 5) return "COMPLETED";
    else if ((this.#_attributes & (0b1 << 6)) == 0b1 << 6) return "CANCELED";
    else return "UNKNOWN";
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
    return this.#scheduled_end_time;
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
    return this.#location;
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
  toJSON() {
    return {
      id: this.id,
      guild_id: this.guildId,
      name: this.name,
      creator_id: this.creatorId ?? undefined,
      creator: this.creator,
      scheduled_start_time: this.scheduledStartTime * 1000,
      scheduled_end_time: this.scheduledEndTime
        ? this.scheduledEndTime * 1000
        : undefined,
      image: this.#_originalImageHash,
      user_count: this.userCount,
      entity_type: this.entityType,
      status: this.status,
      location: this.location,
    };
  }
}

export default ScheduledEvent;
