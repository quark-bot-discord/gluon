import { TypedEmitter } from "tiny-typed-emitter";
import { GuildType } from "src/structures/interfaces/Guild.js";
import { MessageType } from "src/structures/interfaces/Message.js";

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
  sessionData?: object;
  initCache?: object;
  softRestartFunction?: Function;
}

declare class ClientType extends TypedEmitter<{
  ready: (shardGuilds: string[]) => void;
  resumed: () => void;
  guildCreate: (guild: GuildType) => void;
  guildDelete: (guild: GuildType) => void;
  guildUpdate: (oldGuild: GuildType, newGuild: GuildType) => void;
  messageCreate: (message: MessageType) => void;
  messageUpdate: (oldMessage: MessageType, newMessage: MessageType) => void;
  messageDelete: (message: MessageType) => void;
  messageDeleteBulk: (messages: MessageType[]) => void;
  guildAuditLogEntryCreate: (auditLog: object) => void;
  guildBanAdd: (bannedUser: any) => void;
  guildBanRemove: (unbannedUser: any) => void;
  guildMemberAdd: (member: any) => void;
  guildMemberUpdate: (oldMember: any, newMember: any) => void;
  guildMemberRemove: (member: any) => void;
  buttonClick: (interaction: any) => void;
  menuSelect: (interaction: any) => void;
  modalResponse: (interaction: any) => void;
  slashCommand: (interaction: any) => void;
  slashCommandAutocomplete: (interaction: any) => void;
  voiceStateUpdate: (oldVoiceState: any, newVoiceState: any) => void;
  voiceChannelStatusUpdate: (data: object) => void;
  channelCreate: (channel: object) => void;
  channelUpdate: (oldChannel: object, newChannel: object) => void;
  channelDelete: (channel: object) => void;
  channelPinsUpdate: (data: object) => void;
  threadCreate: (thread: object) => void;
  threadUpdate: (oldThread: object, newThread: object) => void;
  threadDelete: (thread: object) => void;
  threadListSync: (threads: object[]) => void;
  inviteCreate: (invite: any) => void;
  inviteDelete: (data: object, invite: any) => void;
  roleCreate: (role: any) => void;
  roleUpdate: (oldRole: any, newRole: any) => void;
  roleDelete: (role: any) => void;
  emojiCreate: (emoji: any) => void;
  emojiUpdate: (oldEmoji: any, newEmoji: any) => void;
  emojiDelete: (emoji: any) => void;
  entitlementCreate: (entitlement: object) => void;
  entitlementUpdate: (entitlement: object) => void;
  entitlementDelete: (entitlement: object) => void;
  guildScheduledEventCreate: (scheduledEvent: any) => void;
  guildScheduledEventUpdate: (
    oldScheduledEvent: any,
    newScheduledEvent: any,
  ) => void;
  guildScheduledEventDelete: (scheduledEvent: any) => void;
  guildScheduledEventUserAdd: (data: object, user: any) => void;
  guildScheduledEventUserRemove: (data: object, user: any) => void;
  initialised: () => void;
  messagePollVoteAdd: (data: object) => void;
  messagePollVoteRemove: (data: object) => void;
  messageReactionAdd: (data: object) => void;
  messageReactionRemove: (data: object) => void;
  webhooksUpdate: (data: object) => void;
}> {
  request: any;
  user: any | null;
  constructor(options: ClientOptions);
  get shardIds(): number[];
  get totalShards(): number;
  get intents(): number;
  get users(): any;
  get guilds(): any;
  get sessionData(): object;
  softRestartFunction(): void;
  halt(): void;
  checkProcess(): object;
  _emitDebug(status: number, message: string): void;
  getCacheCounts(): object;
  get _cacheOptions(): any;
  get _defaultGuildCacheOptions(): any;
  getMemberCount(): number;
  bundleCache(): object[];
  registerCommands(commands: any[]): Promise<object[]>;
  fetchEmojis(): Promise<object[]>;
  createEmoji(emoji: { name: string; image: string }): Promise<void>;
  setStatus(status: {
    name: string;
    type?: number;
    status?: string;
    afk?: boolean;
    since?: number;
  }): void;
  login(token: string): void;
}

export default ClientType;
