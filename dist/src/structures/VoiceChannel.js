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
var _VoiceChannel__client,
  _VoiceChannel_bitrate,
  _VoiceChannel_user_limit,
  _VoiceChannel_rtc_region;
import Client from "../Client.js";
import { GLUON_DEBUG_LEVELS, TO_JSON_TYPES_ENUM } from "../constants.js";
import Channel from "./Channel.js";
import Message from "./Message.js";
import util from "util";
/**
 * Represents a voice channel.
 * @extends {Channel}
 */
class VoiceChannel extends Channel {
  /**
   * Creates the structure for a voice channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the voice channel belongs to.
   * @param {Boolean?} [options.nocache] Whether the voice channel should be cached.
   */
  constructor(client, data, { guildId, nocache = false } = { nocache: false }) {
    super(client, data, { guildId });
    _VoiceChannel__client.set(this, void 0);
    _VoiceChannel_bitrate.set(this, void 0);
    _VoiceChannel_user_limit.set(this, void 0);
    _VoiceChannel_rtc_region.set(this, void 0);
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
    __classPrivateFieldSet(this, _VoiceChannel__client, client, "f");
    const existing = this.guild?.channels.get(data.id) || null;
    if (typeof data.bitrate == "number")
      /**
       * The bitrate of the channel.
       * @type {Number}
       * @private
       */
      __classPrivateFieldSet(this, _VoiceChannel_bitrate, data.bitrate, "f");
    else if (existing && typeof existing.bitrate)
      __classPrivateFieldSet(
        this,
        _VoiceChannel_bitrate,
        existing.bitrate,
        "f",
      );
    if (typeof data.user_limit == "number")
      /**
       * The user limit of the channel.
       * @type {Number}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _VoiceChannel_user_limit,
        data.user_limit,
        "f",
      );
    else if (existing && typeof existing.userLimit == "number")
      __classPrivateFieldSet(
        this,
        _VoiceChannel_user_limit,
        existing.userLimit,
        "f",
      );
    if (typeof data.rtc_region == "string")
      /**
       * The region of the voice channel.
       * @type {String}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _VoiceChannel_rtc_region,
        data.rtc_region,
        "f",
      );
    else if (existing && typeof existing.rtcRegion == "string")
      __classPrivateFieldSet(
        this,
        _VoiceChannel_rtc_region,
        existing.rtcRegion,
        "f",
      );
    const shouldCache = Channel.shouldCache(
      __classPrivateFieldGet(this, _VoiceChannel__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (nocache === false && shouldCache) {
      this.guild.channels.set(data.id, this);
      __classPrivateFieldGet(this, _VoiceChannel__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE VOICECHANNEL ${guildId} ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _VoiceChannel__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE VOICECHANNEL ${guildId} ${data.id} (${nocache} ${shouldCache})`,
      );
    }
    if (data.messages)
      for (let i = 0; i < data.messages.length; i++)
        new Message(
          __classPrivateFieldGet(this, _VoiceChannel__client, "f"),
          data.messages[i],
          {
            channelId: this.id,
            guildId,
          },
        );
  }
  /**
   * The bitrate of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get bitrate() {
    return __classPrivateFieldGet(this, _VoiceChannel_bitrate, "f");
  }
  /**
   * The user limit of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get userLimit() {
    return __classPrivateFieldGet(this, _VoiceChannel_user_limit, "f");
  }
  /**
   * The region of the voice channel.
   * @type {String}
   * @readonly
   * @public
   */
  get rtcRegion() {
    return __classPrivateFieldGet(this, _VoiceChannel_rtc_region, "f");
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
  [((_VoiceChannel__client = new WeakMap()),
  (_VoiceChannel_bitrate = new WeakMap()),
  (_VoiceChannel_user_limit = new WeakMap()),
  (_VoiceChannel_rtc_region = new WeakMap()),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
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
//# sourceMappingURL=VoiceChannel.js.map
