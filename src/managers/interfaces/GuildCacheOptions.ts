import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface GuildCacheOptionsType {
  setMessageCaching(option: boolean): GuildCacheOptionsType;
  setFileCaching(option: boolean): GuildCacheOptionsType;
  setVoiceStateCaching(option: boolean): GuildCacheOptionsType;
  setMemberCaching(option: boolean): GuildCacheOptionsType;
  setRoleCaching(option: boolean): GuildCacheOptionsType;
  setChannelCaching(option: boolean): GuildCacheOptionsType;
  setEmojiCaching(option: boolean): GuildCacheOptionsType;
  setThreadCaching(option: boolean): GuildCacheOptionsType;
  setInviteCaching(option: boolean): GuildCacheOptionsType;
  setScheduledEventCaching(option: boolean): GuildCacheOptionsType;
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
  toString(): string;
  toJSON(format: TO_JSON_TYPES_ENUM): number;
}
