import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  ScheduledEventCacheJSON,
  ScheduledEventDiscordJSON,
  ScheduledEventStorageJSON,
  ScheduledEventType,
} from "src/structures/interfaces/ScheduledEvent.js";
import {
  BaseCacheManagerType,
  StructureIdentifiers,
} from "./BaseCacheManager.js";

export interface GuildScheduledEventManagerType extends BaseCacheManagerType {
  get(key: Snowflake): ScheduledEventType | null;
  fetchFromRules(key: Snowflake): Promise<ScheduledEventType | null>;
  fetchWithRules(key: Snowflake): Promise<ScheduledEventType | null>;
  set(key: Snowflake, value: ScheduledEventType, expiry: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: ScheduledEventType,
      key: Snowflake,
      map: Map<Snowflake, ScheduledEventType>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  list(): Promise<ScheduledEventType[]>;
  fetch(key: Snowflake): Promise<ScheduledEventType | null>;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ):
    | ScheduledEventCacheJSON[]
    | ScheduledEventStorageJSON[]
    | ScheduledEventDiscordJSON[];
}
