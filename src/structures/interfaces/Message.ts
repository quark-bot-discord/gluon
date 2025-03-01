import { MESSAGE_FLAGS, TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ISO8601Timestamp,
  PermissionsBitfield,
  Snowflake,
  UnixMillisecondsTimestamp,
} from "src/interfaces/gluon.js";
import {
  MemberCacheJSON,
  MemberDiscordJSON,
  MemberRaw,
  MemberStorageJSON,
} from "./Member.js";
import {
  PollCacheJSON,
  PollDiscordJSON,
  PollRaw,
  PollStorageJSON,
  PollType,
} from "./Poll.js";
import { ReactionRaw, ReactionType } from "./Reaction.js";
import {
  UserCacheJSON,
  UserDiscordJSON,
  UserRaw,
  UserStorageJSON,
} from "./User.js";
import {
  AttachmentCacheJSON,
  AttachmentDiscordJSON,
  AttachmentRaw,
  AttachmentStorageJSON,
  AttachmentType,
} from "./Attachment.js";
import { ThreadRaw } from "./Thread.js";
import { InteractionTypes } from "./Interaction.js";
import { GuildRaw } from "./Guild.js";
import {
  StickerCacheJSON,
  StickerDiscordJSON,
  StickerRaw,
  StickerStorageJSON,
  StickerType,
  StickerItemRaw,
} from "./Sticker.js";
import { ResolvedData } from "./OptionSelect.js";
import {
  EmbedBuilderCacheJSON,
  EmbedBuilderDiscordJSON,
  EmbedBuilderStorageJSON,
  EmbedBuilderType,
  EmbedRaw,
} from "src/util/builder/interfaces/embedBuilder.js";
import { FileUploadType } from "src/util/builder/interfaces/fileUpload.js";
import { MessageComponentsType } from "src/util/builder/interfaces/messageComponents.js";
import {
  MessageReactionManagerCacheJSON,
  MessageReactionManagerDiscordJSON,
  MessageReactionManagerStorageJSON,
} from "src/managers/interfaces/MessageReactionManager.js";
import { AllChannelTypes } from "./Channel.js";

export interface MessageType {
  readonly id: Snowflake;
  readonly guildId: Snowflake | null;
  readonly channelId: Snowflake;
  readonly channel: AllChannelTypes;
  readonly author: UserCacheJSON;
  readonly member: MemberCacheJSON | null;
  readonly timestamp: UnixMillisecondsTimestamp;
  readonly editedTimestamp: UnixMillisecondsTimestamp | null;
  readonly mentionEveryone: boolean;
  // readonly mentions: Array<UserCacheJSON>;
  // readonly mentionRoles: Array<Snowflake>;
  // readonly mentionChannels: Array<MessageChannelMentionObject>;
  readonly attachments: Array<AttachmentType>;
  readonly content: string | null;
  readonly poll: PollType | null;
  readonly reactions: ReactionType[];
  readonly embeds: Array<EmbedBuilderType>;
  readonly reference: {
    messageId: Snowflake | null;
  };
  readonly flags: Array<keyof typeof MESSAGE_FLAGS>;
  readonly flagsRaw: number;
  readonly type: number;
  readonly webhookId: Snowflake | null;
  readonly stickerItems: Array<StickerType>;
  readonly messageSnapshots: Array<MessageType> | null;
  readonly url: string;
  readonly hashName: string;
  reply(options: {
    content?: string;
    embeds?: EmbedBuilderType[];
    components?: MessageComponentsType;
    files?: FileUploadType[];
    suppressMentions?: boolean;
  }): Promise<MessageType>;
  edit(options?: {
    components?: MessageComponentsType;
    files?: FileUploadType[];
    content?: string;
    embeds?: EmbedBuilderType[];
    attachments?: AttachmentType[];
  }): Promise<MessageType>;
  delete(options?: { reason?: string }): Promise<void>;
  encrypt(): string;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): MessageStorageJSON | MessageCacheJSON | MessageDiscordJSON;
}

export interface MessageStorageJSON {
  id: Snowflake;
  author: UserStorageJSON;
  member: MemberStorageJSON | null;
  content: string;
  _attributes: number;
  attachments: AttachmentStorageJSON[];
  embeds: EmbedBuilderStorageJSON[];
  edited_timestamp: UnixMillisecondsTimestamp | null;
  poll: PollStorageJSON | null;
  message_snapshots: Array<MessageStorageJSON> | null;
  type: MessageTypes;
  referenced_message: {
    id: Snowflake | null;
  };
  sticker_items: Array<StickerStorageJSON>;
  messageReactions: MessageReactionManagerStorageJSON;
}

