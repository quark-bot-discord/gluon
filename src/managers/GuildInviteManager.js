import { PERMISSIONS } from "../constants.js";
import Guild from "../structures/Guild.js";
import Invite from "../structures/Invite.js";
import checkPermission from "../util/discord/checkPermission.js";

/**
 * Manages all invites within a guild.
 */
class GuildInviteManager {
  #_client;
  #guild;
  #cache;

  /**
   * Creates a guild invite manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this invite manager belongs to.
   */
  constructor(client, guild) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The guild that this invite manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;

    /**
     * The cache of invites.
     * @type {Map<String, Invite>}
     * @private
     */
    this.#cache = new Map();
  }

  /**
   * Fetches all invites for this guild.
   * @returns {Promise<Array<Invite>?>} The fetched invites.
   * @public
   * @async
   * @method
   * @throws {Error}
   */
  async fetch() {
    if (
      !checkPermission(
        (await this.#guild.me()).permissions,
        PERMISSIONS.MANAGE_GUILD,
      )
    )
      return null;

    const data = await this.#_client.request.makeRequest("getGuildInvites", [
      this.#guild.id,
    ]);

    this.#cache.clear();

    return data.map(
      (raw) => new Invite(this.#_client, raw, { guild_id: this.#guild.id }),
    );
  }

  /**
   * Gets an invite from the cache.
   * @param {String} id The ID of the invite to retrieve.
   * @returns {Invite?}
   * @public
   * @method
   * @throws {TypeError}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Adds an invite to the cache.
   * @param {String} code The code of the invite to cache.
   * @param {Invite} invite The invite to cache.
   * @returns {Invite}
   * @public
   * @method
   * @throws {TypeError}
   */
  set(code, invite) {
    if (!(invite instanceof Invite))
      throw new TypeError("GLUON: Invite must be an instance of Invite.");
    if (typeof code !== "string")
      throw new TypeError("GLUON: Invite ID must be a string.");
    return this.#cache.set(code, invite);
  }

  /**
   * Deletes an invite from the cache.
   * @param {String} id The ID of the invite to delete.
   * @returns {Boolean}
   * @public
   * @method
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
   * @public
   * @method
   */
  toJSON() {
    return [...this.#cache.values()];
  }
}

export default GuildInviteManager;
