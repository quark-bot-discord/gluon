import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  MessageCacheJSON,
  MessageDiscordJSON,
  MessageStorageJSON,
  MessageType,
} from "src/structures/interfaces/Message.js";
import {
  BaseCacheManagerType,
  StructureIdentifiers,
} from "./BaseCacheManager.js";
import { Snowflake } from "src/interfaces/gluon.js";

export interface ChannelMessageManagerType extends BaseCacheManagerType {
  get(key: Snowflake): MessageType | null;
  fetchFromRules(key: Snowflake): Promise<MessageType | null>;
  fetchWithRules(key: Snowflake): Promise<MessageType | null>;
  set(key: Snowflake, value: MessageType, expiry: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: MessageType,
      key: Snowflake,
      map: Map<Snowflake, MessageType>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): MessageDiscordJSON[] | MessageStorageJSON[] | MessageCacheJSON[];
}
