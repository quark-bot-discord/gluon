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
var _GuildInviteManager__client, _GuildInviteManager_guild;
import Client from "../Client.js";
import { PERMISSIONS } from "../constants.js";
import Invite from "../structures/Invite.js";
import checkPermission from "../util/discord/checkPermission.js";
import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all invites within a guild.
 */
class GuildInviteManager extends BaseCacheManager {
  /**
   * Creates a guild invite manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this invite manager belongs to.
   */
  constructor(client, guild) {
    super(client, { structureType: GuildInviteManager });
    _GuildInviteManager__client.set(this, void 0);
    _GuildInviteManager_guild.set(this, void 0);
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _GuildInviteManager__client, client, "f");
    /**
     * The guild that this invite manager belongs to.
     * @type {Guild}
     * @private
     */
    __classPrivateFieldSet(this, _GuildInviteManager_guild, guild, "f");
  }
  /**
   * Fetches all invites for this guild.
   * @returns {Promise<Array<Invite>>} The fetched invites.
   * @public
   * @async
   * @method
   * @throws {Error}
   */
  async fetch() {
    if (
      !checkPermission(
        (
          await __classPrivateFieldGet(
            this,
            _GuildInviteManager_guild,
            "f",
          ).me()
        ).permissions,
        PERMISSIONS.MANAGE_GUILD,
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_GUILD");
    const data = await __classPrivateFieldGet(
      this,
      _GuildInviteManager__client,
      "f",
    ).request.makeRequest("getGuildInvites", [
      __classPrivateFieldGet(this, _GuildInviteManager_guild, "f").id,
    ]);
    this.clear();
    return data.map(
      (raw) =>
        new Invite(
          __classPrivateFieldGet(this, _GuildInviteManager__client, "f"),
          raw,
          {
            guildId: __classPrivateFieldGet(
              this,
              _GuildInviteManager_guild,
              "f",
            ).id,
          },
        ),
    );
  }
  /**
   * Adds an invite to the cache.
   * @param {String} code The code of the invite to cache.
   * @param {Invite} invite The invite to cache.
   * @returns {Invite}
   * @public
   * @method
   * @throws {TypeError}
   * @override
   */
  set(code, invite) {
    if (!(invite instanceof Invite))
      throw new TypeError("GLUON: Invite must be an instance of Invite.");
    return super.set(code, invite);
  }
}
(_GuildInviteManager__client = new WeakMap()),
  (_GuildInviteManager_guild = new WeakMap());
GuildInviteManager.identifier = "invites";
export default GuildInviteManager;
//# sourceMappingURL=GuildInviteManager.js.map
