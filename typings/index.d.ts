import util from "util";
import {
  APIApplicationCommandInteractionDataOption,
  APIAttachment,
  APIAuditLogChange,
  APIAuditLogEntry,
  APIBan,
  APIChatInputApplicationCommandGuildInteraction,
  APIChatInputApplicationCommandInteractionData,
  APIEmbed,
  APIEmbedAuthor,
  APIEmbedField,
  APIEmbedFooter,
  APIEmbedImage,
  APIEmbedThumbnail,
  APIEmbedVideo,
  APIEmoji,
  APIGuild,
  APIGuildChannel,
  APIGuildInteraction,
  APIGuildMember,
  APIGuildScheduledEvent,
  APIGuildStageVoiceChannel,
  APIGuildTextChannel,
  APIGuildVoiceChannel,
  APIInteractionDataResolvedGuildMember,
  APIInvite,
  APIMessage,
  APIMessageComponentButtonInteraction,
  APIMessageComponentSelectMenuInteraction,
  APIModalSubmitInteraction,
  APIOverwrite,
  APIPoll,
  APIPollAnswer,
  APIPollAnswerCount,
  APIPollMedia,
  APIReaction,
  APIRole,
  APIRoleTags,
  APISticker,
  APIThreadChannel,
  APIUser,
  APIVoiceState,
  ApplicationCommandType,
  AuditLogEvent,
  AuditLogOptionsType,
  ButtonStyle,
  ChannelType,
  ComponentType,
  GatewayChannelPinsUpdateDispatchData,
  GatewayEntitlementCreateDispatchData,
  GatewayEntitlementDeleteDispatchData,
  GatewayEntitlementUpdateDispatchData,
  GatewayGuildScheduledEventUserAddDispatchData,
  GatewayGuildScheduledEventUserRemoveDispatchData,
  GatewayMessageDeleteDispatchData,
  GatewayMessagePollVoteDispatchData,
  GatewayMessageReactionAddDispatchData,
  GatewayMessageReactionRemoveDispatchData,
  GatewayReceivePayload,
  GatewayWebhooksUpdateDispatchData,
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildPremiumTier,
  GuildScheduledEventEntityType,
  GuildScheduledEventStatus,
  GuildSystemChannelFlags,
  GuildVerificationLevel,
  Locale,
  MessageFlags,
  MessageType,
  ModalSubmitComponent,
  OverwriteType,
  PollLayoutType,
  StickerFormatType,
  Snowflake,
  TextInputStyle,
  APIMessageSnapshotFields,
  APIApplicationCommand,
} from "#typings/discord.js";
import { HttpMethods, HttpResponse } from "msw";
import {
  ISO8601Timestamp,
  PermissionsBitfield,
  UnixMillisecondsTimestamp,
  UnixTimestamp,
} from "#typings/gluon.ts";
import { TypedEmitter } from "tiny-typed-emitter";
import { Events, JsonTypes, WebsocketStates } from "./enums.ts";

export class Attachment {
  public constructor(
    client: Client,
    data:
      | APIAttachment
      | AttachmentCacheJSON
      | AttachmentDiscordJSON
      | AttachmentStorageJSON,
    { channelId }: { channelId: Snowflake },
  );
  public readonly id: Snowflake;
  public readonly name: string;
  public readonly size: number;
  public readonly url: string | null;
  public readonly channelId: string | null;
  fetchData(): Promise<ArrayBuffer>;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): AttachmentStorageJSON | AttachmentCacheJSON | AttachmentDiscordJSON;
}

export interface AttachmentStorageJSON {
  id: Snowflake;
  filename: string;
  size: number;
}

export interface AttachmentCacheJSON {
  id: Snowflake;
  filename: string;
  size: number;
  url: string | null;
}

export interface AttachmentDiscordJSON {
  id: Snowflake;
  filename: string;
  size: number;
  url: string | null;
}

export class AuditLog {
  constructor(
    client: Client,
    data:
      | APIAuditLogEntry
      | AuditLogCacheJSON
      | AuditLogStorageJSON
      | AuditLogDiscordJSON,
    { users, guildId }: { users?: APIUser[]; guildId: Snowflake },
  );
  public readonly id: Snowflake;
  public readonly guildId: Snowflake;
  public readonly actionType: AuditLogEvent;
  public readonly targetId: Snowflake | null;
  public readonly channelId: Snowflake | null;
  public readonly guild: Guild | null;
  public readonly channel: AllChannels | null;
  public readonly target: User | null;
  public readonly executorId: Snowflake | null;
  public readonly executor: User | null;
  public readonly reason: string | null;
  public readonly count?: number;
  public readonly deleteMemberDays?: number;
  public readonly membersRemoved?: number;
  public readonly specialId: Snowflake | null;
  public readonly specialType?: AuditLogOptionsType;
  public readonly status?: string;
  public readonly changes?: APIAuditLogChange[];
  toString(): string;
  toJSON(
    format?: JsonTypes,
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
    type?: AuditLogOptionsType;
    status?: string;
  };
  changes?: APIAuditLogChange[];
}

export type AuditLogCacheJSON = AuditLogStorageJSON;

export type AuditLogDiscordJSON = AuditLogStorageJSON;

export class ButtonClick extends Interaction {
  public constructor(
    client: Client,
    data: APIMessageComponentButtonInteraction,
    { guildId, channelId }: { guildId: Snowflake; channelId: Snowflake },
  );
  public readonly customId: string;
  public readonly message: Message;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): ButtonClickStorageJSON | ButtonClickCacheJSON | ButtonClickDiscordJSON;
}

export interface ButtonClickStorageJSON extends InteractionStorageJSON {
  data: {
    custom_id: string;
  };
  message: MessageStorageJSON;
}

export interface ButtonClickCacheJSON extends InteractionCacheJSON {
  data: {
    custom_id: string;
  };
  message: MessageCacheJSON;
}

export interface ButtonClickDiscordJSON extends InteractionDiscordJSON {
  data: {
    custom_id: string;
  };
  message: MessageDiscordJSON;
}

export class CategoryChannel {
  readonly nsfw: boolean;
  readonly mention: string;
  readonly name?: string;
  readonly type: ChannelType.GuildCategory;
  readonly id: Snowflake;
  readonly position?: number;
  readonly guildId: Snowflake;
  readonly permissionOverwrites: Array<PermissionOverwrite>;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ):
    | CategoryChannelCacheJSON
    | CategoryChannelDiscordJSON
    | CategoryChannelStorageJSON;
}

export interface CategoryChannelCacheJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name?: string;
  type: number;
  nsfw: boolean;
  permission_overwrites: PermissionOverwriteCacheJSON[];
  position?: number;
}

export interface CategoryChannelDiscordJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name?: string;
  type: number;
  nsfw: boolean;
  permission_overwrites: PermissionOverwriteDiscordJSON[];
  position?: number;
}

export interface CategoryChannelStorageJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name?: string;
  type: number;
  _attributes: number;
  permission_overwrites: PermissionOverwriteStorageJSON[];
  position?: number;
}

export class GuildChannel {
  public constructor(
    client: Client,
    data: APIGuildChannel,
    { guildId }: { guildId: Snowflake },
  );
  public readonly mention: string;
  public readonly nsfw: boolean;
  public readonly guild: Guild | null;
  public readonly parent: AllChannels | null;
  public readonly id: Snowflake;
  public readonly guildId: Snowflake;
  public readonly parentId: Snowflake | null;
  public readonly type: ChannelType;
  public readonly name: string;
  public readonly topic: string | null;
  public readonly permissionOverwrites: Array<PermissionOverwrite>;
  public readonly rateLimitPerUser?: number;
  public readonly position?: number;
  public readonly _cacheOptions: ChannelCacheOptions;
  public readonly messages: ChannelMessageManager;
  send(options: {
    content?: string;
    components?: MessageComponents;
    files?: FileUpload[];
    embeds?: EmbedBuilder[];
    suppressMentions?: boolean;
  }): Promise<Message>;
  checkPermission(member: Member): string;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): GuildChannelStorageJSON | GuildChannelCacheJSON | GuildChannelDiscordJSON;
}

export interface GuildChannelStorageJSON {
  id: Snowflake;
  type: ChannelType;
  name: string;
  topic?: string;
  rate_limit_per_user?: number;
  position?: number;
  parent_id?: Snowflake | null;
  _attributes: number;
  _cache_options: number;
  messages: MessageStorageJSON[];
  permission_overwrites: PermissionOverwriteStorageJSON[];
}

export interface GuildChannelCacheJSON {
  id: Snowflake;
  type: ChannelType;
  name: string;
  topic?: string;
  rate_limit_per_user?: number;
  position?: number;
  parent_id?: Snowflake | null;
  _attributes: number;
  _cache_options: number;
  messages: MessageCacheJSON[];
  permission_overwrites: PermissionOverwriteCacheJSON[];
}

export interface GuildChannelDiscordJSON {
  id: Snowflake;
  type: ChannelType;
  name: string;
  topic?: string;
  rate_limit_per_user?: number;
  position?: number;
  parent_id?: Snowflake | null;
  nsfw: boolean;
  messages: MessageDiscordJSON[];
  permission_overwrites: PermissionOverwriteDiscordJSON[];
}

export class Emoji {
  constructor(
    client: Client,
    data: APIEmoji | EmojiCacheJSON | EmojiStorageJSON | EmojiDiscordJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
  public readonly requireColons: boolean;
  public readonly managed: boolean;
  public readonly animated: boolean;
  public readonly available: boolean;
  public readonly mention: string;
  public readonly url: string | null;
  public readonly guildId: Snowflake;
  public readonly guild: Guild | null;
  public readonly id: Snowflake | null;
  public readonly name: string | null;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): EmojiCacheJSON | EmojiStorageJSON | EmojiDiscordJSON;
}

export interface EmojiStorageJSON {
  id: Snowflake | null;
  name: string | null;
  _attributes: number;
}

export interface EmojiCacheJSON {
  id: Snowflake | null;
  name: string | null;
  _attributes: number;
}

export interface EmojiDiscordJSON {
  id: Snowflake | null;
  name: string | null;
  animated: boolean;
  managed: boolean;
  require_colons: boolean;
  available: boolean;
}

