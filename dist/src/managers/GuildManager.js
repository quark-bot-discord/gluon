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
var _GuildManager__client;
import Client from "../Client.js";
import Guild from "../structures/Guild.js";
import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all guilds belonging to this client.
 */
class GuildManager extends BaseCacheManager {
  /**
   * Creates a guild manager.
   * @param {Client} client The client instance.
   */
  constructor(client) {
    super(client, { structureType: GuildManager });
    _GuildManager__client.set(this, void 0);
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _GuildManager__client, client, "f");
  }
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
  set(id, guild) {
    if (!(guild instanceof Guild))
      throw new TypeError("GLUON: Guild must be an instance of Guild.");
    return super.set(id, guild);
  }
  /**
   * Returns the cache manager.
   * @param {Client} client The client instance.
   * @returns {GuildManager}
   */
  static getCacheManager(client) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    return client.guilds;
  }
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
  static getGuild(client, guildId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return client.guilds.get(guildId);
  }
}
_GuildManager__client = new WeakMap();
GuildManager.identifier = "guilds";
export default GuildManager;
//# sourceMappingURL=GuildManager.js.map
