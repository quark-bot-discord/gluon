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
var _CategoryChannel__client,
  _CategoryChannel__id,
  _CategoryChannel__guild_id,
  _CategoryChannel_name,
  _CategoryChannel__attributes,
  _CategoryChannel_permission_overwrites,
  _CategoryChannel_position;
import Channel from "./GuildChannel.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import util from "util";
import { ChannelType } from "discord-api-types/v10";
import { GluonDebugLevels, JsonTypes } from "../../typings/enums.js";
class CategoryChannel {
  /**
   * Creates the structure for a category channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @param {Boolean?} [options.nocache] Whether this channel should be cached or not.
   */
  constructor(client, data, { guildId, nocache = false }) {
    _CategoryChannel__client.set(this, void 0);
    _CategoryChannel__id.set(this, void 0);
    _CategoryChannel__guild_id.set(this, void 0);
    _CategoryChannel_name.set(this, void 0);
    _CategoryChannel__attributes.set(this, void 0);
    _CategoryChannel_permission_overwrites.set(this, []);
    _CategoryChannel_position.set(this, void 0);
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
    __classPrivateFieldSet(this, _CategoryChannel__client, client, "f");
    /**
     * The id of the channel.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _CategoryChannel__id, BigInt(data.id), "f");
    /**
     * The ID of the guild that this channel belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _CategoryChannel__guild_id,
      BigInt(guildId),
      "f",
    );
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${guildId} cannot be found in cache`);
    }
    const existing = this.guild?.channels.get(data.id) || null;
    /**
     * The name of the channel.
     * @type {String}
     * @private
     */
    if (typeof data.name == "string")
      __classPrivateFieldSet(this, _CategoryChannel_name, data.name, "f");
    else if (
      typeof data.name != "string" &&
      existing &&
      typeof existing.name == "string"
    )
      __classPrivateFieldSet(this, _CategoryChannel_name, existing.name, "f");
    if (typeof data.position == "number") {
      __classPrivateFieldSet(
        this,
        _CategoryChannel_position,
        data.position,
        "f",
      );
    } else if (
      typeof data.position !== "number" &&
      existing &&
      typeof existing.position == "number"
    ) {
      __classPrivateFieldSet(
        this,
        _CategoryChannel_position,
        existing.position,
        "f",
      );
    }
    /**
     * The attributes of the channel.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _CategoryChannel__attributes,
      "_attributes" in data ? data._attributes : 0,
      "f",
    );
    if ("nsfw" in data && data.nsfw !== undefined && data.nsfw == true)
      __classPrivateFieldSet(
        this,
        _CategoryChannel__attributes,
        __classPrivateFieldGet(this, _CategoryChannel__attributes, "f") |
          (0b1 << 0),
        "f",
      );
    else if (
      "nsfw" in data &&
      data.nsfw === undefined &&
      existing &&
      existing.nsfw == true
    )
      __classPrivateFieldSet(
        this,
        _CategoryChannel__attributes,
        __classPrivateFieldGet(this, _CategoryChannel__attributes, "f") |
          (0b1 << 0),
        "f",
      );
    /**
     * The permission overwrites for this channel.
     * @type {Array<Object>}
     * @private
     * @see {@link https://discord.com/developers/docs/resources/channel#overwrite-object}
     */
    if (data.permission_overwrites && Array.isArray(data.permission_overwrites))
      __classPrivateFieldSet(
        this,
        _CategoryChannel_permission_overwrites,
        data.permission_overwrites.map(
          (p) =>
            new PermissionOverwrite(
              __classPrivateFieldGet(this, _CategoryChannel__client, "f"),
              p,
            ),
        ),
        "f",
      );
    else if (
      !data.permission_overwrites &&
      existing &&
      Array.isArray(existing.permissionOverwrites)
    )
      __classPrivateFieldSet(
        this,
        _CategoryChannel_permission_overwrites,
        existing.permissionOverwrites,
        "f",
      );
    const shouldCache = Channel.shouldCache(
      __classPrivateFieldGet(this, _CategoryChannel__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (nocache === false && shouldCache) {
      this.guild?.channels.set(data.id, this);
      __classPrivateFieldGet(this, _CategoryChannel__client, "f")._emitDebug(
        GluonDebugLevels.Info,
        `CACHE CATEGORYCHANNEL ${guildId} ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _CategoryChannel__client, "f")._emitDebug(
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
    return String(__classPrivateFieldGet(this, _CategoryChannel__id, "f"));
  }
  /**
   * The ID of the guild that this channel belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(
      __classPrivateFieldGet(this, _CategoryChannel__guild_id, "f"),
    );
  }
  /**
   * The guild that this channel belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _CategoryChannel__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The name of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return __classPrivateFieldGet(this, _CategoryChannel_name, "f");
  }
  /**
   * The type of channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get type() {
    return ChannelType.GuildCategory;
  }
  get position() {
    return __classPrivateFieldGet(this, _CategoryChannel_position, "f");
  }
  /**
   * The permission overwrites for the channel.
   * @type {Array<PermissionOverwrite>}
   * @readonly
   * @public
   */
  get permissionOverwrites() {
    return __classPrivateFieldGet(
      this,
      _CategoryChannel_permission_overwrites,
      "f",
    );
  }
  /**
   * Whether the channel is nsfw.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get nsfw() {
    return (
      (__classPrivateFieldGet(this, _CategoryChannel__attributes, "f") &
        (0b1 << 0)) ==
      0b1 << 0
    );
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
  [((_CategoryChannel__client = new WeakMap()),
  (_CategoryChannel__id = new WeakMap()),
  (_CategoryChannel__guild_id = new WeakMap()),
  (_CategoryChannel_name = new WeakMap()),
  (_CategoryChannel__attributes = new WeakMap()),
  (_CategoryChannel_permission_overwrites = new WeakMap()),
  (_CategoryChannel_position = new WeakMap()),
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
      case JsonTypes.STORAGE_FORMAT:
        return {
          id: this.id,
          guild_id: this.guildId,
          name: this.name,
          type: this.type,
          _attributes: __classPrivateFieldGet(
            this,
            _CategoryChannel__attributes,
            "f",
          ),
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
//# sourceMappingURL=CategoryChannel.js.map
