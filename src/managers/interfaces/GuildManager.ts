import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  GuildCacheJSON,
  GuildDiscordJSON,
  GuildStorageJSON,
  GuildType,
} from "src/structures/interfaces/Guild.js";
import {
  BaseCacheManagerType,
  StructureIdentifiers,
} from "./BaseCacheManager.js";

export interface GuildManagerType extends BaseCacheManagerType {
  get(key: Snowflake): GuildType | null;
  fetchFromRules(key: Snowflake): Promise<GuildType | null>;
  fetchWithRules(key: Snowflake): Promise<GuildType | null>;
  set(key: Snowflake, value: GuildType, expiry: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: GuildType,
      key: Snowflake,
      map: Map<Snowflake, GuildType>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): GuildStorageJSON[] | GuildCacheJSON[] | GuildDiscordJSON[];
}
