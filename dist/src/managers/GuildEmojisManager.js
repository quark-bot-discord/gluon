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
var _GuildEmojisManager__client, _GuildEmojisManager_guild;
import Emoji from "../structures/Emoji.js";
import BaseCacheManager from "./BaseCacheManager.js";
import getGuild from "#src/util/gluon/getGuild.js";
/**
 * Manages all emojis within a guild.
 */
class GuildEmojisManager extends BaseCacheManager {
  /**
   * Creates a guild emoji manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this emoji manager belongs to.
   */
  constructor(client, guild) {
    super(client, { structureType: GuildEmojisManager });
    _GuildEmojisManager__client.set(this, void 0);
    _GuildEmojisManager_guild.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _GuildEmojisManager__client, client, "f");
    /**
     * The guild that this emoji manager belongs to.
     * @type {Guild}
     * @private
     */
    __classPrivateFieldSet(this, _GuildEmojisManager_guild, guild, "f");
  }
  fetchFromRules(key) {
    return super.fetchFromRules(key);
  }
  fetchWithRules(key) {
    return super.fetchWithRules(key);
  }
  /**
   * Fetches a particular emoji that belongs to this guild.
   * @param {String} emojiId The id of the emoji to fetch.
   * @returns {Promise<Emoji>} The fetched emoji.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(emojiId) {
    if (typeof emojiId !== "string")
      throw new TypeError("GLUON: Emoji ID must be a string.");
    return GuildEmojisManager.fetchEmoji(
      __classPrivateFieldGet(this, _GuildEmojisManager__client, "f"),
      __classPrivateFieldGet(this, _GuildEmojisManager_guild, "f").id,
      emojiId,
    );
  }
  /**
   * Fetches a particular emoji that belongs to this guild, checking the cache first.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild to fetch the emoji from.
   * @param {String} emojiId The ID of the emoji to fetch.
   * @returns {Promise<Emoji>} The fetched emoji.
   * @public
   * @method
   * @static
   * @async
   * @throws {TypeError}
   */
  static async fetchEmoji(client, guildId, emojiId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string") {
      throw new TypeError("GLUON: Guild ID must be a string.");
    }
    if (typeof emojiId !== "string") {
      throw new TypeError("GLUON: Emoji ID must be a string.");
    }
    const cached = GuildEmojisManager.getEmoji(client, guildId, emojiId);
    if (cached) return cached;
    const data = await client.request.makeRequest("getEmoji", [
      guildId,
      emojiId,
    ]);
    return new Emoji(client, data, { guildId });
  }
  /**
   * Gets an emoji from the cache.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild to get the emoji from.
   * @param {String} emojiId The ID of the emoji to get.
   * @returns {Emoji?}
   * @public
   * @method
   * @static
   * @throws {TypeError}
   */
  static getEmoji(client, guildId, emojiId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof emojiId !== "string")
      throw new TypeError("GLUON: Emoji ID must be a string.");
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error("GLUON: Guild not found in cache.");
    }
    return guild.emojis.get(emojiId);
  }
  /**
   * Adds an emoji to the cache.
   * @param {String} id The ID of the emoji to cache.
   * @param {Emoji} emoji The emoji to cache.
   * @returns {Emoji}
   * @public
   * @method
   * @throws {TypeError}
   * @override
   */
  set(id, emoji) {
    if (!(emoji instanceof Emoji))
      throw new TypeError("GLUON: Emoji must be an instance of Emoji.");
    return super.set(id, emoji);
  }
  get(key) {
    return super.get(key);
  }
}
(_GuildEmojisManager__client = new WeakMap()),
  (_GuildEmojisManager_guild = new WeakMap());
GuildEmojisManager.identifier = "emojis";
export default GuildEmojisManager;
//# sourceMappingURL=GuildEmojisManager.js.map
