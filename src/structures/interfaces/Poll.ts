import {
  ISO8601Timestamp,
  Snowflake,
  UnixMillisecondsTimestamp,
  UnixTimestamp,
} from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { EmojiRaw } from "./Emoji.js";
import { MessagePollManager } from "src/structures.js";
import {
  MessagePollManagerCacheJSON,
  MessagePollManagerDiscordJSON,
  MessagePollManagerStorageJSON,
} from "src/managers/interfaces/MessagePollManager.js";

export interface PollType {
  readonly guildId: Snowflake;
  readonly guild: GuildType | null;
  readonly question: string;
  readonly answers: PollAnswer[];
  readonly expiry: UnixTimestamp;
  readonly allowMultiselect: boolean;
  readonly layoutType: keyof typeof PollLayoutTypes | null;
  readonly rawLayoutType: PollLayoutTypes;
  readonly _results: MessagePollManager;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): PollCacheJSON | PollDiscordJSON | PollStorageJSON;
}

export interface PollCacheJSON {
  question: PollRawMedia;
  answers: PollRawAnswer[];
  expiry: UnixMillisecondsTimestamp | null;
  allow_multiselect: boolean;
  layout_type: PollLayoutTypes;
  _results: MessagePollManagerCacheJSON;
}

export interface PollDiscordJSON {
  question: PollRawMedia;
  answers: PollRawAnswer[];
  expiry: ISO8601Timestamp | null;
  allow_multiselect: boolean;
  layout_type: PollLayoutTypes;
  results: MessagePollManagerDiscordJSON;
}

export interface PollStorageJSON {
  question: PollRawMedia;
  answers: PollRawAnswer[];
  expiry: UnixTimestamp | null;
  allow_multiselect: boolean;
  layout_type: PollLayoutTypes;
  _results: MessagePollManagerStorageJSON;
}

export interface PollRaw {
  question: PollRawMedia;
  answers: PollRawAnswer[];
  expiry: ISO8601Timestamp | null;
  allow_multiselect: boolean;
  layout_type: PollLayoutTypes;
  results?: PollRawResult;
}

export interface PollRawMedia {
  emoji?: EmojiRaw;
  text?: string;
}

export interface PollRawAnswer {
  answer_id: number;
  poll_media: PollRawMedia;
}

export interface PollRawResult {
  is_finalized: boolean;
  answer_counts: PollRawAnswerCount[];
}

export interface PollRawAnswerCount {
  id: number;
  count: number;
  me_voted: boolean;
}

export enum PollLayoutTypes {
  DEFAULT = 1,
}

export interface PollAnswer {
  answerId: number;
  answer: string;
  result: Snowflake[];
}
