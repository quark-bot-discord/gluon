import Channel from "./GuildChannel.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import util from "util";
import {
  APIGuildCategoryChannel,
  ChannelType,
  Snowflake,
} from "#typings/discord.js";
import type {
  CategoryChannelCacheJSON,
  CategoryChannelDiscordJSON,
  CategoryChannelStorageJSON,
  CategoryChannel as CategoryChannelType,
  PermissionOverwrite as PermissionOverwriteType,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { GluonDebugLevels, JsonTypes } from "../../typings/enums.js";

class CategoryChannel implements CategoryChannelType {
  #_client: ClientType;
  #_id: bigint;
  #_guild_id: bigint;
  #name: string | undefined;
  #_attributes: number;
  #permission_overwrites: Array<PermissionOverwriteType> = [];
  #position: number | undefined;
  /**
   * Creates the structure for a category channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @param {Boolean?} [options.nocache] Whether this channel should be cached or not.
   */
  constructor(
    client: ClientType,
    data:
      | APIGuildCategoryChannel
      | CategoryChannelCacheJSON
      | CategoryChannelDiscordJSON
      | CategoryChannelStorageJSON,
    { guildId, nocache = false }: { guildId: Snowflake; nocache?: boolean },
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

    if (!this.guild) {
      throw new Error(`GLUON: Guild ${guildId} cannot be found in cache`);
    }

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

    if (typeof data.position == "number") {
      this.#position = data.position;
    } else if (
      typeof data.position !== "number" &&
      existing &&
      typeof existing.position == "number"
    ) {
      this.#position = existing.position;
    }

    /**
     * The attributes of the channel.
     * @type {Number}
     * @private
     */
    this.#_attributes = "_attributes" in data ? data._attributes : 0;

    if ("nsfw" in data && data.nsfw !== undefined && data.nsfw == true)
      this.#_attributes |= 0b1 << 0;
    else if (
      "nsfw" in data &&
      data.nsfw === undefined &&
      existing &&
      existing.nsfw == true
    )
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

    const shouldCache = Channel.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (nocache === false && shouldCache) {
      this.guild?.channels.set(data.id, this);
      this.#_client._emitDebug(
        GluonDebugLevels.Info,
        `CACHE CATEGORYCHANNEL ${guildId} ${data.id}`,
      );
    } else {
      this.#_client._emitDebug(
        GluonDebugLevels.Info,
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
  get type(): ChannelType.GuildCategory {
    return ChannelType.GuildCategory;
  }

  get position() {
    return this.#position;
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
  toJSON(
    format?: JsonTypes,
  ):
    | CategoryChannelCacheJSON
    | CategoryChannelDiscordJSON
    | CategoryChannelStorageJSON {
    switch (format) {
      case JsonTypes.STORAGE_FORMAT:
        return {
          id: this.id,
          guild_id: this.guildId,
          name: this.name,
          type: this.type,
          _attributes: this.#_attributes,
          permission_overwrites: this.permissionOverwrites.map((p) =>
            p.toJSON(format),
          ),
        };
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          guild_id: this.guildId,
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
