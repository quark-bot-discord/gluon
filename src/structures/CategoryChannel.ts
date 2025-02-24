import { GLUON_DEBUG_LEVELS, TO_JSON_TYPES_ENUM } from "../constants.js";
import Channel from "./Channel.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import util from "util";

class CategoryChannel {
  #_client;
  #_id;
  #_guild_id;
  #type;
  #name;
  #_attributes;
  #permission_overwrites;
  /**
   * Creates the structure for a category channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @param {Boolean?} [options.nocache] Whether this channel should be cached or not.
   */
  constructor(
    client: any,
    data: any,
    { guildId, nocache = false }: any = { nocache: false },
  ) {
    if (!client)
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
     * The id of the channel.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The ID of the guild that this channel belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    /**
     * The type of channel.
     * @type {Number}
     * @private
     */
    this.#type = data.type;

    const existing = this.guild?.channels.get(data.id) || null;

    /**
     * The name of the channel.
     * @type {String}
     * @private
     */
    if (typeof data.name == "string") this.#name = data.name;
    else if (
      typeof data.name != "string" &&
      existing &&
      typeof existing.name == "string"
    )
      this.#name = existing.name;

    /**
     * The attributes of the channel.
     * @type {Number}
     * @private
     */
    this.#_attributes = data._attributes ?? 0;

    if (data.nsfw !== undefined && data.nsfw == true)
      this.#_attributes |= 0b1 << 0;
    else if (data.nsfw === undefined && existing && existing.nsfw == true)
      this.#_attributes |= 0b1 << 0;

    /**
     * The permission overwrites for this channel.
     * @type {Array<Object>}
     * @private
     * @see {@link https://discord.com/developers/docs/resources/channel#overwrite-object}
     */
    if (data.permission_overwrites && Array.isArray(data.permission_overwrites))
      this.#permission_overwrites = data.permission_overwrites.map(
        (p: any) => new PermissionOverwrite(this.#_client, p),
      );
    else if (
      !data.permission_overwrites &&
      existing &&
      Array.isArray(existing.permissionOverwrites)
    )
      this.#permission_overwrites = existing.permissionOverwrites;

    const shouldCache = Channel.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (nocache === false && shouldCache) {
      this.guild?.channels.set(data.id, this);
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE CATEGORYCHANNEL ${guildId} ${data.id}`,
      );
    } else {
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE CATEGORYCHANNEL ${guildId} ${data.id} (${nocache} ${shouldCache})`,
      );
    }
  }

  /**
   * The ID of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The ID of the guild that this channel belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The guild that this channel belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The name of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * The type of channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get type() {
    return this.#type;
  }

  /**
   * The permission overwrites for the channel.
   * @type {Array<PermissionOverwrite>}
   * @readonly
   * @public
   */
  get permissionOverwrites() {
    return this.#permission_overwrites;
  }

  /**
   * Whether the channel is nsfw.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get nsfw() {
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * The mention string of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get mention() {
    return `<#${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<CategoryChannel: ${this.id}>`;
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
  toJSON(format: any) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          guild_id: this.guildId,
          name: this.name,
          type: this.type,
          nsfw: this.nsfw,
          permission_overwrites: this.permissionOverwrites.map((p: any) =>
            p.toJSON(format),
          ),
        };
      }
    }
  }
}

export default CategoryChannel;
