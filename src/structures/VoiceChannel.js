const Channel = require("./Channel");

/**
 * Represents a voice channel.
 */
class VoiceChannel extends Channel {
  /**
   * Creates the structure for a voice channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data from Discord.
   * @param {String} guild_id The id of the guild that the voice channel belongs to.
   * @param {Boolean?} nocache Whether the voice channel should be cached.
   */
  constructor(client, data, guild_id, nocache = false) {
    super(client, data, guild_id);

    const existing = this.guild?.channels.cache.get(data.id) || null;

    if (typeof data.bitrate == "number")
      /**
       * The bitrate of the channel.
       * @type {Number}
       */
      this.bitrate = data.bitrate;
    else if (existing && typeof existing.bitrate)
      this.bitrate = existing.bitrate;

    if (typeof data.user_limit == "number")
      /**
       * The user limit of the channel.
       * @type {Number}
       */
      this.user_limit = data.user_limit;
    else if (existing && typeof existing.user_limit == "number")
      this.user_limit = existing.user_limit;

    if (typeof data.rtc_region == "string")
      /**
       * The region of the voice channel.
       * @type {String}
       */
      this.rtc_region = data.rtc_region;
    else if (existing && typeof existing.rtc_region == "string")
      this.rtc_region = existing.rtc_region;

    if (nocache == false && this.client.cacheChannels == true)
      this.guild?.channels.cache.set(data.id, this);
  }
}

module.exports = VoiceChannel;
