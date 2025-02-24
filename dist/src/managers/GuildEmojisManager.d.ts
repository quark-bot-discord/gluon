import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all emojis within a guild.
 */
declare class GuildEmojisManager extends BaseCacheManager {
  #private;
  static identifier: string;
  /**
   * Creates a guild emoji manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this emoji manager belongs to.
   */
  constructor(client: any, guild: any);
  /**
   * Fetches a particular emoji that belongs to this guild.
   * @param {String} emojiId The id of the emoji to fetch.
   * @returns {Promise<Emoji>} The fetched emoji.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  fetch(emojiId: any): Promise<any>;
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
  static fetchEmoji(client: any, guildId: any, emojiId: any): Promise<any>;
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
  static getEmoji(client: any, guildId: any, emojiId: any): any;
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
  set(id: any, emoji: any): Map<any, any>;
}
export default GuildEmojisManager;
