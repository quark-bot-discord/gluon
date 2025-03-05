export var JsonTypes;
(function (JsonTypes) {
  JsonTypes[(JsonTypes["DISCORD_FORMAT"] = 1)] = "DISCORD_FORMAT";
  JsonTypes[(JsonTypes["CACHE_FORMAT"] = 2)] = "CACHE_FORMAT";
  JsonTypes[(JsonTypes["STORAGE_FORMAT"] = 3)] = "STORAGE_FORMAT";
})(JsonTypes || (JsonTypes = {}));
export var Events;
(function (Events) {
  Events["READY"] = "ready";
  Events["RESUMED"] = "resumed";
  Events["GUILD_CREATE"] = "guildCreate";
  Events["GUILD_DELETE"] = "guildDelete";
  Events["GUILD_UPDATE"] = "guildUpdate";
  Events["MESSAGE_CREATE"] = "messageCreate";
  Events["MESSAGE_UPDATE"] = "messageUpdate";
  Events["MESSAGE_EDIT"] = "messageEdit";
  Events["MESSAGE_DELETE"] = "messageDelete";
  Events["MESSAGE_DELETE_BULK"] = "messageDeleteBulk";
  Events["GUILD_AUDIT_LOG_ENTRY_CREATE"] = "guildAuditLogEntryCreate";
  Events["GUILD_BAN_ADD"] = "guildBanAdd";
  Events["GUILD_BAN_REMOVE"] = "guildBanRemove";
  Events["GUILD_MEMBER_ADD"] = "guildMemberAdd";
  Events["GUILD_MEMBER_UPDATE"] = "guildMemberUpdate";
  Events["GUILD_MEMBER_REMOVE"] = "guildMemberRemove";
  Events["BUTTON_CLICK"] = "buttonClick";
  Events["MENU_SELECT"] = "menuSelect";
  Events["MODAL_RESPONSE"] = "modalResponse";
  Events["SLASH_COMMAND"] = "slashCommand";
  Events["SLASH_COMMAND_AUTOCOMPLETE"] = "slashCommandAutocomplete";
  Events["VOICE_STATE_UPDATE"] = "voiceStateUpdate";
  Events["VOICE_CHANNEL_STATUS_UPDATE"] = "voiceChannelStatusUpdate";
  Events["CHANNEL_CREATE"] = "channelCreate";
  Events["CHANNEL_UPDATE"] = "channelUpdate";
  Events["CHANNEL_DELETE"] = "channelDelete";
  Events["CHANNEL_PINS_UPDATE"] = "channelPinsUpdate";
  Events["THREAD_CREATE"] = "threadCreate";
  Events["THREAD_UPDATE"] = "threadUpdate";
  Events["THREAD_DELETE"] = "threadDelete";
  Events["THREAD_LIST_SYNC"] = "threadListSync";
  Events["INVITE_CREATE"] = "inviteCreate";
  Events["INVITE_DELETE"] = "inviteDelete";
  Events["GUILD_ROLE_CREATE"] = "roleCreate";
  Events["GUILD_ROLE_UPDATE"] = "roleUpdate";
  Events["GUILD_ROLE_DELETE"] = "roleDelete";
  Events["GUILD_EMOJI_CREATE"] = "emojiCreate";
  Events["GUILD_EMOJI_UPDATE"] = "emojiUpdate";
  Events["GUILD_EMOJI_DELETE"] = "emojiDelete";
  Events["ENTITLEMENT_CREATE"] = "entitlementCreate";
  Events["ENTITLEMENT_UPDATE"] = "entitlementUpdate";
  Events["ENTITLEMENT_DELETE"] = "entitlementDelete";
  Events["GUILD_SCHEDULED_EVENT_CREATE"] = "guildScheduledEventCreate";
  Events["GUILD_SCHEDULED_EVENT_UPDATE"] = "guildScheduledEventUpdate";
  Events["GUILD_SCHEDULED_EVENT_DELETE"] = "guildScheduledEventDelete";
  Events["GUILD_SCHEDULED_EVENT_USER_ADD"] = "guildScheduledEventUserAdd";
  Events["GUILD_SCHEDULED_EVENT_USER_REMOVE"] = "guildScheduledEventUserRemove";
  Events["INITIALISED"] = "initialised";
  Events["MESSAGE_POLL_VOTE_ADD"] = "messagePollVoteAdd";
  Events["MESSAGE_POLL_VOTE_REMOVE"] = "messagePollVoteRemove";
  Events["MESSAGE_REACTION_ADD"] = "messageReactionAdd";
  Events["MESSAGE_REACTION_REMOVE"] = "messageReactionRemove";
  Events["WEBHOOKS_UPDATE"] = "webhooksUpdate";
  Events["REQUEST_COMPLETED"] = "requestCompleted";
  Events["RAW"] = "raw";
})(Events || (Events = {}));
export var GluonDebugLevels;
(function (GluonDebugLevels) {
  GluonDebugLevels[(GluonDebugLevels["None"] = 0)] = "None";
  GluonDebugLevels[(GluonDebugLevels["Error"] = 1)] = "Error";
  GluonDebugLevels[(GluonDebugLevels["Warn"] = 2)] = "Warn";
  GluonDebugLevels[(GluonDebugLevels["Danger"] = 3)] = "Danger";
  GluonDebugLevels[(GluonDebugLevels["Info"] = 4)] = "Info";
})(GluonDebugLevels || (GluonDebugLevels = {}));
export var WebsocketStates;
(function (WebsocketStates) {
  WebsocketStates[(WebsocketStates["Connecting"] = 0)] = "Connecting";
  WebsocketStates[(WebsocketStates["Open"] = 1)] = "Open";
  WebsocketStates[(WebsocketStates["Closing"] = 2)] = "Closing";
  WebsocketStates[(WebsocketStates["Closed"] = 3)] = "Closed";
})(WebsocketStates || (WebsocketStates = {}));
export var GluonGlobalCache;
(function (GluonGlobalCache) {
  GluonGlobalCache[(GluonGlobalCache["Guilds"] = 1)] = "Guilds";
  GluonGlobalCache[(GluonGlobalCache["Users"] = 2)] = "Users";
  GluonGlobalCache[(GluonGlobalCache["Channels"] = 3)] = "Channels";
  GluonGlobalCache[(GluonGlobalCache["Messages"] = 4)] = "Messages";
  GluonGlobalCache[(GluonGlobalCache["Roles"] = 5)] = "Roles";
  GluonGlobalCache[(GluonGlobalCache["Emojis"] = 6)] = "Emojis";
  GluonGlobalCache[(GluonGlobalCache["Invites"] = 7)] = "Invites";
  GluonGlobalCache[(GluonGlobalCache["VoiceStates"] = 8)] = "VoiceStates";
  GluonGlobalCache[(GluonGlobalCache["Members"] = 9)] = "Members";
  GluonGlobalCache[(GluonGlobalCache["ScheduledEvents"] = 10)] =
    "ScheduledEvents";
})(GluonGlobalCache || (GluonGlobalCache = {}));
export var GluonGuildCachingOptions;
(function (GluonGuildCachingOptions) {
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[(GluonGuildCachingOptions["Messages"] = 1)] =
    "Messages";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[(GluonGuildCachingOptions["Files"] = 2)] = "Files";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[(GluonGuildCachingOptions["VoiceStates"] = 4)] =
    "VoiceStates";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[(GluonGuildCachingOptions["Roles"] = 8)] = "Roles";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[(GluonGuildCachingOptions["Emojis"] = 16)] =
    "Emojis";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[(GluonGuildCachingOptions["Invites"] = 32)] =
    "Invites";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[(GluonGuildCachingOptions["Channels"] = 64)] =
    "Channels";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[(GluonGuildCachingOptions["Members"] = 128)] =
    "Members";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[(GluonGuildCachingOptions["Threads"] = 256)] =
    "Threads";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonGuildCachingOptions[
    (GluonGuildCachingOptions["ScheduledEvents"] = 512)
  ] = "ScheduledEvents";
})(GluonGuildCachingOptions || (GluonGuildCachingOptions = {}));
export var GluonChannelCachingOptions;
(function (GluonChannelCachingOptions) {
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Messages"] = 1)] =
    "Messages";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Files"] = 2)] =
    "Files";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Content"] = 4)] =
    "Content";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Poll"] = 8)] = "Poll";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Reactions"] = 16)] =
    "Reactions";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Embeds"] = 32)] =
    "Embeds";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Attributes"] = 64)] =
    "Attributes";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Reference"] = 128)] =
    "Reference";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Webhook"] = 256)] =
    "Webhook";
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
  GluonChannelCachingOptions[(GluonChannelCachingOptions["Sticker"] = 512)] =
    "Sticker";
})(GluonChannelCachingOptions || (GluonChannelCachingOptions = {}));
//# sourceMappingURL=enums.js.map
