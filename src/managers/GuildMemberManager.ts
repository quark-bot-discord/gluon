import Member from "../structures/Member.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildMemberManager as GuildMemberManagerType,
  Guild as GuildType,
  Member as MemberType,
  StructureIdentifiers,
  Client as ClientType,
} from "#typings/index.d.js";
import { Snowflake } from "#typings/discord.js";
import getGuild from "#src/util/gluon/getGuild.js";

/**
 * Manages all members belonging to this guild.
 */
class GuildMemberManager
  extends BaseCacheManager<MemberType>
  implements GuildMemberManagerType
{
  #_client;
  #guild;
  static identifier = "members" as StructureIdentifiers;
  /**
   * Creates a member manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this member manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType) {
    super(client, { structureType: GuildMemberManager });

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
     * The guild that this member manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;
  }

  /**
   * The guild that this member manager belongs to.
   * @type {Guild}
   * @readonly
   * @public
   */
  get guild() {
    return this.#guild;
  }

  fetchFromRules(key: string): Promise<MemberType | null> {
    return super.fetchFromRules(key) as Promise<MemberType | null>;
  }

  fetchWithRules(key: string): Promise<MemberType | null> {
    return super.fetchWithRules(key) as Promise<MemberType | null>;
  }

  /**
   * Fetches a member.
   * @param {String} user_id The id of the member to fetch.
   * @returns {Promise<Member?>} The fetched member.
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  fetch(user_id: Snowflake) {
    return GuildMemberManager.fetchMember(
      this.#_client,
      this.#guild.id,
      user_id,
    );
  }

  /**
   * Searches for members via a search query.
   * @param {String} query The search query.
   * @returns {Promise<Array<Member>>} The members which match the search query.
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  search(query: string) {
    if (typeof query !== "string")
      throw new TypeError("GLUON: Query must be a string.");

    return GuildMemberManager.search(this.#_client, this.#guild.id, query);
  }

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
  set(id: Snowflake, member: MemberType) {
    if (!(member instanceof Member))
      throw new TypeError("GLUON: Member must be a Member instance.");
    return super.set(id, member);
  }

  get(id: Snowflake) {
    return super.get(id) as MemberType | null;
  }

  static getCacheManager(
    client: ClientType,
    guildId: Snowflake,
  ): GuildMemberManagerType {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");

    const guild = client.guilds.get(guildId);

    if (!guild) {
      throw new Error(`GLUON: Guild ${guildId} not found in cache.`);
    }

    return guild.members;
  }

  static async fetchMember(
    client: ClientType,
    guildId: Snowflake,
    userId: Snowflake,
  ): Promise<MemberType> {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID is not a string.");

    const guild = getGuild(client, guildId);

    if (!guild) {
      throw new Error(`GLUON: Guild ${guildId} not found in cache.`);
    }

    const cached = guild.members.get(userId);
    if (cached) return cached;

    const data = await client.request.makeRequest("getGuildMember", [
      guildId,
      userId,
    ]);

    return new Member(client, data, {
      userId,
      guildId,
    });
  }

  static getMember(client: ClientType, guildId: Snowflake, userId: Snowflake) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID is not a string.");

    const guild = getGuild(client, guildId);

    if (!guild) {
      throw new Error(`GLUON: Guild ${guildId} not found in cache.`);
    }

    return guild.members.get(userId);
  }

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
  static async search(client: ClientType, guildId: Snowflake, query: string) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof query !== "string")
      throw new TypeError("GLUON: Query is not a string.");

    const body = {};

    // @ts-expect-error TS(2339): Property 'query' does not exist on type '{}'.
    body.query = query;

    // @ts-expect-error TS(2339): Property 'limit' does not exist on type '{}'.
    body.limit = 1000;

    const data = await client.request.makeRequest(
      "getSearchGuildMembers",
      [guildId],
      body,
    );
    const members = [];

    for (let i = 0; i < data.length; i++)
      members.push(
        new Member(client, data[i], {
          userId: data[i].user.id,
          guildId,
        }) as MemberType,
      );

    return members;
  }
}

export default GuildMemberManager;
