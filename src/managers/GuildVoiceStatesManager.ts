import VoiceState from "../structures/VoiceState.js";
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
class GuildVoiceStatesManager
  extends BaseCacheManager<VoiceStateType>
  implements GuildVoiceStatesManagerType
{
  static identifier = "voicestates" as StructureIdentifiers;
  constructor(client: ClientType) {
    super(client, { structureType: GuildVoiceStatesManager });

    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
  }
  fetchFromRules(key: string): Promise<VoiceStateType | null> {
    return super.fetchFromRules(key) as Promise<VoiceStateType | null>;
  }

  fetchWithRules(key: string): Promise<VoiceStateType | null> {
    return super.fetchWithRules(key) as Promise<VoiceStateType | null>;
  }
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
  set(id: Snowflake, voiceState: VoiceStateType) {
    if (!(voiceState instanceof VoiceState))
      throw new TypeError("GLUON: VoiceState must be a VoiceState instance.");
    return super.set(id, voiceState);
  }

  get(id: Snowflake) {
    return super.get(id) as VoiceStateType | null;
  }
}

export default GuildVoiceStatesManager;
