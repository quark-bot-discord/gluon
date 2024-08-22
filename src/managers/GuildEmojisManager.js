import Client from "../Client.js";
import Emoji from "../structures/Emoji.js";
import BaseCacheManager from "./BaseCacheManager.js";

/**
 * Manages all emojis within a guild.
 */
class GuildEmojisManager extends BaseCacheManager {
  #_client;
  #guild;
  static identifier = "emojis";
  /**
   * Creates a guild emoji manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this emoji manager belongs to.
   */
  constructor(client, guild) {
    super(client, { structureType: GuildEmojisManager });

    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");

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
  }

  /**
   * Fetches a particular emoji that belongs to this guild.
   * @param {String} emoji_id The id of the emoji to fetch.
   * @returns {Promise<Emoji>} The fetched emoji.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(emoji_id) {
    if (typeof emoji_id !== "string")
      throw new TypeError("GLUON: Emoji ID must be a string.");

    const cached = await this.get(emoji_id);
    if (cached) return cached;

    const data = await this.#_client.request.makeRequest("getEmoji", [
      this.#guild.id,
      emoji_id,
    ]);

    return new Emoji(this.#_client, data, { guildId: this.#guild.id });
  }

  /**
   * Adds an emoji to the cache.
   * @param {String} id The ID of the emoji to cache.
   * @param {Emoji} emoji The emoji to cache.
   * @returns {Emoji}
   * @public
   * @method
   * @throws {TypeError}
   * @override
   */
  set(id, emoji) {
    if (!(emoji instanceof Emoji))
      throw new TypeError("GLUON: Emoji must be an instance of Emoji.");
    return super.set(id, emoji);
  }
}

export default GuildEmojisManager;
