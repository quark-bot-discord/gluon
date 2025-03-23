import BaseCacheManager from "./BaseCacheManager.js";
import {
  UserManager as UserManagerType,
  User as UserType,
  StructureIdentifiers,
  Client as ClientType,
} from "../../typings/index.d.js";
import { Snowflake } from "#typings/discord.js";
/**
 * Manages all the users belonging to a client.
 */
declare class UserManager
  extends BaseCacheManager<UserType>
  implements UserManagerType
{
  #private;
  static identifier: StructureIdentifiers;
  /**
   * Creates a user manager.
   * @param {Client} client The client instance.
   */
  constructor(client: ClientType);
  fetchFromRules(key: string): Promise<UserType | null>;
  fetchWithRules(key: string): Promise<UserType | null>;
  /**
   * Fetches a particular user.
   * @param {String} userId The id of the user to fetch.
   * @returns {Promise<User>} The fetched user.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  fetch(userId: Snowflake): Promise<UserType>;
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
  set(id: Snowflake, user: UserType): void;
  get(id: Snowflake): UserType | null;
  static fetchUser(client: ClientType, userId: Snowflake): Promise<UserType>;
}
export default UserManager;
