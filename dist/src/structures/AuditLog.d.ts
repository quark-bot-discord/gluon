import User from "./User.js";
import util from "util";
import type {
  AuditLogCacheJSON,
  AuditLogDiscordJSON,
  AuditLogStorageJSON,
  AuditLog as AuditLogType,
  Client as ClientType,
  AllChannels,
} from "../../typings/index.d.ts";
import {
  APIAuditLogEntry,
  APIUser,
  AuditLogOptionsType,
  Snowflake,
} from "#typings/discord.js";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents an audit log entry.
 * @see {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object}
 */
declare class AuditLog implements AuditLogType {
  #private;
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
    }: {
      users?: APIUser[];
      guildId: Snowflake;
    },
  );
  /**
   * The id of the audit log entry.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The ID of the guild that this audit log belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The type of action that occurred.
   * @type {Number}
   * @readonly
   * @public
   */
  get actionType(): number;
  /**
   * The id of the target user.
   * @type {String?}
   * @readonly
   * @public
   */
  get targetId(): string | null;
  /**
   * The channel id involved with this audit log entry.
   * @type {String?}
   * @readonly
   * @public
   */
  get channelId(): string | null;
  /**
   * The guild that this audit log belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): import("../../typings/index.d.ts").Guild | null;
  /**
   * The channel involved with this audit log entry.
   * @type {(TextChannel | VoiceChannel)?} The channel involved with this audit log entry.
   * @readonly
   * @public
   */
  get channel(): AllChannels | null;
  /**
   * The target user involved with this audit log entry.
   * @type {User?}
   * @readonly
   * @public
   */
  get target(): User | null;
  /**
   * The executor user involved with this audit log entry.
   * @type {String?}
   * @readonly
   * @public
   */
  get executorId(): string | null;
  /**
   * The executor user involved with this audit log entry.
   * @type {User?}
   * @readonly
   * @public
   */
  get executor(): User | null;
  /**
   * The reason for this audit log entry.
   * @type {String?}
   * @readonly
   * @public
   */
  get reason(): string | null;
  /**
   * The count of this type of audit log entry.
   * @type {Number?}
   * @readonly
   * @public
   */
  get count(): number | undefined;
  /**
   * The inactivity period for when members are purged.
   * @type {Number?}
   * @readonly
   * @public
   */
  get deleteMemberDays(): number | undefined;
  /**
   * The number of members removed for when members are purged.
   * @type {Number?}
   * @readonly
   * @public
   */
  get membersRemoved(): number | undefined;
  /**
   * The id of the overwritten entity.
   * @type {String?}
   * @readonly
   * @public
   */
  get specialId(): string | null;
  /**
   * The type of the overwritten entity - role ("0") or member ("1")
   * @type {Number?}
   * @readonly
   * @public
   */
  get specialType(): AuditLogOptionsType;
  /**
   * The new voice channel status.
   * @type {String?}
   * @readonly
   * @public
   */
  get status(): string | undefined;
  /**
   * The changes in this audit log entry.
   * @type {Object?}
   * @readonly
   * @public
   */
  get changes(): import("#typings/discord.js").APIAuditLogChange[] | undefined;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(
    format?: JsonTypes,
  ): AuditLogStorageJSON | AuditLogDiscordJSON | AuditLogCacheJSON;
}
export default AuditLog;
