const User = require("./User");
const { CDN_BASE_URL } = require("../constants");

/**
 * Represents an scheduled event.
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure}
 */
class ScheduledEvent {
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data Scheduled event data from Discord.
   */
  constructor(client, data, nocache = false) {
    /**
     * The client instance.
     * @type {Client}
     */
    this._client = client;

    /**
     * The id of the scheduled event.
     * @type {BigInt}
     */
    this.id = BigInt(data.id);

    /**
     * The id of the guild that this event belongs to.
     * @type {BigInt}
     */
    this._guild_id = BigInt(data.guild_id);

    // const existing = this.guild?.scheduledEvents.cache.get(data.id) || null;

    /**
     * The name of the scheduled event.
     * @type {String}
     */
    this.name = data.name;

    if (data.creator_id)
      /**
       * The id of the user who created the event.
       * @type {BigInt?}
       */
      this._creator_id = BigInt(data.creator_id);

    if (data.creator)
      /**
       * The user who created the event.
       * @type {User?}
       */
      this.creator = new User(this._client, data.creator);

    /**
     * The UNIX timestamp of the start time for the event.
     * @type {Number}
     */
    this.scheduled_start_time =
      (new Date(data.scheduled_start_time).getTime() / 1000) | 0;

    if (data.scheduled_end_time)
      /**
       * The UNIX timestamp of the end time for the event.
       * @type {Number?}
       */
      this.scheduled_end_time =
        (new Date(data.scheduled_end_time).getTime() / 1000) | 0;

    this._image = data.image ? BigInt("0x" + data.image) : null;

    /**
     * The number of users who have signed up for the event.
     * @type {Number}
     */
    this.user_count = data.user_count ?? 0;

    this._attributes = 0;

    switch (data.entity_type) {
      case 1: {
        // STAGE_INSTANCE
        this._attributes |= 0b1 << 0;
        break;
      }
      case 2: {
        // VOICE
        this._attributes |= 0b1 << 1;
        break;
      }
      case 3: {
        // EXTERNAL
        this._attributes |= 0b1 << 2;
        break;
      }
    }

    switch (data.status) {
      case 1: {
        // SCHEDULED
        this._attributes |= 0b1 << 3;
        break;
      }
      case 2: {
        // ACTIVE
        this._attributes |= 0b1 << 4;
        break;
      }
      case 3: {
        // COMPLETED
        this._attributes |= 0b1 << 5;
        break;
      }
      case 4: {
        // CANCELED
        this._attributes |= 0b1 << 6;
        break;
      }
    }

    if (this.entity_type == "EXTERNAL")
      /**
       * The location of the event.
       * @type {String?}
       */
      this.location = data.location ?? data.entity_metadata.location;

    if (nocache == false && this._client.cacheScheduledEvents == true)
      this.guild?.scheduled_events.cache.set(data.id, this);
  }

  /**
   * The hash of the event's image, as it was received from Discord.
   * @readonly
   * @type {String?}
   */
  get _originalImageHash() {
    return this._image
      ? // eslint-disable-next-line quotes
        `${this._formattedImageHash}`
      : null;
  }

  /**
   * The hash of the event's image as a string.
   * @readonly
   * @type {String}
   */
  get _formattedImageHash() {
    let formattedHash = this._image.toString(16);

    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = "0" + formattedHash;

    return formattedHash;
  }

  /**
   * The url of the events's image.
   * @readonly
   * @type {String?}
   */
  get displayImageURL() {
    return this._image
      ? // eslint-disable-next-line quotes
        `${CDN_BASE_URL}/guild-events/${this.id}/${this._originalImageHash}.png`
      : null;
  }

  /**
   * Where the event is scheduled to take place.
   * @readonly
   * @type {String}
   */
  get entity_type() {
    if ((this._attributes & (0b1 << 0)) == 0b1 << 0) return "STAGE_INSTANCE";
    else if ((this._attributes & (0b1 << 1)) == 0b1 << 1) return "VOICE";
    else if ((this._attributes & (0b1 << 2)) == 0b1 << 2) return "EXTERNAL";
    else return "UNKNOWN";
  }

  /**
   * The status of the event.
   * @readonly
   * @type {String}
   */
  get status() {
    if ((this._attributes & (0b1 << 3)) == 0b1 << 3) return "SCHEDULED";
    else if ((this._attributes & (0b1 << 4)) == 0b1 << 4) return "ACTIVE";
    else if ((this._attributes & (0b1 << 5)) == 0b1 << 5) return "COMPLETED";
    else if ((this._attributes & (0b1 << 6)) == 0b1 << 6) return "CANCELED";
    else return "UNKNOWN";
  }

  /**
   * The guild that this event belongs to.
   * @type {Guild?}
   * @readonly
   */
  get guild() {
    return this._client.guilds.cache.get(String(this._guild_id)) || null;
  }

  toJSON() {
    return {
      id: String(this.id),
      guild_id: String(this._guild_id),
      name: this.name,
      creator_id: this._creator_id ? String(this._creator_id) : undefined,
      creator: this.creator,
      scheduled_start_time: this.scheduled_start_time * 1000,
      scheduled_end_time: this.scheduled_end_time
        ? this.scheduled_end_time * 1000
        : undefined,
      image: this._originalImageHash,
      user_count: this.user_count,
      entity_type: this.entity_type,
      status: this.status,
      location: this.location,
    };
  }
}

module.exports = ScheduledEvent;
