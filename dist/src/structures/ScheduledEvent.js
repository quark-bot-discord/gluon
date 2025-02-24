var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _ScheduledEvent_instances,
  _ScheduledEvent__client,
  _ScheduledEvent__id,
  _ScheduledEvent__guild_id,
  _ScheduledEvent_name,
  _ScheduledEvent__creator_id,
  _ScheduledEvent_creator,
  _ScheduledEvent_scheduled_start_time,
  _ScheduledEvent_scheduled_end_time,
  _ScheduledEvent__image,
  _ScheduledEvent_user_count,
  _ScheduledEvent__attributes,
  _ScheduledEvent_location,
  _ScheduledEvent_description,
  _ScheduledEvent__formattedImageHash_get,
  _ScheduledEvent_rawEntityType_get,
  _ScheduledEvent_rawStatus_get;
import User from "./User.js";
import {
  CDN_BASE_URL,
  GLUON_DEBUG_LEVELS,
  TO_JSON_TYPES_ENUM,
} from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import util from "util";
/**
 * Represents an scheduled event.
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure}
 */
class ScheduledEvent {
  /**
   * Creates the structure for a scheduled event.
   * @param {Client} client The client instance.
   * @param {Object} data Scheduled event data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this event belongs to.
   * @param {Boolean?} [options.nocache] Whether this event should be cached or not.
   */
  constructor(client, data, { guildId, nocache = false } = { nocache: false }) {
    _ScheduledEvent_instances.add(this);
    _ScheduledEvent__client.set(this, void 0);
    _ScheduledEvent__id.set(this, void 0);
    _ScheduledEvent__guild_id.set(this, void 0);
    _ScheduledEvent_name.set(this, void 0);
    _ScheduledEvent__creator_id.set(this, void 0);
    _ScheduledEvent_creator.set(this, void 0);
    _ScheduledEvent_scheduled_start_time.set(this, void 0);
    _ScheduledEvent_scheduled_end_time.set(this, void 0);
    _ScheduledEvent__image.set(this, void 0);
    _ScheduledEvent_user_count.set(this, void 0);
    _ScheduledEvent__attributes.set(this, void 0);
    _ScheduledEvent_location.set(this, void 0);
    _ScheduledEvent_description.set(this, void 0);
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
    __classPrivateFieldSet(this, _ScheduledEvent__client, client, "f");
    /**
     * The id of the scheduled event.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _ScheduledEvent__id, BigInt(data.id), "f");
    /**
     * The id of the guild that this event belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _ScheduledEvent__guild_id,
      BigInt(guildId),
      "f",
    );
    /**
     * The name of the scheduled event.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _ScheduledEvent_name, data.name, "f");
    if (data.creator_id)
      /**
       * The id of the user who created the event.
       * @type {BigInt?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _ScheduledEvent__creator_id,
        BigInt(data.creator_id),
        "f",
      );
    if (data.creator)
      /**
       * The user who created the event.
       * @type {User?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _ScheduledEvent_creator,
        new User(
          __classPrivateFieldGet(this, _ScheduledEvent__client, "f"),
          data.creator,
        ),
        "f",
      );
    /**
     * The UNIX timestamp of the start time for the event.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _ScheduledEvent_scheduled_start_time,
      (new Date(data.scheduled_start_time).getTime() / 1000) | 0,
      "f",
    );
    if (data.scheduled_end_time)
      /**
       * The UNIX timestamp of the end time for the event.
       * @type {Number?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _ScheduledEvent_scheduled_end_time,
        (new Date(data.scheduled_end_time).getTime() / 1000) | 0,
        "f",
      );
    /**
     * The hash of the event's image.
     * @type {BigInt?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _ScheduledEvent__image,
      data.image ? BigInt(`0x${data.image}`) : null,
      "f",
    );
    if (data.description)
      __classPrivateFieldSet(
        this,
        _ScheduledEvent_description,
        data.description,
        "f",
      );
    /**
     * The number of users who have signed up for the event.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _ScheduledEvent_user_count,
      data.user_count ?? 0,
      "f",
    );
    /**
     * The attributes of the event.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _ScheduledEvent__attributes, 0, "f");
    switch (data.entity_type) {
      case 1: {
        // STAGE_INSTANCE
        __classPrivateFieldSet(
          this,
          _ScheduledEvent__attributes,
          __classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") |
            (0b1 << 0),
          "f",
        );
        break;
      }
      case 2: {
        // VOICE
        __classPrivateFieldSet(
          this,
          _ScheduledEvent__attributes,
          __classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") |
            (0b1 << 1),
          "f",
        );
        break;
      }
      case 3: {
        // EXTERNAL
        __classPrivateFieldSet(
          this,
          _ScheduledEvent__attributes,
          __classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") |
            (0b1 << 2),
          "f",
        );
        break;
      }
      default:
        break;
    }
    switch (data.status) {
      case 1: {
        // SCHEDULED
        __classPrivateFieldSet(
          this,
          _ScheduledEvent__attributes,
          __classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") |
            (0b1 << 3),
          "f",
        );
        break;
      }
      case 2: {
        // ACTIVE
        __classPrivateFieldSet(
          this,
          _ScheduledEvent__attributes,
          __classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") |
            (0b1 << 4),
          "f",
        );
        break;
      }
      case 3: {
        // COMPLETED
        __classPrivateFieldSet(
          this,
          _ScheduledEvent__attributes,
          __classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") |
            (0b1 << 5),
          "f",
        );
        break;
      }
      case 4: {
        // CANCELED
        __classPrivateFieldSet(
          this,
          _ScheduledEvent__attributes,
          __classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") |
            (0b1 << 6),
          "f",
        );
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
      __classPrivateFieldSet(
        this,
        _ScheduledEvent_location,
        data.location ?? data.entity_metadata.location,
        "f",
      );
    const shouldCache = ScheduledEvent.shouldCache(
      __classPrivateFieldGet(this, _ScheduledEvent__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (nocache === false && shouldCache) {
      this.guild.scheduledEvents.set(data.id, this);
      __classPrivateFieldGet(this, _ScheduledEvent__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE SCHEDULEDEVENT ${guildId} ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _ScheduledEvent__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
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
    return String(__classPrivateFieldGet(this, _ScheduledEvent__id, "f"));
  }
  /**
   * The guild ID of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _ScheduledEvent__guild_id, "f"));
  }
  /**
   * The name of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return __classPrivateFieldGet(this, _ScheduledEvent_name, "f");
  }
  /**
   * The ID of the user who created the event.
   * @type {String?}
   * @readonly
   * @public
   */
  get creatorId() {
    return __classPrivateFieldGet(this, _ScheduledEvent__creator_id, "f")
      ? String(__classPrivateFieldGet(this, _ScheduledEvent__creator_id, "f"))
      : null;
  }
  /**
   * The user who created the event.
   * @type {User?}
   * @readonly
   * @public
   */
  get creator() {
    return __classPrivateFieldGet(this, _ScheduledEvent_creator, "f");
  }
  /**
   * The description of the event.
   * @type {String}
   * @readonly
   * @public
   */
  get description() {
    return __classPrivateFieldGet(this, _ScheduledEvent_description, "f");
  }
  /**
   * The hash of the event's image, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalImageHash() {
    return __classPrivateFieldGet(this, _ScheduledEvent__image, "f")
      ? // eslint-disable-next-line quotes
        `${__classPrivateFieldGet(this, _ScheduledEvent_instances, "a", _ScheduledEvent__formattedImageHash_get)}`
      : null;
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
    if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 0)) ==
      0b1 << 0
    )
      return "STAGE_INSTANCE";
    else if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 1)) ==
      0b1 << 1
    )
      return "VOICE";
    else if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 2)) ==
      0b1 << 2
    )
      return "EXTERNAL";
    else return "UNKNOWN";
  }
  /**
   * The status of the event.
   * @readonly
   * @type {String}
   * @public
   */
  get status() {
    if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 3)) ==
      0b1 << 3
    )
      return "SCHEDULED";
    else if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 4)) ==
      0b1 << 4
    )
      return "ACTIVE";
    else if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 5)) ==
      0b1 << 5
    )
      return "COMPLETED";
    else if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 6)) ==
      0b1 << 6
    )
      return "CANCELED";
    else return "UNKNOWN";
  }
  /**
   * The guild that this event belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _ScheduledEvent__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The UNIX timestamp of the start time for the event.
   * @type {Number}
   * @readonly
   * @public
   */
  get scheduledStartTime() {
    return __classPrivateFieldGet(
      this,
      _ScheduledEvent_scheduled_start_time,
      "f",
    );
  }
  /**
   * The UNIX timestamp of the end time for the event.
   * @type {Number?}
   * @readonly
   * @public
   */
  get scheduledEndTime() {
    return __classPrivateFieldGet(
      this,
      _ScheduledEvent_scheduled_end_time,
      "f",
    );
  }
  /**
   * The number of users who have signed up for the event.
   * @type {Number}
   * @readonly
   * @public
   */
  get userCount() {
    return __classPrivateFieldGet(this, _ScheduledEvent_user_count, "f");
  }
  /**
   * The location of the event.
   * @type {String?}
   * @readonly
   * @public
   */
  get location() {
    return __classPrivateFieldGet(this, _ScheduledEvent_location, "f");
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
  static getImageUrl(id, hash) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Event id must be a string.");
    if (hash && typeof hash !== "string")
      throw new TypeError("GLUON: Event hash must be a string.");
    return hash
      ? `${CDN_BASE_URL}/guild-events/${id}/${hash}.${hash.startsWith("a_") ? "gif" : "png"}`
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
  static shouldCache(gluonCacheOptions, guildCacheOptions) {
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
  [((_ScheduledEvent__client = new WeakMap()),
  (_ScheduledEvent__id = new WeakMap()),
  (_ScheduledEvent__guild_id = new WeakMap()),
  (_ScheduledEvent_name = new WeakMap()),
  (_ScheduledEvent__creator_id = new WeakMap()),
  (_ScheduledEvent_creator = new WeakMap()),
  (_ScheduledEvent_scheduled_start_time = new WeakMap()),
  (_ScheduledEvent_scheduled_end_time = new WeakMap()),
  (_ScheduledEvent__image = new WeakMap()),
  (_ScheduledEvent_user_count = new WeakMap()),
  (_ScheduledEvent__attributes = new WeakMap()),
  (_ScheduledEvent_location = new WeakMap()),
  (_ScheduledEvent_description = new WeakMap()),
  (_ScheduledEvent_instances = new WeakSet()),
  (_ScheduledEvent__formattedImageHash_get =
    function _ScheduledEvent__formattedImageHash_get() {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      let formattedHash = __classPrivateFieldGet(
        this,
        _ScheduledEvent__image,
        "f",
      ).toString(16);
      while (formattedHash.length != 32)
        // eslint-disable-next-line quotes
        formattedHash = `0${formattedHash}`;
      return formattedHash;
    }),
  (_ScheduledEvent_rawEntityType_get =
    function _ScheduledEvent_rawEntityType_get() {
      if (
        (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
          (0b1 << 0)) ==
        0b1 << 0
      )
        return 1;
      else if (
        (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
          (0b1 << 1)) ==
        0b1 << 1
      )
        return 2;
      else if (
        (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
          (0b1 << 2)) ==
        0b1 << 2
      )
        return 3;
      else return 0;
    }),
  (_ScheduledEvent_rawStatus_get = function _ScheduledEvent_rawStatus_get() {
    if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 3)) ==
      0b1 << 3
    )
      return 1;
    else if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 4)) ==
      0b1 << 4
    )
      return 2;
    else if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 5)) ==
      0b1 << 5
    )
      return 3;
    else if (
      (__classPrivateFieldGet(this, _ScheduledEvent__attributes, "f") &
        (0b1 << 6)) ==
      0b1 << 6
    )
      return 4;
    else return 0;
  }),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          guild_id: this.guildId,
          name: this.name,
          description: this.description,
          creator_id: this.creatorId ?? undefined,
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          creator: this.creator.toJSON(format),
          scheduled_start_time: this.scheduledStartTime * 1000,
          scheduled_end_time: this.scheduledEndTime
            ? this.scheduledEndTime * 1000
            : undefined,
          image: this._originalImageHash,
          user_count: this.userCount,
          entity_type: __classPrivateFieldGet(
            this,
            _ScheduledEvent_instances,
            "a",
            _ScheduledEvent_rawEntityType_get,
          ),
          status: __classPrivateFieldGet(
            this,
            _ScheduledEvent_instances,
            "a",
            _ScheduledEvent_rawStatus_get,
          ),
          entity_metadata: {
            location: this.location,
          },
        };
      }
    }
  }
}
export default ScheduledEvent;
//# sourceMappingURL=ScheduledEvent.js.map
