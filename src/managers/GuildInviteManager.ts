import ClientType from "src/interfaces/Client.js";
import { PERMISSIONS } from "../constants.js";
import Invite from "../structures/Invite.js";
import checkPermission from "../util/discord/checkPermission.js";
import BaseCacheManager from "./BaseCacheManager.js";
import { GuildInviteManagerType } from "./interfaces/GuildInviteManager.js";
import { GuildType } from "src/structures/interfaces/Guild.js";
import { InviteRaw, InviteType } from "src/structures/interfaces/Invite.js";
import { StructureIdentifiers } from "./interfaces/BaseCacheManager.js";

/**
 * Manages all invites within a guild.
 */
class GuildInviteManager
  extends BaseCacheManager
  implements GuildInviteManagerType
{
  #_client;
  #guild;
  static identifier = "invites" as StructureIdentifiers;
  /**
   * Creates a guild invite manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this invite manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType) {
    super(client, { structureType: GuildInviteManager });

    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");

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
        (await this.#guild.me()).permissions,
        PERMISSIONS.MANAGE_GUILD,
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_GUILD");

    const data = await this.#_client.request.makeRequest("getGuildInvites", [
      this.#guild.id,
    ]);

    this.clear();

    return data.map(
      (raw: InviteRaw) =>
        new Invite(this.#_client, raw, { guildId: this.#guild.id }),
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
  set(code: string, invite: InviteType) {
    if (!(invite instanceof Invite))
      throw new TypeError("GLUON: Invite must be an instance of Invite.");
    return super.set(code, invite);
  }

  get(code: string) {
    return super.get(code) as InviteType | null;
  }
}

export default GuildInviteManager;
