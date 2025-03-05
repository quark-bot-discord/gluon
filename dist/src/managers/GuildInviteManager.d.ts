import Invite from "../structures/Invite.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  GuildInviteManager as GuildInviteManagerType,
  Guild as GuildType,
  Invite as InviteType,
  StructureIdentifiers,
  Client as ClientType,
} from "../../typings/index.d.js";
/**
 * Manages all invites within a guild.
 */
declare class GuildInviteManager
  extends BaseCacheManager<InviteType>
  implements GuildInviteManagerType
{
  #private;
  static identifier: StructureIdentifiers;
  /**
   * Creates a guild invite manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this invite manager belongs to.
   */
  constructor(client: ClientType, guild: GuildType);
  /**
   * Fetches all invites for this guild.
   * @returns {Promise<Array<Invite>>} The fetched invites.
   * @public
   * @async
   * @method
   * @throws {Error}
   */
  fetch(): Promise<Invite[]>;
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
  set(code: string, invite: InviteType): void;
  get(code: string): InviteType | null;
  fetchFromRules(key: string): Promise<InviteType | null>;
  fetchWithRules(key: string): Promise<InviteType | null>;
}
export default GuildInviteManager;
