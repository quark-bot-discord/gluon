import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Channel from "./Channel.js";
import Message from "./Message.js";
import util from "util";

/**
 * Represents a voice channel.
 * @extends {Channel}
 */
class VoiceChannel extends Channel {
  #_client;
  #bitrate;
  #user_limit;
  #rtc_region;
  /**
   * Creates the structure for a voice channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data from Discord.
   * @param {String} guild_id The id of the guild that the voice channel belongs to.
   * @param {Boolean?} nocache Whether the voice channel should be cached.
   */
  constructor(
    client,
    data,
    { guild_id, nocache = false } = { nocache: false },
  ) {
    super(client, data, { guild_id });

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    const existing = this.guild?.channels.get(data.id) || null;

    if (typeof data.bitrate == "number")
      /**
       * The bitrate of the channel.
       * @type {Number}
       * @private
       */
      this.#bitrate = data.bitrate;
    else if (existing && typeof existing.bitrate)
      this.#bitrate = existing.bitrate;

    if (typeof data.user_limit == "number")
      /**
       * The user limit of the channel.
       * @type {Number}
       * @private
       */
      this.#user_limit = data.user_limit;
    else if (existing && typeof existing.userLimit == "number")
      this.#user_limit = existing.userLimit;

    if (typeof data.rtc_region == "string")
      /**
       * The region of the voice channel.
       * @type {String}
       * @private
       */
      this.#rtc_region = data.rtc_region;
    else if (existing && typeof existing.rtcRegion == "string")
      this.#rtc_region = existing.rtcRegion;

    if (
      nocache === false &&
      Channel.shouldCache(this.#_client._cacheOptions, this.guild._cacheOptions)
    )
      this.guild.channels.set(data.id, this);

    if (data.messages)
      for (let i = 0; i < data.messages.length; i++)
        new Message(this.#_client, data.messages[i], {
          channel_id: this.id,
          guild_id,
        });
  }

  /**
   * The bitrate of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get bitrate() {
    return this.#bitrate;
  }

  /**
   * The user limit of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get userLimit() {
    return this.#user_limit;
  }

  /**
   * The region of the voice channel.
   * @type {String}
   * @readonly
   * @public
   */
  get rtcRegion() {
    return this.#rtc_region;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<VoiceChannel: ${this.id}>`;
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
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          bitrate: this.bitrate,
          user_limit: this.userLimit,
          rtc_region: this.rtcRegion,
        };
      }
    }
  }
}

export default VoiceChannel;
