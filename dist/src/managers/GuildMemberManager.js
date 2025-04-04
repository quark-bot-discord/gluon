var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _GuildMemberManager__client, _GuildMemberManager_guild;
import Member from "../structures/Member.js";
import BaseCacheManager from "./BaseCacheManager.js";
import getGuild from "#src/util/gluon/getGuild.js";
/**
 * Manages all members belonging to this guild.
 */
class GuildMemberManager extends BaseCacheManager {
  /**
   * Creates a member manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this member manager belongs to.
   */
  constructor(client, guild) {
    super(client, { structureType: GuildMemberManager });
    _GuildMemberManager__client.set(this, void 0);
    _GuildMemberManager_guild.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _GuildMemberManager__client, client, "f");
    /**
     * The guild that this member manager belongs to.
     * @type {Guild}
     * @private
     */
    __classPrivateFieldSet(this, _GuildMemberManager_guild, guild, "f");
  }
  /**
   * The guild that this member manager belongs to.
   * @type {Guild}
   * @readonly
   * @public
   */
  get guild() {
    return __classPrivateFieldGet(this, _GuildMemberManager_guild, "f");
  }
  fetchFromRules(key) {
    return super.fetchFromRules(key);
  }
  fetchWithRules(key) {
    return super.fetchWithRules(key);
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
  fetch(user_id) {
    return GuildMemberManager.fetchMember(
      __classPrivateFieldGet(this, _GuildMemberManager__client, "f"),
      __classPrivateFieldGet(this, _GuildMemberManager_guild, "f").id,
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
  search(query) {
    if (typeof query !== "string")
      throw new TypeError("GLUON: Query must be a string.");
    return GuildMemberManager.search(
      __classPrivateFieldGet(this, _GuildMemberManager__client, "f"),
      __classPrivateFieldGet(this, _GuildMemberManager_guild, "f").id,
      query,
    );
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
  get(id) {
    return super.get(id);
  }
  static getCacheManager(client, guildId) {
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
  static async fetchMember(client, guildId, userId) {
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
  static getMember(client, guildId, userId) {
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
  static async search(client, guildId, query) {
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
        }),
      );
    return members;
  }
}
(_GuildMemberManager__client = new WeakMap()),
  (_GuildMemberManager_guild = new WeakMap());
GuildMemberManager.identifier = "members";
export default GuildMemberManager;
//# sourceMappingURL=GuildMemberManager.js.map
