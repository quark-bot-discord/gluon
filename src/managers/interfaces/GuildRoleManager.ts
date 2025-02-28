import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  RoleCacheJSON,
  RoleDiscordJSON,
  RoleStorageJSON,
  RoleType,
} from "src/structures/interfaces/Role.js";
import {
  BaseCacheManagerType,
  StructureIdentifiers,
} from "./BaseCacheManager.js";

export interface GuildRoleManagerType extends BaseCacheManagerType {
  get(key: Snowflake): RoleType | null;
  fetchFromRules(key: Snowflake): Promise<RoleType | null>;
  fetchWithRules(key: Snowflake): Promise<RoleType | null>;
  set(key: Snowflake, value: RoleType, expiry: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: RoleType,
      key: Snowflake,
      map: Map<Snowflake, RoleType>,
    ) => void,
  ): void;
  has(key: string): boolean;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): RoleStorageJSON[] | RoleCacheJSON[] | RoleDiscordJSON[];
}
