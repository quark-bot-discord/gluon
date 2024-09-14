export default UserManager;
/**
 * Manages all the users belonging to a client.
 */
declare class UserManager extends BaseCacheManager {
    static identifier: string;
    /**
     * Creates a user manager.
     * @param {Client} client The client instance.
     */
    constructor(client: Client);
    /**
     * Fetches a particular user.
     * @param {String} userId The id of the user to fetch.
     * @returns {Promise<User>} The fetched user.
     * @public
     * @async
     * @method
     * @throws {TypeError | Error}
     */
    public fetch(userId: string): Promise<User>;
    /**
     * Adds a user to the cache.
     * @param {String} id The ID of the user to cache.
     * @param {User} user The user to cache.
     * @returns {User}
     * @public
     * @method
     * @throws {TypeError}
     * @override
     */
    public override set(id: string, user: User): User;
    #private;
}
import BaseCacheManager from "./BaseCacheManager.js";
import User from "../structures/User.js";
import Client from "../Client.js";
//# sourceMappingURL=UserManager.d.ts.map