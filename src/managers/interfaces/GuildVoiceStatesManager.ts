import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  VoiceStateCacheJSON,
  VoiceStateDiscordJSON,
  VoiceStateStorageJSON,
  VoiceStateType,
} from "src/structures/interfaces/VoiceState.js";
import {
  BaseCacheManagerType,
  StructureIdentifiers,
} from "./BaseCacheManager.js";

export interface GuildVoiceStatesManagerType extends BaseCacheManagerType {
  get(key: Snowflake): VoiceStateType | null;
  fetchFromRules(key: Snowflake): Promise<VoiceStateType | null>;
  fetchWithRules(key: Snowflake): Promise<VoiceStateType | null>;
  set(key: Snowflake, value: VoiceStateType, expiry: number): void;
  delete(key: Snowflake): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: VoiceStateType,
      key: Snowflake,
      map: Map<Snowflake, VoiceStateType>,
    ) => void,
  ): void;
  has(key: Snowflake): boolean;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): VoiceStateCacheJSON[] | VoiceStateDiscordJSON[] | VoiceStateStorageJSON[];
}
