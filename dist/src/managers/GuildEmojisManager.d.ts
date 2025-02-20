export default GuildEmojisManager;
/**
 * Manages all emojis within a guild.
 */
declare class GuildEmojisManager extends BaseCacheManager {
    static identifier: string;
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
    public static fetchEmoji(client: Client, guildId: string, emojiId: string): Promise<Emoji>;
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
    public static getEmoji(client: Client, guildId: string, emojiId: string): Emoji | null;
    /**
     * Creates a guild emoji manager.
     * @param {Client} client The client instance.
     * @param {Guild} guild The guild that this emoji manager belongs to.
     */
    constructor(client: Client, guild: Guild);
    /**
     * Fetches a particular emoji that belongs to this guild.
     * @param {String} emojiId The id of the emoji to fetch.
     * @returns {Promise<Emoji>} The fetched emoji.
     * @public
     * @async
     * @method
     * @throws {TypeError | Error}
     */
    public fetch(emojiId: string): Promise<Emoji>;
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
    public override set(id: string, emoji: Emoji): Emoji;
    #private;
}
import BaseCacheManager from "./BaseCacheManager.js";
import Emoji from "../structures/Emoji.js";
import Client from "../Client.js";
//# sourceMappingURL=GuildEmojisManager.d.ts.map