export interface MessageCacheJSON {
  id: Snowflake;
  author: UserCacheJSON;
  member: MemberCacheJSON | null;
  content: string;
  _attributes: number;
  attachments: AttachmentCacheJSON[];
  embeds: EmbedBuilderCacheJSON[];
  edited_timestamp: UnixMillisecondsTimestamp | null;
  poll: PollCacheJSON | null;
  message_snapshots: Array<MessageCacheJSON> | null;
  type: MessageTypes;
  referenced_message: {
    id: Snowflake | null;
  };
  sticker_items: Array<StickerCacheJSON>;
  messageReactions: MessageReactionManagerCacheJSON;
}

export interface MessageDiscordJSON {
  id: Snowflake;
  channel_id: Snowflake;
  author: UserDiscordJSON;
  member: MemberDiscordJSON | null;
  content: string;
  pinned: boolean;
  attachments: AttachmentDiscordJSON[];
  embeds: EmbedBuilderDiscordJSON[];
  edited_timestamp: UnixMillisecondsTimestamp | null;
  poll: PollDiscordJSON | null;
  message_snapshots: Array<MessageDiscordJSON> | null;
  type: MessageTypes;
  referenced_message: {
    id: Snowflake | null;
  };
  sticker_items: Array<StickerDiscordJSON>;
  reactions: MessageReactionManagerDiscordJSON;
  mention_everyone: boolean;
  mention_roles: Array<string>;
  mentions: Array<string>;
}

export interface MessageRaw {
  id: Snowflake;
  channel_id: Snowflake;
  author: UserRaw;
  content: string;
  timestamp: ISO8601Timestamp;
  edited_timestamp: ISO8601Timestamp | null;
  tts: boolean;
  mention_everyone: boolean;
  mentions: UserRaw[];
  mention_roles: Array<Snowflake>;
  mention_channels: Array<MessageChannelMentionObject>;
  attachments: AttachmentRaw[];
  embeds: Array<EmbedRaw>;
  reactions?: ReactionRaw[];
  nonce?: number | string;
  pinned: boolean;
  webhook_id?: Snowflake;
  type: MessageTypes;
  activity?: MessageActivityObject;
  application?: ApplicationRaw; // partial application object
  application_id?: Snowflake;
  flags?: number;
  message_reference?: MessageRawReference;
  message_snapshots?: Array<MessageRaw>;
  referenced_message?: MessageRaw; // message object
  interaction_metadata?: MessageInteractionMetadataObject;
  interaction?: MessageInteractionStructure;
  thread?: ThreadRaw;
  sticker_items?: Array<StickerItemRaw>;
  stickers?: Array<StickerRaw>; // deprecated
  position?: number;
  role_subscription_data?: RoleSubscriptionDataRaw;
  resolved?: ResolvedData;
  poll?: PollRaw;
  call?: MessageCallRaw;
}

export interface RoleSubscriptionDataRaw {
  role_subscription_listing_id: Snowflake;
  tier_name: string;
  total_months_subscribed: number;
  is_renewal: boolean;
}

export interface MessageCallRaw {
  participants: Array<Snowflake>;
  ended_timestamp?: ISO8601Timestamp | null;
}

export enum MessageTypes {
  DEFAULT = 0,
  RECIPIENT_ADD = 1,
  RECIPIENT_REMOVE = 2,
  CALL = 3,
  CHANNEL_NAME_CHANGE = 4,
  CHANNEL_ICON_CHANGE = 5,
  CHANNEL_PINNED_MESSAGE = 6,
  USER_JOIN = 7,
  GUILD_BOOST = 8,
  GUILD_BOOST_TIER_1 = 9,
  GUILD_BOOST_TIER_2 = 10,
  GUILD_BOOST_TIER_3 = 11,
  CHANNEL_FOLLOW_ADD = 12,
  GUILD_DISCOVERY_DISQUALIFIED = 14,
  GUILD_DISCOVERY_REQUALIFIED = 15,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
  THREAD_CREATED = 18,
  REPLY = 19,
  CHAT_INPUT_COMMAND = 20,
  THREAD_STARTER_MESSAGE = 21,
  GUILD_INVITE_REMINDER = 22,
  CONTEXT_MENU_COMMAND = 23,
  AUTO_MODERATION_ACTION = 24,
  ROLE_SUBSCRIPTION_PURCHASE = 25,
  INTERACTION_PREMIUM_UPSELL = 26,
  STAGE_START = 27,
  STAGE_END = 28,
  STAGE_SPEAKER = 29,
  STAGE_TOPIC = 31,
  GUILD_APPLICATION_PREMIUM_SUBSCRIPTION = 32,
  GUILD_INCIDENT_ALERT_MODE_ENABLED = 36,
  GUILD_INCIDENT_ALERT_MODE_DISABLED = 37,
  GUILD_INCIDENT_REPORT_RAID = 38,
  GUILD_INCIDENT_REPORT_FALSE_ALARM = 39,
  PURCHASE_NOTIFICATION = 44,
  POLL_RESULT = 46,
}

