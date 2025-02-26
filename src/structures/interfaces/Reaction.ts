import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import {
  EmojiCacheJSON,
  EmojiDiscordJSON,
  EmojiStorageJSON,
  EmojiType,
} from "./Emoji.js";

export interface ReactionType {
  count: number;
  reacted: any[];
  reactedIds: Snowflake[];
  guildId: Snowflake;
  guild: GuildType | null;
  emoji: EmojiType;
  initialReactor: Snowflake | null;
  _addReactor(userId: Snowflake): void;
  _removeReactor(userId: Snowflake): void;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): ReactionStorageJSON | ReactionCacheJSON | ReactionDiscordJSON;
}

export interface ReactionStorageJSON {
  emoji: EmojiStorageJSON;
  _reacted: Snowflake[];
  initial_reactor?: Snowflake;
}

export interface ReactionCacheJSON {
  emoji: EmojiCacheJSON;
  _reacted: Snowflake[];
  initial_reactor?: Snowflake;
}

export interface ReactionDiscordJSON {
  emoji: EmojiDiscordJSON;
  count: number;
}

export interface ReactionRaw {
  count: number;
  count_details: ReactionRawCountDetails;
  me: boolean;
  me_burst: boolean;
  emoji: any; // partial emoji
  burst_colors: string[];
}

export interface ReactionRawCountDetails {
  burst: number;
  normal: number;
}
