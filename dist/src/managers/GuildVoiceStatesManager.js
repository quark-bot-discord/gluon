import VoiceState from "../structures/VoiceState.js";
import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all voice states belonging to a guild.
 */
class GuildVoiceStatesManager extends BaseCacheManager {
  constructor(client) {
    super(client, { structureType: GuildVoiceStatesManager });
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
  }
  fetchFromRules(key) {
    return super.fetchFromRules(key);
  }
  fetchWithRules(key) {
    return super.fetchWithRules(key);
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
  set(id, voiceState) {
    if (!(voiceState instanceof VoiceState))
      throw new TypeError("GLUON: VoiceState must be a VoiceState instance.");
    return super.set(id, voiceState);
  }
  get(id) {
    return super.get(id);
  }
}
GuildVoiceStatesManager.identifier = "voicestates";
export default GuildVoiceStatesManager;
//# sourceMappingURL=GuildVoiceStatesManager.js.map
