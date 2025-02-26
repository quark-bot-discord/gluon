import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ISO8601Timestamp,
  Snowflake,
  UnixMillisecondsTimestamp,
} from "src/interfaces/gluon.js";
import { MemberDiscordJSON, MemberStorageJSON } from "./Member.js";

export interface MessageType {
  readonly id: Snowflake;
  readonly guildId: Snowflake | null;
  readonly channelId: Snowflake;
  readonly content: string | null;
  readonly poll: any | null;
  readonly reactions: any;
  readonly embeds: Array<any>;
  readonly reference: {
    messageId: Snowflake | null;
  };
  readonly flags: Array<string>;
  readonly flagsRaw: number;
  readonly type: number;
  readonly webhookId: Snowflake | null;
  readonly stickerItems: Array<any>;
  readonly messageSnapshots: Array<any> | null;
  readonly url: string;
  readonly hashName: string;
  reply(options?: {
    content?: string;
    embeds?: Array<any>;
    components?: any;
    files?: Array<any>;
    suppressMentions?: boolean;
  }): Promise<any>;
  edit(options?: {
    components?: any;
    files?: Array<any>;
    content?: string;
    embeds?: Array<any>;
    attachments?: Array<any>;
    flags?: number;
    reference?: {
      messageId: Snowflake | null;
      channelId: Snowflake;
      guildId: Snowflake;
    };
  }): Promise<any>;
  delete(options?: { reason?: string }): Promise<void>;
  encrypt(): string;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): MessageStorageJSON | MessageCacheJSON | MessageDiscordJSON;
}

export interface MessageStorageJSON {
  id: Snowflake;
  author: any;
  member: MemberStorageJSON | null;
  content: string;
  _attributes: number;
  attachments: Array<any>;
  embeds: Array<any>;
  edited_timestamp: UnixMillisecondsTimestamp | null;
  poll: any;
  message_snapshots: Array<any> | null;
  type: MessageTypes;
  referenced_message: {
    id: Snowflake | null;
  };
  sticker_items: Array<any>;
  messageReactions: any;
}

export interface MessageCacheJSON {
  id: Snowflake;
  author: any;
  member: MemberStorageJSON | null;
  content: string;
  _attributes: number;
  attachments: Array<any>;
  embeds: Array<any>;
  edited_timestamp: UnixMillisecondsTimestamp | null;
  poll: any;
  message_snapshots: Array<any> | null;
  type: MessageTypes;
  referenced_message: {
    id: Snowflake | null;
  };
  sticker_items: Array<any>;
  messageReactions: any;
}

export interface MessageDiscordJSON {
  id: Snowflake;
  channel_id: Snowflake;
  author: any;
  member: MemberDiscordJSON | null;
  content: string;
  pinned: boolean;
  attachments: Array<any>;
  embeds: Array<any>;
  edited_timestamp: UnixMillisecondsTimestamp | null;
  poll: any;
  message_snapshots: Array<any> | null;
  type: MessageTypes;
  referenced_message: {
    id: Snowflake | null;
  };
  sticker_items: Array<any>;
  reactions: any;
  mention_everyone: boolean;
  mention_roles: Array<string>;
  mentions: Array<string>;
}

export interface MessageRaw {
  id: Snowflake;
  channel_id: Snowflake;
  author: any;
  content: string;
  timestamp: ISO8601Timestamp;
  edited_timestamp: ISO8601Timestamp | null;
  tts: boolean;
  mention_everyone: boolean;
  mentions: Array<any>;
  mention_roles: Array<Snowflake>;
  mention_channels: Array<MessageChannelMentionObject>;
  attachments: Array<any>;
  embeds: Array<any>;
  reactions?: Array<any>;
  nonce?: number | string;
  pinned: boolean;
  webhook_id?: Snowflake;
  type: MessageTypes;
  activity?: MessageActivityObject;
  application?: any; // partial application object
  application_id?: Snowflake;
  flags?: number;
  message_reference?: any; // message reference object
  message_snapshots?: Array<any>;
  referenced_message?: any; // message object
  interaction_metadata?: any; // message interaction metadata object
  interaction?: any; // message interaction object
  thread?: any; // channel object
  components?: Array<any>;
  sticker_items?: Array<any>;
  stickers?: Array<any>; // deprecated
  position?: number;
  role_subscription_data?: any; // role subscription data object
  resolved?: any; // resolved data
  poll?: any;
  call?: any; // message call object
}

export enum MessageTypes {
  DEFAULT = 0,
  RECIPIENT_ADD = 1,
  RECIPIENT_REMOVE = 2,
  CALL = 3,
  CHANNEL_NAME_CHANGE = 4,
  CHANNEL_ICON_CHANGE = 5,
  CHANNEL_PINNED_MESSAGE = 6,
  USER_JOIN = 7,
  GUILD_BOOST = 8,
  GUILD_BOOST_TIER_1 = 9,
  GUILD_BOOST_TIER_2 = 10,
  GUILD_BOOST_TIER_3 = 11,
  CHANNEL_FOLLOW_ADD = 12,
  GUILD_DISCOVERY_DISQUALIFIED = 14,
  GUILD_DISCOVERY_REQUALIFIED = 15,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
  THREAD_CREATED = 18,
  REPLY = 19,
  CHAT_INPUT_COMMAND = 20,
  THREAD_STARTER_MESSAGE = 21,
  GUILD_INVITE_REMINDER = 22,
  CONTEXT_MENU_COMMAND = 23,
  AUTO_MODERATION_ACTION = 24,
  ROLE_SUBSCRIPTION_PURCHASE = 25,
  INTERACTION_PREMIUM_UPSELL = 26,
  STAGE_START = 27,
  STAGE_END = 28,
  STAGE_SPEAKER = 29,
  STAGE_TOPIC = 31,
  GUILD_APPLICATION_PREMIUM_SUBSCRIPTION = 32,
  GUILD_INCIDENT_ALERT_MODE_ENABLED = 36,
  GUILD_INCIDENT_ALERT_MODE_DISABLED = 37,
  GUILD_INCIDENT_REPORT_RAID = 38,
  GUILD_INCIDENT_REPORT_FALSE_ALARM = 39,
  PURCHASE_NOTIFICATION = 44,
  POLL_RESULT = 46,
}

export interface MessageChannelMentionObject {
  id: Snowflake;
  guild_id: Snowflake;
  type: number;
  name: string;
}

export interface MessageActivityObject {
  type: number;
  party_id?: string;
}
