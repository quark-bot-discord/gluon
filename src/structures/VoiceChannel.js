const Channel = require("./Channel");

/**
 * Represents a voice channel.
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
  constructor(client, data, guild_id, nocache = false) {
    super(client, data, { guild_id });

    this.#_client = client;

    const existing = this.guild?.channels.get(data.id) || null;

    if (typeof data.bitrate == "number")
      /**
       * The bitrate of the channel.
       * @type {Number}
       */
      this.#bitrate = data.bitrate;
    else if (existing && typeof existing.bitrate)
      this.#bitrate = existing.bitrate;

    if (typeof data.user_limit == "number")
      /**
       * The user limit of the channel.
       * @type {Number}
       */
      this.#user_limit = data.user_limit;
    else if (existing && typeof existing.userLimit == "number")
      this.#user_limit = existing.userLimit;

    if (typeof data.rtc_region == "string")
      /**
       * The region of the voice channel.
       * @type {String}
       */
      this.#rtc_region = data.rtc_region;
    else if (existing && typeof existing.rtcRegion == "string")
      this.#rtc_region = existing.rtcRegion;

    if (nocache == false && this.#_client.cacheChannels == true)
      this.guild?.channels.set(data.id, this);
  }

  /**
   * The bitrate of the channel.
   * @type {Number}
   * @readonly
   */
  get bitrate() {
    return this.#bitrate;
  }

  /**
   * The user limit of the channel.
   * @type {Number}
   * @readonly
   */
  get userLimit() {
    return this.#user_limit;
  }

  /**
   * The region of the voice channel.
   * @type {String}
   * @readonly
   */
  get rtcRegion() {
    return this.#rtc_region;
  }

  toString() {
    return `<VoiceChannel: ${this.id}>`;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      bitrate: this.bitrate,
      user_limit: this.userLimit,
      rtc_region: this.rtcRegion,
    };
  }
}

module.exports = VoiceChannel;
