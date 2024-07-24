const { PERMISSIONS } = require("../constants");
const Guild = require("../structures/Guild");
const Invite = require("../structures/Invite");
const checkPermission = require("../util/discord/checkPermission");

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
    this.#_client = client;

    this.#guild = guild;

    this.#cache = new Map();
  }

  /**
   * Fetches all invites for this guild.
   * @returns {Promise<Array<Invite>?>} The fetched invites.
   */
  async fetch() {
    if (!checkPermission((await this.#guild.me()).permissions, PERMISSIONS.MANAGE_GUILD))
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
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    this.#cache.delete(id);
  }

  toJSON() {
    return [...this.#cache.values()];
  }
}

module.exports = GuildInviteManager;
