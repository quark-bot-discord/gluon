import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all invites within a guild.
 */
declare class GuildInviteManager extends BaseCacheManager {
  #private;
  static identifier: string;
  /**
   * Creates a guild invite manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this invite manager belongs to.
   */
  constructor(client: any, guild: any);
  /**
   * Fetches all invites for this guild.
   * @returns {Promise<Array<Invite>>} The fetched invites.
   * @public
   * @async
   * @method
   * @throws {Error}
   */
  fetch(): Promise<any>;
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
  set(code: any, invite: any): Map<any, any>;
}
export default GuildInviteManager;