export class Guild {
  constructor(
    client: Client,
    data: APIGuild | GuildCacheJSON | GuildStorageJSON | GuildDiscordJSON,
    { nocache }: { nocache?: boolean },
  );
  public readonly id: Snowflake;
  public readonly name: string;
  public readonly description: string | null;
  public readonly unavailable: boolean;
  public readonly members: GuildMemberManager;
  public readonly channels: GuildChannelsManager;
  public readonly roles: GuildRoleManager;
  public readonly emojis: GuildEmojisManager;
  public readonly invites: GuildInviteManager;
  public readonly scheduledEvents: GuildScheduledEventManager;
  public readonly voiceStates: GuildVoiceStatesManager;
  public readonly auditLogs: GuildAuditLogManager;
  public readonly _originalIconHash: string | null;
  public readonly memberCount: number;
  public readonly ownerId: Snowflake;
  public readonly joinedAt?: UnixTimestamp;
  public readonly mfaLevel: GuildMFALevel;
  public readonly verificationLevel: GuildVerificationLevel;
  public readonly defaultMessageNotifications: GuildDefaultMessageNotifications;
  public readonly explicitContentFilter: GuildExplicitContentFilter;
  public readonly nsfwLevel: GuildNSFWLevel;
  public readonly premiumTier: GuildPremiumTier;
  public readonly systemChannelFlags: GuildSystemChannelFlags;
  public readonly premiumProgressBarEnabled: boolean;
  public readonly systemChannelId: Snowflake | null;
  public readonly rulesChannelId: Snowflake | null;
  public readonly systemChannel: TextChannel | null;
  public readonly rulesChannel: TextChannel | null;
  public readonly preferredLocale: Locale;
  public readonly premiumSubscriptionCount: number;
  public readonly displayIconURL: string | null;
  public readonly _cacheOptions: GuildCacheOptions;
  fetchAuditLogs({
    limit,
    type,
    user_id,
    before,
    after,
  }: {
    limit?: number;
    type?: AuditLogEvent;
    user_id?: Snowflake;
    before?: Snowflake;
    after?: Snowflake;
  }): Promise<AuditLog[]>;
  fetchInvites(): Promise<APIInvite[]>;
  fetchChannels(): Promise<AnyChannelType[]>;
  fetchBan(userId: Snowflake): Promise<APIBan>;
  leave(): Promise<void>;
  calculateMessageCacheCount(): number;
  calculateMemberCacheCount(): number;
  me(): Promise<Member>;
  ban(
    user_id: Snowflake,
    { reason, seconds }: { reason?: string; seconds?: number } = {},
  ): Promise<void>;
  unban(
    user_id: Snowflake,
    { reason }: { reason?: string } = {},
  ): Promise<void>;
  kick(user_id: Snowflake, { reason }: { reason?: string } = {}): Promise<void>;
  removeMemberRole(
    user_id: Snowflake,
    role_id: Snowflake,
    { reason }: { reason?: string } = {},
  ): Promise<void>;
  _intervalCallback(): void;
  _incrementMemberCount(): void;
  _decrementMemberCount(): void;
  toString(): string;
  toJSON(
    format?: JsonTypes,
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
  preferred_locale: Locale;
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
  audit_logs: AuditLogStorageJSON[];
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
  preferred_locale: Locale;
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
  audit_logs: AuditLogCacheJSON[];
}

export interface GuildDiscordJSON {
  id: Snowflake;
  name: string;
  icon: string | null;
  owner_id: Snowflake;
  joined_at?: ISO8601Timestamp;
  premium_tier: GuildPremiumTier;
  unavailable: boolean;
  member_count: number;
  preferred_locale: Locale;
  system_channel_flags: number;
  system_channel_id: Snowflake | null;
  rules_channel_id: Snowflake | null;
  premium_subscription_count: number;
  premium_progress_bar_enabled: boolean;
  default_message_notifications: GuildDefaultMessageNotifications | null;
  explicit_content_filter: GuildExplicitContentFilter | null;
  verification_level: GuildVerificationLevel | null;
  nsfw_level: GuildNSFWLevel | null;
  mfa_level: GuildMFALevel | null;
  members: MemberDiscordJSON[];
  channels: ChannelDiscordJSON[];
  voice_states: VoiceStateDiscordJSON[];
  roles: RoleDiscordJSON[];
  emojis: EmojiDiscordJSON[];
  invites: InviteDiscordJSON[];
  audit_logs: AuditLogDiscordJSON[];
}

export class Interaction {
  constructor(
    client: Client,
    data:
      | APIGuildInteraction
      | InteractionCacheJSON
      | InteractionDiscordJSON
      | InteractionStorageJSON,
    { guildId, nocache }: { guildId: Snowflake; nocache?: boolean },
  );
  public readonly id: Snowflake;
  public readonly token: string;
  public readonly type: InteractionTypes;
  public readonly guildId: Snowflake;
  public readonly guild: Guild;
  public readonly channelId: Snowflake;
  public readonly channel: AllChannelTypes;
  public readonly member?: MemberType | null;
  public readonly memberId?: Snowflake;
  textPrompt({
    title,
    customId,
    textInputModal,
  }: {
    title: string;
    customId: string;
    textInputModal: TextInputBuilderType;
  }): Promise<void>;
  autocompleteResponse(options: {
    choices: CommandChoiceBuilderType[];
  }): Promise<void>;
  reply(options: {
    content?: string;
    files?: FileUploadType[];
    embeds?: EmbedBuilderType[];
    components?: MessageComponentsType;
    quiet?: boolean;
  }): Promise<InteractionType>;
  acknowledge(): Promise<InteractionType>;
  delete(): Promise<InteractionType>;
  edit(options: {
    content?: string;
    files?: FileUploadType[];
    embeds?: EmbedBuilderType[];
    components?: MessageComponentsType;
  }): Promise<InteractionType>;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): InteractionStorageJSON | InteractionCacheJSON | InteractionDiscordJSON;
}

export interface InteractionStorageJSON {
  id: Snowflake;
  type: number;
  guild_id: Snowflake;
  channel_id: Snowflake;
  member: MemberStorageJSON | null;
}

export interface InteractionCacheJSON {
  id: Snowflake;
  type: number;
  guild_id: Snowflake;
  channel_id: Snowflake;
  member: MemberCacheJSON | null;
}

export interface InteractionDiscordJSON {
  id: Snowflake;
  type: number;
  guild_id: Snowflake;
  channel_id: Snowflake;
  member: MemberDiscordJSON | null;
}

export class Invite {
  constructor(
    client: Client,
    data: APIInvite | InviteCacheJSON | InviteDiscordJSON | InviteStorageJSON,
    { guildId, nocache }: { guildId: Snowflake; nocache?: boolean },
  );
  public readonly channelId: Snowflake | null;
  public readonly channel: AllChannels | null;
  public readonly id: Snowflake;
  public readonly code: string;
  public readonly guildId: Snowflake;
  public readonly guild: Guild | null;
  public readonly uses?: number;
  public readonly expires?: UnixTimestamp;
  public readonly inviter?: User;
  public readonly inviterId: Snowflake;
  public readonly url: string;
  public readonly maxUses?: number;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): InviteStorageJSON | InviteCacheJSON | InviteDiscordJSON;
}

export interface InviteStorageJSON {
  code: string;
  channel: ChannelStorageJSON | null;
  inviter?: UserStorageJSON;
  uses?: number;
  expires: UnixMillisecondsTimestamp | undefined;
  max_uses?: number;
}

export interface InviteCacheJSON {
  code: string;
  channel: ChannelCacheJSON | null;
  inviter?: UserCacheJSON;
  uses?: number;
  expires: UnixMillisecondsTimestamp | undefined;
  max_uses?: number;
}

export interface InviteDiscordJSON {
  code: string;
  channel: ChannelDiscordJSON | null;
  inviter?: UserDiscordJSON;
  uses?: number;
  expires_at: ISO8601Timestamp | undefined;
  max_uses?: number;
}

export class Member {
  constructor(
    client: Client,
    data:
      | APIGuildMember
      | APIInteractionDataResolvedGuildMember
      | MemberCacheJSON
      | MemberStorageJSON
      | MemberDiscordJSON,
    {
      guildId,
      userId,
      user,
      nocache,
    }: {
      guildId: Snowflake;
      userId: Snowflake;
      user?: User;
      nocache?: boolean;
    },
  );
  public readonly id: Snowflake;
  public readonly guildId: Snowflake;
  public readonly guild: Guild;
  public readonly nick: string | null;
  public readonly joinedAt?: UnixTimestamp;
  public readonly timeoutUntil: UnixTimestamp | null;
  public readonly flags: number;
  public readonly roles: Role[] | null;
  public readonly highestRolePosition: number;
  public readonly permissions: PermissionsBitfield | null;
  public readonly rejoined: boolean;
  public readonly user: User;
  public readonly _originalAvatarHash: string | null;
  public readonly displayAvatarURL: string | null;
  public readonly displayAvatarURLNoFallback: string | null;
  public readonly pending: boolean;
  public readonly avatarIsAnimated: boolean;
  public readonly mention: string;
  public readonly hashName: string;
  addRole(role_id: Snowflake, { reason }: { reason?: string }): Promise<void>;
  removeRole(
    role_id: Snowflake,
    { reason }: { reason?: string },
  ): Promise<void>;
  timeoutAdd(
    timeout_until: UnixTimestamp,
    { reason }: { reason?: string },
  ): Promise<void>;
  timeoutRemove({ reason }: { reason?: string }): Promise<void>;
  massUpdateRoles(
    roles: string[],
    { reason }: { reason?: string },
  ): Promise<void>;
  addRole(roleId: Snowflake, { reason }: { reason?: string }): Promise<void>;
  removeRole(roleId: Snowflake, { reason }: { reason?: string }): Promise<void>;
  encrypt(): string;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): MemberStorageJSON | MemberCacheJSON | MemberDiscordJSON;
}

export interface MemberStorageJSON {
  user?: UserStorageJSON;
  nick: string | null;
  joined_at?: UnixMillisecondsTimestamp;
  avatar: string | null;
  permissions: PermissionsBitfield;
  roles?: Snowflake[];
  communication_disabled_until?: UnixMillisecondsTimestamp;
  flags: number;
  _attributes: number;
}

export interface MemberCacheJSON {
  user?: UserCacheJSON;
  nick: string | null;
  joined_at?: UnixMillisecondsTimestamp;
  avatar: string | null;
  permissions: PermissionsBitfield;
  roles?: Snowflake[];
  communication_disabled_until?: UnixMillisecondsTimestamp;
  flags: number;
  _attributes: number;
}

export interface MemberDiscordJSON {
  user?: UserDiscordJSON;
  nick: string | null;
  joined_at?: ISO8601Timestamp;
  avatar: string | null;
  permissions: PermissionsBitfield;
  roles?: Snowflake[];
  communication_disabled_until?: UnixMillisecondsTimestamp;
  flags: number;
  pending: boolean;
}

export class Message {
  constructor(
    client: Client,
    data:
      | APIMessage
      | MessageCacheJSON
      | MessageDiscordJSON
      | MessageStorageJSON,
    {
      channelId,
      guildId,
      nocache = false,
      ignoreExisting = false,
    }: {
      channelId: Snowflake;
      guildId: Snowflake;
      nocache?: boolean;
      ignoreExisting?: boolean;
    },
  );
  readonly id: Snowflake;
  readonly guildId: Snowflake;
  readonly guild: Guild;
  readonly channelId: Snowflake;
  readonly channel: TextChannel | VoiceChannel | Thread;
  readonly author: User;
  readonly authorId: Snowflake;
  readonly member: Member | null;
  readonly timestamp: UnixTimestamp;
  readonly editedTimestamp: UnixTimestamp | null;
  readonly mentionEveryone: boolean;
  readonly mentions: boolean;
  readonly mentionRoles: boolean;
  readonly pinned: boolean;
  readonly mirrored: boolean;
  readonly attachments: Array<Attachment>;
  readonly content: string | null;
  readonly poll: PollType | null;
  readonly reactions: MessageReactionManager;
  readonly embeds: Array<Embed>;
  readonly reference: {
    messageId: Snowflake | null;
  };
  readonly flags: MessageFlags;
  readonly type: MessageType;
  readonly webhookId: Snowflake | null;
  readonly stickerItems: Array<Sticker>;
  readonly messageSnapshots: Array<MessageSnapshot> | null;
  readonly url: string;
  readonly hashName: string;
  reply(options: {
    content?: string;
    embeds?: Embed[];
    components?: MessageComponents;
    files?: FileUpload[];
    suppressMentions?: boolean;
  }): Promise<Message>;
  edit(options: {
    components?: MessageComponents;
    files?: FileUpload[];
    content?: string;
    embeds?: Embed[];
    attachments?: Attachment[];
  }): Promise<Message>;
  delete(options?: { reason?: string }): Promise<void>;
  encrypt(): string;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): MessageStorageJSON | MessageCacheJSON | MessageDiscordJSON;
}

