import Emoji from "../structures/Emoji.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildEmojisManager as GuildEmojisManagerType,
  StructureIdentifiers,
  Emoji as EmojiType,
  Guild as GuildType,
  Client as ClientType,
} from "#typings/index.d.js";
import { Snowflake } from "#typings/discord.js";
import getGuild from "#src/util/gluon/getGuild.js";

/**
 * Manages all emojis within a guild.
 */
class GuildEmojisManager
  extends BaseCacheManager<EmojiType>
  implements GuildEmojisManagerType
{
  #_client;
  #guild;
  static identifier = "emojis" as StructureIdentifiers;
  /**
   * Creates a guild emoji manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this emoji manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType) {
    super(client, { structureType: GuildEmojisManager });

    if (!client)
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

  fetchFromRules(key: string): Promise<EmojiType | null> {
    return super.fetchFromRules(key) as Promise<EmojiType | null>;
  }

  fetchWithRules(key: string): Promise<EmojiType | null> {
    return super.fetchWithRules(key) as Promise<EmojiType | null>;
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
  async fetch(emojiId: Snowflake) {
    if (typeof emojiId !== "string")
      throw new TypeError("GLUON: Emoji ID must be a string.");

    return GuildEmojisManager.fetchEmoji(
      this.#_client,
      this.#guild.id,
      emojiId,
    );
  }

  static async fetchEmoji(
    client: ClientType,
    guildId: Snowflake,
    emojiId: Snowflake,
  ): Promise<EmojiType> {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
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

  static getEmoji(
    client: ClientType,
    guildId: Snowflake,
    emojiId: Snowflake,
  ): EmojiType | null {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof emojiId !== "string")
      throw new TypeError("GLUON: Emoji ID must be a string.");
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error("GLUON: Guild not found in cache.");
    }
    return guild.emojis.get(emojiId);
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
  set(id: Snowflake, emoji: EmojiType) {
    if (!(emoji instanceof Emoji))
      throw new TypeError("GLUON: Emoji must be an instance of Emoji.");
    return super.set(id, emoji);
  }

  get(key: Snowflake) {
    return super.get(key) as EmojiType | null;
  }
}

export default GuildEmojisManager;
