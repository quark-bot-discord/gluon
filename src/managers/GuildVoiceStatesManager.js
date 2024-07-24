// perhaps voice states should be attached to members instead?

const { VoiceState } = require("../structures");

/**
 * Manages all voice states belonging to a guild.
 */
class GuildVoiceStatesManager {
  #cache;
  /**
   * Creates a voice state manager.
   */
  constructor() {
    this.#cache = new Map();
  }

  /**
   * Adds a voice state to the cache.
   * @param {String} id The ID of the voice state to cache.
   * @param {VoiceState} voiceState The voice state to cache.
   */
  set(id, voiceState) {
    if (!(voiceState instanceof VoiceState))
      throw new TypeError("GLUON: VoiceState must be a VoiceState instance.");
    if (typeof id !== "string")
      throw new TypeError("GLUON: VoiceState user ID must be a string.");
    return this.#cache.set(id, voiceState);
  }

  /**
   * Gets a voice state from the cache.
   * @param {String} id The ID of the voice state to retrieve.
   * @returns {VoiceState?}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Deletes a voice state from the cache.
   * @param {String} id The ID of the voice state to delete.
   * @returns {Boolean}
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.delete(id);
  }

  /**
   * Returns the size of the cache.
   * @type {Number}
   * @readonly
   */
  get size() {
    return this.#cache.size;
  }

  toJSON() {
    return [...this.#cache.values()];
  }
}

module.exports = GuildVoiceStatesManager;
