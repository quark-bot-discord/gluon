import User from "../structures/User.js";
import BaseCacheManager from "./BaseCacheManager.js";

/**
 * Manages all the users belonging to a client.
 */
class UserManager extends BaseCacheManager {
  #_client;
  static identifier = "users";
  /**
   * Creates a user manager.
   * @param {Client} client The client instance.
   */
  constructor(client) {
    super(client, { structureType: UserManager });
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;
  }

  /**
   * Fetches a particular user.
   * @param {String} user_id The id of the user to fetch.
   * @returns {Promise<User>} The fetched user.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(user_id) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    const cached = await this.get(user_id);
    if (cached) return cached;

    const data = await this.#_client.request.makeRequest("getUser", [user_id]);

    return new User(this.#_client, data);
  }

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
  set(id, user) {
    if (!(user instanceof User))
      throw new TypeError("GLUON: User must be an instance of User.");
    return super.set(id, user);
  }
}

export default UserManager;
