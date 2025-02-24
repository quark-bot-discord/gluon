import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all the users belonging to a client.
 */
declare class UserManager extends BaseCacheManager {
  #private;
  static identifier: string;
  /**
   * Creates a user manager.
   * @param {Client} client The client instance.
   */
  constructor(client: any);
  /**
   * Fetches a particular user.
   * @param {String} userId The id of the user to fetch.
   * @returns {Promise<User>} The fetched user.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  fetch(userId: any): Promise<any>;
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
  set(id: any, user: any): Map<any, any>;
  /**
   * Fetches a particular user.
   * @param {Client} client The client instance.
   * @param {String} userId The id of the user to fetch.
   * @returns {Promise<User>} The fetched user.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  static fetchUser(client: any, userId: any): Promise<any>;
}
export default UserManager;