export interface MessageStorageJSON {
  id: Snowflake;
  author: UserStorageJSON;
  member: MemberStorageJSON | null;
  content: string | null;
  _attributes: number;
  attachments: AttachmentStorageJSON[];
  embeds: EmbedStorageJSON[];
  edited_timestamp: UnixMillisecondsTimestamp | null;
  poll: PollStorageJSON | null;
  message_snapshots: Array<MessageSnapshotStorageJSON> | null;
  type: MessageType;
  referenced_message?: {
    id: Snowflake | null;
  };
  sticker_items: Array<StickerStorageJSON>;
  messageReactions: MessageReactionManagerStorageJSON;
}

export interface MessageCacheJSON {
  id: Snowflake;
  author: UserCacheJSON;
  member: MemberCacheJSON | null;
  content: string | null;
  _attributes: number;
  attachments: AttachmentCacheJSON[];
  embeds: EmbedCacheJSON[];
  edited_timestamp: UnixMillisecondsTimestamp | null;
  poll: PollCacheJSON | null;
  message_snapshots: Array<MessageSnapshotCacheJSON> | null;
  type: MessageType;
  referenced_message?: {
    id: Snowflake | null;
  };
  sticker_items: Array<StickerCacheJSON>;
  messageReactions: MessageReactionManagerCacheJSON;
  mirrored?: boolean;
}

export interface MessageDiscordJSON {
  id: Snowflake;
  channel_id: Snowflake;
  author: UserDiscordJSON;
  member: MemberDiscordJSON | null;
  content: string | null;
  pinned: boolean;
  attachments: AttachmentDiscordJSON[];
  embeds: EmbedDiscordJSON[];
  edited_timestamp: UnixMillisecondsTimestamp | null;
  poll: PollDiscordJSON | null;
  message_snapshots: Array<MessageSnapshotDiscordJSON> | null;
  type: MessageType;
  referenced_message?: {
    id: Snowflake | null;
  };
  sticker_items: Array<StickerDiscordJSON>;
  reactions: MessageReactionManagerDiscordJSON;
  mention_everyone: boolean;
  mention_roles: Array<string>;
  mentions: Array<string>;
}

export class MessageSnapshot {
  constructor(
    client: Client,
    data:
      | APIMessageSnapshotFields
      | MessageSnapshotCacheJSON
      | MessageSnapshotStorageJSON
      | MessageSnapshotDiscordJSON,
    { channelId }: { channelId: Snowflake },
  );
  public readonly content: string | null;
  public readonly embeds: Embed[];
  public readonly attachments: Attachment[];
  public readonly timestamp: UnixTimestamp;
  public readonly editedTimestamp: UnixTimestamp | null;
  public readonly flags?: MessageFlags;
  toJSON(
    format?: JsonTypes,
  ):
    | MessageSnapshotCacheJSON
    | MessageSnapshotStorageJSON
    | MessageSnapshotDiscordJSON;
}

export interface MessageSnapshotCacheJSON {
  content: string | null;
  embeds: EmbedCacheJSON[];
  attachments: AttachmentCacheJSON[];
  timestamp: UnixMillisecondsTimestamp;
  edited_timestamp: UnixMillisecondsTimestamp | null;
  flags?: number;
}

export interface MessageSnapshotStorageJSON {
  content: string | null;
  embeds: EmbedCacheJSON[];
  attachments: AttachmentStorageJSON[];
  timestamp: UnixMillisecondsTimestamp;
  edited_timestamp: UnixMillisecondsTimestamp | null;
  flags?: number;
}

export interface MessageSnapshotDiscordJSON {
  content: string | null;
  embeds: EmbedCacheJSON[];
  attachments: AttachmentDiscordJSON[];
  timestamp: ISO8601Timestamp;
  edited_timestamp: ISO8601Timestamp | null;
  flags?: number;
}

export class ModalResponse extends Interaction {
  constructor(client: Client, data: APIModalSubmitInteraction);
  public readonly customId: string;
  public readonly values: Array<ModalSubmitComponent>;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ):
    | ModalResponseStorageJSON
    | ModalResponseCacheJSON
    | ModalResponseDiscordJSON;
}

export interface ModalResponseStorageJSON extends InteractionStorageJSON {
  values: Array<ModalSubmitComponent>;
  custom_id: string;
}

export interface ModalResponseCacheJSON extends InteractionCacheJSON {
  values: Array<ModalSubmitComponent>;
  custom_id: string;
}

export interface ModalResponseDiscordJSON extends InteractionDiscordJSON {
  data: {
    custom_id: string;
    components: Array<{
      components: Array<ModalSubmitComponent>;
    }>;
  };
}

export class OptionSelect extends Interaction {
  constructor(
    client: Client,
    data: APIMessageComponentSelectMenuInteraction,
    { channelId, guildId }: { channelId: Snowflake; guildId: Snowflake },
  );
  readonly customId: string;
  readonly message: Message;
  readonly values: string[];
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): OptionSelectStorageJSON | OptionSelectCacheJSON | OptionSelectDiscordJSON;
}

export interface OptionSelectStorageJSON extends InteractionStorageJSON {
  custom_id: string;
  values: Array<string>;
  message: MessageStorageJSON;
}

export interface OptionSelectCacheJSON extends InteractionCacheJSON {
  custom_id: string;
  values: Array<string>;
  message: MessageCacheJSON;
}

export interface OptionSelectDiscordJSON extends InteractionDiscordJSON {
  data: {
    custom_id: string;
    values: Array<string>;
  };
  message: MessageDiscordJSON;
}

export class PermissionOverwrite {
  constructor(client: Client, data: APIOverwrite);
  public readonly allow: string;
  public readonly deny: string;
  public readonly id: string;
  public readonly type: OverwriteType;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ):
    | PermissionOverwriteStorageJSON
    | PermissionOverwriteCacheJSON
    | PermissionOverwriteDiscordJSON;
}

export interface PermissionOverwriteStorageJSON {
  id: Snowflake;
  type: OverwriteType;
  allow: PermissionsBitfield;
  deny: PermissionsBitfield;
}

export interface PermissionOverwriteCacheJSON {
  id: Snowflake;
  type: OverwriteType;
  allow: PermissionsBitfield;
  deny: PermissionsBitfield;
}

export interface PermissionOverwriteDiscordJSON {
  id: Snowflake;
  type: OverwriteType;
  allow: PermissionsBitfield;
  deny: PermissionsBitfield;
}

export class Poll {
  constructor(
    client: Client,
    data: APIPoll | PollCacheJSON | PollDiscordJSON | PollStorageJSON,
    { guildId }: { guildId: Snowflake },
  );
  readonly guildId: Snowflake;
  readonly guild: Guild | null;
  readonly question: string;
  readonly answers: PollAnswer[];
  readonly expiry: UnixTimestamp | null;
  readonly allowMultiselect: boolean;
  readonly layoutType: PollLayoutType;
  readonly _results: MessagePollManager;
  toString(): string;
  toJSON(format?: JsonTypes): PollCacheJSON | PollDiscordJSON | PollStorageJSON;
}

export interface PollCacheJSON {
  question: APIPollMedia;
  answers: APIPollAnswer[];
  expiry: UnixMillisecondsTimestamp | null;
  allow_multiselect: boolean;
  layout_type: PollLayoutType;
  _results: MessagePollManagerCacheJSON;
}

export interface PollDiscordJSON {
  question: APIPollMedia;
  answers: APIPollAnswer[];
  expiry: ISO8601Timestamp | null;
  allow_multiselect: boolean;
  layout_type: PollLayoutType;
  results: MessagePollManagerDiscordJSON;
}

export interface PollStorageJSON {
  question: APIPollMedia;
  answers: APIPollAnswer[];
  expiry: UnixTimestamp | null;
  allow_multiselect: boolean;
  layout_type: PollLayoutType;
  _results: MessagePollManagerStorageJSON;
}

export class Reaction {
  constructor(
    client: Client,
    data:
      | APIReaction
      | ReactionStorageJSON
      | ReactionCacheJSON
      | ReactionDiscordJSON
      | GatewayMessageReactionAddDispatchData,
    { guildId }: { guildId: Snowflake },
  );
  public readonly count: number;
  public readonly reacted: (Member | Snowflake)[];
  public readonly reactedIds: Snowflake[];
  public readonly guildId: Snowflake;
  public readonly guild: Guild | null;
  public readonly emoji?: Emoji;
  public readonly initialReactor: Snowflake | null;
  _addReactor(userId: Snowflake): void;
  _removeReactor(userId: Snowflake): void;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): ReactionStorageJSON | ReactionCacheJSON | ReactionDiscordJSON;
}

export interface ReactionStorageJSON {
  emoji: EmojiStorageJSON;
  _reacted: Snowflake[];
  initial_reactor?: Snowflake;
}

export interface ReactionCacheJSON {
  emoji: EmojiCacheJSON;
  _reacted: Snowflake[];
  initial_reactor?: Snowflake;
}

export interface ReactionDiscordJSON {
  emoji: EmojiDiscordJSON;
  count: number;
}

export class Role {
  constructor(
    client: Client,
    data: APIRole | RoleCacheJSON | RoleDiscordJSON | RoleStorageJSON,
    { guildId, nocache }: { guildId: Snowflake; nocache?: boolean },
  );
  readonly id: Snowflake;
  readonly hoist: boolean;
  readonly managed: boolean;
  readonly mentionable: boolean;
  readonly _originalIconHash: string | null;
  readonly displayIconURL: string | null;
  readonly guild: Guild | null;
  readonly guildId: Snowflake;
  readonly name: string;
  readonly color: number;
  readonly position: number;
  readonly permissions: PermissionsBitfield;
  readonly tags?: APIRoleTags;
  readonly mention: string;
  toString(): string;
  toJSON(format?: JsonTypes): RoleStorageJSON | RoleCacheJSON | RoleDiscordJSON;
}

export interface RoleStorageJSON {
  id: Snowflake;
  name: string;
  color: number;
  position: number;
  permissions: PermissionsBitfield;
  icon: string | null;
  _attributes: number;
  tags?: APIRoleTags;
}

export interface RoleCacheJSON {
  id: Snowflake;
  name: string;
  color: number;
  position: number;
  permissions: PermissionsBitfield;
  icon: string | null;
  _attributes: number;
  tags?: APIRoleTags;
}

export interface RoleDiscordJSON {
  id: Snowflake;
  name: string;
  color: number;
  position: number;
  permissions: PermissionsBitfield;
  icon: string | null;
  tags?: APIRoleTags;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
}