export interface MessageChannelMentionObject {
  id: Snowflake;
  guild_id: Snowflake;
  type: number;
  name: string;
}

export interface MessageActivityObject {
  type: number;
  party_id?: string;
}

export interface MessageInteractionMetadataObject {
  id: Snowflake;
  type: InteractionTypes;
  user: UserRaw;
  authorizing_integration_owners: unknown;
  original_response_message_id?: Snowflake;
  target_user?: UserRaw;
  target_message_id?: Snowflake;
}

export interface MessageInteractionStructure {
  id: Snowflake;
  type: InteractionTypes;
  name: string;
  user: UserRaw;
  member?: MemberRaw;
}

export interface MessageRawReference {
  type?: MessageReferenceTypes;
  message_id?: Snowflake;
  channel_id?: Snowflake;
  guild_id?: Snowflake;
  fail_if_not_exists?: boolean;
}

export enum MessageReferenceTypes {
  DEFAULT = 0,
  FORWARD = 1,
}

export interface ApplicationRaw {
  id: Snowflake;
  name: string;
  icon: string | null;
  description: string;
  rpc_origins?: Array<string>;
  bot_public: boolean;
  bot_require_code_grant: boolean;
  bot?: UserRaw;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  owner?: UserRaw;
  verify_key: string;
  team: TeamRaw | null;
  guild_id?: Snowflake;
  guild?: GuildRaw;
  primary_sku_id?: Snowflake;
  slug?: string;
  cover_image?: string;
  flags?: number;
  approximate_guild_count?: number;
  approximate_user_install_count?: number;
  redirect_uris?: Array<string>;
  interactions_endpoint_url?: string | null;
  role_connections_verification_url?: string | null;
  event_webhooks_url?: string;
  event_webhooks_status: ApplicationEventWebhookStatus;
  event_webhooks_types?: Array<string>;
  tags?: Array<string>;
  install_params?: ApplicationInstallParams;
  integration_types_config?: unknown;
  custom_install_url?: string;
}

export interface ApplicationInstallParams {
  scopes: Array<OAuth2Scopes>;
  permissions: PermissionsBitfield;
}

export enum OAuth2Scopes {
  ACTIVITIES_READ = "activities.read",
  ACTIVITIES_WRITE = "activities.write",
  APPLICATIONS_BUILDS_READ = "applications.builds.read",
  APPLICATIONS_BUILDS_UPLOAD = "applications.builds.upload",
  APPLICATIONS_COMMANDS = "applications.commands",
  APPLICATIONS_COMMANDS_UPDATE = "applications.commands.update",
  APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE = "applications.commands.permissions.update",
  APPLICATIONS_ENTITLEMENTS = "applications.entitlements",
  APPLICATIONS_STORE_UPDATE = "applications.store.update",
  BOT = "bot",
  CONNECTIONS = "connections",
  DM_CHANNELS_READ = "dm.channels.read",
  EMAIL = "email",
  GDM_JOIN = "gdm.join",
  GUILD_JOIN = "guilds.join",
  GUILDS = "guilds",
  GUILDS_MEMBERS_READ = "guilds.members.read",
  IDENTIFY = "identify",
  MESSAGES_READ = "messages.read",
  RELATIONSHIPS_READ = "relationships.read",
  RPC = "rpc",
  ROLE_CONNECTIONS_WRITE = "role_connections.write",
  RPC_ACTIVITIES_READ = "rpc.activities.read",
  RPC_ACTIVITIES_WRITE = "rpc.activities.write",
  RPC_VOICE_READ = "rpc.voice.read",
  RPC_VOICE_WRITE = "rpc.voice.write",
  VOICE = "voice",
  WEBHOOK_INCOMING = "webhook.incoming",
}

export enum ApplicationEventWebhookStatus {
  DISABLED = 1,
  ENABLED = 2,
  DISABLED_BY_DISCORD = 3,
}

export interface TeamRaw {
  icon: string | null;
  id: Snowflake;
  members: TeamMemberRaw[];
  name: string;
  owner_user_id: Snowflake;
}

export interface TeamMemberRaw {
  membership_state: TeamMemberMembershipState;
  team_id: Snowflake;
  user: UserRaw;
  role: TeamMemberRoles;
}

export enum TeamMemberMembershipState {
  INVITED = 1,
  ACCEPTED = 2,
}

export enum TeamMemberRoles {
  ADMIN = "admin",
  DEVELOPER = "developer",
  READ_ONLY = "read_only",
}
