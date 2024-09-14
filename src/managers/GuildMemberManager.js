import Client from "../Client.js";
import Member from "../structures/Member.js";
import BaseCacheManager from "./BaseCacheManager.js";

/**
 * Manages all members belonging to this guild.
 */
class GuildMemberManager extends BaseCacheManager {
  #_client;
  #guild;
  static identifier = "members";
  /**
   * Creates a member manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this member manager belongs to.
   */
  constructor(client, guild) {
    super(client, { structureType: GuildMemberManager });

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

  /**
   * Fetches a member.
   * @param {String} user_id The id of the member to fetch.
   * @returns {Promise<Member>} The fetched member.
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  fetch(user_id) {
    return GuildMemberManager.fetchMember(
      this.#_client,
      this.#guild.id,
      user_id,
    );
  }

  /**
   * Searches for members via a search query.
   * @param {String} query The search query.
   * @returns {Promise<Array<Member>?>} The members which match the search query.
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  search(query) {
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
  set(id, member) {
    if (!(member instanceof Member))
      throw new TypeError("GLUON: Member must be a Member instance.");
    return super.set(id, member);
  }

  /**
   * Returns the cache manager.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @returns {GuildMemberManager}
   */
  static getCacheManager(client, guildId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return client.guilds.get(guildId).members;
  }

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
  static async fetchMember(client, guildId, userId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client is not a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID is not a string.");

    const cached = GuildMemberManager.getCacheManager(
      client,
      guildId,
    ).guild.members.get(userId);
    if (cached) return cached;

    const data = await client.request.makeRequest("getGuildMember", [
      guildId,
      userId,
    ]);

    return new Member(client, data, {
      userId,
      guildId,
      user: data.user,
    });
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
  static async search(client, guildId, query) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof query !== "string")
      throw new TypeError("GLUON: Query is not a string.");

    const body = {};

    body.query = query;

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
          user: data[i].user,
        }),
      );

    return members;
  }
}

export default GuildMemberManager;
