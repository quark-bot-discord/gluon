import Client from "../Client.js";
import {
  GLUON_CACHING_OPTIONS,
  GLUON_DEBUG_LEVELS,
  TO_JSON_TYPES_ENUM,
} from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Member from "./Member.js";
import util from "util";

/**
 * Represents a voice state.
 */
class VoiceState {
  #_client;
  #_guild_id;
  #_channel_id;
  #_attributes;
  #member;
  #_user_id;
  #joined;
  #request_to_speak_timestamp;
  /**
   * Creates the structure for a voice state.
   * @param {Client} client The client instance.
   * @param {Object} data The raw voice state data from Discord.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The id of the guild that the voice state belongs to.
   * @param {Boolean?} [options.nocache] Whether this voice state should be cached.
   */
  constructor(client, data, { guildId, nocache = false } = { nocache: false }) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client");
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
     * The id of the guild that this voice state belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    if (this.guild)
      nocache =
        (this.guild._cache_options & GLUON_CACHING_OPTIONS.NO_VOICE_STATE) ==
        GLUON_CACHING_OPTIONS.NO_VOICE_STATE;

    const existing = this.guild?.voiceStates.get(data.user_id) || null;

    /**
     * The id of the channel involved.
     * @type {BigInt}
     * @private
     */
    this.#_channel_id = BigInt(data.channel_id);

    /**
     * The attributes of the voice state.
     * @type {Number}
     * @private
     */
    this.#_attributes = data._attributes ?? 0;

    if (data.deaf == true) this.#_attributes |= 0b1 << 0;

    if (data.mute == true) this.#_attributes |= 0b1 << 1;

    if (data.self_deaf == true) this.#_attributes |= 0b1 << 2;

    if (data.self_mute == true) this.#_attributes |= 0b1 << 3;

    if (data.self_stream == true) this.#_attributes |= 0b1 << 4;

    if (data.self_video == true) this.#_attributes |= 0b1 << 5;

    if (data.suppress == true) this.#_attributes |= 0b1 << 6;

    if (data.member)
      /**
       * The member the voice state is about.
       * @type {Member?}
       * @private
       */
      this.#member = new Member(this.#_client, data.member, {
        userId: data.user_id,
        guildId: data.guild_id,
        nocache,
      });
    else this.#member = this.guild?.members.get(data.user_id) || null;

    /**
     * The id of the user the voice state is about.
     * @type {BigInt}
     * @private
     */
    this.#_user_id = BigInt(data.user_id);

    /**
     * The UNIX time the user joined the voice channel.
     * @type {Number}
     * @private
     */
    if (typeof data.joined == "number") this.#joined = data.joined;
    else if (existing && typeof existing.joined == "number")
      this.#joined = existing.joined;
    else this.#joined = (Date.now() / 1000) | 0;

    /**
     * The UNIX timestamp of when the user requested to speak.
     * @type {Number?}
     * @private
     */
    if (data.request_to_speak_timestamp)
      this.#request_to_speak_timestamp =
        (new Date(data.request_to_speak_timestamp).getTime() / 1000) | 0;

    const shouldCache = VoiceState.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (nocache === false && shouldCache) {
      this.guild.voiceStates.set(data.user_id, this);
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE VOICESTATE ${guildId} ${data.user_id}`,
      );
    } else {
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE VOICESTATE ${guildId} ${data.user_id} (${nocache} ${shouldCache})`,
      );
    }
  }

  /**
   * Is server deafened?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get deaf() {
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Is server muted?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mute() {
    return (this.#_attributes & (0b1 << 1)) == 0b1 << 1;
  }

  /**
   * Is self defeaned?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfDeaf() {
    return (this.#_attributes & (0b1 << 2)) == 0b1 << 2;
  }

  /**
   * Is self muted?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfMute() {
    return (this.#_attributes & (0b1 << 3)) == 0b1 << 3;
  }

  /**
   * Is streaming?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfStream() {
    return (this.#_attributes & (0b1 << 4)) == 0b1 << 4;
  }

  /**
   * Is sharing video?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfVideo() {
    return (this.#_attributes & (0b1 << 5)) == 0b1 << 5;
  }

  /**
   * Is suppressed (for stage channels)?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get suppress() {
    return (this.#_attributes & (0b1 << 6)) == 0b1 << 6;
  }

  /**
   * The guild that this voice state belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The id of the guild that this voice state belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The channel involved.
   * @type {Channel?}
   * @readonly
   * @public
   */
  get channel() {
    return this.guild?.channels.get(this.channelId) || null;
  }

  /**
   * The id of the channel involved.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId() {
    return String(this.#_channel_id);
  }

  /**
   * The member the voice state is about.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member() {
    return this.#member;
  }

  /**
   * The id of the user the voice state is about.
   * @type {String}
   * @readonly
   * @public
   */
  get memberId() {
    return String(this.#_user_id);
  }

  /**
   * The UNIX time the user joined the voice channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get joined() {
    return this.#joined;
  }

  /**
   * The UNIX timestamp of when the user requested to speak.
   * @type {Number?}
   * @readonly
   * @public
   */
  get requestToSpeakTimestamp() {
    return this.#request_to_speak_timestamp;
  }

  /**
   * Determines whether the voice state should be cached.
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
    if (gluonCacheOptions.cacheVoiceStates === false) return false;
    if (guildCacheOptions.voiceStateCaching === false) return false;
    return true;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<VoiceState: ${this.memberId}>`;
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
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT: {
        return {
          guild_id: this.guildId,
          channel_id: this.channelId,
          _attributes: this.#_attributes,
          member: this.member.toJSON(format),
          user_id: this.memberId,
          joined: this.joined,
          request_to_speak_timestamp: this.requestToSpeakTimestamp * 1000,
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          guild_id: this.guildId,
          channel_id: this.channelId,
          deaf: this.deaf,
          mute: this.mute,
          self_deaf: this.selfDeaf,
          self_mute: this.selfMute,
          self_stream: this.selfStream,
          self_video: this.selfVideo,
          suppress: this.suppress,
          member: this.member,
          user_id: this.memberId,
          joined: this.joined,
          request_to_speak_timestamp: this.requestToSpeakTimestamp * 1000,
        };
      }
    }
  }
}

export default VoiceState;
