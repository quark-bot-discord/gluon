import { LOCALES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ISO8601Timestamp,
  PermissionsBitfield,
  Snowflake,
  UnixMillisecondsTimestamp,
  UnixTimestamp,
} from "src/interfaces/gluon.js";
import { StickerRaw } from "./Sticker.js";
import {
  RoleCacheJSON,
  RoleDiscordJSON,
  RoleRaw,
  RoleStorageJSON,
} from "./Role.js";
import {
  EmojiCacheJSON,
  EmojiDiscordJSON,
  EmojiRaw,
  EmojiStorageJSON,
} from "./Emoji.js";
import {
  MemberCacheJSON,
  MemberDiscordJSON,
  MemberRaw,
  MemberStorageJSON,
  MemberType,
} from "./Member.js";
import {
  VoiceStateCacheJSON,
  VoiceStateDiscordJSON,
  VoiceStateRaw,
  VoiceStateStorageJSON,
} from "./VoiceState.js";
import {
  AnyChannelType,
  ChannelCacheJSON,
  ChannelDiscordJSON,
  ChannelRaw,
  ChannelStorageJSON,
} from "./Channel.js";
import {
  InviteCacheJSON,
  InviteDiscordJSON,
  InviteRaw,
  InviteStorageJSON,
} from "./Invite.js";
import { ThreadRaw } from "./Thread.js";
import {
  ScheduledEventRaw,
  ScheduledEventRawPrivacyLevels,
} from "./ScheduledEvent.js";
import { UserRaw } from "./User.js";
import { PresenceStatus, PresenceType } from "src/gateway.js";
import { AuditLogType } from "./AuditLog.js";
import { GuildCacheOptionsType } from "src/managers/interfaces/GuildCacheOptions.js";
import { GuildMemberManagerType } from "src/managers/interfaces/GuildMemberManager.js";
import { GuildChannelsManagerType } from "src/managers/interfaces/GuildChannelsManager.js";
import { GuildRoleManagerType } from "src/managers/interfaces/GuildRoleManager.js";
import { GuildEmojisManagerType } from "src/managers/interfaces/GuildEmojisManager.js";
import { GuildInviteManagerType } from "src/managers/interfaces/GuildInviteManager.js";
import { GuildScheduledEventManagerType } from "src/managers/interfaces/GuildScheduledEventManager.js";
import { GuildVoiceStatesManagerType } from "src/managers/interfaces/GuildVoiceStatesManager.js";
import { TextChannelType } from "./TextChannel.js";

export interface GuildType {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly unavailable: boolean;
  readonly members: GuildMemberManagerType;
  readonly channels: GuildChannelsManagerType;
  readonly roles: GuildRoleManagerType;
  readonly emojis: GuildEmojisManagerType;
  readonly invites: GuildInviteManagerType;
  readonly scheduledEvents: GuildScheduledEventManagerType;
  readonly voiceStates: GuildVoiceStatesManagerType;
  readonly _originalIconHash: string | null;
  readonly memberCount: number;
  readonly ownerId: Snowflake;
  readonly joinedAt?: UnixTimestamp;
  readonly mfaLevel: keyof typeof GuildMfaLevels | null;
  readonly verificationLevel: keyof typeof GuildVerificationLevels;
  readonly defaultMessageNotifications: keyof typeof GuildDefaultMessageNotificationLevels;
  readonly explicitContentFilter: keyof typeof GuildExplicitContentFilterLevels;
  readonly nsfwLevel: keyof typeof GuildNsfwLevels;
  readonly premiumTier: GuildPremiumTier;
  readonly rawSystemChannelFlags: number;
  readonly premiumProgressBarEnabled: boolean;
  readonly rawDefaultMessageNotifications: GuildDefaultMessageNotificationLevels | null;
  readonly rawExplicitContentFilter: GuildExplicitContentFilterLevels | null;
  readonly rawVerificationLevel: GuildVerificationLevels | null;
  readonly rawNsfwLevel: GuildNsfwLevels | null;
  readonly rawMfaLevel: GuildMfaLevels | null;
  readonly systemChannelId: Snowflake | null;
  readonly rulesChannelId: Snowflake | null;
  readonly systemChannel: TextChannelType | null;
  readonly rulesChannel: TextChannelType | null;
  readonly preferredLocale: LOCALES;
  readonly premiumSubscriptionCount: number;
  readonly _cacheOptions: GuildCacheOptionsType;
  fetchAuditLogs({
    limit,
    type,
    user_id,
    before,
    after,
  }: {
    limit?: number;
    type?: number;
    user_id?: Snowflake;
    before?: string;
    after?: string;
  }): Promise<AuditLogType[]>;
  fetchInvites(): Promise<InviteRaw[]>;
  fetchChannels(): Promise<AnyChannelType[]>;
  fetchBan(userId: Snowflake): Promise<BanRaw>;
  leave(): Promise<void>;
  calculateMessageCacheCount(): number;
  calculateMemberCacheCount(): number;
  me(): Promise<MemberType>;
  _intervalCallback(): void;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): GuildStorageJSON | GuildCacheJSON | GuildDiscordJSON;
}

