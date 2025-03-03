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
var _Thread__client, _Thread__owner_id, _Thread__parent_id;
import { GLUON_DEBUG_LEVELS } from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Channel from "./GuildChannel.js";
import util from "util";
import { JsonTypes } from "../../typings/index.d.js";
/**
 * Represents a thread within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
 */
class Thread extends Channel {
  /**
   * Creates the structure for a thread.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this thread belongs to.
   * @param {Boolean?} [options.nocache] Whether this thread should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
   */
  constructor(client, data, { guildId, nocache = false }) {
    super(client, data, { guildId });
    _Thread__client.set(this, void 0);
    _Thread__owner_id.set(this, void 0);
    _Thread__parent_id.set(this, void 0);
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
    __classPrivateFieldSet(this, _Thread__client, client, "f");
    /**
     * The ID of the user who created this thread.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Thread__owner_id,
      data.owner_id ? BigInt(data.owner_id) : null,
      "f",
    );
    /**
     * The ID of the text channel that this thread belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Thread__parent_id,
      data.parent_id ? BigInt(data.parent_id) : null,
      "f",
    );
    const shouldCache = Thread.shouldCache(
      __classPrivateFieldGet(this, _Thread__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (
      nocache === false &&
      (!("archived" in data) || data.archived !== true) &&
      shouldCache
    ) {
      this.guild.channels.set(data.id, this);
      __classPrivateFieldGet(this, _Thread__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE THREAD ${guildId} ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _Thread__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE THREAD ${guildId} ${data.id} (${nocache} ${"archived" in data ? data.archived : "N/A"} ${shouldCache})`,
      );
    }
  }
  /**
   * The ID of the member who created this thread.
   * @type {String}
   * @readonly
   * @public
   */
  get ownerId() {
    return String(__classPrivateFieldGet(this, _Thread__owner_id, "f"));
  }
  /**
   * The member who created this thread.
   * @type {Member?}
   * @readonly
   * @public
   */
  get owner() {
    return this.guild?.members.get(this.ownerId) || null;
  }
  /**
   * The ID of the text channel that this thread belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get parentId() {
    return String(__classPrivateFieldGet(this, _Thread__parent_id, "f"));
  }
  /**
   * The text channel that this thread belongs to.
   * @type {TextChannel?}
   * @readonly
   * @public
   */
  get parent() {
    return this.guild?.channels.get(this.parentId) || null;
  }
  /**
   * Determines whether the thread should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   * @override
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
    if (gluonCacheOptions.cacheChannels === false) return false;
    if (guildCacheOptions.threadCaching === false) return false;
    return true;
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<Thread: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_Thread__client = new WeakMap()),
  (_Thread__owner_id = new WeakMap()),
  (_Thread__parent_id = new WeakMap()),
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
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          owner_id: this.ownerId,
          parent_id: this.parentId,
        };
      }
    }
  }
}
export default Thread;
//# sourceMappingURL=Thread.js.map
