import { Snowflake } from "src/interfaces/gluon.js";
import { BaseCacheManagerType } from "./BaseCacheManager.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  MemberCacheJSON,
  MemberDiscordJSON,
  MemberStorageJSON,
  MemberType,
} from "src/structures/interfaces/Member.js";

export interface GuildMemberManagerType extends BaseCacheManagerType {
  get(key: Snowflake): MemberType | null;
  fetchFromRules(key: Snowflake): Promise<MemberType | null>;
  fetchWithRules(key: Snowflake): Promise<MemberType | null>;
  set(key: Snowflake, value: MemberType, expiry: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: "members" };
  size: number;
  forEach(
    callbackfn: (
      value: MemberType,
      key: Snowflake,
      map: Map<Snowflake, MemberType>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ): MemberCacheJSON[] | MemberStorageJSON[] | MemberDiscordJSON[];
}