export interface GuildStorageJSON {
  id: Snowflake;
  name: string;
  icon: string | null;
  owner_id: Snowflake;
  joined_at?: number;
  unavailable: boolean;
  member_count: number;
  premium_tier: GuildPremiumTier;
  preferred_locale: LOCALES;
  _cache_options: number;
  _attributes: number;
  system_channel_id: Snowflake | null;
  rules_channel_id: Snowflake | null;
  premium_subscription_count: number;
  members: MemberStorageJSON[];
  channels: ChannelStorageJSON[];
  voice_states: VoiceStateStorageJSON[];
  roles: RoleStorageJSON[];
  emojis: EmojiStorageJSON[];
  invites: InviteStorageJSON[];
}

export interface GuildCacheJSON {
  id: Snowflake;
  name: string;
  icon: string | null;
  owner_id: Snowflake;
  joined_at?: number;
  unavailable: boolean;
  member_count: number;
  premium_tier: GuildPremiumTier;
  preferred_locale: LOCALES;
  _cache_options: number;
  _attributes: number;
  system_channel_id: Snowflake | null;
  rules_channel_id: Snowflake | null;
  premium_subscription_count: number;
  members: MemberCacheJSON[];
  channels: ChannelCacheJSON[];
  voice_states: VoiceStateCacheJSON[];
  roles: RoleCacheJSON[];
  emojis: EmojiCacheJSON[];
  invites: InviteCacheJSON[];
}

export interface GuildDiscordJSON {
  id: Snowflake;
  name: string;
  icon: string | null;
  owner_id: Snowflake;
  joined_at?: string;
  premium_tier: GuildPremiumTier;
  unavailable: boolean;
  member_count: number;
  preferred_locale: LOCALES;
  system_channel_flags: number;
  system_channel_id: Snowflake | null;
  rules_channel_id: Snowflake | null;
  premium_subscription_count: number;
  premium_progress_bar_enabled: boolean;
  default_message_notifications: GuildDefaultMessageNotificationLevels | null;
  explicit_content_filter: GuildExplicitContentFilterLevels | null;
  verification_level: GuildVerificationLevels | null;
  nsfw_level: GuildNsfwLevels | null;
  mfa_level: GuildMfaLevels | null;
  members: MemberDiscordJSON[];
  channels: ChannelDiscordJSON[];
  voice_states: VoiceStateDiscordJSON[];
  roles: RoleDiscordJSON[];
  emojis: EmojiDiscordJSON[];
  invites: InviteDiscordJSON[];
}

export interface GuildRaw {
  id: Snowflake;
  name: string;
  icon: string | null;
  icon_hash?: string;
  splash: string | null;
  discovery_splash: string | null;
  owner?: boolean;
  owner_id: Snowflake;
  permissions?: PermissionsBitfield;
  region?: string;
  afk_channel_id: Snowflake | null;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id: Snowflake | null;
  verification_level: GuildVerificationLevels;
  default_message_notifications: GuildDefaultMessageNotificationLevels;
  explicit_content_filter: GuildExplicitContentFilterLevels;
  roles: RoleRaw[];
  emojis: EmojiRaw[];
  features: GuildFeatures[];
  mfa_level: GuildMfaLevels;
  application_id: Snowflake | null;
  system_channel_id: Snowflake | null;
  system_channel_flags: number;
  rules_channel_id: Snowflake | null;
  max_presences?: number | null;
  max_members: number;
  vanity_url_code: string | null;
  description: string | null;
  banner: string | null;
  premium_tier: GuildPremiumTier;
  premium_subscription_count?: number;
  preferred_locale: LOCALES;
  public_updates_channel_id: Snowflake | null;
  max_video_channel_users?: number;
  max_stage_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  welcome_screen?: GuildWelcomeScreen;
  nsfw_level: GuildNsfwLevels;
  stickers?: StickerRaw[];
  premium_progress_bar_enabled: boolean;
  safety_alerts_channel_id: Snowflake | null;
  incidents_data: GuildIncidentData[] | null;
}

