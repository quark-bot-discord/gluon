import { Snowflake } from "src/interfaces/gluon.js";
import { BaseCacheManagerType } from "./BaseCacheManager.js";
import {
  EmojiCacheJSON,
  EmojiDiscordJSON,
  EmojiStorageJSON,
  EmojiType,
} from "src/structures/interfaces/Emoji.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface GuildEmojisManagerType extends BaseCacheManagerType {
  get(key: Snowflake): EmojiType | null;
  fetch(key: Snowflake): Promise<EmojiType | null>;
  fetchFromRules(key: Snowflake): Promise<EmojiType | null>;
  fetchWithRules(key: Snowflake): Promise<EmojiType | null>;
  set(key: Snowflake, value: EmojiType, expiry: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: "emojis" };
  size: number;
  forEach(
    callbackfn: (
      value: EmojiType,
      key: Snowflake,
      map: Map<Snowflake, EmojiType>,
    ) => void,
  ): void;
  has(key: string): boolean;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ): EmojiStorageJSON[] | EmojiDiscordJSON[] | EmojiCacheJSON[];
}
