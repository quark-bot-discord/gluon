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
var _Role_instances,
  _Role__client,
  _Role__guild_id,
  _Role__id,
  _Role_name,
  _Role_color,
  _Role_position,
  _Role__icon,
  _Role_permissions,
  _Role__attributes,
  _Role_tags,
  _Role__formattedIconHash_get;
import Client from "../Client.js";
import {
  CDN_BASE_URL,
  GLUON_DEBUG_LEVELS,
  TO_JSON_TYPES_ENUM,
} from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import util from "util";
/**
 * Represents a role belonging to a guild.
 */
class Role {
  /**
   * Creates the structure for a role.
   * @param {Client} client The client instance.
   * @param {Object} data The raw role data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the role belongs to.
   * @param {Boolean?} [options.nocache] Whether this role should be cached or not.
   * @see {@link https://discord.com/developers/docs/topics/permissions#role-object-role-structure}
   */
  constructor(client, data, { guildId, nocache = false } = { nocache: false }) {
    _Role_instances.add(this);
    _Role__client.set(this, void 0);
    _Role__guild_id.set(this, void 0);
    _Role__id.set(this, void 0);
    _Role_name.set(this, void 0);
    _Role_color.set(this, void 0);
    _Role_position.set(this, void 0);
    _Role__icon.set(this, void 0);
    _Role_permissions.set(this, void 0);
    _Role__attributes.set(this, void 0);
    _Role_tags.set(this, void 0);
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
    __classPrivateFieldSet(this, _Role__client, client, "f");
    /**
     * The id of the guild that this role belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Role__guild_id, BigInt(guildId), "f");
    /**
     * The id of the role.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Role__id, BigInt(data.id), "f");
    /**
     * The name of the role.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _Role_name, data.name, "f");
    /**
     * The color of the role.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _Role_color, data.color, "f");
    /**
     * The position of the role.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _Role_position, data.position, "f");
    /**
     * The role icon hash.
     * @type {String?}
     * @private
     */
    if (data.icon)
      __classPrivateFieldSet(this, _Role__icon, BigInt(`0x${data.icon}`), "f");
    /**
     * The permissions for the role.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Role_permissions,
      BigInt(data.permissions),
      "f",
    );
    /**
     * The attributes of the role.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _Role__attributes, data._attributes ?? 0, "f");
    if (data.hoist == true)
      __classPrivateFieldSet(
        this,
        _Role__attributes,
        __classPrivateFieldGet(this, _Role__attributes, "f") | (0b1 << 0),
        "f",
      );
    if (data.managed == true)
      __classPrivateFieldSet(
        this,
        _Role__attributes,
        __classPrivateFieldGet(this, _Role__attributes, "f") | (0b1 << 1),
        "f",
      );
    if (data.mentionable == true)
      __classPrivateFieldSet(
        this,
        _Role__attributes,
        __classPrivateFieldGet(this, _Role__attributes, "f") | (0b1 << 2),
        "f",
      );
    if (data.tags) __classPrivateFieldSet(this, _Role_tags, data.tags, "f");
    const shouldCache = Role.shouldCache(
      __classPrivateFieldGet(this, _Role__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (nocache === false && shouldCache) {
      this.guild.roles.set(data.id, this);
      __classPrivateFieldGet(this, _Role__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE ROLE ${guildId} ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _Role__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE ROLE ${guildId} ${data.id} (${nocache} ${shouldCache})`,
      );
    }
  }
  /**
   * The ID of the role.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _Role__id, "f"));
  }
  /**
   * Whether the role is hoisted.
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get hoist() {
    return (
      (__classPrivateFieldGet(this, _Role__attributes, "f") & (0b1 << 0)) ==
      0b1 << 0
    );
  }
  /**
   * Whether the role is managed (by an application).
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get managed() {
    return (
      (__classPrivateFieldGet(this, _Role__attributes, "f") & (0b1 << 1)) ==
      0b1 << 1
    );
  }
  /**
   * Whether the role is mentionable.
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get mentionable() {
    return (
      (__classPrivateFieldGet(this, _Role__attributes, "f") & (0b1 << 2)) ==
      0b1 << 2
    );
  }
  /**
   * The hash of the role's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalIconHash() {
    return __classPrivateFieldGet(this, _Role__icon, "f")
      ? // eslint-disable-next-line quotes
        `${__classPrivateFieldGet(this, _Role_instances, "a", _Role__formattedIconHash_get)}`
      : null;
  }
  /**
   * The icon URL of the role.
   * @readonly
   * @type {String?}
   * @public
   */
  get displayIconURL() {
    return Role.getIconUrl(this.id, this._originalIconHash);
  }
  /**
   * The guild that this role belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _Role__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The ID of the guild that this role belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _Role__guild_id, "f"));
  }
  /**
   * The name of the role.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return __classPrivateFieldGet(this, _Role_name, "f");
  }
  /**
   * The color of the role.
   * @type {Number}
   * @readonly
   * @public
   */
  get color() {
    return __classPrivateFieldGet(this, _Role_color, "f");
  }
  /**
   * The position of the role.
   * @type {Number}
   * @readonly
   * @public
   */
  get position() {
    return __classPrivateFieldGet(this, _Role_position, "f");
  }
  /**
   * The permissions for the role.
   * @type {String}
   * @readonly
   * @public
   */
  get permissions() {
    return String(__classPrivateFieldGet(this, _Role_permissions, "f"));
  }
  /**
   * The attributes of the role.
   * @type {Object}
   * @readonly
   * @public
   */
  get tags() {
    return __classPrivateFieldGet(this, _Role_tags, "f");
  }
  /**
   * Returns a mention for the role.
   * @type {String}
   * @readonly
   * @public
   */
  get mention() {
    return Role.getMention(this.id, this.guildId);
  }
  /**
   * Returns a mention for the role.
   * @param {String} roleId The ID of the role to mention.
   * @param {String} guildId The ID of the guild that the role belongs to.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(roleId, guildId) {
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID must be a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return roleId === guildId ? "@everyone" : `<@&${roleId}>`;
  }
  /**
   * Returns the URL of the role's icon.
   * @param {String} id The ID of the role.
   * @param {String?} [hash] The hash of the role's icon.
   * @returns {String}
   */
  static getIconUrl(id, hash) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Role id must be a string.");
    if (hash && typeof hash !== "string")
      throw new TypeError("GLUON: Role icon hash must be a string.");
    return hash
      ? `${CDN_BASE_URL}/role-icons/${id}/${hash}.${hash.startsWith("a_") ? "gif" : "png"}`
      : null;
  }
  /**
   * Determines whether the role should be cached.
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
    if (gluonCacheOptions.cacheRoles === false) return false;
    if (guildCacheOptions.roleCaching === false) return false;
    return true;
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<Role: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_Role__client = new WeakMap()),
  (_Role__guild_id = new WeakMap()),
  (_Role__id = new WeakMap()),
  (_Role_name = new WeakMap()),
  (_Role_color = new WeakMap()),
  (_Role_position = new WeakMap()),
  (_Role__icon = new WeakMap()),
  (_Role_permissions = new WeakMap()),
  (_Role__attributes = new WeakMap()),
  (_Role_tags = new WeakMap()),
  (_Role_instances = new WeakSet()),
  (_Role__formattedIconHash_get = function _Role__formattedIconHash_get() {
    if (!__classPrivateFieldGet(this, _Role__icon, "f")) return null;
    let formattedHash = __classPrivateFieldGet(this, _Role__icon, "f").toString(
      16,
    );
    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = `0${formattedHash}`;
    return formattedHash;
  }),
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
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        return {
          id: this.id,
          name: this.name,
          color: this.color,
          position: this.position,
          permissions: this.permissions,
          icon: this._originalIconHash,
          _attributes: __classPrivateFieldGet(this, _Role__attributes, "f"),
          tags: this.tags,
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          name: this.name,
          color: this.color,
          position: this.position,
          permissions: this.permissions,
          icon: this._originalIconHash,
          tags: this.tags,
          hoist: this.hoist,
          managed: this.managed,
          mentionable: this.mentionable,
        };
      }
    }
  }
}
export default Role;
//# sourceMappingURL=Role.js.map
