import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  AnyChannelType,
  ChannelCacheJSON,
  ChannelDiscordJSON,
  ChannelStorageJSON,
  ChannelType,
} from "src/structures/interfaces/Channel.js";
import {
  BaseCacheManagerType,
  StructureIdentifiers,
} from "./BaseCacheManager.js";

export interface GuildChannelsManagerType extends BaseCacheManagerType {
  get(key: Snowflake): AnyChannelType | null;
  fetch(key: Snowflake): Promise<AnyChannelType | null>;
  fetchFromRules(key: Snowflake): Promise<ChannelType | null>;
  fetchWithRules(key: Snowflake): Promise<ChannelType | null>;
  set(key: Snowflake, value: ChannelType, expiry: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: ChannelType,
      key: Snowflake,
      map: Map<Snowflake, ChannelType>,
    ) => void,
  ): void;
  has(key: string): boolean;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): ChannelStorageJSON[] | ChannelDiscordJSON[] | ChannelCacheJSON[];
}
