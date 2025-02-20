export default GuildInviteManager;
/**
 * Manages all invites within a guild.
 */
declare class GuildInviteManager extends BaseCacheManager {
    static identifier: string;
    /**
     * Creates a guild invite manager.
     * @param {Client} client The client instance.
     * @param {Guild} guild The guild that this invite manager belongs to.
     */
    constructor(client: Client, guild: Guild);
    /**
     * Fetches all invites for this guild.
     * @returns {Promise<Array<Invite>>} The fetched invites.
     * @public
     * @async
     * @method
     * @throws {Error}
     */
    public fetch(): Promise<Array<Invite>>;
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
    public override set(code: string, invite: Invite): Invite;
    #private;
}
import BaseCacheManager from "./BaseCacheManager.js";
import Invite from "../structures/Invite.js";
import Client from "../Client.js";
//# sourceMappingURL=GuildInviteManager.d.ts.map