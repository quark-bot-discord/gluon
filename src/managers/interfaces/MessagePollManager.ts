import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { PollRawAnswerCount } from "src/structures/interfaces/Poll.js";

export interface MessagePollManagerType {
  _addVote(user_id: Snowflake, answer_id: number): void;
  _removeVote(user_id: Snowflake, answer_id: number): void;
  getResult(answerId: number): Snowflake[];
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ):
    | MessagePollManagerStorageJSON
    | MessagePollManagerCacheJSON
    | MessagePollManagerDiscordJSON;
}

export interface MessagePollManagerStorageJSON {
  [key: string]: Snowflake[];
}

export interface MessagePollManagerCacheJSON {
  [key: string]: Snowflake[];
}

export interface MessagePollManagerDiscordJSON {
  answer_counts: PollRawAnswerCount[];
}
