import Member from "../structures/Member.js";
import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all members belonging to this guild.
 */
declare class GuildMemberManager extends BaseCacheManager {
  #private;
  static identifier: string;
  /**
   * Creates a member manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this member manager belongs to.
   */
  constructor(client: any, guild: any);
  /**
   * The guild that this member manager belongs to.
   * @type {Guild}
   * @readonly
   * @public
   */
  get guild(): any;
  /**
   * Fetches a member.
   * @param {String} user_id The id of the member to fetch.
   * @returns {Promise<Member?>} The fetched member.
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  fetch(user_id: any): Promise<any>;
  /**
   * Searches for members via a search query.
   * @param {String} query The search query.
   * @returns {Promise<Array<Member>>} The members which match the search query.
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  search(query: any): Promise<Member[]>;
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
  set(id: any, member: any): Map<any, any>;
  /**
   * Returns the cache manager.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @returns {GuildMemberManager}
   */
  static getCacheManager(client: any, guildId: any): any;
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
  static fetchMember(client: any, guildId: any, userId: any): Promise<any>;
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
  static getMember(client: any, guildId: any, userId: any): any;
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
  static search(client: any, guildId: any, query: any): Promise<Member[]>;
}
export default GuildMemberManager;
