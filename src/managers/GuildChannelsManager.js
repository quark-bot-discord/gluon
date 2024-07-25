const TextChannel = require("../structures/TextChannel");
const Thread = require("../structures/Thread");
const VoiceChannel = require("../structures/VoiceChannel");
const cacheChannel = require("../util/gluon/cacheChannel");

/**
 * Manages all channels within a guild.
 */
class GuildChannelsManager {
  #_client;
  #guild;
  #cache;

  /**
   * Creates a guild channel manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this channel manager belongs to.
   */
  constructor(client, guild) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The guild that this channel manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;

    /**
     * The cache of channels.
     * @type {Map<String, VoiceChannel | TextChannel | Thread>}
     * @private
     */
    this.#cache = new Map();
  }

  /**
   * Fetches a particular channel belonging to this guild.
   * @param {String} channel_id The id of the channel to fetch.
   * @returns {Promise<VoiceChannel> | Promise<Thread> | Promise<TextChannel>} The fetched channel.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(channel_id) {
    if (typeof channel_id !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");

    const cachedChannel = this.#cache.get(channel_id) || null;
    if (this.#_client.cacheChannels == true) return cachedChannel;

    const data = await this.#_client.request.makeRequest("getChannel", [
      channel_id,
    ]);

    return cacheChannel(this.#_client, data, this.#guild.id);
  }

  /**
   * Gets a channel from the cache.
   * @param {String} id The ID of the channel to retrieve.
   * @returns {(VoiceChannel | TextChannel | Thread)?}
   * @public
   * @method
   * @throws {TypeError}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Adds a channel to the cache.
   * @param {String} id The ID of the channel to cache.
   * @param {VoiceChannel | TextChannel | Thread} channel The channel to cache.
   * @returns {VoiceChannel | TextChannel | Thread}
   * @public
   * @method
   * @throws {TypeError}
   */
  set(id, channel) {
    if (
      !(
        channel instanceof VoiceChannel ||
        channel instanceof TextChannel ||
        channel instanceof Thread
      )
    )
      throw new TypeError(
        "GLUON: Channel must be a VoiceChannel, TextChannel or Thread instance.",
      );
    if (typeof id !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    return this.#cache.set(id, channel);
  }

  /**
   * Deletes a channel from the cache.
   * @param {String} id The ID of the channel to delete.
   * @returns {Boolean}
   * @public
   * @method
   * @throws {TypeError}
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
   * @public
   */
  get size() {
    return this.#cache.size;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return [...this.#cache.values()];
  }
}

module.exports = GuildChannelsManager;
