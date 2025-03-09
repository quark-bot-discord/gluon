import User from "./User.js";
import util from "util";
import { UnixTimestamp } from "#typings/gluon.js";
import type {
  Member as MemberType,
  MemberCacheJSON,
  MemberDiscordJSON,
  MemberStorageJSON,
  User as UserType,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
  Client as ClientType,
  UserCacheJSON,
  UserStorageJSON,
  UserDiscordJSON,
} from "#typings/index.d.ts";
import {
  APIGuildMember,
  APIInteractionDataResolvedGuildMember,
  GatewayGuildMemberUpdateDispatchData,
  Snowflake,
} from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents a guild member.
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure}
 */
declare class Member implements MemberType {
  #private;
  /**
   * Creates the structure for a guild member.
   * @param {Client} client The client instance.
   * @param {Object} data The raw member data from Discord.
   * @param {Object} options Additional options for the member.
   * @param {String} options.userId The id of the member.
   * @param {String} options.guildId The id of the guild that the member belongs to.
   * @param {User?} [options.user] A user object for this member.
   * @param {Boolean?} [options.nocache] Whether this member should be cached.
   */
  constructor(
    client: ClientType,
    data:
      | APIGuildMember
      | APIInteractionDataResolvedGuildMember
      | MemberStorageJSON
      | MemberCacheJSON
      | MemberDiscordJSON
      | GatewayGuildMemberUpdateDispatchData,
    {
      userId,
      guildId,
      user,
      nocache,
    }: {
      userId: Snowflake;
      guildId: Snowflake;
      user?: UserType;
      nocache?: boolean;
    },
  );
  /**
   * The id of the member.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The id of the guild that this member belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The guild that this member belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): import("#typings/index.d.ts").Guild;
  /**
   * The nickname of the member.
   * @type {String?}
   * @readonly
   * @public
   */
  get nick(): string | null;
  /**
   * The UNIX timestamp for when this member joined the guild.
   * @type {Number?}
   * @readonly
   * @public
   */
  get joinedAt(): number | undefined;
  /**
   * The UNIX timestamp for when this member's timeout expires, if applicable.
   * @type {Number?}
   * @readonly
   * @public
   */
  get timeoutUntil(): number | null;
  /**
   * The flags for this user.
   * @type {Number}
   * @readonly
   * @public
   */
  get flags(): number;
  /**
   * The member's roles.
   * @readonly
   * @type {Array<Role> | null}
   * @public
   */
  get roles(): import("#typings/index.d.ts").Role[] | null;
  /**
   * The position of the member's highest role.
   * @readonly
   * @type {Number}
   * @public
   */
  get highestRolePosition(): number;
  /**
   * The overall calculated permissions for this member.
   * @readonly
   * @type {String?}
   * @public
   */
  get permissions(): string | null;
  /**
   * Whether the member has joined the guild before.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get rejoined(): boolean;
  /**
   * The user object for this member.
   * @type {User}
   * @readonly
   * @public
   */
  get user(): User | UserType | undefined;
  /**
   * The hash of the member's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalAvatarHash(): string | null;
  /**
   * The url of the member's avatar.
   * @readonly
   * @type {String}
   * @public
   */
  get displayAvatarURL(): any;
  /**
   * The url of the member's avatar without falling back to the user's avatar.
   * @readonly
   * @type {String}
   * @public
   */
  get displayAvatarURLNoFallback(): string | null;
  /**
   * Whether the user has not yet passed the guild's membership screening requirements.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get pending(): boolean;
  /**
   * Whether the user has an animated avatar or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get avatarIsAnimated(): boolean;
  /**
   * The mention string for the member.
   * @type {String}
   * @readonly
   * @public
   */
  get mention(): string;
  /**
   * The hash name for the member.
   * @type {String}
   * @readonly
   * @public
   */
  get hashName(): string;
  /**
   * Returns the mention string for the member.
   * @param {String} userId The id of the user to mention.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(userId: Snowflake): string;
  /**
   * Returns the avatar url for the member.
   * @param {String} id The id of the user.
   * @param {String} guild_id The id of the guild the user belongs to.
   * @param {String?} [hash] The avatar hash of the user.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getAvatarUrl(
    id: Snowflake,
    guildId: Snowflake,
    hash?: string | null,
  ): string | null;
  /**
   * Adds a role to the member.
   * @param {String} role_id The id of the role to add to the member.
   * @param {Object?} [options] The options for adding the role to the member.
   * @param {String?} [options.reason] The reason for adding the role to the member.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  addRole(
    role_id: Snowflake,
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Removes a role from the member.
   * @param {String} role_id The id of the role to remove from the member.
   * @param {Object?} [options] The options for removing the role from the member.
   * @param {String?} [options.reason] The reason for removing the role from the member.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  removeRole(
    role_id: Snowflake,
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Adds a timeout to the member.
   * @param {Number} timeout_until The UNIX timestamp for when the member's timeout should end.
   * @param {Object?} [options] The options for timing out the member.
   * @param {String?} [options.reason] The reason for timing out the member.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  timeoutAdd(
    timeout_until: UnixTimestamp,
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Removes a timeout from the member.
   * @param {Object?} [options] The options for untiming out the member.
   * @param {String?} [options.reason] The reason for removing the time out from the member.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  timeoutRemove({ reason }?: { reason?: string }): Promise<void>;
  /**
   * Updates the member's roles.
   * @param {Array<String>} roles An array of role ids for the roles the member should be updated with.
   * @param {Object?} [options] The options for updating the member's roles.
   * @param {String?} [options.reason] The reason for updating the member's roles.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  massUpdateRoles(
    roles: Snowflake[],
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Determines whether the member should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ): boolean;
  /**
   * Returns the hash name for the message.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} memberId The id of the member.
   * @returns {String}
   */
  static getHashName(guildId: Snowflake, memberId: Snowflake): string;
  /**
   * Decrypts a member.
   * @param {Client} client The client instance.
   * @param {String} data The encrypted message data.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} userId The id of the member.
   * @returns {Member}
   */
  static decrypt(
    client: ClientType,
    data: string,
    guildId: Snowflake,
    userId: Snowflake,
  ): Member;
  /**
   * Adds a role to a member.
   * @param {Client} client The client instance.
   * @param {String} guildId The guild id the member belongs to.
   * @param {String} userId The id of the member who the action is occuring on.
   * @param {String} roleId The id of the role to add.
   * @param {Object} [options] The options for adding the role.
   * @param {String?} [options.reason] The reason for adding the role.
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static addRole(
    client: ClientType,
    guildId: Snowflake,
    userId: Snowflake,
    roleId: Snowflake,
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Removes a role from a member.
   * @param {Client} client The client instance.
   * @param {String} guildId The guild id the member belongs to.
   * @param {String} userId The id of the member who the action is occuring on.
   * @param {String} roleId The id of the role to remove.
   * @param {Object} [options] The options for removing the role.
   * @param {String?} [options.reason] The reason for removing the role.
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static removeRole(
    client: ClientType,
    guildId: Snowflake,
    userId: Snowflake,
    roleId: Snowflake,
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Encrypts the member.
   * @returns {String}
   * @public
   * @method
   */
  encrypt(): string;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format: JsonTypes):
    | {
        user: UserCacheJSON | UserStorageJSON | undefined;
        nick: string | null;
        joined_at: number | undefined;
        avatar: string | null;
        permissions: string;
        roles: string[] | undefined;
        communication_disabled_until: number | undefined;
        flags: number;
        _attributes: number;
        pending?: undefined;
      }
    | {
        user: UserDiscordJSON | undefined;
        nick: string | null;
        joined_at: string | undefined;
        avatar: string | null;
        permissions: string;
        roles: string[] | undefined;
        communication_disabled_until: number | undefined;
        flags: number;
        pending: boolean;
        _attributes?: undefined;
      };
}
export default Member;
