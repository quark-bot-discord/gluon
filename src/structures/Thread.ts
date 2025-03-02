import ClientType from "src/interfaces/Client.js";
import { GLUON_DEBUG_LEVELS } from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Channel from "./GuildChannel.js";
import util from "util";
import {
  Thread as ThreadType,
  ThreadCacheJSON,
  ThreadDiscordJSON,
  ThreadStorageJSON,
  JsonTypes,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
} from "../../typings/index.d.js";
import { Snowflake } from "discord-api-types/globals";
import { APIThreadChannel } from "discord-api-types/v10";

/**
 * Represents a thread within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
 */
class Thread extends Channel implements ThreadType {
  #_client;
  #_owner_id;
  #_parent_id;
  /**
   * Creates the structure for a thread.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this thread belongs to.
   * @param {Boolean?} [options.nocache] Whether this thread should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
   */
  constructor(
    client: ClientType,
    data:
      | APIThreadChannel
      | ThreadCacheJSON
      | ThreadDiscordJSON
      | ThreadStorageJSON,
    { guildId, nocache = false }: { guildId: Snowflake; nocache?: boolean },
  ) {
    super(client, data, { guildId });

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
    this.#_client = client;

    /**
     * The ID of the user who created this thread.
     * @type {BigInt}
     * @private
     */
    this.#_owner_id = data.owner_id ? BigInt(data.owner_id) : null;

    /**
     * The ID of the text channel that this thread belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_parent_id = data.parent_id ? BigInt(data.parent_id) : null;

    const shouldCache = Thread.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (
      nocache === false &&
      (!("archived" in data) || data.archived !== true) &&
      shouldCache
    ) {
      this.guild.channels.set(data.id, this);
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE THREAD ${guildId} ${data.id}`,
      );
    } else {
      this.#_client._emitDebug(
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
    return String(this.#_owner_id);
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
    return String(this.#_parent_id);
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
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ) {
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
  [util.inspect.custom]() {
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
  toJSON(format: JsonTypes) {
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
