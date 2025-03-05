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
var _Invite__client,
  _Invite__guild_id,
  _Invite__code,
  _Invite__channel_id,
  _Invite_uses,
  _Invite_expires,
  _Invite_inviter,
  _Invite__inviter_id,
  _Invite_max_uses;
import { GLUON_DEBUG_LEVELS, INVITE_BASE_URL } from "../constants.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import User from "./User.js";
import util from "util";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents a guild invite.
 */
class Invite {
  /**
   * Creates the structure for an invite.
   * @param {Client} client The client instance.
   * @param {Object} data The raw invite data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the invite belongs to.
   * @param {Boolean?} [options.nocache] Whether this invite should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-structure}
   */
  constructor(client, data, { guildId, nocache = false }) {
    _Invite__client.set(this, void 0);
    _Invite__guild_id.set(this, void 0);
    _Invite__code.set(this, void 0);
    _Invite__channel_id.set(this, void 0);
    _Invite_uses.set(this, void 0);
    _Invite_expires.set(this, void 0);
    _Invite_inviter.set(this, void 0);
    _Invite__inviter_id.set(this, void 0);
    _Invite_max_uses.set(this, void 0);
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
    __classPrivateFieldSet(this, _Invite__client, client, "f");
    /**
     * The id of the guild that this role belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Invite__guild_id, BigInt(guildId), "f");
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${guildId} not found.`);
    }
    /**
     * The code for the invite.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _Invite__code, data.code, "f");
    /**
     * The id of the channel the invite is directed to.
     * @type {BigInt}
     * @private
     */
    if ("channel" in data && data.channel?.id) {
      __classPrivateFieldSet(
        this,
        _Invite__channel_id,
        BigInt(data.channel.id),
        "f",
      );
    } else if ("channel_id" in data && data.channel_id) {
      __classPrivateFieldSet(
        this,
        _Invite__channel_id,
        BigInt(data.channel_id),
        "f",
      );
    }
    if ("inviter" in data && data.inviter) {
      /**
       * The user who created the invite.
       * @type {User?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _Invite_inviter,
        new User(
          __classPrivateFieldGet(this, _Invite__client, "f"),
          data.inviter,
          { nocache },
        ),
        "f",
      );
      __classPrivateFieldSet(
        this,
        _Invite__inviter_id,
        BigInt(data.inviter.id),
        "f",
      );
    }
    /**
     * The number of times the invite has been used.
     * @type {Number?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Invite_uses,
      "uses" in data ? data.uses : undefined,
      "f",
    );
    if ("expires_at" in data && data.expires_at)
      /**
       * The UNIX timestamp of when the invite expires.
       * @type {Number?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _Invite_expires,
        (new Date(data.expires_at).getTime() / 1000) | 0,
        "f",
      );
    else if ("expires" in data && typeof data.expires == "number")
      __classPrivateFieldSet(this, _Invite_expires, data.expires / 1000, "f");
    else if (
      "max_age" in data &&
      typeof data.max_age == "number" &&
      data.max_age != 0 &&
      data.created_at
    )
      __classPrivateFieldSet(
        this,
        _Invite_expires,
        ((new Date(data.created_at).getTime() / 1000) | 0) + data.max_age,
        "f",
      );
    /**
     * The maximum number of uses allowed for the invite.
     * @type {Number?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Invite_max_uses,
      "max_uses" in data ? data.max_uses : undefined,
      "f",
    );
    const shouldCache = Invite.shouldCache(
      __classPrivateFieldGet(this, _Invite__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    const notExpired =
      (__classPrivateFieldGet(this, _Invite_expires, "f") &&
        __classPrivateFieldGet(this, _Invite_expires, "f") >
          Date.now() / 1000) ||
      !__classPrivateFieldGet(this, _Invite_expires, "f");
    if (
      nocache === false &&
      shouldCache &&
      __classPrivateFieldGet(this, _Invite__code, "f") &&
      notExpired
    ) {
      this.guild.invites.set(data.code, this);
      __classPrivateFieldGet(this, _Invite__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE INVITE ${guildId} ${data.code}`,
      );
    } else {
      __classPrivateFieldGet(this, _Invite__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE INVITE ${guildId} ${data.code} (${nocache} ${notExpired})`,
      );
    }
  }
  /**
   * The id of the channel the invite is directed to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId() {
    return String(__classPrivateFieldGet(this, _Invite__channel_id, "f"));
  }
  /**
   * The channel the invite is directed to.
   * @type {(TextChannel | VoiceChannel)?}
   * @readonly
   * @public
   */
  get channel() {
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${this.guildId} not found.`);
    }
    return this.guild.channels.get(this.channelId);
  }
  /**
   * The code of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return this.code;
  }
  /**
   * The code of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get code() {
    return __classPrivateFieldGet(this, _Invite__code, "f");
  }
  /**
   * The id of the guild that this invite belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _Invite__guild_id, "f"));
  }
  /**
   * The guild that this role belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _Invite__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The number of times the invite has been used.
   * @type {Number?}
   * @readonly
   * @public
   */
  get uses() {
    return __classPrivateFieldGet(this, _Invite_uses, "f");
  }
  /**
   * The UNIX timestamp of when the invite expires.
   * @type {Number?}
   * @readonly
   * @public
   */
  get expires() {
    return __classPrivateFieldGet(this, _Invite_expires, "f");
  }
  /**
   * The user who created the invite.
   * @type {User?}
   * @readonly
   * @public
   */
  get inviter() {
    return __classPrivateFieldGet(this, _Invite_inviter, "f");
  }
  get inviterId() {
    return String(__classPrivateFieldGet(this, _Invite__inviter_id, "f"));
  }
  /**
   * The URL of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get url() {
    return Invite.getUrl(this.code);
  }
  /**
   * The maximum number of uses allowed for the invite.
   * @type {Number?}
   * @readonly
   * @public
   */
  get maxUses() {
    return __classPrivateFieldGet(this, _Invite_max_uses, "f");
  }
  /**
   * Returns the URL of the invite.
   * @param {String} code The code of the invite.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getUrl(code) {
    if (typeof code != "string")
      throw new TypeError("GLUON: Invalid invite code.");
    return `${INVITE_BASE_URL}/${code}`;
  }
  /**
   * Determines whether the invite should be cached.
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
    if (gluonCacheOptions.cacheInvites === false) return false;
    if (guildCacheOptions.inviteCaching === false) return false;
    return true;
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<Invite: ${this.code}>`;
  }
  /**
   * @method
   * @public
   */
  [((_Invite__client = new WeakMap()),
  (_Invite__guild_id = new WeakMap()),
  (_Invite__code = new WeakMap()),
  (_Invite__channel_id = new WeakMap()),
  (_Invite_uses = new WeakMap()),
  (_Invite_expires = new WeakMap()),
  (_Invite_inviter = new WeakMap()),
  (_Invite__inviter_id = new WeakMap()),
  (_Invite_max_uses = new WeakMap()),
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
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          code: this.code,
          channel: this.channel?.toJSON(format),
          inviter: this.inviter?.toJSON(format),
          uses: this.uses,
          expires: this.expires ? this.expires * 1000 : undefined,
          max_uses: this.maxUses,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          code: this.code,
          channel: this.channel?.toJSON(format),
          inviter: this.inviter?.toJSON(format),
          uses: this.uses,
          expires_at: this.expires
            ? new Date(this.expires * 1000).toISOString()
            : undefined,
          max_uses: this.maxUses,
        };
      }
    }
  }
}
export default Invite;
//# sourceMappingURL=Invite.js.map
