const Emoji = require("../structures/Emoji");
const Guild = require("../structures/Guild");

/**
 * Manages all emojis within a guild.
 */
class GuildEmojisManager {
  #_client;
  #guild;
  #cache;
  /**
   * Creates a guild emoji manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this emoji manager belongs to.
   */
  constructor(client, guild) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The guild that this emoji manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;

    /**
     * The cache of emojis.
     * @type {Map<String, Emoji>}
     * @private
     */
    this.#cache = new Map();
  }

  /**
   * Fetches a particular emoji that belongs to this guild.
   * @param {String} emoji_id The id of the emoji to fetch.
   * @returns {Promise<Emoji>} The fetched emoji.
   */
  async fetch(emoji_id) {

    if (typeof emoji_id !== "string")
      throw new TypeError("GLUON: Emoji ID must be a string.");

    const cached = this.#cache.get(emoji_id);
    if (cached) return cached;

    const data = await this.#_client.request.makeRequest("getEmoji", [
      this.#guild.id,
      emoji_id,
    ]);

    return new Emoji(this.#_client, data, { guild_id: this.#guild.id });
  }

  /**
   * Gets an emoji from the cache.
   * @param {String} id The ID of the emoji to retrieve.
   * @returns {Emoji?}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Adds an emoji to the cache.
   * @param {String} id The ID of the emoji to cache.
   * @param {Emoji} emoji The emoji to cache.
   * @returns {Emoji}
   */
  add(id, emoji) {
    if (!(emoji instanceof Emoji))
      throw new TypeError("GLUON: Emoji must be an instance of Emoji.");
    if (typeof id !== "string")
      throw new TypeError("GLUON: Emoji ID must be a string.");
    return this.#cache.set(id, emoji);
  }

  /**
   * Deletes an emoji from the cache.
   * @param {String} id The ID of the emoji to delete.
   * @returns {Boolean}
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.delete(id);
  }

  toJSON() {
    return [...this.#cache.values()];
  }
}

module.exports = GuildEmojisManager;
