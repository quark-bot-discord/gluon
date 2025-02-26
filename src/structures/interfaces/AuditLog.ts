import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import { UserType } from "./User.js";
import { TextChannelType } from "./TextChannel.js";
import { VoiceChannelType } from "./VoiceChannel.js";

export interface AuditLogType {
  readonly id: Snowflake;
  readonly guildId: Snowflake;
  readonly actionType: AuditLogTypes;
  readonly targetId: Snowflake | null;
  readonly channelId: Snowflake | null;
  readonly guild: GuildType | null;
  readonly channel: TextChannelType | VoiceChannelType | null;
  readonly target: UserType | null;
  readonly executorId: Snowflake | null;
  readonly executor: UserType | null;
  readonly reason: string | null;
  readonly count?: number;
  readonly deleteMemberDays?: number;
  readonly membersRemoved?: number;
  readonly specialId: Snowflake | null;
  readonly specialType?: AuditLogOptionTypes;
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
    type?: AuditLogOptionTypes;
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
  action_type: AuditLogTypes;
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
    role_name?: string;
    type?: AuditLogOptionTypes;
    integration_type?: string;
  };
  reason: string | null;
}

export type AuditLogChanges = Array<{
  key: string;
  old_value?: unknown;
  new_value?: unknown;
}>;

export enum AuditLogOptionTypes {
  ROLE = "0",
  MEMBER = "1",
}

export enum AuditLogTypes {
  GUILD_UPDATE = 1,
  CHANNEL_CREATE = 10,
  CHANNEL_UPDATE = 11,
  CHANNEL_DELETE = 12,
  CHANNEL_OVERWRITE_CREATE = 13,
  CHANNEL_OVERWRITE_UPDATE = 14,
  CHANNEL_OVERWRITE_DELETE = 15,
  MEMBER_KICK = 20,
  MEMBER_PRUNE = 21,
  MEMBER_BAN_ADD = 22,
  MEMBER_BAN_REMOVE = 23,
  MEMBER_UPDATE = 24,
  MEMBER_ROLE_UPDATE = 25,
  MEMBER_MOVE = 26,
  MEMBER_DISCONNECT = 27,
  BOT_ADD = 28,
  ROLE_CREATE = 30,
  ROLE_UPDATE = 31,
  ROLE_DELETE = 32,
  INVITE_CREATE = 40,
  INVITE_UPDATE = 41,
  INVITE_DELETE = 42,
  WEBHOOK_CREATE = 50,
  WEBHOOK_UPDATE = 51,
  WEBHOOK_DELETE = 52,
  EMOJI_CREATE = 60,
  EMOJI_UPDATE = 61,
  EMOJI_DELETE = 62,
  MESSAGE_DELETE = 72,
  MESSAGE_BULK_DELETE = 73,
  MESSAGE_PIN = 74,
  MESSAGE_UNPIN = 75,
  INTEGRATION_CREATE = 80,
  INTEGRATION_UPDATE = 81,
  INTEGRATION_DELETE = 82,
  STAGE_INSTANCE_CREATE = 83,
  STAGE_INSTANCE_UPDATE = 84,
  STAGE_INSTANCE_DELETE = 85,
  STICKER_CREATE = 90,
  STICKER_UPDATE = 91,
  STICKER_DELETE = 92,
  GUILD_SCHEDULED_EVENT_CREATE = 100,
  GUILD_SCHEDULED_EVENT_UPDATE = 101,
  GUILD_SCHEDULED_EVENT_DELETE = 102,
  THREAD_CREATE = 110,
  THREAD_UPDATE = 111,
  THREAD_DELETE = 112,
  APPLICATION_COMMAND_PERMISSION_UPDATE = 121,
  AUTO_MODERATION_RULE_CREATE = 140,
  AUTO_MODERATION_RULE_UPDATE = 141,
  AUTO_MODERATION_RULE_DELETE = 142,
  AUTO_MODERATION_BLOCK_MESSAGE = 143,
  AUTO_MODERATION_FLAG_TO_CHANNEL = 144,
  AUTO_MODERATION_USER_COMMUNICATION_DISABLED = 145,
  CREATOR_MONETIZATION_REQUEST_CREATED = 150,
  CREATOR_MONETIZATION_TERMS_ACCEPTED = 151,
  VOICE_CHANNEL_STATUS_UPDATE = 192,
}
