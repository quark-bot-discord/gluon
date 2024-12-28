export default AuditLog;
/**
 * Represents an audit log entry.
 * @see {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object}
 */
declare class AuditLog {
    [x: number]: () => string;
    /**
     * Creates a structure for an audit log entry.
     * @param {Client} client The client instance.
     * @param {Object} data Audit log data from Discord.
     * @param {Object} options Additional options for this structure.
     * @param {Array<Object>?} [options.users] Resolved users who are involved with the audit log entries.
     * @param {String} options.guildId The ID of the guild that this audit log belongs to.
     */
    constructor(client: Client, data: any, { users, guildId }?: {
        users?: Array<any> | null;
        guildId: string;
    });
    /**
     * The id of the audit log entry.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The ID of the guild that this audit log belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The type of action that occurred.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get actionType(): number;
    /**
     * The id of the target user.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get targetId(): string | null;
    /**
     * The channel id involved with this audit log entry.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get channelId(): string | null;
    /**
     * The guild that this audit log belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild | null;
    /**
     * The channel involved with this audit log entry.
     * @type {(TextChannel | VoiceChannel)?} The channel involved with this audit log entry.
     * @readonly
     * @public
     */
    public readonly get channel(): (TextChannel | VoiceChannel) | null;
    /**
     * The target user involved with this audit log entry.
     * @type {User?}
     * @readonly
     * @public
     */
    public readonly get target(): User | null;
    /**
     * The executor user involved with this audit log entry.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get executorId(): string | null;
    /**
     * The executor user involved with this audit log entry.
     * @type {User?}
     * @readonly
     * @public
     */
    public readonly get executor(): User | null;
    /**
     * The reason for this audit log entry.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get reason(): string | null;
    /**
     * The count of this type of audit log entry.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get count(): number | null;
    /**
     * The inactivity period for when members are purged.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get deleteMemberDays(): number | null;
    /**
     * The number of members removed for when members are purged.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get membersRemoved(): number | null;
    /**
     * The id of the overwritten entity.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get specialId(): string | null;
    /**
     * The type of the overwritten entity - role ("0") or member ("1")
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get specialType(): number | null;
    /**
     * The new voice channel status.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get status(): string | null;
    /**
     * The changes in this audit log entry.
     * @type {Object?}
     * @readonly
     * @public
     */
    public readonly get changes(): any | null;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} [format] The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format?: number): any;
    #private;
}
import User from "./User.js";
import Client from "../Client.js";
//# sourceMappingURL=AuditLog.d.ts.map