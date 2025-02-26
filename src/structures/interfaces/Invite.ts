import {
  ISO8601Timestamp,
  Snowflake,
  UnixMillisecondsTimestamp,
  UnixTimestamp,
} from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ChannelCacheJSON,
  ChannelDiscordJSON,
  ChannelStorageJSON,
  ChannelType,
} from "./Channel.js";
import {
  UserCacheJSON,
  UserDiscordJSON,
  UserRaw,
  UserStorageJSON,
  UserType,
} from "./User.js";
import { ScheduledEventRaw } from "./ScheduledEvent.js";

export interface InviteType {
  readonly channelId: Snowflake | null;
  readonly channel: ChannelType | null;
  readonly id: Snowflake;
  readonly code: string;
  readonly guildId: Snowflake;
  readonly guild: GuildType | null;
  readonly uses: number;
  readonly expires: UnixTimestamp;
  readonly inviter: UserType | null;
  readonly inviterId: Snowflake;
  readonly url: string;
  readonly maxUses: number;
  toString(): string;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ): InviteStorageJSON | InviteCacheJSON | InviteDiscordJSON;
}

export interface InviteStorageJSON {
  code: string;
  channel: ChannelStorageJSON | null;
  inviter: UserStorageJSON | null;
  uses: number;
  expires: UnixMillisecondsTimestamp | undefined;
  max_uses: number;
}

export interface InviteCacheJSON {
  code: string;
  channel: ChannelCacheJSON | null;
  inviter: UserCacheJSON | null;
  uses: number;
  expires: ISO8601Timestamp | undefined;
  max_uses: number;
}

export interface InviteDiscordJSON {
  code: string;
  channel: ChannelDiscordJSON | null;
  inviter: UserDiscordJSON | null;
  uses: number;
  expires_at: ISO8601Timestamp | undefined;
  max_uses: number;
}

export interface InviteRaw {
  type: InviteTypes;
  code: string;
  guild?: any; // partial guild object
  channel: any | null; // partial channel object
  inviter?: UserRaw; // user object
  target_type?: InviteTargetTypes;
  target_user?: UserRaw;
  target_application?: any; // partial application object
  approximate_presence_count?: number;
  approximate_member_count?: number;
  expires_at?: ISO8601Timestamp | null;
  stage_instance?: any; // invite stage instance object
  guild_scheduled_event?: ScheduledEventRaw; // guild scheduled event object
}

export interface InviteMetadataRaw extends InviteRaw {
  uses: number;
  max_uses: number;
  max_age: number;
  temporary: boolean;
  created_at: ISO8601Timestamp;
}

export enum InviteTypes {
  GUILD = 0,
  GROUP_DM = 1,
  FRIEND = 2,
}

export enum InviteTargetTypes {
  STREAM = 1,
  EMBEDDED_APPLICATION = 2,
}
