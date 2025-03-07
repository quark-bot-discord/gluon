export enum JsonTypes {
  DISCORD_FORMAT = 1, // default
  CACHE_FORMAT = 2,
  STORAGE_FORMAT = 3,
}

export enum Events {
  READY = "ready",
  RESUMED = "resumed",
  GUILD_CREATE = "guildCreate",
  GUILD_DELETE = "guildDelete",
  GUILD_UPDATE = "guildUpdate",
  MESSAGE_CREATE = "messageCreate",
  MESSAGE_UPDATE = "messageUpdate",
  MESSAGE_EDIT = "messageEdit",
  MESSAGE_DELETE = "messageDelete",
  MESSAGE_DELETE_BULK = "messageDeleteBulk",
  GUILD_AUDIT_LOG_ENTRY_CREATE = "guildAuditLogEntryCreate",
  GUILD_BAN_ADD = "guildBanAdd",
  GUILD_BAN_REMOVE = "guildBanRemove",
  GUILD_MEMBER_ADD = "guildMemberAdd",
  GUILD_MEMBER_UPDATE = "guildMemberUpdate",
  GUILD_MEMBER_REMOVE = "guildMemberRemove",
  BUTTON_CLICK = "buttonClick",
  MENU_SELECT = "menuSelect",
  MODAL_RESPONSE = "modalResponse",
  SLASH_COMMAND = "slashCommand",
  SLASH_COMMAND_AUTOCOMPLETE = "slashCommandAutocomplete",
  VOICE_STATE_UPDATE = "voiceStateUpdate",
  VOICE_CHANNEL_STATUS_UPDATE = "voiceChannelStatusUpdate",
  CHANNEL_CREATE = "channelCreate",
  CHANNEL_UPDATE = "channelUpdate",
  CHANNEL_DELETE = "channelDelete",
  CHANNEL_PINS_UPDATE = "channelPinsUpdate",
  THREAD_CREATE = "threadCreate",
  THREAD_UPDATE = "threadUpdate",
  THREAD_DELETE = "threadDelete",
  THREAD_LIST_SYNC = "threadListSync",
  INVITE_CREATE = "inviteCreate",
  INVITE_DELETE = "inviteDelete",
  GUILD_ROLE_CREATE = "roleCreate",
  GUILD_ROLE_UPDATE = "roleUpdate",
  GUILD_ROLE_DELETE = "roleDelete",
  GUILD_EMOJI_CREATE = "emojiCreate",
  GUILD_EMOJI_UPDATE = "emojiUpdate",
  GUILD_EMOJI_DELETE = "emojiDelete",
  ENTITLEMENT_CREATE = "entitlementCreate",
  ENTITLEMENT_UPDATE = "entitlementUpdate",
  ENTITLEMENT_DELETE = "entitlementDelete",
  GUILD_SCHEDULED_EVENT_CREATE = "guildScheduledEventCreate",
  GUILD_SCHEDULED_EVENT_UPDATE = "guildScheduledEventUpdate",
  GUILD_SCHEDULED_EVENT_DELETE = "guildScheduledEventDelete",
  GUILD_SCHEDULED_EVENT_USER_ADD = "guildScheduledEventUserAdd",
  GUILD_SCHEDULED_EVENT_USER_REMOVE = "guildScheduledEventUserRemove",
  INITIALISED = "initialised",
  MESSAGE_POLL_VOTE_ADD = "messagePollVoteAdd",
  MESSAGE_POLL_VOTE_REMOVE = "messagePollVoteRemove",
  MESSAGE_REACTION_ADD = "messageReactionAdd",
  MESSAGE_REACTION_REMOVE = "messageReactionRemove",
  WEBHOOKS_UPDATE = "webhooksUpdate",
  REQUEST_COMPLETED = "requestCompleted",
  RAW = "raw",
}

export enum GluonDebugLevels {
  None = 0,
  Error = 1,
  Warn = 2,
  Danger = 3,
  Info = 4,
}

export enum WebsocketStates {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export enum GluonGlobalCache {
  Guilds = 1,
  Users = 2,
  Channels = 3,
  Messages = 4,
  Roles = 5,
  Emojis = 6,
  Invites = 7,
  VoiceStates = 8,
  Members = 9,
  ScheduledEvents = 10,
  AuditLogs = 11,
}

export enum GluonGuildCachingOptions {
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Messages = 1 << 0,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Files = 1 << 1,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  VoiceStates = 1 << 2,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Roles = 1 << 3,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Emojis = 1 << 4,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Invites = 1 << 5,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Channels = 1 << 6,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Members = 1 << 7,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Threads = 1 << 8,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  ScheduledEvents = 1 << 9,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  AuditLogs = 1 << 10,
}

export enum GluonChannelCachingOptions {
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Messages = 1 << 0,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Files = 1 << 1,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Content = 1 << 2,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Poll = 1 << 3,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Reactions = 1 << 4,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Embeds = 1 << 5,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Attributes = 1 << 6,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Reference = 1 << 7,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Webhook = 1 << 8,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  Sticker = 1 << 9,
}
