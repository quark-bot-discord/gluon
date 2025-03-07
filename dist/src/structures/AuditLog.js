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
var _AuditLog__client,
  _AuditLog__id,
  _AuditLog__guild_id,
  _AuditLog_action_type,
  _AuditLog__target_id,
  _AuditLog_target,
  _AuditLog__executor_id,
  _AuditLog_executor,
  _AuditLog_reason,
  _AuditLog__channel_id,
  _AuditLog_count,
  _AuditLog_delete_member_days,
  _AuditLog_members_removed,
  _AuditLog_special_id,
  _AuditLog_special_type,
  _AuditLog_status,
  _AuditLog_changes;
import User from "./User.js";
import util from "util";
import { GluonDebugLevels, JsonTypes } from "../../typings/enums.js";
/**
 * Represents an audit log entry.
 * @see {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object}
 */
class AuditLog {
  /**
   * Creates a structure for an audit log entry.
   * @param {Client} client The client instance.
   * @param {Object} data Audit log data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {Array<Object>?} [options.users] Resolved users who are involved with the audit log entries.
   * @param {String} options.guildId The ID of the guild that this audit log belongs to.
   */
  constructor(client, data, { users, guildId, nocache = false }) {
    _AuditLog__client.set(this, void 0);
    _AuditLog__id.set(this, void 0);
    _AuditLog__guild_id.set(this, void 0);
    _AuditLog_action_type.set(this, void 0);
    _AuditLog__target_id.set(this, void 0);
    _AuditLog_target.set(this, void 0);
    _AuditLog__executor_id.set(this, void 0);
    _AuditLog_executor.set(this, void 0);
    _AuditLog_reason.set(this, void 0);
    _AuditLog__channel_id.set(this, void 0);
    _AuditLog_count.set(this, void 0);
    _AuditLog_delete_member_days.set(this, void 0);
    _AuditLog_members_removed.set(this, void 0);
    _AuditLog_special_id.set(this, void 0);
    _AuditLog_special_type.set(this, void 0);
    _AuditLog_status.set(this, void 0);
    _AuditLog_changes.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (
      users &&
      (!Array.isArray(users) || !users.every((u) => u instanceof Object))
    )
      throw new TypeError("GLUON: Users must be an array of objects");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _AuditLog__client, client, "f");
    /**
     * The id of the audit log entry.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _AuditLog__id, BigInt(data.id), "f");
    /**
     * The ID of the guild that this audit log belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _AuditLog__guild_id, BigInt(guildId), "f");
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${this.guildId} cannot be found in cache`);
    }
    /**
     * The type of action that occurred.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _AuditLog_action_type, data.action_type, "f");
    /**
     * The id of the target user.
     * @type {BigInt?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _AuditLog__target_id,
      data.target_id ? BigInt(data.target_id) : null,
      "f",
    );
    if (
      users &&
      users.length != 0 &&
      __classPrivateFieldGet(this, _AuditLog__target_id, "f")
    ) {
      const user = users.find(
        (u) =>
          u.id ===
          String(__classPrivateFieldGet(this, _AuditLog__target_id, "f")),
      );
      if (user)
        /**
         * The resolved target user.
         * @type {User?}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _AuditLog_target,
          new User(__classPrivateFieldGet(this, _AuditLog__client, "f"), user),
          "f",
        );
    }
    /**
     * The id of the executor user.
     * @type {BigInt?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _AuditLog__executor_id,
      data.user_id ? BigInt(data.user_id) : null,
      "f",
    );
    if (
      users &&
      users.length != 0 &&
      __classPrivateFieldGet(this, _AuditLog__executor_id, "f")
    ) {
      const user = users.find(
        (u) =>
          u.id ===
          String(__classPrivateFieldGet(this, _AuditLog__executor_id, "f")),
      );
      if (user)
        /**
         * The resolved executor user.
         * @type {User?}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _AuditLog_executor,
          new User(__classPrivateFieldGet(this, _AuditLog__client, "f"), user),
          "f",
        );
    }
    /**
     * The reason for this audit log entry.
     * @type {String?}
     * @private
     */
    __classPrivateFieldSet(this, _AuditLog_reason, data.reason || null, "f");
    if (data.options) {
      if (data.options.channel_id) {
        /**
         * The channel id involved with this audit log entry.
         * @type {BigInt?}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _AuditLog__channel_id,
          BigInt(data.options.channel_id),
          "f",
        );
      }
      if (data.options.count) {
        /**
         * The count of this type of audit log entry.
         * @type {Number?}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _AuditLog_count,
          typeof data.options.count === "number"
            ? data.options.count
            : parseInt(data.options.count),
          "f",
        );
      }
      if (data.options.delete_member_days) {
        /**
         * The inactivity period for when members are purged.
         * @type {Number?}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _AuditLog_delete_member_days,
          typeof data.options.delete_member_days === "number"
            ? data.options.delete_member_days
            : parseInt(data.options.delete_member_days),
          "f",
        );
      }
      if (data.options.members_removed) {
        /**
         * The number of members removed for when members are purged.
         * @type {Number?}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _AuditLog_members_removed,
          typeof data.options.members_removed === "number"
            ? data.options.members_removed
            : parseInt(data.options.members_removed),
          "f",
        );
      }
      if (data.options.id)
        /**
         * The id of the overwritten entity.
         * @type {BigInt?}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _AuditLog_special_id,
          BigInt(data.options.id),
          "f",
        );
      if (data.options.type) {
        /**
         * The type of the overwritten entity - role ("0") or member ("1")
         * @type {Number?}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _AuditLog_special_type,
          typeof data.options.type === "number"
            ? data.options.type
            : parseInt(data.options.type),
          "f",
        );
      }
      if ("status" in data.options && data.options.status) {
        /**
         * The new voice channel status.
         * @type {String?}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _AuditLog_status,
          data.options.status,
          "f",
        );
      }
    }
    if (data.changes)
      /**
       * The changes in this audit log entry.
       * @type {Object?}
       * @private
       */
      __classPrivateFieldSet(this, _AuditLog_changes, data.changes, "f");
    const shouldCache = AuditLog.shouldCache(
      __classPrivateFieldGet(this, _AuditLog__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (nocache === false && shouldCache) {
      this.guild.auditLogs.set(data.id, this);
      __classPrivateFieldGet(this, _AuditLog__client, "f")._emitDebug(
        GluonDebugLevels.Info,
        `CACHE AUDITLOG ${guildId} ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _AuditLog__client, "f")._emitDebug(
        GluonDebugLevels.Info,
        `NO CACHE AUDITLOG ${guildId} ${data.id} (${nocache} ${shouldCache})`,
      );
    }
  }
  /**
   * The id of the audit log entry.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _AuditLog__id, "f"));
  }
  /**
   * The ID of the guild that this audit log belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _AuditLog__guild_id, "f"));
  }
  /**
   * The type of action that occurred.
   * @type {Number}
   * @readonly
   * @public
   */
  get actionType() {
    return __classPrivateFieldGet(this, _AuditLog_action_type, "f");
  }
  /**
   * The id of the target user.
   * @type {String?}
   * @readonly
   * @public
   */
  get targetId() {
    return __classPrivateFieldGet(this, _AuditLog__target_id, "f")
      ? String(__classPrivateFieldGet(this, _AuditLog__target_id, "f"))
      : null;
  }
  /**
   * The channel id involved with this audit log entry.
   * @type {String?}
   * @readonly
   * @public
   */
  get channelId() {
    return __classPrivateFieldGet(this, _AuditLog__channel_id, "f")
      ? String(__classPrivateFieldGet(this, _AuditLog__channel_id, "f"))
      : null;
  }
  /**
   * The guild that this audit log belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return __classPrivateFieldGet(this, _AuditLog__client, "f").guilds.get(
      this.guildId,
    );
  }
  /**
   * The channel involved with this audit log entry.
   * @type {(TextChannel | VoiceChannel)?} The channel involved with this audit log entry.
   * @readonly
   * @public
   */
  get channel() {
    if (!this.channelId) return null;
    return this.guild?.channels.get(this.channelId);
  }
  /**
   * The target user involved with this audit log entry.
   * @type {User?}
   * @readonly
   * @public
   */
  get target() {
    return __classPrivateFieldGet(this, _AuditLog_target, "f") ?? null;
  }
  /**
   * The executor user involved with this audit log entry.
   * @type {String?}
   * @readonly
   * @public
   */
  get executorId() {
    return __classPrivateFieldGet(this, _AuditLog__executor_id, "f")
      ? String(__classPrivateFieldGet(this, _AuditLog__executor_id, "f"))
      : null;
  }
  /**
   * The executor user involved with this audit log entry.
   * @type {User?}
   * @readonly
   * @public
   */
  get executor() {
    return __classPrivateFieldGet(this, _AuditLog_executor, "f") ?? null;
  }
  /**
   * The reason for this audit log entry.
   * @type {String?}
   * @readonly
   * @public
   */
  get reason() {
    return __classPrivateFieldGet(this, _AuditLog_reason, "f");
  }
  /**
   * The count of this type of audit log entry.
   * @type {Number?}
   * @readonly
   * @public
   */
  get count() {
    return __classPrivateFieldGet(this, _AuditLog_count, "f");
  }
  /**
   * The inactivity period for when members are purged.
   * @type {Number?}
   * @readonly
   * @public
   */
  get deleteMemberDays() {
    return __classPrivateFieldGet(this, _AuditLog_delete_member_days, "f");
  }
  /**
   * The number of members removed for when members are purged.
   * @type {Number?}
   * @readonly
   * @public
   */
  get membersRemoved() {
    return __classPrivateFieldGet(this, _AuditLog_members_removed, "f");
  }
  /**
   * The id of the overwritten entity.
   * @type {String?}
   * @readonly
   * @public
   */
  get specialId() {
    return __classPrivateFieldGet(this, _AuditLog_special_id, "f")
      ? String(__classPrivateFieldGet(this, _AuditLog_special_id, "f"))
      : null;
  }
  /**
   * The type of the overwritten entity - role ("0") or member ("1")
   * @type {Number?}
   * @readonly
   * @public
   */
  get specialType() {
    return String(__classPrivateFieldGet(this, _AuditLog_special_type, "f"));
  }
  /**
   * The new voice channel status.
   * @type {String?}
   * @readonly
   * @public
   */
  get status() {
    return __classPrivateFieldGet(this, _AuditLog_status, "f");
  }
  /**
   * The changes in this audit log entry.
   * @type {Object?}
   * @readonly
   * @public
   */
  get changes() {
    return __classPrivateFieldGet(this, _AuditLog_changes, "f");
  }
  /**
   * Determines whether the emoji should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions, guildCacheOptions) {
    if (gluonCacheOptions.cacheAuditLogs === false) return false;
    if (guildCacheOptions.auditLogCaching === false) return false;
    return true;
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<Audit Log Entry: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_AuditLog__client = new WeakMap()),
  (_AuditLog__id = new WeakMap()),
  (_AuditLog__guild_id = new WeakMap()),
  (_AuditLog_action_type = new WeakMap()),
  (_AuditLog__target_id = new WeakMap()),
  (_AuditLog_target = new WeakMap()),
  (_AuditLog__executor_id = new WeakMap()),
  (_AuditLog_executor = new WeakMap()),
  (_AuditLog_reason = new WeakMap()),
  (_AuditLog__channel_id = new WeakMap()),
  (_AuditLog_count = new WeakMap()),
  (_AuditLog_delete_member_days = new WeakMap()),
  (_AuditLog_members_removed = new WeakMap()),
  (_AuditLog_special_id = new WeakMap()),
  (_AuditLog_special_type = new WeakMap()),
  (_AuditLog_status = new WeakMap()),
  (_AuditLog_changes = new WeakMap()),
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
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.CACHE_FORMAT:
      default: {
        return {
          id: this.id,
          guild_id: this.guildId,
          action_type: this.actionType,
          target_id: this.targetId,
          user_id: this.executorId,
          reason: this.reason,
          options: {
            channel_id: this.channelId ?? undefined,
            count: typeof this.count === "number" ? this.count : undefined,
            delete_member_days:
              typeof this.deleteMemberDays === "number"
                ? this.deleteMemberDays
                : undefined,
            members_removed:
              typeof this.membersRemoved === "number"
                ? this.membersRemoved
                : undefined,
            id: this.specialId ?? undefined,
            type: this.specialType ?? undefined,
            status: this.status ?? undefined,
          },
          changes: this.changes,
        };
      }
    }
  }
}
export default AuditLog;
//# sourceMappingURL=AuditLog.js.map
