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
var _GuildScheduledEventManager__client, _GuildScheduledEventManager_guild;
import ScheduledEvent from "../structures/ScheduledEvent.js";
import BaseCacheManager from "./BaseCacheManager.js";
import getGuild from "#src/util/gluon/getGuild.js";
class GuildScheduledEventManager extends BaseCacheManager {
  constructor(client, guild) {
    super(client, { structureType: GuildScheduledEventManager });
    _GuildScheduledEventManager__client.set(this, void 0);
    _GuildScheduledEventManager_guild.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _GuildScheduledEventManager__client,
      client,
      "f",
    );
    /**
     * The guild that this manager belongs to.
     * @type {Guild}
     * @private
     */
    __classPrivateFieldSet(this, _GuildScheduledEventManager_guild, guild, "f");
  }
  fetchFromRules(key) {
    return super.fetchFromRules(key);
  }
  fetchWithRules(key) {
    return super.fetchWithRules(key);
  }
  /**
   * Retrieves all scheduled events for this guild.
   * @returns {Promise<Array<ScheduledEvent>>}
   * @async
   * @method
   * @public
   * @throws {Error}
   */
  async list() {
    const data = await __classPrivateFieldGet(
      this,
      _GuildScheduledEventManager__client,
      "f",
    ).request.makeRequest("getListGuildScheduledEvents", [
      __classPrivateFieldGet(this, _GuildScheduledEventManager_guild, "f").id,
    ]);
    const eventsList = [];
    for (let i = 0; i < data.length; i++)
      eventsList.push(
        new ScheduledEvent(
          __classPrivateFieldGet(
            this,
            _GuildScheduledEventManager__client,
            "f",
          ),
          data[i],
          {
            guildId: __classPrivateFieldGet(
              this,
              _GuildScheduledEventManager_guild,
              "f",
            ).id,
          },
        ),
      );
    return eventsList;
  }
  /**
   * Fetches a scheduled event from the API.
   * @param {String} scheduledEventId The ID of the event to fetch.
   * @returns {Promise<ScheduledEvent>}
   * @async
   * @method
   * @public
   * @throws {TypeError | Error}
   */
  async fetch(scheduledEventId) {
    if (typeof scheduledEventId !== "string")
      throw new TypeError("GLUON: Scheduled event ID must be a string.");
    const cachedEvent = this.get(scheduledEventId);
    if (cachedEvent) return cachedEvent;
    const data = await __classPrivateFieldGet(
      this,
      _GuildScheduledEventManager__client,
      "f",
    ).request.makeRequest("getGuildScheduledEvent", [
      __classPrivateFieldGet(this, _GuildScheduledEventManager_guild, "f").id,
      scheduledEventId,
    ]);
    return new ScheduledEvent(
      __classPrivateFieldGet(this, _GuildScheduledEventManager__client, "f"),
      data,
      {
        guildId: __classPrivateFieldGet(
          this,
          _GuildScheduledEventManager_guild,
          "f",
        ).id,
      },
    );
  }
  /**
   * Cache a scheduled event.
   * @param {String} id The ID of the event to cache.
   * @param {ScheduledEvent} event The event to cache.
   * @returns {ScheduledEvent}
   * @throws {TypeError}
   * @public
   * @method
   * @override
   */
  set(id, event) {
    if (!(event instanceof ScheduledEvent))
      throw new TypeError("GLUON: Event must be a ScheduledEvent instance.");
    return super.set(id, event);
  }
  get(id) {
    return super.get(id);
  }
  static getScheduledEvent(client, guildId, eventId) {
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error("GLUON: Guild not found in cache.");
    }
    return guild.scheduledEvents.get(eventId);
  }
}
(_GuildScheduledEventManager__client = new WeakMap()),
  (_GuildScheduledEventManager_guild = new WeakMap());
GuildScheduledEventManager.identifier = "events";
export default GuildScheduledEventManager;
//# sourceMappingURL=GuildScheduledEventManager.js.map
