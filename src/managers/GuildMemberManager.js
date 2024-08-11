import Guild from "../structures/Guild.js";
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
    super(client, { useRedis: true, structureType: GuildMemberManager });
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
   * Fetches a member.
   * @param {String} user_id The id of the member to fetch.
   * @returns {Promise<Member>} The fetched member.
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  async fetch(user_id) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    const cached = await this.get(user_id);
    if (cached) return cached;

    const data = await this.#_client.request.makeRequest("getGuildMember", [
      this.#guild.id,
      user_id,
    ]);

    return new Member(this.#_client, data, {
      user_id,
      guild_id: this.#guild.id,
      user: data.user,
    });
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
  async search(query) {
    if (typeof query !== "string")
      throw new TypeError("GLUON: Query must be a string.");

    const body = {};

    body.query = query;

    body.limit = 1000;

    const data = await this.#_client.request.makeRequest(
      "getSearchGuildMembers",
      [this.#guild.id],
      body,
    );
    if (data.length != 0) {
      const members = [];

      for (let i = 0; i < data.length; i++)
        members.push(
          new Member(this.#_client, data[i], {
            user_id: data[i].user.id,
            guild_id: this.#guild.id,
            user: data[i].user,
          }),
        );

      return members;
    } else return null;
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
}

export default GuildMemberManager;
