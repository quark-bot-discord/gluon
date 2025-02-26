import { AUDIT_LOG_TYPES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";

export interface AuditLogType {
  readonly id: Snowflake;
  readonly guildId: Snowflake;
  readonly actionType: (typeof AUDIT_LOG_TYPES)[keyof typeof AUDIT_LOG_TYPES];
  readonly targetId: Snowflake | null;
  readonly channelId: Snowflake | null;
  readonly guild: GuildType | null;
  readonly channel: TextChannel | VoiceChannel | null;
  readonly target: User | null;
  readonly executorId: Snowflake | null;
  readonly executor: User | null;
  readonly reason: string | null;
  readonly count?: number;
  readonly deleteMemberDays?: number;
  readonly membersRemoved?: number;
  readonly specialId: Snowflake | null;
  readonly specialType?: 0 | 1;
  readonly status: string | null;
  readonly changes?: AuditLogChanges;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): AuditLogStorageJSON | AuditLogCacheJSON | AuditLogDiscordJSON;
}

export interface AuditLogStorageJSON {
  id: Snowflake;
  guild_id: Snowflake;
  action_type: number;
  target_id: Snowflake | null;
  user_id: Snowflake | null;
  reason: string | null;
  options?: {
    channel_id?: Snowflake;
    count?: number;
    delete_member_days?: number;
    members_removed?: number;
    id?: Snowflake;
    type?: 0 | 1;
    status?: string;
  };
  changes?: AuditLogChanges;
}

export type AuditLogCacheJSON = AuditLogStorageJSON;

export type AuditLogDiscordJSON = AuditLogStorageJSON;

export interface AuditLogRaw {
  target_id: Snowflake | null;
  changes?: AuditLogChanges;
  user_id: Snowflake | null;
  id: Snowflake;
  action_type: (typeof AUDIT_LOG_TYPES)[keyof typeof AUDIT_LOG_TYPES];
  options?: {
    application_id?: Snowflake;
    auto_moderation_rule_name?: string;
    auto_moderation_rule_trigger_type?: string;
    channel_id?: Snowflake;
    count?: string;
    delete_member_days?: string;
    id?: Snowflake;
    members_removed?: string;
    message_id?: Snowflake;
    role_name?: "0" | "1";
    type?: "0" | "1";
    integration_type?: string;
  };
  reason: string | null;
}

export type AuditLogChanges = Array<{
  key: string;
  old_value: unknown;
  new_value: unknown;
}>;
