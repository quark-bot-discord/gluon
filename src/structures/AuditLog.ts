import User from "./User.js";
import util from "util";
import type {
  AuditLogCacheJSON,
  AuditLogDiscordJSON,
  AuditLogStorageJSON,
  AuditLog as AuditLogType,
  Client as ClientType,
  AllChannels,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
} from "../../typings/index.d.ts";
import {
  APIAuditLogEntry,
  APIUser,
  AuditLogOptionsType,
  Snowflake,
} from "#typings/discord.js";
import { GluonDebugLevels, JsonTypes } from "../../typings/enums.js";

/**
 * Represents an audit log entry.
 * @see {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object}
 */
class AuditLog implements AuditLogType {
  #_client;
  #_id;
  #_guild_id;
  #action_type;
  #_target_id;
  #target;
  #_executor_id;
  #executor;
  #reason;
  #_channel_id;
  #count;
  #delete_member_days;
  #members_removed;
  #special_id;
  #special_type;
  #status;
  #changes;

  /**
   * Creates a structure for an audit log entry.
   * @param {Client} client The client instance.
   * @param {Object} data Audit log data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {Array<Object>?} [options.users] Resolved users who are involved with the audit log entries.
   * @param {String} options.guildId The ID of the guild that this audit log belongs to.
   */
  constructor(
    client: ClientType,
    data:
      | APIAuditLogEntry
      | AuditLogCacheJSON
      | AuditLogDiscordJSON
      | AuditLogStorageJSON,
    {
      users,
      guildId,
      nocache = false,
    }: { users?: APIUser[]; guildId: Snowflake; nocache?: boolean },
  ) {
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
    this.#_client = client;

    /**
     * The id of the audit log entry.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The ID of the guild that this audit log belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    if (!this.guild) {
      throw new Error(`GLUON: Guild ${this.guildId} cannot be found in cache`);
    }

    /**
     * The type of action that occurred.
     * @type {Number}
     * @private
     */
    this.#action_type = data.action_type;

    /**
     * The id of the target user.
     * @type {BigInt?}
     * @private
     */
    this.#_target_id = data.target_id ? BigInt(data.target_id) : null;

    if (users && users.length != 0 && this.#_target_id) {
      const user = users.find((u) => u.id === String(this.#_target_id));
      if (user)
        /**
         * The resolved target user.
         * @type {User?}
         * @private
         */
        this.#target = new User(this.#_client, user);
    }

    /**
     * The id of the executor user.
     * @type {BigInt?}
     * @private
     */
    this.#_executor_id = data.user_id ? BigInt(data.user_id) : null;

    if (users && users.length != 0 && this.#_executor_id) {
      const user = users.find((u) => u.id === String(this.#_executor_id));
      if (user)
        /**
         * The resolved executor user.
         * @type {User?}
         * @private
         */
        this.#executor = new User(this.#_client, user);
    }

    /**
     * The reason for this audit log entry.
     * @type {String?}
     * @private
     */
    this.#reason = data.reason || null;

    if (data.options) {
      if (data.options.channel_id) {
        /**
         * The channel id involved with this audit log entry.
         * @type {BigInt?}
         * @private
         */
        this.#_channel_id = BigInt(data.options.channel_id);
      }

      if (data.options.count) {
        /**
         * The count of this type of audit log entry.
         * @type {Number?}
         * @private
         */
        this.#count =
          typeof data.options.count === "number"
            ? data.options.count
            : parseInt(data.options.count);
      }

      if (data.options.delete_member_days) {
        /**
         * The inactivity period for when members are purged.
         * @type {Number?}
         * @private
         */
        this.#delete_member_days =
          typeof data.options.delete_member_days === "number"
            ? data.options.delete_member_days
            : parseInt(data.options.delete_member_days);
      }

      if (data.options.members_removed) {
        /**
         * The number of members removed for when members are purged.
         * @type {Number?}
         * @private
         */
        this.#members_removed =
          typeof data.options.members_removed === "number"
            ? data.options.members_removed
            : parseInt(data.options.members_removed);
      }

      if (data.options.id)
        /**
         * The id of the overwritten entity.
         * @type {BigInt?}
         * @private
         */
        this.#special_id = BigInt(data.options.id);

      if (data.options.type) {
        /**
         * The type of the overwritten entity - role ("0") or member ("1")
         * @type {Number?}
         * @private
         */
        this.#special_type = (
          typeof data.options.type === "number"
            ? data.options.type
            : parseInt(data.options.type)
        ) as 0 | 1;
      }

      if ("status" in data.options && data.options.status) {
        /**
         * The new voice channel status.
         * @type {String?}
         * @private
         */
        this.#status = data.options.status;
      }
    }

    if (data.changes)
      /**
       * The changes in this audit log entry.
       * @type {Object?}
       * @private
       */
      this.#changes = data.changes;

    const shouldCache = AuditLog.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (nocache === false && shouldCache) {
      this.guild.auditLogs.set(data.id, this);
      this.#_client._emitDebug(
        GluonDebugLevels.Info,
        `CACHE AUDITLOG ${guildId} ${data.id}`,
      );
    } else {
      this.#_client._emitDebug(
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
    return String(this.#_id);
  }

  /**
   * The ID of the guild that this audit log belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The type of action that occurred.
   * @type {Number}
   * @readonly
   * @public
   */
  get actionType() {
    return this.#action_type;
  }

  /**
   * The id of the target user.
   * @type {String?}
   * @readonly
   * @public
   */
  get targetId() {
    return this.#_target_id ? String(this.#_target_id) : null;
  }

  /**
   * The channel id involved with this audit log entry.
   * @type {String?}
   * @readonly
   * @public
   */
  get channelId() {
    return this.#_channel_id ? String(this.#_channel_id) : null;
  }

  /**
   * The guild that this audit log belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId);
  }

  /**
   * The channel involved with this audit log entry.
   * @type {(TextChannel | VoiceChannel)?} The channel involved with this audit log entry.
   * @readonly
   * @public
   */
  get channel() {
    if (!this.channelId) return null;
    return this.guild?.channels.get(this.channelId) as AllChannels | null;
  }

  /**
   * The target user involved with this audit log entry.
   * @type {User?}
   * @readonly
   * @public
   */
  get target() {
    return this.#target ?? null;
  }

  /**
   * The executor user involved with this audit log entry.
   * @type {String?}
   * @readonly
   * @public
   */
  get executorId() {
    return this.#_executor_id ? String(this.#_executor_id) : null;
  }

  /**
   * The executor user involved with this audit log entry.
   * @type {User?}
   * @readonly
   * @public
   */
  get executor() {
    return this.#executor ?? null;
  }

  /**
   * The reason for this audit log entry.
   * @type {String?}
   * @readonly
   * @public
   */
  get reason() {
    return this.#reason;
  }

  /**
   * The count of this type of audit log entry.
   * @type {Number?}
   * @readonly
   * @public
   */
  get count() {
    return this.#count;
  }

  /**
   * The inactivity period for when members are purged.
   * @type {Number?}
   * @readonly
   * @public
   */
  get deleteMemberDays() {
    return this.#delete_member_days;
  }

  /**
   * The number of members removed for when members are purged.
   * @type {Number?}
   * @readonly
   * @public
   */
  get membersRemoved() {
    return this.#members_removed;
  }

  /**
   * The id of the overwritten entity.
   * @type {String?}
   * @readonly
   * @public
   */
  get specialId() {
    return this.#special_id ? String(this.#special_id) : null;
  }

  /**
   * The type of the overwritten entity - role ("0") or member ("1")
   * @type {Number?}
   * @readonly
   * @public
   */
  get specialType() {
    return String(this.#special_type) as AuditLogOptionsType;
  }

  /**
   * The new voice channel status.
   * @type {String?}
   * @readonly
   * @public
   */
  get status() {
    return this.#status;
  }

  /**
   * The changes in this audit log entry.
   * @type {Object?}
   * @readonly
   * @public
   */
  get changes() {
    return this.#changes;
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
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ) {
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
  ): AuditLogStorageJSON | AuditLogDiscordJSON | AuditLogCacheJSON {
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