export class ScheduledEvent {
  constructor(
    client: Client,
    data:
      | APIGuildScheduledEvent
      | ScheduledEventCacheJSON
      | ScheduledEventDiscordJSON
      | ScheduledEventStorageJSON,
    { guildId, nocache }: { guildId: Snowflake; nocache?: boolean },
  );
  readonly id: Snowflake;
  readonly guildId: Snowflake;
  readonly name: string;
  readonly creatorId: Snowflake | null;
  readonly creator: User | null;
  readonly description: string | null;
  readonly _originalImageHash: string | null;
  readonly displayImageURL: string | null;
  readonly entityType: GuildScheduledEventEntityType;
  readonly status: GuildScheduledEventStatus;
  readonly guild: Guild | null;
  readonly scheduledStartTime: UnixTimestamp;
  readonly scheduledEndTime: UnixTimestamp | null;
  readonly userCount: number;
  readonly location: string | null;
  _incrementUserCount(): void;
  _decrementUserCount(): void;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ):
    | ScheduledEventCacheJSON
    | ScheduledEventStorageJSON
    | ScheduledEventDiscordJSON;
}

export interface ScheduledEventStorageJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  description?: string;
  creator_id?: Snowflake;
  creator: UserStorageJSON | null;
  scheduled_start_time: UnixMillisecondsTimestamp;
  scheduled_end_time: UnixMillisecondsTimestamp | null;
  image: string | null;
  user_count: number;
  entity_type: GuildScheduledEventEntityType;
  status: GuildScheduledEventStatus;
  entity_metadata: {
    location: string | null;
  };
}

export interface ScheduledEventCacheJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  description?: string;
  creator_id?: Snowflake;
  creator: UserCacheJSON | null;
  scheduled_start_time: UnixMillisecondsTimestamp;
  scheduled_end_time: UnixMillisecondsTimestamp | null;
  image: string | null;
  user_count: number;
  entity_type: GuildScheduledEventEntityType;
  status: GuildScheduledEventStatus;
  entity_metadata: {
    location: string | null;
  };
}

export interface ScheduledEventDiscordJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  description?: string;
  creator_id?: Snowflake;
  creator: UserDiscordJSON | null;
  scheduled_start_time: ISO8601Timestamp;
  scheduled_end_time: ISO8601Timestamp | null;
  image: string | null;
  user_count: number;
  entity_type: GuildScheduledEventEntityType;
  status: GuildScheduledEventStatus;
  entity_metadata: {
    location: string | null;
  };
}

export class SlashCommand extends Interaction {
  constructor(
    client: Client,
    data: APIChatInputApplicationCommandGuildInteraction,
  );
  readonly data: APIChatInputApplicationCommandInteractionData;
  readonly options: APIApplicationCommandInteractionDataOption[];
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): SlashCommandStorageJSON | SlashCommandCacheJSON | SlashCommandDiscordJSON;
}

export interface SlashCommandStorageJSON extends InteractionStorageJSON {
  id: Snowflake;
  data: APIChatInputApplicationCommandInteractionData;
}

export interface SlashCommandCacheJSON extends InteractionCacheJSON {
  id: Snowflake;
  data: APIChatInputApplicationCommandInteractionData;
}

export interface SlashCommandDiscordJSON extends InteractionDiscordJSON {
  id: Snowflake;
  data: APIChatInputApplicationCommandInteractionData;
}

export class Sticker {
  constructor(
    client: Client,
    data:
      | APISticker
      | StickerCacheJSON
      | StickerDiscordJSON
      | StickerStorageJSON,
  );
  readonly id: Snowflake;
  readonly name: string;
  readonly format: StickerFormatType;
  readonly previewImageURL: string | null;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): StickerCacheJSON | StickerStorageJSON | StickerDiscordJSON;
}

export interface StickerCacheJSON {
  id: Snowflake;
  name: string;
  format_type: StickerFormatType;
}

export interface StickerStorageJSON {
  id: Snowflake;
  name: string;
  format_type: StickerFormatType;
}

export interface StickerDiscordJSON {
  id: Snowflake;
  name: string;
  format_type: StickerFormatType;
}

export class TextChannel extends GuildChannel {
  constructor(
    client: Client,
    data: APIGuildTextChannel,
    { guildId, nocache }: { guildId: Snowflake; nocache?: boolean },
  );
  bulkDelete(
    messages: Snowflake[],
    { reason }: { reason?: string },
  ): Promise<void>;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): TextChannelCacheJSON | TextChannelDiscordJSON | TextChannelStorageJSON;
}

export type TextChannelCacheJSON = GuildChannelCacheJSON;

export type TextChannelDiscordJSON = GuildChannelDiscordJSON;

export type TextChannelStorageJSON = GuildChannelStorageJSON;

export class Thread extends GuildChannel {
  constructor(
    client: Client,
    data: APIThreadChannel,
    { guildId, nocache }: { guildId: Snowflake; nocache?: boolean },
  );
  readonly owner: Member | null;
  readonly parent: TextChannel | VoiceChannel | null;
  readonly ownerId: Snowflake;
  readonly parentId: Snowflake;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): ThreadCacheJSON | ThreadDiscordJSON | ThreadStorageJSON;
}

export interface ThreadStorageJSON extends GuildChannelStorageJSON {
  owner_id: Snowflake;
  parent_id: Snowflake;
}

export interface ThreadCacheJSON extends GuildChannelCacheJSON {
  owner_id: Snowflake;
  parent_id: Snowflake;
}

export interface ThreadDiscordJSON extends GuildChannelDiscordJSON {
  owner_id: Snowflake;
  parent_id: Snowflake;
}

export class User {
  constructor(
    client: Client,
    data: APIUser | UserCacheJSON | UserStorageJSON | UserDiscordJSON,
    { nocache }: { nocache?: boolean },
  );
  readonly id: Snowflake;
  readonly username: string;
  readonly globalName: string | null;
  readonly discriminator: string | null;
  readonly _cached: UnixTimestamp;
  readonly mention: string;
  readonly _originalAvatarHash: string | null;
  readonly displayAvatarURL: string;
  readonly tag: string;
  readonly createdTimestamp: UnixTimestamp;
  readonly bot: boolean;
  readonly avatarIsAnimated: boolean;
  readonly hasAvatar: boolean;
  readonly toString: () => string;
  readonly overrideAvatarURL: (url: string) => void;
  readonly toJSON: (
    format?: JsonTypes,
  ) => UserStorageJSON | UserCacheJSON | UserDiscordJSON;
}

export interface UserStorageJSON {
  id: Snowflake;
  avatar: string | null;
  _cached: UnixTimestamp;
  bot: boolean;
  username: string;
  global_name: string | null;
  discriminator?: number;
}

export interface UserCacheJSON {
  id: Snowflake;
  avatar: string | null;
  _cached: UnixTimestamp;
  bot: boolean;
  username: string;
  global_name: string | null;
  discriminator?: number;
}

export interface UserDiscordJSON {
  id: Snowflake;
  avatar: string | null;
  bot: boolean;
  username: string;
  global_name: string | null;
  discriminator: string | null;
}

export class VoiceChannel extends GuildChannel {
  constructor(
    client: Client,
    data:
      | APIGuildVoiceChannel
      | APIGuildStageVoiceChannel
      | VoiceChannelCacheJSON
      | VoiceChannelDiscordJSON
      | VoiceChannelStorageJSON,
    { guildId, nocache }: { guildId: Snowflake; nocache?: boolean },
  );
  readonly bitrate?: number;
  readonly userLimit?: number;
  readonly rtcRegion?: string;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): VoiceChannelCacheJSON | VoiceChannelDiscordJSON | VoiceChannelStorageJSON;
}

export interface VoiceChannelCacheJSON extends GuildChannelCacheJSON {
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string;
}

export interface VoiceChannelDiscordJSON extends GuildChannelDiscordJSON {
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string;
}

export interface VoiceChannelStorageJSON extends GuildChannelStorageJSON {
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string;
}

export class VoiceState {
  constructor(
    client: Client,
    data:
      | APIVoiceState
      | VoiceStateCacheJSON
      | VoiceStateDiscordJSON
      | VoiceStateStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
  readonly deaf: boolean;
  readonly mute: boolean;
  readonly selfDeaf: boolean;
  readonly selfMute: boolean;
  readonly selfStream: boolean;
  readonly selfVideo: boolean;
  readonly suppress: boolean;
  readonly guild: Guild | null;
  readonly guildId: Snowflake;
  readonly channel: VoiceChannel | null;
  readonly channelId: Snowflake;
  readonly member: Member | null;
  readonly memberId: Snowflake;
  readonly joined: UnixTimestamp;
  readonly requestToSpeakTimestamp: UnixTimestamp | null;
  toString(): string;
  toJSON(
    format?: JsonTypes,
  ): VoiceStateStorageJSON | VoiceStateCacheJSON | VoiceStateDiscordJSON;
}

export interface VoiceStateStorageJSON {
  guild_id: Snowflake;
  channel_id: Snowflake;
  _attributes: number;
  member?: MemberStorageJSON;
  user_id: Snowflake;
  joined: UnixTimestamp;
  request_to_speak_timestamp: UnixMillisecondsTimestamp | null;
}

export interface VoiceStateCacheJSON {
  guild_id: Snowflake;
  channel_id: Snowflake;
  _attributes: number;
  member?: MemberCacheJSON;
  user_id: Snowflake;
  joined: UnixTimestamp;
  request_to_speak_timestamp: UnixMillisecondsTimestamp | null;
}

export interface VoiceStateDiscordJSON {
  guild_id: Snowflake;
  channel_id: Snowflake;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream: boolean;
  self_video: boolean;
  suppress: boolean;
  member?: MemberDiscordJSON;
  user_id: Snowflake;
  joined: UnixTimestamp;
  request_to_speak_timestamp: UnixMillisecondsTimestamp | null;
}

export class BaseCacheManager<T> {
  constructor(
    client: Client,
    {
      structureType,
    }: {
      structureType: StaticManagerType;
    },
  );
  get(key: string): T | null;
  fetchFromRules(key: string): Promise<T | null>;
  fetchWithRules(key: string): Promise<T | null>;
  set(key: string, value: T, expiry: number): void;
  delete(key: string): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (value: T, key: string, map: Map<string, T>) => void,
  ): void;
  has(key: string): boolean;
  flagForDeletion(key: string): T | null;
  map(
    callbackfn: (
      value: [string, T],
      index: number,
      array: [string, T][],
    ) => unknown,
  ): T[];
  toJSON(format?: JsonTypes): unknown;
}

export type StructureIdentifiers =
  | "messages"
  | "channels"
  | "emojis"
  | "invites"
  | "guilds"
  | "members"
  | "roles"
  | "events"
  | "voicestates"
  | "users"
  | "auditlogs";

export interface StaticManagerType<T> {
  identifier: StructureIdentifiers;
  rules: GluonCacheRuleSetStructure<T>;
}

export class ChannelCacheOptions {
  constructor(cacheOptions?: number);
  setMessageCaching(option: boolean): void;
  setFileCaching(option: boolean): void;
  setContentCaching(option: boolean): void;
  setPollCaching(option: boolean): void;
  setReactionCaching(option: boolean): void;
  setEmbedCaching(option: boolean): void;
  setAttributeCaching(option: boolean): void;
  setReferenceCaching(option: boolean): void;
  setStickerCaching(option: boolean): void;
  setWebhookCaching(option: boolean): void;
  setDisableAll(): void;
  messageCaching: boolean;
  fileCaching: boolean;
  contentCaching: boolean;
  pollCaching: boolean;
  reactionCaching: boolean;
  embedCaching: boolean;
  attributeCaching: boolean;
  referenceCaching: boolean;
  stickerCaching: boolean;
  webhookCaching: boolean;
  toString(): string;
  toJSON(format?: JsonTypes): number;
}

