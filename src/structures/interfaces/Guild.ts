import { LOCALES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ISO8601Timestamp,
  PermissionsBitfield,
  Snowflake,
} from "src/interfaces/gluon.js";

export interface GuildType {
  readonly id: string;
  readonly name: string;
  readonly unavailable: boolean;
  readonly members: any;
  readonly channels: any;
  readonly roles: any;
  readonly emojis: any;
  readonly invites: any;
  readonly _originalIconHash: string | null;
  readonly premiumTier: GuildPremiumTier | null;
  readonly rawSystemChannelFlags: number;
  readonly premiumProgressBarEnabled: boolean;
  readonly rawDefaultMessageNotifications: GuildDefaultMessageNotificationLevels | null;
  readonly rawExplicitContentFilter: GuildExplicitContentFilterLevels | null;
  readonly rawVerificationLevel: GuildVerificationLevels | null;
  readonly rawNsfwLevel: GuildNsfwLevels | null;
  readonly rawMfaLevel: GuildMfaLevels | null;
  readonly systemChannelId: Snowflake | null;
  readonly rulesChannelId: Snowflake | null;
  readonly systemChannel: any;
  readonly rulesChannel: any;
  readonly preferredLocale: LOCALES;
  readonly premiumSubscriptionCount: number;
  readonly _cacheOptions: any;
  fetchAuditLogs(options?: any): Promise<any>;
  fetchInvites(): Promise<any>;
  fetchChannels(): Promise<any>;
  fetchBan(userId: Snowflake): Promise<any>;
  leave(): Promise<void>;
  calculateMessageCacheCount(): number;
  calculateMemberCacheCount(): number;
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
  joined_at: number;
  unavailable: boolean;
  member_count: number;
  premium_tier: GuildPremiumTier | null;
  preferred_locale: LOCALES;
  _cache_options: number;
  _attributes: number;
  system_channel_id: Snowflake | null;
  rules_channel_id: Snowflake | null;
  premium_subscription_count: number;
  members: any;
  channels: any;
  voice_states: any;
  roles: any;
  emojis: any;
  invites: any;
}

export interface GuildCacheJSON {
  id: Snowflake;
  name: string;
  icon: string | null;
  owner_id: Snowflake;
  joined_at: number;
  unavailable: boolean;
  member_count: number;
  premium_tier: GuildPremiumTier | null;
  preferred_locale: LOCALES;
  _cache_options: number;
  _attributes: number;
  system_channel_id: Snowflake | null;
  rules_channel_id: Snowflake | null;
  premium_subscription_count: number;
  members: any;
  channels: any;
  voice_states: any;
  roles: any;
  emojis: any;
  invites: any;
}

export interface GuildDiscordJSON {
  id: Snowflake;
  name: string;
  icon: string | null;
  owner_id: Snowflake;
  joined_at: string;
  premium_tier: GuildPremiumTier | null;
  unavailable: boolean;
  member_count: number;
  preferred_locale: string;
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
  members: any;
  channels: any;
  voice_states: any;
  roles: any;
  emojis: any;
  invites: any;
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
  roles: any[];
  emojis: any[];
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
  stickers: any;
  premium_progress_bar_enabled: boolean;
  safety_alerts_channel_id: Snowflake | null;
  incidents_data: GuildIncidentData[] | null;
}

export interface GuildRawGateway extends GuildRaw {
  joined_at: string;
  large: boolean;
  unavailable?: boolean;
  member_count: number;
  voice_states: any;
  members: any;
  channels: any;
  threads: any;
  presences: any;
  stage_instances: any;
  guild_scheduled_events: any;
  soundboard_sounds: any;
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
