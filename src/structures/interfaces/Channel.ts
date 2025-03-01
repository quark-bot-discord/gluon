import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ISO8601Timestamp,
  PermissionsBitfield,
  Snowflake,
} from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import {
  PermissionOverwriteCacheJSON,
  PermissionOverwriteDiscordJSON,
  PermissionOverwriteRaw,
  PermissionOverwriteStorageJSON,
  PermissionOverwriteType,
} from "./PermissionOverwrite.js";
import {
  ThreadAutoArchiveDuration,
  ThreadRawMember,
  ThreadRawMetadata,
  ThreadType,
} from "./Thread.js";
import { TextChannelType } from "./TextChannel.js";
import { VoiceChannelType } from "./VoiceChannel.js";
import { MemberType } from "./Member.js";
import { UserRaw } from "./User.js";
import {
  MessageCacheJSON,
  MessageDiscordJSON,
  MessageStorageJSON,
  MessageType,
} from "./Message.js";
import { ChannelCacheOptionsType } from "src/managers/interfaces/ChannelCacheOptions.js";
import { ChannelMessageManagerType } from "src/managers/interfaces/ChannelMessageManager.js";
import { CategoryChannelType } from "./CategoryChannel.js";
import { FileUploadType } from "src/util/builder/interfaces/fileUpload.js";
import { EmbedBuilderType } from "src/util/builder/interfaces/embedBuilder.js";
import { MessageComponentsType } from "src/util/builder/interfaces/messageComponents.js";

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
  readonly permissionOverwrites: Array<PermissionOverwriteType>;
  readonly rateLimitPerUser: number;
  readonly position: number;
  readonly _cacheOptions: ChannelCacheOptionsType;
  readonly messages: ChannelMessageManagerType;
  send(options: {
    content?: string;
    components?: MessageComponentsType;
    files?: FileUploadType[];
    embeds?: EmbedBuilderType[];
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
  parent_id?: Snowflake | null;
  _attributes: number;
  _cacheOptions: number;
  messages: MessageStorageJSON[];
  permission_overwrites: PermissionOverwriteStorageJSON[];
}

export interface ChannelCacheJSON {
  id: Snowflake;
  type: number;
  name: string;
  topic: string;
  rate_limit_per_user: number;
  position: number;
  parent_id?: Snowflake | null;
  nsfw: boolean;
  messages: MessageCacheJSON[];
  permission_overwrites: PermissionOverwriteCacheJSON[];
}

export interface ChannelDiscordJSON {
  id: Snowflake;
  type: number;
  name: string;
  topic: string;
  rate_limit_per_user: number;
  position: number;
  parent_id?: Snowflake | null;
  nsfw: boolean;
  messages: MessageDiscordJSON[];
  permission_overwrites: PermissionOverwriteDiscordJSON[];
}

export interface ChannelRaw {
  id: Snowflake;
  type: ChannelTypes;
  guild_id?: Snowflake;
  position?: number;
  permission_overwrites?: Array<PermissionOverwriteRaw>;
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: Snowflake;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: UserRaw[];
  icon?: string | null;
  owner_id?: Snowflake;
  application_id?: Snowflake;
  managed?: boolean;
  parent_id?: Snowflake | null;
  last_pin_timestamp?: ISO8601Timestamp;
  rtc_region?: string | null;
  video_quality_mode?: number;
  message_count?: number;
  member_count?: number;
  thread_metadata?: ThreadRawMetadata;
  member?: ThreadRawMember;
  default_auto_archive_duration?: ThreadAutoArchiveDuration;
  permissions?: PermissionsBitfield;
  flags?: number;
  total_message_sent?: number;
  available_tags?: ForumTagRaw[];
  applied_tags?: Snowflake[];
  default_reaction_emoji?: DefaultReactionRaw | null;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: ChannelSortOrderTypes;
  default_forum_layout?: ForumLayoutTypes;
}

export enum ChannelOverwriteType {
  ROLE = 0,
  MEMBER = 1,
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

export type ChannelsText = ChannelTypes.GUILD_TEXT | ChannelTypes.GUILD_NEWS;

export type ChannelsVoice =
  | ChannelTypes.GUILD_VOICE
  | ChannelTypes.GUILD_STAGE_VOICE;

export type ChannelsThread =
  | ChannelTypes.GUILD_NEWS_THREAD
  | ChannelTypes.GUILD_PUBLIC_THREAD
  | ChannelTypes.GUILD_PRIVATE_THREAD;

export type ChannelsCategory = ChannelTypes.GUILD_CATEGORY;

export type ChannelsOther = ChannelTypes.GUILD_DIRECTORY;

export type ChannelsForum = ChannelTypes.GUILD_FORUM | ChannelTypes.GUILD_MEDIA;

export type AllChannelTypes = TextChannelType | VoiceChannelType | ThreadType;

export type AnyChannelType = AllChannelTypes | CategoryChannelType;

export type AllChannelTypesNoThreads = TextChannelType | VoiceChannelType;

export interface ForumTagRaw extends DefaultReactionRaw {
  id: Snowflake;
  name: string;
  moderated: boolean;
}

export interface DefaultReactionRaw {
  emoji_id: Snowflake | null;
  emoji_name: string | null;
}

export enum ChannelSortOrderTypes {
  LATEST_ACTIVITY = 0,
  CREATION_DATE = 1,
}

export enum ForumLayoutTypes {
  NOT_SET = 0,
  LIST_VIEW = 1,
  GALLERY_VIEW = 2,
}
