import { GLUON_CACHING_OPTIONS } from "../constants.js";
import Member from "./Member.js";

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
   * @param {String} guild_id The id of the guild that the voice state belongs to.
   * @param {Boolean?} nocache Whether this voice state should be cached.
   */
  constructor(client, data, guild_id, nocache = false) {
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
    this.#_guild_id = BigInt(guild_id);

    if (this.guild)
      nocache =
        (this.guild._cache_options & GLUON_CACHING_OPTIONS.NO_VOICE_STATE) ==
        GLUON_CACHING_OPTIONS.NO_VOICE_STATE;

    const existing = this.guild?.voice_states.get(data.user_id) || null;

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
    this.#_attributes = 0;

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
        user_id: data.user_id,
        guild_id: data.guild_id,
        user: data.member.user,
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

    if (nocache == false && this.#_client.cacheVoiceStates == true)
      this.guild?.voice_states.set(data.user_id, this);
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
   * The user the voice state is about.
   * @type {User?}
   * @readonly
   * @public
   */
  get user() {
    return this.#_client.users.get(this.userId) || null;
  }

  /**
   * The id of the user the voice state is about.
   * @type {String}
   * @readonly
   * @public
   */
  get userId() {
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
   * @method
   * @public
   */
  toString() {
    return `<VoiceState: ${this.userId}>`;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
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
      user_id: this.userId,
      joined: this.joined,
      request_to_speak_timestamp: this.requestToSpeakTimestamp,
    };
  }
}

export default VoiceState;