export class ChannelMessageManager extends BaseCacheManager {
  constructor(client: Client, guild: Guild, channel: GuildChannel);
  get(key: Snowflake): Message | null;
  fetchFromRules(key: Snowflake): Promise<Message | null>;
  fetchWithRules(key: Snowflake): Promise<Message | null>;
  set(key: Snowflake, value: Message, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: Message,
      key: Snowflake,
      map: Map<Snowflake, Message>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  flagForDeletion(key: Snowflake): Message | null;
  map(
    callbackfn: (
      value: [Snowflake, Message],
      index: number,
      array: [Snowflake, Message][],
    ) => unknown,
  ): unknown[];
  fetchPinned(): Promise<Message[]>;
  fetch(
    options:
      | {
          around?: Snowflake;
          before?: Snowflake;
          after?: Snowflake;
          limit?: number;
        }
      | Snowflake,
  ): Promise<Message | Message[]>;
  guild: Guild;
  channel: Exclude<AllChannels, CategoryChannel>;
  toJSON(
    format?: JsonTypes,
  ): MessageDiscordJSON[] | MessageStorageJSON[] | MessageCacheJSON[];
}

export interface GluonCacheOptions {
  cacheMessages: boolean;
  cacheUsers: boolean;
  cacheMembers: boolean;
  cacheChannels: boolean;
  cacheGuilds: boolean;
  cacheRoles: boolean;
  cacheVoiceStates: boolean;
  cacheEmojis: boolean;
  cacheInvites: boolean;
  cacheScheduledEvents: boolean;
  cacheAuditLogs: boolean;
  userTTL: number;
  messageTTL: number;
  setCacheMessages(value: boolean): GluonCacheOptions;
  setCacheUsers(value: boolean): GluonCacheOptions;
  setCacheMembers(value: boolean): GluonCacheOptions;
  setCacheChannels(value: boolean): GluonCacheOptions;
  setCacheGuilds(value: boolean): GluonCacheOptions;
  setCacheRoles(value: boolean): GluonCacheOptions;
  setCacheVoiceStates(value: boolean): GluonCacheOptions;
  setCacheEmojis(value: boolean): GluonCacheOptions;
  setCacheInvites(value: boolean): GluonCacheOptions;
  setCacheScheduledEvents(value: boolean): GluonCacheOptions;
  setCacheAuditLogs(value: boolean): GluonCacheOptions;
  setUserTTL(seconds: number): GluonCacheOptions;
  setMessageTTL(seconds: number): GluonCacheOptions;
  toString(): string;
}

export interface GuildCacheOptions {
  setMessageCaching(option: boolean): GuildCacheOptions;
  setFileCaching(option: boolean): GuildCacheOptions;
  setVoiceStateCaching(option: boolean): GuildCacheOptions;
  setMemberCaching(option: boolean): GuildCacheOptions;
  setRoleCaching(option: boolean): GuildCacheOptions;
  setChannelCaching(option: boolean): GuildCacheOptions;
  setEmojiCaching(option: boolean): GuildCacheOptions;
  setThreadCaching(option: boolean): GuildCacheOptions;
  setInviteCaching(option: boolean): GuildCacheOptions;
  setScheduledEventCaching(option: boolean): GuildCacheOptions;
  setAuditLogCaching(option: boolean): GuildCacheOptions;
  messageCaching: boolean;
  fileCaching: boolean;
  voiceStateCaching: boolean;
  memberCaching: boolean;
  roleCaching: boolean;
  channelCaching: boolean;
  emojiCaching: boolean;
  threadCaching: boolean;
  inviteCaching: boolean;
  scheduledEventCaching: boolean;
  auditLogCaching: boolean;
  toString(): string;
  toJSON(format?: JsonTypes): number;
}

export class GuildChannelsManager extends BaseCacheManager {
  constructor(client: Client, guild: Guild);
  get(key: Snowflake): AllChannels | null;
  fetch(key: Snowflake): Promise<AllChannels>;
  fetchFromRules(key: Snowflake): Promise<AllChannels | null>;
  fetchWithRules(key: Snowflake): Promise<AllChannels | null>;
  set(key: Snowflake, value: AllChannels, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: AllChannels,
      key: Snowflake,
      map: Map<Snowflake, AllChannels>,
    ) => void,
  ): void;
  has(key: string): boolean;
  flagForDeletion(key: Snowflake): AllChannels | null;
  map(
    callbackfn: (
      value: [Snowflake, AllChannels],
      index: number,
      array: [Snowflake, AllChannels][],
    ) => unknown,
  ): unknown[];
  toJSON(format?: JsonTypes): AllChannelJSON[];
}

export type AllChannels = TextChannel | VoiceChannel | Thread | CategoryChannel;

export type AllChannelJSON =
  | TextChannelDiscordJSON
  | TextChannelCacheJSON
  | TextChannelStorageJSON
  | VoiceChannelDiscordJSON
  | VoiceChannelCacheJSON
  | VoiceChannelStorageJSON
  | ThreadDiscordJSON
  | ThreadCacheJSON
  | ThreadStorageJSON
  | CategoryChannelDiscordJSON
  | CategoryChannelCacheJSON
  | CategoryChannelStorageJSON;

export class GuildEmojisManager extends BaseCacheManager {
  constructor(client: Client, guild: Guild);
  get(key: Snowflake): Emoji | null;
  fetch(key: Snowflake): Promise<Emoji>;
  fetchFromRules(key: Snowflake): Promise<Emoji | null>;
  fetchWithRules(key: Snowflake): Promise<Emoji | null>;
  set(key: Snowflake, value: Emoji, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: Emoji,
      key: Snowflake,
      map: Map<Snowflake, Emoji>,
    ) => void,
  ): void;
  has(key: string): boolean;
  flagForDeletion(key: Snowflake): Emoji | null;
  map(
    callbackfn: (
      value: [Snowflake, Emoji],
      index: number,
      array: [Snowflake, Emoji][],
    ) => unknown,
  ): unknown[];
  toJSON(
    format?: JsonTypes,
  ): EmojiStorageJSON[] | EmojiDiscordJSON[] | EmojiCacheJSON[];
}

export class GuildInviteManager extends BaseCacheManager {
  constructor(client: Client, guild: Guild);
  get(key: string): Invite | null;
  fetchFromRules(key: string): Promise<Invite | null>;
  fetchWithRules(key: string): Promise<Invite | null>;
  set(key: string, value: Invite, expiry?: number): void;
  delete(key: string): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (value: Invite, key: string, map: Map<string, Invite>) => void,
  ): void;
  has(key: string): boolean;
  flagForDeletion(key: Snowflake): Invite | null;
  map(
    callbackfn: (
      value: [string, Invite],
      index: number,
      array: [string, Invite][],
    ) => unknown,
  ): unknown[];
  fetch(): Promise<Invite[]>;
  toJSON(
    format?: JsonTypes,
  ): InviteCacheJSON[] | InviteStorageJSON[] | InviteDiscordJSON[];
}

