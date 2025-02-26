import { Snowflake } from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface EmojiType {
  readonly requireColons: boolean;
  readonly managed: boolean;
  readonly animated: boolean;
  readonly available: boolean;
  readonly mention: string;
  readonly url: string | null;
  readonly guildId: Snowflake;
  readonly guild: GuildType | null;
  readonly id: Snowflake | null;
  readonly name: string | null;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): EmojiCacheJSON | EmojiStorageJSON | EmojiDiscordJSON;
}

export interface EmojiStorageJSON {
  id: Snowflake | null;
  name: string;
  _attributes: number;
}

export interface EmojiCacheJSON {
  id: Snowflake | null;
  name: string;
  _attributes: number;
}

export interface EmojiDiscordJSON {
  id: Snowflake | null;
  name: string;
  animated: boolean;
  managed: boolean;
  require_colons: boolean;
  available: boolean;
}

export interface EmojiRaw {
  id: Snowflake | null;
  name: string | null;
  roles?: Snowflake[];
  user?: any;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}
