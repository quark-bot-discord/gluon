import ClientType from "src/interfaces/Client.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildEmojisManager as GuildEmojisManagerType,
  StructureIdentifiers,
  Emoji as EmojiType,
  Guild as GuildType,
} from "../../typings/index.d.js";
import { Snowflake } from "discord-api-types/globals";
/**
 * Manages all emojis within a guild.
 */
declare class GuildEmojisManager
  extends BaseCacheManager
  implements GuildEmojisManagerType
{
  #private;
  static identifier: StructureIdentifiers;
  /**
   * Creates a guild emoji manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this emoji manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType);
  fetchFromRules(key: string): Promise<EmojiType | null>;
  fetchWithRules(key: string): Promise<EmojiType | null>;
  /**
   * Fetches a particular emoji that belongs to this guild.
   * @param {String} emojiId The id of the emoji to fetch.
   * @returns {Promise<Emoji>} The fetched emoji.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  fetch(emojiId: Snowflake): Promise<any>;
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
  static fetchEmoji(
    client: ClientType,
    guildId: Snowflake,
    emojiId: Snowflake,
  ): Promise<any>;
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
  static getEmoji(
    client: ClientType,
    guildId: Snowflake,
    emojiId: Snowflake,
  ): any;
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
  set(id: Snowflake, emoji: EmojiType): void;
  get(key: Snowflake): EmojiType | null;
}
export default GuildEmojisManager;