export class GuildManager extends BaseCacheManager {
  constructor(client: Client);
  get(key: Snowflake): Guild | null;
  fetchFromRules(key: Snowflake): Promise<Guild | null>;
  fetchWithRules(key: Snowflake): Promise<Guild | null>;
  set(key: Snowflake, value: Guild, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  flagForDeletion(key: Snowflake): Guild | null;
  size: number;
  forEach(
    callbackfn: (
      value: Guild,
      key: Snowflake,
      map: Map<Snowflake, Guild>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  map(
    callbackfn: (
      value: [Snowflake, Guild],
      index: number,
      array: [Snowflake, Guild][],
    ) => unknown,
  ): unknown[];
  toJSON(
    format?: JsonTypes,
  ): GuildStorageJSON[] | GuildCacheJSON[] | GuildDiscordJSON[];
}

export class GuildMemberManager extends BaseCacheManager {
  constructor(client: Client, guild: Guild);
  get(key: Snowflake): Member | null;
  fetchFromRules(key: Snowflake): Promise<Member | null>;
  fetchWithRules(key: Snowflake): Promise<Member | null>;
  set(key: Snowflake, value: Member, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: Member,
      key: Snowflake,
      map: Map<Snowflake, Member>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  flagForDeletion(key: Snowflake): Member | null;
  map(
    callbackfn: (
      value: [Snowflake, Member],
      index: number,
      array: [Snowflake, Member][],
    ) => unknown,
  ): unknown[];
  fetch(key: Snowflake): Promise<Member>;
  search(query: string): Promise<Member[]>;
  toJSON(
    format?: JsonTypes,
  ): MemberCacheJSON[] | MemberStorageJSON[] | MemberDiscordJSON[];
}

export class GuildRoleManager extends BaseCacheManager {
  constructor(client: Client, guild: Guild);
  get(key: Snowflake): Role | null;
  fetchFromRules(key: Snowflake): Promise<Role | null>;
  fetchWithRules(key: Snowflake): Promise<Role | null>;
  set(key: Snowflake, value: Role, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: Role,
      key: Snowflake,
      map: Map<Snowflake, Role>,
    ) => void,
  ): void;
  has(key: string): boolean;
  flagForDeletion(key: Snowflake): Role | null;
  map(
    callbackfn: (
      value: [Snowflake, Role],
      index: number,
      array: [Snowflake, Role][],
    ) => unknown,
  ): unknown[];
  fetch(key: Snowflake): Promise<Role>;
  toJSON(
    format?: JsonTypes,
  ): RoleStorageJSON[] | RoleCacheJSON[] | RoleDiscordJSON[];
}

export class GuildScheduledEventManager extends BaseCacheManager {
  constructor(client: Client, guild: Guild);
  get(key: Snowflake): ScheduledEvent | null;
  fetchFromRules(key: Snowflake): Promise<ScheduledEvent | null>;
  fetchWithRules(key: Snowflake): Promise<ScheduledEvent | null>;
  set(key: Snowflake, value: ScheduledEvent, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: ScheduledEvent,
      key: Snowflake,
      map: Map<Snowflake, ScheduledEvent>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  flagForDeletion(key: Snowflake): ScheduledEvent | null;
  map(
    callbackfn: (
      value: [Snowflake, ScheduledEvent],
      index: number,
      array: [Snowflake, ScheduledEvent][],
    ) => unknown,
  ): unknown[];
  list(): Promise<ScheduledEvent[]>;
  fetch(key: Snowflake): Promise<ScheduledEvent>;
  toJSON(
    format?: JsonTypes,
  ):
    | ScheduledEventCacheJSON[]
    | ScheduledEventStorageJSON[]
    | ScheduledEventDiscordJSON[];
}

export class GuildVoiceStatesManager extends BaseCacheManager {
  constructor(client: Client);
  get(key: Snowflake): VoiceState | null;
  fetchFromRules(key: Snowflake): Promise<VoiceState | null>;
  fetchWithRules(key: Snowflake): Promise<VoiceState | null>;
  set(key: Snowflake, value: VoiceState, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: VoiceState,
      key: Snowflake,
      map: Map<Snowflake, VoiceState>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  flagForDeletion(key: Snowflake): VoiceState | null;
  map(
    callbackfn: (
      value: [Snowflake, VoiceState],
      index: number,
      array: [Snowflake, VoiceState][],
    ) => unknown,
  ): unknown[];
  toJSON(
    format?: JsonTypes,
  ): VoiceStateCacheJSON[] | VoiceStateDiscordJSON[] | VoiceStateStorageJSON[];
}

export interface MessagePollManager {
  _addVote(user_id: Snowflake, answer_id: number): void;
  _removeVote(user_id: Snowflake, answer_id: number): void;
  getResult(answerId: number): Snowflake[];
  toJSON(
    format?: JsonTypes,
  ):
    | MessagePollManagerStorageJSON
    | MessagePollManagerCacheJSON
    | MessagePollManagerDiscordJSON;
}

export interface MessagePollManagerStorageJSON {
  [key: string]: Snowflake[];
}

export interface MessagePollManagerCacheJSON {
  [key: string]: Snowflake[];
}

export interface MessagePollManagerDiscordJSON {
  answer_counts: APIPollAnswerCount[];
}

export interface MessageReactionManager {
  _addReaction(
    userId: Snowflake,
    emoji: Snowflake | string,
    data: GatewayMessageReactionAddDispatchData,
  ): void;
  _removeReaction(userId: Snowflake, emoji: Snowflake | string): void;
  toJSON(
    format?: JsonTypes,
  ):
    | MessageReactionManagerCacheJSON
    | MessageReactionManagerStorageJSON
    | MessageReactionManagerDiscordJSON;
}

export interface MessageReactionManagerStorageJSON {
  [key: string]: ReactionStorageJSON;
}

export interface MessageReactionManagerCacheJSON {
  [key: string]: ReactionCacheJSON;
}

export type MessageReactionManagerDiscordJSON = Array<ReactionDiscordJSON>;

export class UserManager extends BaseCacheManager {
  constructor(client: Client);
  get(key: Snowflake): User | null;
  fetchFromRules(key: Snowflake): Promise<User | null>;
  fetchWithRules(key: Snowflake): Promise<User | null>;
  set(key: Snowflake, value: User, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: User,
      key: Snowflake,
      map: Map<Snowflake, User>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  flagForDeletion(key: Snowflake): User | null;
  map(
    callbackfn: (
      value: [Snowflake, User],
      index: number,
      array: [Snowflake, User][],
    ) => unknown,
  ): unknown[];
  fetch(key: Snowflake): Promise<User>;
  toJSON(
    format?: JsonTypes,
  ): UserCacheJSON[] | UserDiscordJSON[] | UserStorageJSON[];
}

export class GuildAuditLogManager extends BaseCacheManager {
  constructor(client: Client, guild: Guild);
  get(key: Snowflake): AuditLog | null;
  fetchFromRules(key: Snowflake): Promise<AuditLog | null>;
  fetchWithRules(key: Snowflake): Promise<AuditLog | null>;
  set(key: Snowflake, value: AuditLog, expiry?: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: AuditLog,
      key: Snowflake,
      map: Map<Snowflake, AuditLog>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  flagForDeletion(key: Snowflake): AuditLog | null;
  map(
    callbackfn: (
      value: [Snowflake, AuditLog],
      index: number,
      array: [Snowflake, AuditLog][],
    ) => unknown,
  ): unknown[];
  fetch({
    limit,
    type,
    user_id,
    before,
    after,
  }: {
    limit?: number;
    type?: AuditLogEvent;
    user_id?: Snowflake;
    before?: Snowflake;
    after?: Snowflake;
  } = {}): Promise<AuditLog[]>;
  search({
    limit,
    type,
    user_id,
    before,
    after,
  }: {
    limit?: number;
    type?: AuditLogEvent;
    user_id?: Snowflake;
    before?: Snowflake;
    after?: Snowflake;
  } = {}): AuditLog[];
  toJSON(
    format?: JsonTypes,
  ): AuditLogCacheJSON[] | AuditLogDiscordJSON[] | AuditLogStorageJSON[];
}

export class ActionRowBuilder {
  components: Array<DropdownBuilder | ButtonBuilder | TextInputBuilder>;
  type: ComponentType.ActionRow;
  addComponent(
    component: DropdownBuilder | ButtonBuilder | TextInputBuilder,
  ): ActionRowBuilder;
  toJSON(
    format?: JsonTypes,
    options?: { suppressValidation?: boolean },
  ):
    | ActionRowBuilderStorageJSON
    | ActionRowBuilderCacheJSON
    | ActionRowBuilderDiscordJSON;
}

export interface ActionRowBuilderStorageJSON {
  type: ComponentType.ActionRow;
  components: Array<
    | DropdownBuilderStorageJSON
    | ButtonBuilderStorageJSON
    | TextInputBuilderStorageJSON
  >;
}

export interface ActionRowBuilderCacheJSON {
  type: ComponentType.ActionRow;
  components: Array<
    | DropdownBuilderCacheJSON
    | ButtonBuilderCacheJSON
    | TextInputBuilderCacheJSON
  >;
}

export interface ActionRowBuilderDiscordJSON {
  type: ComponentType.ActionRow;
  components: Array<
    | DropdownBuilderDiscordJSON
    | ButtonBuilderDiscordJSON
    | TextInputBuilderDiscordJSON
  >;
}

export interface ButtonBuilder {
  custom_id: string | undefined;
  disabled: boolean | undefined;
  emoji: ResolvedEmoji | undefined;
  label: string | undefined;
  style: ButtonStyle;
  type: ComponentType.Button;
  url: string | undefined;
  setLabel(label: string): ButtonBuilder;
  setEmoji(emoji: string): ButtonBuilder;
  setStyle(style: ButtonStyle): ButtonBuilder;
  setCustomID(id: string): ButtonBuilder;
  setURL(url: string): ButtonBuilder;
  setDisabled(disabled: boolean): ButtonBuilder;
  toJSON(
    format?: JsonTypes,
    options: { suppressValidation: boolean },
  ):
    | ButtonBuilderStorageJSON
    | ButtonBuilderCacheJSON
    | ButtonBuilderDiscordJSON;
}

export interface ButtonBuilderStorageJSON {
  type: ComponentType.Button;
  label?: string;
  emoji?: ResolvedEmoji;
  style: ButtonStyle;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export interface ButtonBuilderCacheJSON {
  type: ComponentType.Button;
  label?: string;
  emoji?: ResolvedEmoji;
  style: ButtonStyle;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export interface ButtonBuilderDiscordJSON {
  type: ComponentType.Button;
  label?: string;
  emoji?: ResolvedEmoji;
  style: ButtonStyle;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export interface ResolvedEmoji {
  id: Snowflake | null;
  name: string;
  animated?: boolean;
}

export interface CommandChoiceBuilder {
  defaultLocale: Locale;
  name: string | undefined;
  name_localizations?: CommandChoiceNameLocalizations;
  value: string | undefined;
  setName(name: string): CommandChoiceBuilder;
  setValue(value: string): CommandChoiceBuilder;
  setDefaultLocale(locale: string): CommandChoiceBuilder;
  toJSON(
    format?: JsonTypes,
    { suppressValidation }?: { suppressValidation: boolean },
  ):
    | CommandChoiceBuilderStorageJSON
    | CommandChoiceBuilderDiscordJSON
    | CommandChoiceBuilderCacheJSON;
}

export interface CommandChoiceBuilderStorageJSON {
  name: string;
  name_localizations?: CommandChoiceNameLocalizations;
  value: string;
}

export interface CommandChoiceBuilderDiscordJSON {
  name: string;
  value: string;
  name_localizations?: CommandChoiceNameLocalizations;
}

export interface CommandChoiceBuilderCacheJSON {
  name: string;
  value: string;
  name_localizations?: CommandChoiceNameLocalizations;
}

export interface CommandChoiceNameLocalizations {
  [key: string]: string;
}

export interface CommandOptionNameLocalizations {
  [key: string]: string;
}

export interface CommandOptionDescriptionLocalizations {
  [key: string]: string;
}

export interface CommandNameLocalizations {
  [key: string]: string;
}

export interface CommandDescriptionLocalizations {
  [key: string]: string;
}

export interface DropdownBuilder {
  channel_types: Array<ChannelType> | undefined;
  custom_id: string | undefined;
  default_values: Array<DropdownDefaultOption>;
  disabled: boolean | undefined;
  max_values: number | undefined;
  min_values: number | undefined;
  options: Array<DropdownOptionBuilder>;
  placeholder: string | undefined;
  type:
    | ComponentType.StringSelect
    | ComponentType.UserSelect
    | ComponentType.RoleSelect
    | ComponentType.MentionableSelect
    | ComponentType.ChannelSelect;
  setType(
    type:
      | ComponentType.StringSelect
      | ComponentType.UserSelect
      | ComponentType.RoleSelect
      | ComponentType.MentionableSelect
      | ComponentType.ChannelSelect,
  ): DropdownBuilder;
  setCustomID(id: string): DropdownBuilder;
  addOption(option: DropdownOptionBuilder): DropdownBuilder;
  addChannelTypes(channelTypes: Array<ChannelType>): DropdownBuilder;
  setPlaceholder(placeholder: string): DropdownBuilder;
  setMinValue(value: number): DropdownBuilder;
  setMaxValue(value: number): DropdownBuilder;
  setDisabled(isDisabled: boolean): DropdownBuilder;
  addDefaultOption(option: DropdownDefaultOption): DropdownBuilder;
  toJSON(
    format?: JsonTypes,
    options?: { suppressValidation?: boolean },
  ):
    | DropdownBuilderStorageJSON
    | DropdownBuilderCacheJSON
    | DropdownBuilderDiscordJSON;
}

export interface DropdownBuilderStorageJSON {
  type:
    | ComponentType.StringSelect
    | ComponentType.UserSelect
    | ComponentType.RoleSelect
    | ComponentType.MentionableSelect
    | ComponentType.ChannelSelect;
  custom_id: string;
  options?: DropdownOptionBuilderStorageJSON[];
  channel_types?: Array<ChannelType>;
  default_values?: DropdownDefaultOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface DropdownBuilderCacheJSON {
  type:
    | ComponentType.StringSelect
    | ComponentType.UserSelect
    | ComponentType.RoleSelect
    | ComponentType.MentionableSelect
    | ComponentType.ChannelSelect;
  custom_id: string;
  options?: DropdownOptionBuilderCacheJSON[];
  channel_types?: Array<ChannelType>;
  default_values?: DropdownDefaultOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface DropdownBuilderDiscordJSON {
  type:
    | ComponentType.StringSelect
    | ComponentType.UserSelect
    | ComponentType.RoleSelect
    | ComponentType.MentionableSelect
    | ComponentType.ChannelSelect;
  custom_id: string;
  options?: DropdownOptionBuilderDiscordJSON[];
  channel_types?: Array<ChannelType>;
  default_values?: DropdownDefaultOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface DropdownDefaultOption {
  id: Snowflake;
  type: "user" | "role" | "channel";
}

export interface DropdownOptionBuilder {
  default: boolean | undefined;
  description: string | undefined;
  emoji: ResolvedEmoji | undefined;
  label: string | undefined;
  value: string | undefined;
  setLabel(label: string): DropdownOptionBuilder;
  setValue(value: string): DropdownOptionBuilder;
  setDescription(description: string): DropdownOptionBuilder;
  setEmoji(emoji: string): DropdownOptionBuilder;
  setDefault(isDefault: boolean): DropdownOptionBuilder;
  toJSON(
    format?: JsonTypes,
    options?: { suppressValidation?: boolean },
  ):
    | DropdownOptionBuilderCacheJSON
    | DropdownOptionBuilderDiscordJSON
    | DropdownOptionBuilderStorageJSON;
}

export interface DropdownOptionBuilderStorageJSON {
  label: string;
  value: string;
  description?: string;
  emoji?: ResolvedEmoji;
  default?: boolean;
}

export interface DropdownOptionBuilderDiscordJSON {
  label: string;
  value: string;
  description?: string;
  emoji?: ResolvedEmoji;
  default?: boolean;
}

export interface DropdownOptionBuilderCacheJSON {
  label: string;
  value: string;
  description?: string;
  emoji?: ResolvedEmoji;
  default?: boolean;
}

export class Embed {
  constructor(
    data?:
      | APIEmbed
      | EmbedBuilderCacheJSON
      | EmbedBuilderStorageJSON
      | EmbedBuilderDiscordJSON,
  );
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  timestamp: number | undefined;
  color: number | undefined;
  footer: APIEmbedFooter | undefined;
  author: APIEmbedAuthor | undefined;
  fields: APIEmbedField[];
  image: APIEmbedImage | undefined;
  thumbnail: APIEmbedThumbnail | undefined;
  video: APIEmbedVideo | undefined;
  setTitle(title: string): Embed;
  setDescription(description: string): Embed;
  setURL(url: string): Embed;
  setTimestamp(timestamp: number): Embed;
  setColor(color: number): Embed;
  setThumbnail(url: string): Embed;
  setFooter(text: string, icon?: string): Embed;
  setAuthor(name: string, url?: string, icon_url?: string): Embed;
  addField(name: string, value: string, inline?: boolean): Embed;
  setImage(url: string): Embed;
  setVideo(url: string): Embed;
  get characterCount(): number;
  toString(): string;
  toJSON(
    format?: JsonTypes,
    options?: { suppressValidation?: boolean },
  ): EmbedBuilderCacheJSON | EmbedBuilderStorageJSON | EmbedBuilderDiscordJSON;
}

export interface EmbedBuilderStorageJSON {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: UnixMillisecondsTimestamp;
  color?: number;
  footer?: APIEmbedFooter;
  author?: APIEmbedAuthor;
  fields?: APIEmbedField[];
  image?: APIEmbedImage;
  thumbnail?: APIEmbedThumbnail;
  video?: APIEmbedVideo;
}

export interface EmbedBuilderCacheJSON {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: UnixMillisecondsTimestamp;
  color?: number;
  footer?: APIEmbedFooter;
  author?: APIEmbedAuthor;
  fields?: APIEmbedField[];
  image?: APIEmbedImage;
  thumbnail?: APIEmbedThumbnail;
  video?: APIEmbedVideo;
}

export interface EmbedBuilderDiscordJSON {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: ISO8601Timestamp;
  color?: number;
  footer?: APIEmbedFooter;
  author?: APIEmbedAuthor;
  fields?: APIEmbedField[];
  image?: APIEmbedImage;
  thumbnail?: APIEmbedThumbnail;
  video?: APIEmbedVideo;
}

export interface FileUpload {
  setName(name: string): FileUpload;
  setStream(stream: Stream): FileUpload;
  setPath(path: string): FileUpload;
  setSize(size: number): FileUpload;
  name: string | undefined;
  stream: Stream | undefined;
  attachment: string | undefined;
  size: number | undefined;
  toJSON(
    format?: JsonTypes,
    options?: { suppressValidation?: boolean },
  ): FileUploadStorageJSON | FileUploadCacheJSON | FileUploadDiscordJSON;
}

export interface FileUploadStorageJSON {
  name: string;
  size: number;
  stream?: Stream;
  attachment?: string;
}

export interface FileUploadCacheJSON {
  name: string;
  size: number;
  stream?: Stream;
  attachment?: string;
}

export interface FileUploadDiscordJSON {
  name: string;
  size: number;
  stream?: Stream;
  attachment?: string;
}

export interface MessageComponents {
  actionRows: ActionRowBuilder[];
  addActionRow(actionRow: ActionRowBuilder): MessageComponents;
  toJSON(
    format?: JsonTypes,
  ):
    | MessageComponentsCacheJSON
    | MessageComponentsDiscordJSON
    | MessageComponentsStorageJSON;
}

export type MessageComponentsStorageJSON = ActionRowBuilderStorageJSON[];

export type MessageComponentsCacheJSON = ActionRowBuilderCacheJSON[];

export type MessageComponentsDiscordJSON = ActionRowBuilderDiscordJSON[];

export interface TextInputBuilder {
  custom_id: string | undefined;
  label: string | undefined;
  max_length: number | undefined;
  min_length: number | undefined;
  placeholder: string | undefined;
  required: boolean | undefined;
  style: TextInputStyles | undefined;
  type: COMPONENT_TYPES.TEXT_INPUT;
  value: string | undefined;
  setLabel(label: string): TextInputBuilder;
  setStyle(style: number): TextInputBuilder;
  setCustomID(id: string): TextInputBuilder;
  setValue(value: string): TextInputBuilder;
  setPlaceholder(placeholder: string): TextInputBuilder;
  setMinLength(length: number): TextInputBuilder;
  setMaxLength(length: number): TextInputBuilder;
  toJSON(
    format?: JsonTypes,
    options?: { suppressValidation?: boolean },
  ):
    | TextInputBuilderStorageJSON
    | TextInputBuilderCacheJSON
    | TextInputBuilderDiscordJSON;
}

export interface TextInputBuilderStorageJSON {
  type: ComponentType.TextInput;
  label: string;
  style: TextInputStyle;
  custom_id: string;
  value?: string;
  placeholder?: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
}

export interface TextInputBuilderCacheJSON {
  type: ComponentType.TextInput;
  label: string;
  style: TextInputStyle;
  custom_id: string;
  value?: string;
  placeholder?: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
}

export interface TextInputBuilderDiscordJSON {
  type: ComponentType.TextInput;
  label: string;
  style: TextInputStyle;
  custom_id: string;
  value?: string;
  placeholder?: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
}

export type DataManagers =
  | ChannelMessageManager
  | GuildChannelsManager
  | GuildEmojisManager
  | GuildInviteManager
  | GuildManager
  | GuildMemberManager
  | GuildRoleManager
  | GuildScheduledEventManager
  | GuildVoiceStatesManager
  | UserManager
  | GuildAuditLogManager;

export interface GluonCacheRuleSetStructure<T> {
  [key: string]: {
    store: GluonCacheRuleHandlerFunction<T>;
    retrieve: GluonCacheRuleRetrieveFunction<T>;
    structure: StaticManagerType<T>;
  };
}

export type GluonCacheRuleHandlerFunction<T> = (value: T) => void;

export type GluonCacheRuleRetrieveFunction<T> = (
  id: string,
  structure: StaticManagerType<T>,
) => Promise<T>;

export class GluonCacheRule<T> {
  setName(name: string): GluonCacheRule<T>;
  setHandlerFunction(
    handlerFunction: GluonCacheRuleHandlerFunction,
  ): GluonCacheRule<T>;
  setRetrieveFunction(
    retrieveFunction: GluonCacheRuleRetrieveFunction,
  ): GluonCacheRule<T>;
  setStructureType(structure: StaticManagerType<T>): GluonCacheRule<T>;
  applyRule(): void;
}

export type ManagerDataTypes =
  | Message
  | AllChannels
  | Emoji
  | Invite
  | Guild
  | Member
  | Role
  | ScheduledEvent
  | VoiceState
  | User;

export interface EndpointIndex {
  [key: string]: EndpointIndexItem;
}

export interface EndpointIndexItem {
  path: (...args: string[]) => string;
  method: HttpMethods;
  majorParams: number[];
  useHeaders?: string[];
  mockResponse: ({ params }: any) => HttpResponse;
}

export interface InitCache {
  clientUser?: UserDiscordJSON | UserCacheJSON | UserStorageJSON;
  guilds?: GuildDiscordJSON[] | GuildCacheJSON[] | GuildStorageJSON[];
}

export interface ClientOptions {
  cacheMessages?: boolean;
  cacheUsers?: boolean;
  cacheMembers?: boolean;
  cacheChannels?: boolean;
  cacheGuilds?: boolean;
  cacheVoiceStates?: boolean;
  cacheRoles?: boolean;
  cacheScheduledEvents?: boolean;
  cacheEmojis?: boolean;
  cacheInvites?: boolean;
  defaultMessageExpiry?: number;
  defaultUserExpiry?: number;
  intents: number;
  totalShards?: number;
  shardIds?: number[];
  sessionData?: SessionData[];
  initCache?: InitCache;
  softRestartFunction?: () => void;
  ip?: string;
}

export interface SessionData {
  sessionId: string;
  sequence: number;
  resumeGatewayUrl: string;
}

export interface ClientEvents {
  [Events.READY]: (shardGuilds: string[]) => void;
  [Events.RESUMED]: () => void;
  [Events.GUILD_CREATE]: (guild: Guild) => void;
  [Events.GUILD_DELETE]: (guild: Guild) => void;
  [Events.GUILD_UPDATE]: (oldGuild: Guild | null, newGuild: Guild) => void;
  [Events.MESSAGE_CREATE]: (message: Message) => void;
  [Events.MESSAGE_UPDATE]: (
    oldMessage: Message | null,
    newMessage: Message,
  ) => void;
  [Events.MESSAGE_EDIT]: (
    oldMessage: Message | null,
    newMessage: Message,
  ) => void;
  [Events.MESSAGE_DELETE]: (
    message: Message | null,
    data: GatewayMessageDeleteDispatchData,
  ) => void;
  [Events.MESSAGE_DELETE_BULK]: (messages: Message[]) => void;
  [Events.GUILD_AUDIT_LOG_ENTRY_CREATE]: (auditLog: AuditLog) => void;
  [Events.GUILD_BAN_ADD]: (bannedUser: User, guildId: string) => void;
  [Events.GUILD_BAN_REMOVE]: (unbannedUser: User, guildId: string) => void;
  [Events.GUILD_MEMBER_ADD]: (member: Member) => void;
  [Events.GUILD_MEMBER_UPDATE]: (
    oldMember: Member | null,
    newMember: Member,
  ) => void;
  [Events.GUILD_MEMBER_REMOVE]: (
    member: Member | null,
    user: User,
    guildId: Snowflake,
  ) => void;
  [Events.BUTTON_CLICK]: (interaction: ButtonClick) => void;
  [Events.MENU_SELECT]: (interaction: OptionSelect) => void;
  [Events.MODAL_RESPONSE]: (interaction: ModalResponse) => void;
  [Events.SLASH_COMMAND]: (interaction: SlashCommand) => void;
  [Events.SLASH_COMMAND_AUTOCOMPLETE]: (interaction: SlashCommand) => void;
  [Events.VOICE_STATE_UPDATE]: (
    oldVoiceState: VoiceState | null,
    newVoiceState: VoiceState | null,
  ) => void;
  [Events.CHANNEL_CREATE]: (channel: AllChannels) => void;
  [Events.CHANNEL_UPDATE]: (
    oldChannel: AllChannels | null,
    newChannel: AllChannels,
  ) => void;
  [Events.CHANNEL_DELETE]: (channel: AllChannels | null) => void;
  [Events.CHANNEL_PINS_UPDATE]: (
    data: GatewayChannelPinsUpdateDispatchData,
  ) => void;
  [Events.THREAD_CREATE]: (thread: Thread) => void;
  [Events.THREAD_UPDATE]: (oldThread: Thread | null, newThread: Thread) => void;
  [Events.THREAD_DELETE]: (thread: Thread | null) => void;
  [Events.THREAD_LIST_SYNC]: (threads: Thread[]) => void;
  [Events.INVITE_CREATE]: (invite: Invite) => void;
  [Events.INVITE_DELETE]: (
    partialInvite: Invite,
    invite: Invite | null,
  ) => void;
  [Events.GUILD_INITIALIZED]: (guild: Guild) => void;
  [Events.GUILD_ROLE_CREATE]: (role: Role) => void;
  [Events.GUILD_ROLE_UPDATE]: (oldRole: Role | null, newRole: Role) => void;
  [Events.GUILD_ROLE_DELETE]: (role: Role | null) => void;
  [Events.GUILD_EMOJI_CREATE]: (emoji: Emoji | null) => void;
  [Events.GUILD_EMOJI_UPDATE]: (
    oldEmoji: Emoji | null,
    newEmoji: Emoji | null,
  ) => void;
  [Events.GUILD_EMOJI_DELETE]: (emoji: Emoji | null) => void;
  [Events.ENTITLEMENT_CREATE]: (
    entitlement: GatewayEntitlementCreateDispatchData,
  ) => void;
  [Events.ENTITLEMENT_UPDATE]: (
    entitlement: GatewayEntitlementUpdateDispatchData,
  ) => void;
  [Events.ENTITLEMENT_DELETE]: (
    entitlement: GatewayEntitlementDeleteDispatchData,
  ) => void;
  [Events.GUILD_SCHEDULED_EVENT_CREATE]: (
    scheduledEvent: ScheduledEvent,
  ) => void;
  [Events.GUILD_SCHEDULED_EVENT_UPDATE]: (
    oldScheduledEvent: ScheduledEvent | null,
    newScheduledEvent: ScheduledEvent,
  ) => void;
  [Events.GUILD_SCHEDULED_EVENT_DELETE]: (
    scheduledEvent: ScheduledEvent | null,
  ) => void;
  [Events.GUILD_SCHEDULED_EVENT_USER_ADD]: (
    data: GatewayGuildScheduledEventUserAddDispatchData,
    user: User | null,
  ) => void;
  [Events.GUILD_SCHEDULED_EVENT_USER_REMOVE]: (
    data: GatewayGuildScheduledEventUserRemoveDispatchData,
    user: User | null,
  ) => void;
  [Events.MESSAGE_POLL_VOTE_ADD]: (
    data: GatewayMessagePollVoteDispatchData,
  ) => void;
  [Events.MESSAGE_POLL_VOTE_REMOVE]: (
    data: GatewayMessagePollVoteDispatchData,
  ) => void;
  [Events.MESSAGE_REACTION_ADD]: (
    data: GatewayMessageReactionAddDispatchData,
    emoji: Emoji,
  ) => void;
  [Events.MESSAGE_REACTION_REMOVE]: (
    data: GatewayMessageReactionRemoveDispatchData,
    emoji: Emoji,
  ) => void;
  [Events.WEBHOOKS_UPDATE]: (data: GatewayWebhooksUpdateDispatchData) => void;
  [Events.REQUEST_COMPLETED]: (data: RequestCompletedData) => void;
  [Events.RAW]: (data: GatewayReceivePayload) => void;
}

export class Client extends TypedEmitter<ClientEvents> {
  request: any;
  user: User;
  constructor(options: ClientOptions);
  get shardIds(): number[];
  get totalShards(): number;
  get intents(): number;
  get users(): UserManager;
  get guilds(): GuildManager;
  get sessionData(): SessionData[];
  get ready(): boolean;
  get initialized(): boolean;
  softRestartFunction(): void;
  halt(): void;
  checkProcess(): ClientProcessData;
  _emitDebug(status: number, message: string): void;
  getCacheCounts(): ClientCacheCounts;
  get _cacheOptions(): GluonCacheOptions;
  get _defaultGuildCacheOptions(): GuildCacheOptions;
  getMemberCount(): number;
  bundleCache(): GuildCacheJSON[];
  registerCommands(
    commands: CommandBuilder[],
  ): Promise<APIApplicationCommand[]>;
  fetchEmojis(): Promise<APIEmoji[]>;
  createEmoji(emoji: { name: string; image: string }): Promise<void>;
  setStatus(status: {
    name: string;
    type?: number;
    status?: string;
    afk?: boolean;
    since?: number;
  }): void;
  setReady(): void;
  setInitialized(): void;
  login(token: string): void;
}

export interface CommandOptionBuilder {
  autocomplete: boolean;
  channel_types?: ChannelType[];
  choices: CommandChoiceBuilderType[];
  defaultLocale: Locale;
  description?: string;
  description_localizations?: CommandOptionDescriptionLocalizations;
  max_length?: number;
  max_value?: number;
  min_length?: number;
  min_value?: number;
  name?: string;
  name_localizations?: CommandOptionNameLocalizations;
  options: CommandOptionBuilder[];
  required?: boolean;
  type?: ApplicationCommandOptionType;

  setName(name: string | CommandOptionNameLocalizations): CommandOption;
  setType(type: ApplicationCommandOptionType): CommandOption;
  setDescription(
    description: string | CommandOptionDescriptionLocalizations,
  ): CommandOption;
  setRequired(isRequired: boolean): CommandOption;
  addChoice(choice: CommandChoiceBuilderType): CommandOption;
  addOption(option: CommandOptionBuilder): CommandOption;
  setChannelTypes(channelTypes: ChannelType[]): CommandOption;
  setMinValue(value: number): CommandOption;
  setMaxValue(value: number): CommandOption;
  setMinLength(length: number): CommandOption;
  setMaxLength(length: number): CommandOption;
  setAutocomplete(autocomplete: boolean): CommandOption;
  setDefaultLocale(locale: Locale): CommandOption;
  toJSON(
    format?: JsonTypes,
    options?: { suppressValidation: boolean },
  ):
    | CommandOptionStorageJSON
    | CommandOptionCacheJSON
    | CommandOptionDiscordJSON;
}

export interface CommandOptionStorageJSON {
  name: string;
  name_localizations?: CommandOptionNameLocalizations;
  type: ApplicationCommandOptionType;
  description: string;
  description_localizations?: CommandOptionDescriptionLocalizations;
  required?: boolean;
  choices: CommandChoiceBuilderType[];
  options: CommandOptionStorageJSON[];
  channel_types?: ChannelType[];
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  autocomplete: boolean;
}

export interface CommandOptionCacheJSON {
  name: string;
  name_localizations?: CommandOptionNameLocalizations;
  type: ApplicationCommandOptionType;
  description: string;
  description_localizations?: CommandOptionDescriptionLocalizations;
  required?: boolean;
  choices: CommandChoiceBuilderType[];
  options: CommandOptionCacheJSON[];
  channel_types?: ChannelType[];
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  autocomplete: boolean;
}

export interface CommandOptionDiscordJSON {
  name: string;
  name_localizations?: CommandOptionNameLocalizations;
  type: ApplicationCommandOptionType;
  description: string;
  description_localizations?: CommandOptionDescriptionLocalizations;
  required?: boolean;
  choices: CommandChoiceBuilderType[];
  options: CommandOptionDiscordJSON[];
  channel_types?: ChannelType[];
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  autocomplete: boolean;
}

export class CommandBuilder {
  contexts: [0] = [0];
  defaultLocale: Locale = Locale.EnglishUS;
  default_member_permissions?: PermissionsBitfield;
  description?: string;
  description_localizations?: CommandDescriptionLocalizations;
  name?: string;
  name_localizations?: CommandNameLocalizations;
  nsfw: boolean = false;
  options: CommandOptionBuilder[] = [];
  type: ApplicationCommandType = ApplicationCommandType.ChatInput;

  setName(name: string | CommandNameLocalizations): CommandBuilder;
  setDescription(
    description: string | CommandDescriptionLocalizations,
  ): CommandBuilder;
  setDefaultLocale(locale: Locale): CommandBuilder;
  setDefaultMemberPermissions(permission: PermissionsBitfield): CommandBuilder;
  setType(type: ApplicationCommandType): CommandBuilder;
  setNsfw(nsfw: boolean): CommandBuilder;
  addOption(option: CommandOptionBuilder): CommandBuilder;
  toJSON(
    format?: JsonTypes,
    options?: { suppressValidation: boolean },
  ): CommandStorageJSON | CommandCacheJSON | CommandDiscordJSON;
}

export interface CommandStorageJSON {
  name: string;
  name_localizations?: CommandNameLocalizations;
  type: ApplicationCommandType;
  description?: string;
  description_localizations?: CommandDescriptionLocalizations;
  default_member_permissions: PermissionsBitfield;
  nsfw: boolean;
  options: CommandOptionStorageJSON[];
}

export interface CommandCacheJSON {
  name: string;
  name_localizations?: CommandNameLocalizations;
  type: ApplicationCommandType;
  description?: string;
  description_localizations?: CommandDescriptionLocalizations;
  default_member_permissions: PermissionsBitfield;
  nsfw: boolean;
  options: CommandOptionCacheJSON[];
}

export interface CommandDiscordJSON {
  name: string;
  name_localizations?: CommandNameLocalizations;
  type: ApplicationCommandType;
  description?: string;
  description_localizations?: CommandDescriptionLocalizations;
  default_member_permissions: PermissionsBitfield;
  nsfw: boolean;
  options: CommandOptionDiscordJSON[];
}

export interface RequestCompletedData {
  status: number;
  method: HttpMethods;
  endpoint: string;
  hash: string;
}

export type AttachmentJsonStructures =
  | AttachmentCacheJSON
  | AttachmentDiscordJSON
  | AttachmentStorageJSON;

export type AuditLogJsonStructures =
  | AuditLogCacheJSON
  | AuditLogDiscordJSON
  | AuditLogStorageJSON;

export type CategoryChannelJsonStructures =
  | CategoryChannelCacheJSON
  | CategoryChannelDiscordJSON
  | CategoryChannelStorageJSON;

export type MessageJsonStructures =
  | MessageCacheJSON
  | MessageDiscordJSON
  | MessageStorageJSON;

export abstract class BaseStructure<T> {
  protected client;
  readonly id;
  constructor(client: Client, id: Snowflake) {
    this.client = client;
    this.id = id;
  }
  toString() {
    return `[${this.constructor.name
      .split(/(?=[A-Z])/)
      .join(" ")
      .toLowerCase()} ${this.id}]`;
  }
  [util.inspect.custom]() {
    return this.toString();
  }
  abstract toJSON(format?: JsonTypes): T;
}

export interface ClientProcessData {
  totalShards: number;
  shardsManaged: number[];
  shards: ShardCheckData[];
  guildCount: number;
  memberCount: number;
  cacheCounts: ClientCacheCounts;
  guilds: Snowflake[];
  processId: string;
  restLatency: number;
}

export interface ClientCacheCounts {
  users: number;
  guilds: number;
  messages: number;
  members: number;
  channels: number;
  roles: number;
  emojis: number;
  voiceStates: number;
}

export interface ShardCheckData {
  shard: number;
  websocketState: WebsocketStates;
  lastReconnect: UnixMillisecondsTimestamp;
  latency: number;
}
