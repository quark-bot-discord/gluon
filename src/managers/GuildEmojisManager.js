import Client from "../Client.js";
import Emoji from "../structures/Emoji.js";
import BaseCacheManager from "./BaseCacheManager.js";
import GuildManager from "./GuildManager.js";

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
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");

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
   * @param {String} emojiId The id of the emoji to fetch.
   * @returns {Promise<Emoji>} The fetched emoji.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(emojiId) {
    if (typeof emojiId !== "string")
      throw new TypeError("GLUON: Emoji ID must be a string.");

    return GuildEmojisManager.fetchEmoji(
      this.#_client,
      this.#guild.id,
      emojiId,
    );
  }

  /**
   * Fetches a particular emoji that belongs to this guild, checking the cache first.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild to fetch the emoji from.
   * @param {String} emojiId The ID of the emoji to fetch.
   * @returns {Promise<Emoji>} The fetched emoji.
   * @public
   * @method
   * @static
   * @async
   * @throws {TypeError}
   */
  static async fetchEmoji(client, guildId, emojiId) {
    if (!(client instanceof Client)) {
      throw new TypeError("GLUON: Client must be a Client instance.");
    }
    if (typeof guildId !== "string") {
      throw new TypeError("GLUON: Guild ID must be a string.");
    }
    if (typeof emojiId !== "string") {
      throw new TypeError("GLUON: Emoji ID must be a string.");
    }

    const cached = GuildEmojisManager.getEmoji(client, guildId, emojiId);
    if (cached) return cached;

    const data = await client.request.makeRequest("getEmoji", [
      guildId,
      emojiId,
    ]);

    return new Emoji(client, data, { guildId });
  }

  /**
   * Gets an emoji from the cache.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild to get the emoji from.
   * @param {String} emojiId The ID of the emoji to get.
   * @returns {Emoji?}
   * @public
   * @method
   * @static
   * @throws {TypeError}
   */
  static getEmoji(client, guildId, emojiId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof emojiId !== "string")
      throw new TypeError("GLUON: Emoji ID must be a string.");
    return GuildManager.getGuild(client, guildId).emojis.get(emojiId);
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
