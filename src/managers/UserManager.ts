import ClientType from "src/interfaces/Client.js";
import User from "../structures/User.js";
import BaseCacheManager from "./BaseCacheManager.js";
import { UserManagerType } from "./interfaces/UserManager.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { UserType } from "src/structures/interfaces/User.js";

/**
 * Manages all the users belonging to a client.
 */
class UserManager extends BaseCacheManager implements UserManagerType {
  #_client;
  static identifier = "users";
  /**
   * Creates a user manager.
   * @param {Client} client The client instance.
   */
  constructor(client: ClientType) {
    super(client, { structureType: UserManager });

    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;
  }

  /**
   * Fetches a particular user.
   * @param {String} userId The id of the user to fetch.
   * @returns {Promise<User>} The fetched user.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  fetch(userId: Snowflake) {
    return UserManager.fetchUser(this.#_client, userId);
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
  set(id: Snowflake, user: UserType) {
    if (!(user instanceof User))
      throw new TypeError("GLUON: User must be an instance of User.");
    return super.set(id, user);
  }

  get(id: Snowflake) {
    return super.get(id) as UserType | null;
  }

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
  static async fetchUser(client: ClientType, userId: Snowflake) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    const cached = await client.users.get(userId);
    if (cached) return cached;

    const data = await client.request.makeRequest("getUser", [userId]);

    return new User(client, data);
  }
}

export default UserManager;
