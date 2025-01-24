export default GuildManager;
/**
 * Manages all guilds belonging to this client.
 */
declare class GuildManager extends BaseCacheManager {
    static identifier: string;
    /**
     * Returns the cache manager.
     * @param {Client} client The client instance.
     * @returns {GuildManager}
     */
    static getCacheManager(client: Client): GuildManager;
    /**
     * Gets a guild from the cache.
     * @param {Client} client The client instance.
     * @param {String} guildId The ID of the guild to get.
     * @returns {Guild?}
     * @public
     * @method
     * @throws {TypeError}
     * @static
     */
    public static getGuild(client: Client, guildId: string): Guild | null;
    /**
     * Creates a guild manager.
     * @param {Client} client The client instance.
     */
    constructor(client: Client);
    /**
     * Adds a guild to the cache.
     * @param {String} id The ID of the guild to cache
     * @param {Guild} guild The guild to cache.
     * @returns {Guild}
     * @public
     * @method
     * @throws {TypeError}
     * @override
     */
    public override set(id: string, guild: Guild): Guild;
    #private;
}
import BaseCacheManager from "./BaseCacheManager.js";
import Guild from "../structures/Guild.js";
import Client from "../Client.js";
//# sourceMappingURL=GuildManager.d.ts.map