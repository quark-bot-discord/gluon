import {
  ISO8601Timestamp,
  Snowflake,
  UnixMillisecondsTimestamp,
  UnixTimestamp,
} from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import { VoiceChannelType } from "./VoiceChannel.js";
import {
  MemberCacheJSON,
  MemberDiscordJSON,
  MemberRaw,
  MemberStorageJSON,
  MemberType,
} from "./Member.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface VoiceStateType {
  readonly deaf: boolean;
  readonly mute: boolean;
  readonly selfDeaf: boolean;
  readonly selfMute: boolean;
  readonly selfStream: boolean;
  readonly selfVideo: boolean;
  readonly suppress: boolean;
  readonly guild: GuildType | null;
  readonly guildId: Snowflake;
  readonly channel: VoiceChannelType | null;
  readonly channelId: Snowflake;
  readonly member: MemberType | null;
  readonly memberId: Snowflake;
  readonly joined: UnixTimestamp;
  readonly requestToSpeakTimestamp: UnixTimestamp | null;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): VoiceStateStorageJSON | VoiceStateCacheJSON | VoiceStateDiscordJSON;
}

export interface VoiceStateStorageJSON {
  guild_id: Snowflake;
  channel_id: Snowflake;
  _attributes: number;
  member: MemberStorageJSON | null;
  user_id: Snowflake;
  joined: UnixTimestamp;
  request_to_speak_timestamp: UnixMillisecondsTimestamp | null;
}

export interface VoiceStateCacheJSON {
  guild_id: Snowflake;
  channel_id: Snowflake;
  _attributes: number;
  member: MemberCacheJSON | null;
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
  member: MemberDiscordJSON | null;
  user_id: Snowflake;
  joined: UnixTimestamp;
  request_to_speak_timestamp: UnixMillisecondsTimestamp | null;
}

export interface VoiceStateRaw {
  guild_id?: Snowflake;
  channel_id: Snowflake | null;
  user_id: Snowflake;
  member?: MemberRaw;
  session_id: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream?: boolean;
  self_video: boolean;
  suppress: boolean;
  request_to_speak_timestamp: ISO8601Timestamp | null;
}
