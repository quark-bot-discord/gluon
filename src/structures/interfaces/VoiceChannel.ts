import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ChannelCacheJSON,
  ChannelDiscordJSON,
  ChannelRaw,
  ChannelStorageJSON,
  ChannelsVoice,
} from "./Channel.js";

export interface VoiceChannelType {
  readonly bitrate: number;
  readonly userLimit: number;
  readonly rtcRegion: string;
  toString(): string;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ): VoiceChannelCacheJSON | VoiceChannelDiscordJSON | VoiceChannelStorageJSON;
}

export interface VoiceChannelCacheJSON extends ChannelCacheJSON {
  bitrate: number;
  user_limit: number;
  rtc_region: string;
}

export interface VoiceChannelDiscordJSON extends ChannelDiscordJSON {
  bitrate: number;
  user_limit: number;
  rtc_region: string;
}

export interface VoiceChannelStorageJSON extends ChannelStorageJSON {
  bitrate: number;
  user_limit: number;
  rtc_region: string;
}

export interface VoiceChannelRaw extends ChannelRaw {
  type: ChannelsVoice;
}
