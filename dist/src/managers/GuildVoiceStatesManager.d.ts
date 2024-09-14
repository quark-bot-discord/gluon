export default GuildVoiceStatesManager;
/**
 * Manages all voice states belonging to a guild.
 */
declare class GuildVoiceStatesManager extends BaseCacheManager {
    static identifier: string;
    constructor(client: any);
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
    public override set(id: string, voiceState: VoiceState): VoiceState;
}
import BaseCacheManager from "./BaseCacheManager.js";
import VoiceState from "../structures/VoiceState.js";
//# sourceMappingURL=GuildVoiceStatesManager.d.ts.map