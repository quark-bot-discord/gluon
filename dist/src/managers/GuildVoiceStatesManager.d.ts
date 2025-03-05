import BaseCacheManager from "./BaseCacheManager.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  GuildVoiceStatesManager as GuildVoiceStatesManagerType,
  StructureIdentifiers,
  VoiceState as VoiceStateType,
  Client as ClientType,
} from "../../typings/index.d.js";
/**
 * Manages all voice states belonging to a guild.
 */
declare class GuildVoiceStatesManager
  extends BaseCacheManager<VoiceStateType>
  implements GuildVoiceStatesManagerType
{
  static identifier: StructureIdentifiers;
  constructor(client: ClientType);
  fetchFromRules(key: string): Promise<VoiceStateType | null>;
  fetchWithRules(key: string): Promise<VoiceStateType | null>;
  /**
   * Adds a voice state to the cache.
   * @param {String} id The ID of the voice state to cache.
   * @param {VoiceState} voiceState The voice state to cache.
   * @returns {VoiceState}
   * @throws {TypeError}
   * @public
   * @method
   * @override
   */
  set(id: Snowflake, voiceState: VoiceStateType): void;
  get(id: Snowflake): VoiceStateType | null;
}
export default GuildVoiceStatesManager;