export interface GuildRawGateway extends GuildRaw {
  joined_at: ISO8601Timestamp;
  large: boolean;
  unavailable?: boolean;
  member_count: number;
  voice_states: VoiceStateRaw[];
  members: MemberRaw[];
  channels: ChannelRaw[];
  threads: ThreadRaw[];
  presences: PresenceUpdateRaw[];
  stage_instances: StageInstanceRaw[];
  guild_scheduled_events: ScheduledEventRaw[];
  soundboard_sounds: SoundboardSoundRaw[];
}

export interface BanRaw {
  reason: string | null;
  user: UserRaw;
}

export interface SoundboardSoundRaw {
  name: string;
  sound_id: Snowflake;
  volume: number;
  emoji_id: Snowflake | null;
  emoji_name: string | null;
  guild_id?: Snowflake;
  available: boolean;
  user?: UserRaw;
}

export interface StageInstanceRaw {
  id: Snowflake;
  guild_id: Snowflake;
  channel_id: Snowflake;
  topic: string;
  privacy_level: ScheduledEventRawPrivacyLevels;
  discoverable_disabled: boolean;
}

export interface PresenceUpdateRaw {
  user: UserRaw;
  guild_id: Snowflake;
  status: PresenceStatus;
  activities: ActivityRaw[];
  client_status: ClientStatusRaw;
}

export interface ClientStatusRaw {
  desktop?: string;
  mobile?: string;
  web?: string;
}

export interface ActivityRaw {
  name: string;
  type: PresenceType;
  url?: string | null;
  created_at: number;
  timestamps?: ActivityTimestamps;
  application_id?: Snowflake;
  details?: string | null;
  state?: string | null;
  emoji?: EmojiRaw | null;
  party?: ActivityParty;
  assets?: ActivityAssets;
  secrets?: ActivitySecrets;
  instance?: boolean;
  flags?: number;
  buttons?: ActivityButton[];
}

export interface ActivityButton {
  label: string;
  url: string;
}

export interface ActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

export interface ActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

export interface ActivityParty {
  id?: string;
  size?: [number, number];
}

export interface ActivityTimestamps {
  start?: UnixMillisecondsTimestamp;
  end?: UnixMillisecondsTimestamp;
}

export interface GuildWelcomeScreen {
  description: string | null;
  welcome_channels: GuildWelcomeScreenChannel[];
}

export interface GuildWelcomeScreenChannel {
  channel_id: Snowflake;
  description: string;
  emoji_id: Snowflake | null;
  emoji_name: string | null;
}

export interface GuildIncidentData {
  invites_disabled_until: ISO8601Timestamp | null;
  dms_disabled_until: ISO8601Timestamp | null;
  dm_spam_detected_at: ISO8601Timestamp | null;
  raid_detected_at: ISO8601Timestamp | null;
}

export enum GuildVerificationLevels {
  NONE = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4,
}
export enum GuildDefaultMessageNotificationLevels {
  ALL_MESSAGES = 0,
  ONLY_MENTIONS = 1,
}
export enum GuildExplicitContentFilterLevels {
  DISABLED = 0,
  MEMBERS_WITHOUT_ROLES = 1,
  ALL_MEMBERS = 2,
}
export enum GuildMfaLevels {
  NONE = 0,
  ELEVATED = 1,
}
export enum GuildNsfwLevels {
  DEFAULT = 0,
  EXPLICIT = 1,
  SAFE = 2,
  AGE_RESTRICTED = 3,
}
export enum GuildPremiumTier {
  NONE = 0,
  TIER_1 = 1,
  TIER_2 = 2,
  TIER_3 = 3,
}
export type GuildFeatures =
  | "ANIMATED_BANNER"
  | "ANIMATED_ICON"
  | "APPLICATION_COMMAND_PERMISSIONS_V2"
  | "AUTO_MODERATION"
  | "BANNER"
  | "COMMUNITY"
  | "CREATOR_MONETIZABLE_PROVISIONAL"
  | "CREATOR_STORE_PAGE"
  | "DEVELOPER_SUPPORT_SERVER"
  | "DISCOVERABLE"
  | "FEATURABLE"
  | "INVITES_DISABLED"
  | "INVITE_SPLASH"
  | "MEMBER_VERIFICATION_GATE_ENABLED"
  | "MORE_SOUNDBOARD"
  | "MORE_STICKERS"
  | "NEWS"
  | "PARTNERED"
  | "PREVIEW_ENABLED"
  | "RAID_ALERTS_DISABLED"
  | "ROLE_ICONS"
  | "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE"
  | "ROLE_SUBSCRIPTIONS_ENABLED"
  | "SOUNDBOARD"
  | "TICKETED_EVENTS_ENABLED"
  | "VANITY_URL"
  | "VERIFIED"
  | "VIP_REGIONS"
  | "WELCOME_SCREEN_ENABLED";
