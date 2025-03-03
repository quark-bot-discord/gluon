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
var _GuildChannelsManager__client, _GuildChannelsManager_guild;
import cacheChannel from "../util/gluon/cacheChannel.js";
import BaseCacheManager from "./BaseCacheManager.js";
import GuildManager from "./GuildManager.js";
/**
 * Manages all channels within a guild.
 */
class GuildChannelsManager extends BaseCacheManager {
  /**
   * Creates a guild channel manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this channel manager belongs to.
   */
  constructor(client, guild) {
    super(client, { structureType: GuildChannelsManager });
    _GuildChannelsManager__client.set(this, void 0);
    _GuildChannelsManager_guild.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _GuildChannelsManager__client, client, "f");
    /**
     * The guild that this channel manager belongs to.
     * @type {Guild}
     * @private
     */
    __classPrivateFieldSet(this, _GuildChannelsManager_guild, guild, "f");
  }
  /**
   * Gets a channel from the cache.
   * @param {String} id The ID of the channel to get.
   * @returns {VoiceChannel | TextChannel | Thread | CategoryChannel | Channel | null}
   * @public
   * @method
   * @override
   */
  get(id) {
    return super.get(id);
  }
  fetchFromRules(key) {
    return super.fetchFromRules(key);
  }
  fetchWithRules(key) {
    return super.fetchWithRules(key);
  }
  /**
   * Fetches a particular channel belonging to this guild.
   * @param {String} channel_id The id of the channel to fetch.
   * @returns {Promise<VoiceChannel | Thread | TextChannel>} The fetched channel.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(channel_id) {
    if (typeof channel_id !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    const cachedChannel = this.get(channel_id);
    if (cachedChannel) return cachedChannel;
    const data = await __classPrivateFieldGet(
      this,
      _GuildChannelsManager__client,
      "f",
    ).request.makeRequest("getChannel", [channel_id]);
    if (!data) return null;
    return cacheChannel(
      __classPrivateFieldGet(this, _GuildChannelsManager__client, "f"),
      data,
      __classPrivateFieldGet(this, _GuildChannelsManager_guild, "f").id,
    );
  }
  /**
   * Adds a channel to the cache.
   * @param {String} id The ID of the channel to cache.
   * @param {VoiceChannel | TextChannel | Thread | Channel | CategoryChannel} channel The channel to cache.
   * @returns {VoiceChannel | TextChannel | Thread | Channel | CategoryChannel}
   * @public
   * @method
   * @throws {TypeError}
   * @override
   */
  set(id, channel, expiry) {
    return super.set(id, channel, expiry);
  }
  /**
   * Returns the channel for a guild.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild to get the channel from.
   * @param {String} channelId The ID of the channel to get.
   * @returns {VoiceChannel | TextChannel | Thread | CategoryChannel | null}
   */
  static getChannel(client, guildId, channelId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    return GuildManager.getGuild(client, guildId).channels.get(channelId);
  }
  /**
   * Returns the cache manager for a guild.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild the cache manager belongs to.
   * @returns {GuildChannelsManager}
   * @throws {TypeError}
   * @public
   * @static
   * @method
   */
  static getCacheManager(client, guildId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    return GuildManager.getGuild(client, guildId).channels;
  }
  /**
   * Fetches a channel, checking the cache first.
   * @param {Client} client The client instance.
   * @param {String} guildId The id of the guild the channel belongs to.
   * @param {String} channelId The id of the channel to fetch.
   * @returns {Promise<TextChannel | VoiceChannel>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static async fetchChannel(client, guildId, channelId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    const cached = GuildChannelsManager.getChannel(client, guildId, channelId);
    if (cached) return cached;
    const data = await client.request.makeRequest("getChannel", [channelId]);
    return cacheChannel(client, data, guildId);
  }
}
(_GuildChannelsManager__client = new WeakMap()),
  (_GuildChannelsManager_guild = new WeakMap());
GuildChannelsManager.identifier = "channels";
export default GuildChannelsManager;
//# sourceMappingURL=GuildChannelsManager.js.map
