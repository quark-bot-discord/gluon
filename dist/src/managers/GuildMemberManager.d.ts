export default GuildMemberManager;
/**
 * Manages all members belonging to this guild.
 */
declare class GuildMemberManager extends BaseCacheManager {
    static identifier: string;
    /**
     * Returns the cache manager.
     * @param {Client} client The client instance.
     * @param {String} guildId The ID of the guild.
     * @returns {GuildMemberManager}
     */
    static getCacheManager(client: Client, guildId: string): GuildMemberManager;
    /**
     * Fetches a member, checking the cache first.
     * @param {Client} client The client instance.
     * @param {String} guildId The id of the guild the member belongs to.
     * @param {String} userId The id of the member to fetch.
     * @returns {Promise<Member>}
     * @public
     * @method
     * @async
     * @throws {TypeError}
     * @static
     */
    public static fetchMember(client: Client, guildId: string, userId: string): Promise<Member>;
    /**
     * Gets a member from the cache.
     * @param {Client} client The client instance.
     * @param {String} guildId The ID of the guild.
     * @param {String} userId The ID of the user.
     * @returns {Member?}
     * @public
     * @method
     * @static
     * @throws {TypeError}
     */
    public static getMember(client: Client, guildId: string, userId: string): Member | null;
    /**
     * Searches for members via a search query.
     * @param {Client} client The client instance.
     * @param {String} guildId The id of the guild to search.
     * @param {String} query The search query.
     * @returns {Promise<Array<Member>?>} The members which match the search query.
     * @public
     * @method
     * @async
     * @throws {TypeError}
     * @static
     */
    public static search(client: Client, guildId: string, query: string): Promise<Array<Member> | null>;
    /**
     * Creates a member manager.
     * @param {Client} client The client instance.
     * @param {Guild} guild The guild that this member manager belongs to.
     */
    constructor(client: Client, guild: Guild);
    /**
     * The guild that this member manager belongs to.
     * @type {Guild}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * Fetches a member.
     * @param {String} user_id The id of the member to fetch.
     * @returns {Promise<Member?>} The fetched member.
     * @async
     * @method
     * @public
     * @throws {TypeError | Error}
     */
    public fetch(user_id: string): Promise<Member | null>;
    /**
     * Searches for members via a search query.
     * @param {String} query The search query.
     * @returns {Promise<Array<Member>>} The members which match the search query.
     * @async
     * @method
     * @public
     * @throws {TypeError | Error}
     */
    public search(query: string): Promise<Array<Member>>;
    /**
     * Adds a member to the cache.
     * @param {String} id The ID of the member
     * @param {Member} member The member to cache.
     * @returns {Member}
     * @method
     * @public
     * @throws {TypeError}
     * @override
     */
    public override set(id: string, member: Member): Member;
    #private;
}
import BaseCacheManager from "./BaseCacheManager.js";
import Member from "../structures/Member.js";
import Client from "../Client.js";
//# sourceMappingURL=GuildMemberManager.d.ts.map