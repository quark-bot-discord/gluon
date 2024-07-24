const Guild = require("../structures/Guild");
const Member = require("../structures/Member");
const User = require("../structures/User");

/**
 * Manages all members belonging to this guild.
 */
class GuildMemberManager {
  #_client;
  #guild;
  #cache;

  /**
   * Creates a member manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this member manager belongs to.
   */
  constructor(client, guild) {
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

    /**
     * The cache of members.
     * @type {Map<String, Member>}
     * @private
     */
    this.#cache = new Map();
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

    const cached = this.#cache.get(user_id);
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
      body
    );
    if (data.length != 0) {
      const members = [];

      for (let i = 0; i < data.length; i++)
        members.push(
          new Member(this.#_client, data[i], {
            user_id: data[i].user.id,
            guild_id: this.#guild.id,
            user: data[i].user,
          })
        );

      return members;
    } else return null;
  }

  /**
   * Sweeps all members which have been flagged for deletion.
   * @param {Number} cacheCount The maximum number of users which may be cached.
   * @returns {Number} The remaining number of cached members.
   * @method
   * @public
   * @throws {TypeError}
   */
  sweepMembers(cacheCount) {
    if (typeof cacheCount !== "number")
      throw new TypeError("GLUON: Cache count must be a number.");

    if (this.#cache.size == 0) return;

    const currentCacheSize = this.#cache.size;
    const currentCacheKeys = this.#cache.keys();

    for (
      let cacheSize = currentCacheSize;
      cacheCount < cacheSize;
      cacheSize--
    ) {
      const current = currentCacheKeys.next().value;
      if (current != this.#_client.user.id);
      this.#cache.delete(current);
    }

    return this.#cache.size;
  }

  /**
   * Gets a member from the cache.
   * @param {String} id The ID of the member to retrieve.
   * @returns {Member?}
   * @method
   * @public
   * @throws {TypeError}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Adds a member to the cache.
   * @param {String} id The ID of the member
   * @param {Member} member The member to cache.
   * @returns {Member}
   * @method
   * @public
   * @throws {TypeError}
   */
  set(id, member) {
    if (!(member instanceof Member))
      throw new TypeError("GLUON: Member must be a Member instance.");
    if (typeof id !== "string")
      throw new TypeError("GLUON: Member ID must be a string.");
    return this.#cache.set(id, member);
  }

  /**
   * Deletes a member from the cache.
   * @param {String} id The ID of the member to delete.
   * @returns {Boolean}
   * @method
   * @public
   * @throws {TypeError}
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.delete(id);
  }

  /**
   * Returns the size of the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get size() {
    return this.#cache.size;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return [...this.#cache.values()];
  }
}

module.exports = GuildMemberManager;
