import { GluonCacheOptions as GluonCacheOptionsType } from "../../typings/index.d.js";
declare class GluonCacheOptions implements GluonCacheOptionsType {
  #private;
  constructor({
    userTTL,
    messageTTL,
    cacheMessages,
    cacheUsers,
    cacheMembers,
    cacheChannels,
    cacheGuilds,
    cacheRoles,
    cacheVoiceStates,
    cacheEmojis,
    cacheInvites,
    cacheScheduledEvents,
  }?: {
    userTTL?: number;
    messageTTL?: number;
    cacheMessages?: boolean;
    cacheUsers?: boolean;
    cacheMembers?: boolean;
    cacheChannels?: boolean;
    cacheGuilds?: boolean;
    cacheRoles?: boolean;
    cacheVoiceStates?: boolean;
    cacheEmojis?: boolean;
    cacheInvites?: boolean;
    cacheScheduledEvents?: boolean;
  });
  setCacheMessages(value: boolean): this;
  get cacheMessages(): boolean;
  setCacheUsers(value: boolean): this;
  get cacheUsers(): boolean;
  setCacheMembers(value: boolean): this;
  get cacheMembers(): boolean;
  setCacheChannels(value: boolean): this;
  get cacheChannels(): boolean;
  setCacheGuilds(value: boolean): this;
  get cacheGuilds(): boolean;
  setCacheRoles(value: boolean): this;
  get cacheRoles(): boolean;
  setCacheVoiceStates(value: boolean): this;
  get cacheVoiceStates(): boolean;
  setCacheEmojis(value: boolean): this;
  get cacheEmojis(): boolean;
  setCacheInvites(value: boolean): this;
  get cacheInvites(): boolean;
  setCacheScheduledEvents(value: boolean): this;
  get cacheScheduledEvents(): boolean;
  setCacheAuditLogs(value: boolean): this;
  get cacheAuditLogs(): boolean;
  setUserTTL(seconds: number): this;
  get userTTL(): number;
  setMessageTTL(seconds: number): this;
  get messageTTL(): number;
  toString(): string;
}
export default GluonCacheOptions;
