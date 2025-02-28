import { Snowflake } from "src/interfaces/gluon.js";
import { BaseCacheManagerType } from "./BaseCacheManager.js";
import {
  UserCacheJSON,
  UserDiscordJSON,
  UserStorageJSON,
  UserType,
} from "src/structures/interfaces/User.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface UserManagerType extends BaseCacheManagerType {
  get(key: Snowflake): UserType | null;
  fetchFromRules(key: Snowflake): Promise<UserType | null>;
  fetchWithRules(key: Snowflake): Promise<UserType | null>;
  set(key: Snowflake, value: UserType, expiry: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: "users" };
  size: number;
  forEach(
    callbackfn: (
      value: UserType,
      key: Snowflake,
      map: Map<Snowflake, UserType>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ): UserCacheJSON[] | UserDiscordJSON[] | UserStorageJSON[];
}
