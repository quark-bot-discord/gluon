import ClientType from "src/interfaces/Client.js";
import VoiceState from "../structures/VoiceState.js";
import BaseCacheManager from "./BaseCacheManager.js";
import { BaseCacheManagerType } from "./interfaces/BaseCacheManager.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { VoiceStateType } from "src/structures/interfaces/VoiceState.js";

/**
 * Manages all voice states belonging to a guild.
 */
class GuildVoiceStatesManager
  extends BaseCacheManager
  implements BaseCacheManagerType
{
  static identifier = "voicestates";
  constructor(client: ClientType) {
    super(client, { structureType: GuildVoiceStatesManager });

    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
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
