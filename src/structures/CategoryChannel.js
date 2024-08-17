import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Channel from "./Channel.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import util from "util";

class CategoryChannel {
  #_client;
  #_id;
  #_guild_id;
  #type;
  #name;
  #_parent_id;
  #_attributes;
  #permission_overwrites;
  #_cacheOptions;
  constructor(
    client,
    data,
    { guild_id, nocache = false } = { nocache: false },
  ) {
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
    this.#_guild_id = BigInt(guild_id);

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

    if (typeof data.parent_id == "string") {
      /**
       * The id of the parent channel.
       * @type {BigInt?}
       * @private
       */
      this.#_parent_id = BigInt(data.parent_id);
    } else if (
      typeof data.parent_id != "string" &&
      data.parent_id === undefined &&
      existing &&
      typeof existing.parentId == "string"
    )
      this.#_parent_id = existing.parentId;

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
        (p) => new PermissionOverwrite(this.#_client, p),
      );
    else if (
      !data.permission_overwrites &&
      existing &&
      Array.isArray(existing.permissionOverwrites)
    )
      this.#permission_overwrites = existing.permissionOverwrites;

    if (
      nocache === false &&
      Channel.shouldCache(this.#_client._cacheOptions, this.guild._cacheOptions)
    )
      this.guild?.channels.set(data.id, this);
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
   * The ID of the parent channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get parentId() {
    return this.#_parent_id ? String(this.#_parent_id) : null;
  }

  /**
   * The parent channel.
   * @type {Channel?}
   * @readonly
   * @public
   */
  get parent() {
    return this.parentId
      ? this.guild?.channels.get(this.parentId) || null
      : null;
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
   * The cache options for this channel.
   * @type {ChannelCacheOptions}
   * @readonly
   * @public
   */
  get _cacheOptions() {
    return this.#_cacheOptions;
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
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          guild_id: this.guildId,
          parent_id: this.parentId,
          name: this.name,
          type: this.type,
          nsfw: this.nsfw,
          permission_overwrites: this.permissionOverwrites.map((p) =>
            p.toJSON(format),
          ),
        };
      }
    }
  }
}

export default CategoryChannel;
