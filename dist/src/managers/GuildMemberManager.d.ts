import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildMemberManager as GuildMemberManagerType,
  Guild as GuildType,
  Member as MemberType,
  StructureIdentifiers,
  Client as ClientType,
} from "#typings/index.d.js";
import { Snowflake } from "#typings/discord.js";
/**
 * Manages all members belonging to this guild.
 */
declare class GuildMemberManager
  extends BaseCacheManager<MemberType>
  implements GuildMemberManagerType
{
  #private;
  static identifier: StructureIdentifiers;
  /**
   * Creates a member manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this member manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType);
  /**
   * The guild that this member manager belongs to.
   * @type {Guild}
   * @readonly
   * @public
   */
  get guild(): GuildType;
  fetchFromRules(key: string): Promise<MemberType | null>;
  fetchWithRules(key: string): Promise<MemberType | null>;
  /**
   * Fetches a member.
   * @param {String} user_id The id of the member to fetch.
   * @returns {Promise<Member?>} The fetched member.
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  fetch(user_id: Snowflake): Promise<MemberType>;
  /**
   * Searches for members via a search query.
   * @param {String} query The search query.
   * @returns {Promise<Array<Member>>} The members which match the search query.
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  search(query: string): Promise<MemberType[]>;
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
  set(id: Snowflake, member: MemberType): void;
  get(id: Snowflake): MemberType | null;
  static getCacheManager(
    client: ClientType,
    guildId: Snowflake,
  ): GuildMemberManagerType;
  static fetchMember(
    client: ClientType,
    guildId: Snowflake,
    userId: Snowflake,
  ): Promise<MemberType>;
  static getMember(
    client: ClientType,
    guildId: Snowflake,
    userId: Snowflake,
  ): MemberType | null;
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
  static search(
    client: ClientType,
    guildId: Snowflake,
    query: string,
  ): Promise<MemberType[]>;
}
export default GuildMemberManager;
