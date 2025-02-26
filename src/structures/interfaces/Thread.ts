import { ISO8601Timestamp, Snowflake } from "src/interfaces/gluon.js";
import {
  ChannelCacheJSON,
  ChannelDiscordJSON,
  ChannelRaw,
  ChannelsThread,
  ChannelStorageJSON,
  ChannelType,
} from "./Channel.js";
import { MemberRaw, MemberType } from "./Member.js";

export interface ThreadType extends ChannelType {
  readonly owner: MemberType | null;
  readonly parent: ChannelType;
  readonly ownerId: Snowflake;
  readonly parentId: Snowflake;
}

export interface ThreadStorageJSON extends ChannelStorageJSON {
  owner_id: Snowflake;
  parent_id: Snowflake;
}

export interface ThreadCacheJSON extends ChannelCacheJSON {
  owner_id: Snowflake;
  parent_id: Snowflake;
}

export interface ThreadDiscordJSON extends ChannelDiscordJSON {
  owner_id: Snowflake;
  parent_id: Snowflake;
}

export interface ThreadRaw extends ChannelRaw {
  type: ChannelsThread;
}

export interface ThreadRawMember {
  id?: Snowflake;
  user_id?: Snowflake;
  join_timestamp: ISO8601Timestamp;
  flags: number;
  member?: MemberRaw;
}

export interface ThreadRawMetadata {
  archived: boolean;
  auto_archive_duration: ThreadAutoArchiveDuration;
  archive_timestamp: ISO8601Timestamp;
  locked: boolean;
  invitable?: boolean;
  create_timestamp?: ISO8601Timestamp | null;
}

export enum ThreadAutoArchiveDuration {
  HOUR = 60,
  DAY = 1440,
  THREE_DAYS = 4320,
  WEEK = 10080,
}
