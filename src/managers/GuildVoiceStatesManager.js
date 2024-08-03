import VoiceState from "../structures/VoiceState.js";
import BaseCacheManager from "./BaseCacheManager.js";

/**
 * Manages all voice states belonging to a guild.
 */
class GuildVoiceStatesManager extends BaseCacheManager {
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
}

export default GuildVoiceStatesManager;
