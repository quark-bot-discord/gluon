import {
  ISO8601Timestamp,
  Snowflake,
  UnixMillisecondsTimestamp,
  UnixTimestamp,
} from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface InviteType {
  channelId: Snowflake;
  channel: any;
  id: Snowflake;
  code: string;
  guildId: Snowflake;
  guild: GuildType | null;
  uses: number;
  expires: UnixTimestamp;
  inviter: any;
  inviterId: Snowflake;
  url: string;
  maxUses: number;
  getUrl(code: any): string;
  shouldCache(gluonCacheOptions: any, guildCacheOptions: any): boolean;
  toString(): string;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ): InviteStorageJSON | InviteCacheJSON | InviteDiscordJSON;
}

export interface InviteStorageJSON {
  code: string;
  channel: any;
  inviter: any;
  uses: number;
  expires: UnixMillisecondsTimestamp | undefined;
  max_uses: number;
}

export interface InviteCacheJSON {
  code: string;
  channel: any;
  inviter: any;
  uses: number;
  expires: ISO8601Timestamp | undefined;
  max_uses: number;
}

export interface InviteDiscordJSON {
  code: string;
  channel: any;
  inviter: any;
  uses: number;
  expires_at: ISO8601Timestamp | undefined;
  max_uses: number;
}

export interface InviteRaw {
  type: InviteTypes;
  code: string;
  guild?: any; // partial guild object
  channel: any | null; // partial channel object
  inviter?: any; // user object
  target_type?: InviteTargetTypes;
  target_user?: any; // user object
  target_application?: any; // partial application object
  approximate_presence_count?: number;
  approximate_member_count?: number;
  expires_at?: ISO8601Timestamp | null;
  stage_instance?: any; // invite stage instance object
  guild_scheduled_event?: any; // guild scheduled event object
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
