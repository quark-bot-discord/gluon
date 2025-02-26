import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { PermissionsBitfield, Snowflake } from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";

export interface ChannelType {
  readonly mention: string;
  readonly nsfw: boolean;
  readonly guild: GuildType | null;
  readonly parent: ChannelType | null;
  readonly id: Snowflake;
  readonly guildId: Snowflake;
  readonly parentId: Snowflake | null;
  readonly type: ChannelTypes;
  readonly name: string;
  readonly topic: string;
  readonly permissionOverwrites: Array<ChannelOverwriteObject>;
  readonly rateLimitPerUser: number;
  readonly position: number;
  readonly _cacheOptions: ChannelCacheOptions;
  readonly messages: ChannelMessageManager;
  send(options?: {
    content?: string;
    components?: any;
    files?: any;
    embeds?: any;
    suppressMentions?: boolean;
  }): Promise<MessageType>;
  checkPermission(member: MemberType): string;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): ChannelStorageJSON | ChannelCacheJSON | ChannelDiscordJSON;
}

export interface ChannelStorageJSON {
  id: Snowflake;
  type: number;
  name: string;
  topic: string;
  rate_limit_per_user: number;
  position: number;
  parent_id: Snowflake | null;
  _attributes: number;
  _cacheOptions: ChannelCacheOptions;
  messages: any;
  permission_overwrites: ChannelOverwriteObject[];
}

export interface ChannelCacheJSON {
  id: Snowflake;
  type: number;
  name: string;
  topic: string;
  rate_limit_per_user: number;
  position: number;
  parent_id: Snowflake | null;
  nsfw: boolean;
  messages: any;
  permission_overwrites: ChannelOverwriteObject[];
}

export interface ChannelDiscordJSON {
  id: Snowflake;
  type: number;
  name: string;
  topic: string;
  rate_limit_per_user: number;
  position: number;
  parent_id: Snowflake | null;
  nsfw: boolean;
  messages: any;
  permission_overwrites: ChannelOverwriteObject[];
}

export enum ChannelOverwriteType {
  ROLE = 0,
  MEMBER = 1,
}

export interface ChannelOverwriteObject {
  id: Snowflake;
  type: ChannelOverwriteObject;
  allow: PermissionsBitfield;
  deny: PermissionsBitfield;
}

export enum ChannelTypes {
  GUILD_TEXT = 0,
  GUILD_VOICE = 2,
  GUILD_CATEGORY = 4,
  GUILD_NEWS = 5,
  GUILD_NEWS_THREAD = 10,
  GUILD_PUBLIC_THREAD = 11,
  GUILD_PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15,
  GUILD_MEDIA = 16,
}
