export interface GluonCacheOptionsType {
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
  userTTL: number;
  messageTTL: number;
  setCacheMessages(value: boolean): GluonCacheOptionsType;
  setCacheUsers(value: boolean): GluonCacheOptionsType;
  setCacheMembers(value: boolean): GluonCacheOptionsType;
  setCacheChannels(value: boolean): GluonCacheOptionsType;
  setCacheGuilds(value: boolean): GluonCacheOptionsType;
  setCacheRoles(value: boolean): GluonCacheOptionsType;
  setCacheVoiceStates(value: boolean): GluonCacheOptionsType;
  setCacheEmojis(value: boolean): GluonCacheOptionsType;
  setCacheInvites(value: boolean): GluonCacheOptionsType;
  setCacheScheduledEvents(value: boolean): GluonCacheOptionsType;
  setUserTTL(seconds: number): GluonCacheOptionsType;
  setMessageTTL(seconds: number): GluonCacheOptionsType;
  toString(): string;
}
