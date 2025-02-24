var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _UserManager__client;
import Client from "../Client.js";
import User from "../structures/User.js";
import BaseCacheManager from "./BaseCacheManager.js";
/**
 * Manages all the users belonging to a client.
 */
class UserManager extends BaseCacheManager {
  /**
   * Creates a user manager.
   * @param {Client} client The client instance.
   */
  constructor(client) {
    super(client, { structureType: UserManager });
    _UserManager__client.set(this, void 0);
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _UserManager__client, client, "f");
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
  fetch(userId) {
    return UserManager.fetchUser(
      __classPrivateFieldGet(this, _UserManager__client, "f"),
      userId,
    );
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
  static async fetchUser(client, userId) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");
    const cached = await client.users.get(userId);
    if (cached) return cached;
    const data = await client.request.makeRequest("getUser", [userId]);
    return new User(client, data);
  }
}
_UserManager__client = new WeakMap();
UserManager.identifier = "users";
export default UserManager;
//# sourceMappingURL=UserManager.js.map
