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
var _VoiceState__client,
  _VoiceState__guild_id,
  _VoiceState__channel_id,
  _VoiceState__attributes,
  _VoiceState_member,
  _VoiceState__user_id,
  _VoiceState_joined,
  _VoiceState_request_to_speak_timestamp;
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
  /**
   * Creates the structure for a voice state.
   * @param {Client} client The client instance.
   * @param {Object} data The raw voice state data from Discord.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The id of the guild that the voice state belongs to.
   * @param {Boolean?} [options.nocache] Whether this voice state should be cached.
   */
  constructor(client, data, { guildId, nocache = false } = { nocache: false }) {
    _VoiceState__client.set(this, void 0);
    _VoiceState__guild_id.set(this, void 0);
    _VoiceState__channel_id.set(this, void 0);
    _VoiceState__attributes.set(this, void 0);
    _VoiceState_member.set(this, void 0);
    _VoiceState__user_id.set(this, void 0);
    _VoiceState_joined.set(this, void 0);
    _VoiceState_request_to_speak_timestamp.set(this, void 0);
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
    __classPrivateFieldSet(this, _VoiceState__client, client, "f");
    /**
     * The id of the guild that this voice state belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _VoiceState__guild_id, BigInt(guildId), "f");
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
    __classPrivateFieldSet(
      this,
      _VoiceState__channel_id,
      BigInt(data.channel_id),
      "f",
    );
    /**
     * The attributes of the voice state.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _VoiceState__attributes,
      data._attributes ?? 0,
      "f",
    );
    if (data.deaf == true)
      __classPrivateFieldSet(
        this,
        _VoiceState__attributes,
        __classPrivateFieldGet(this, _VoiceState__attributes, "f") | (0b1 << 0),
        "f",
      );
    if (data.mute == true)
      __classPrivateFieldSet(
        this,
        _VoiceState__attributes,
        __classPrivateFieldGet(this, _VoiceState__attributes, "f") | (0b1 << 1),
        "f",
      );
    if (data.self_deaf == true)
      __classPrivateFieldSet(
        this,
        _VoiceState__attributes,
        __classPrivateFieldGet(this, _VoiceState__attributes, "f") | (0b1 << 2),
        "f",
      );
    if (data.self_mute == true)
      __classPrivateFieldSet(
        this,
        _VoiceState__attributes,
        __classPrivateFieldGet(this, _VoiceState__attributes, "f") | (0b1 << 3),
        "f",
      );
    if (data.self_stream == true)
      __classPrivateFieldSet(
        this,
        _VoiceState__attributes,
        __classPrivateFieldGet(this, _VoiceState__attributes, "f") | (0b1 << 4),
        "f",
      );
    if (data.self_video == true)
      __classPrivateFieldSet(
        this,
        _VoiceState__attributes,
        __classPrivateFieldGet(this, _VoiceState__attributes, "f") | (0b1 << 5),
        "f",
      );
    if (data.suppress == true)
      __classPrivateFieldSet(
        this,
        _VoiceState__attributes,
        __classPrivateFieldGet(this, _VoiceState__attributes, "f") | (0b1 << 6),
        "f",
      );
    if (data.member)
      /**
       * The member the voice state is about.
       * @type {Member?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _VoiceState_member,
        new Member(
          __classPrivateFieldGet(this, _VoiceState__client, "f"),
          data.member,
          {
            userId: data.user_id,
            guildId: data.guild_id,
            nocache,
          },
        ),
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _VoiceState_member,
        this.guild?.members.get(data.user_id) || null,
        "f",
      );
    /**
     * The id of the user the voice state is about.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _VoiceState__user_id,
      BigInt(data.user_id),
      "f",
    );
    /**
     * The UNIX time the user joined the voice channel.
     * @type {Number}
     * @private
     */
    if (typeof data.joined == "number")
      __classPrivateFieldSet(this, _VoiceState_joined, data.joined, "f");
    else if (existing && typeof existing.joined == "number")
      __classPrivateFieldSet(this, _VoiceState_joined, existing.joined, "f");
    else
      __classPrivateFieldSet(
        this,
        _VoiceState_joined,
        (Date.now() / 1000) | 0,
        "f",
      );
    /**
     * The UNIX timestamp of when the user requested to speak.
     * @type {Number?}
     * @private
     */
    if (data.request_to_speak_timestamp)
      __classPrivateFieldSet(
        this,
        _VoiceState_request_to_speak_timestamp,
        (new Date(data.request_to_speak_timestamp).getTime() / 1000) | 0,
        "f",
      );
    const shouldCache = VoiceState.shouldCache(
      __classPrivateFieldGet(this, _VoiceState__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (nocache === false && shouldCache) {
      this.guild.voiceStates.set(data.user_id, this);
      __classPrivateFieldGet(this, _VoiceState__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE VOICESTATE ${guildId} ${data.user_id}`,
      );
    } else {
      __classPrivateFieldGet(this, _VoiceState__client, "f")._emitDebug(
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
    return (
      (__classPrivateFieldGet(this, _VoiceState__attributes, "f") &
        (0b1 << 0)) ==
      0b1 << 0
    );
  }
  /**
   * Is server muted?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mute() {
    return (
      (__classPrivateFieldGet(this, _VoiceState__attributes, "f") &
        (0b1 << 1)) ==
      0b1 << 1
    );
  }
  /**
   * Is self defeaned?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfDeaf() {
    return (
      (__classPrivateFieldGet(this, _VoiceState__attributes, "f") &
        (0b1 << 2)) ==
      0b1 << 2
    );
  }
  /**
   * Is self muted?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfMute() {
    return (
      (__classPrivateFieldGet(this, _VoiceState__attributes, "f") &
        (0b1 << 3)) ==
      0b1 << 3
    );
  }
  /**
   * Is streaming?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfStream() {
    return (
      (__classPrivateFieldGet(this, _VoiceState__attributes, "f") &
        (0b1 << 4)) ==
      0b1 << 4
    );
  }
  /**
   * Is sharing video?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfVideo() {
    return (
      (__classPrivateFieldGet(this, _VoiceState__attributes, "f") &
        (0b1 << 5)) ==
      0b1 << 5
    );
  }
  /**
   * Is suppressed (for stage channels)?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get suppress() {
    return (
      (__classPrivateFieldGet(this, _VoiceState__attributes, "f") &
        (0b1 << 6)) ==
      0b1 << 6
    );
  }
  /**
   * The guild that this voice state belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _VoiceState__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The id of the guild that this voice state belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _VoiceState__guild_id, "f"));
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
    return String(__classPrivateFieldGet(this, _VoiceState__channel_id, "f"));
  }
  /**
   * The member the voice state is about.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member() {
    return __classPrivateFieldGet(this, _VoiceState_member, "f");
  }
  /**
   * The id of the user the voice state is about.
   * @type {String}
   * @readonly
   * @public
   */
  get memberId() {
    return String(__classPrivateFieldGet(this, _VoiceState__user_id, "f"));
  }
  /**
   * The UNIX time the user joined the voice channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get joined() {
    return __classPrivateFieldGet(this, _VoiceState_joined, "f");
  }
  /**
   * The UNIX timestamp of when the user requested to speak.
   * @type {Number?}
   * @readonly
   * @public
   */
  get requestToSpeakTimestamp() {
    return __classPrivateFieldGet(
      this,
      _VoiceState_request_to_speak_timestamp,
      "f",
    );
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
  [((_VoiceState__client = new WeakMap()),
  (_VoiceState__guild_id = new WeakMap()),
  (_VoiceState__channel_id = new WeakMap()),
  (_VoiceState__attributes = new WeakMap()),
  (_VoiceState_member = new WeakMap()),
  (_VoiceState__user_id = new WeakMap()),
  (_VoiceState_joined = new WeakMap()),
  (_VoiceState_request_to_speak_timestamp = new WeakMap()),
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
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT: {
        return {
          guild_id: this.guildId,
          channel_id: this.channelId,
          _attributes: __classPrivateFieldGet(
            this,
            _VoiceState__attributes,
            "f",
          ),
          member: this.member.toJSON(format),
          user_id: this.memberId,
          joined: this.joined,
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          request_to_speak_timestamp: this.requestToSpeakTimestamp * 1000,
        };
      }
    }
  }
}
export default VoiceState;
//# sourceMappingURL=VoiceState.js.map
