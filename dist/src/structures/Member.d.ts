export default Member;
/**
 * Represents a guild member.
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure}
 */
declare class Member {
    [x: number]: () => string;
    /**
     * Returns the mention string for the member.
     * @param {String} userId The id of the user to mention.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getMention(userId: string): string;
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
    public static getAvatarUrl(id: string, guildId: any, hash?: string | null): string;
    /**
     * Determines whether the member should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions, guildCacheOptions: GuildCacheOptions): boolean;
    /**
     * Returns the hash name for the message.
     * @param {String} guildId The id of the guild that the message belongs to.
     * @param {String} memberId The id of the member.
     * @returns {String}
     */
    static getHashName(guildId: string, memberId: string): string;
    /**
     * Decrypts a member.
     * @param {Client} client The client instance.
     * @param {String} data The encrypted message data.
     * @param {String} guildId The id of the guild that the message belongs to.
     * @param {String} userId The id of the member.
     * @returns {Member}
     */
    static decrypt(client: Client, data: string, guildId: string, userId: string): Member;
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
    public static addRole(client: Client, guildId: string, userId: string, roleId: string, { reason }?: {
        reason?: string | null;
    }): Promise<void>;
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
    public static removeRole(client: Client, guildId: string, userId: string, roleId: string, { reason }?: {
        reason?: string | null;
    }): Promise<void>;
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
    constructor(client: Client, data: any, { userId, guildId, user, nocache }?: {
        userId: string;
        guildId: string;
        user?: User | null;
        nocache?: boolean | null;
    });
    /**
     * The id of the member.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The id of the guild that this member belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The guild that this member belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild | null;
    /**
     * The nickname of the member.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get nick(): string | null;
    /**
     * The UNIX timestamp for when this member joined the guild.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get joinedAt(): number | null;
    /**
     * The UNIX timestamp for when this member's timeout expires, if applicable.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get timeoutUntil(): number | null;
    /**
     * The flags for this user.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get flags(): number;
    /**
     * The member's roles.
     * @readonly
     * @type {Array<Role> | null}
     * @public
     */
    public readonly get roles(): Array<Role> | null;
    /**
     * The position of the member's highest role.
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get highestRolePosition(): number;
    /**
     * The overall calculated permissions for this member.
     * @readonly
     * @type {String?}
     * @public
     */
    public readonly get permissions(): string | null;
    /**
     * Whether the member has joined the guild before.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get rejoined(): boolean;
    /**
     * The user object for this member.
     * @type {User}
     * @readonly
     * @public
     */
    public readonly get user(): User;
    /**
     * The hash of the member's avatar, as it was received from Discord.
     * @readonly
     * @type {String?}
     * @public
     */
    public readonly get _originalAvatarHash(): string | null;
    /**
     * The url of the member's avatar.
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get displayAvatarURL(): string;
    /**
     * The url of the member's avatar without falling back to the user's avatar.
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get displayAvatarURLNoFallback(): string;
    /**
     * Whether the user has not yet passed the guild's membership screening requirements.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get pending(): boolean;
    /**
     * Whether the user has an animated avatar or not.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get avatarIsAnimated(): boolean;
    /**
     * The mention string for the member.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get mention(): string;
    /**
     * The hash name for the member.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get hashName(): string;
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
    public addRole(role_id: string, { reason }?: any | null): Promise<void>;
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
    public removeRole(role_id: string, { reason }?: any | null): Promise<void>;
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
    public timeoutAdd(timeout_until: number, { reason }?: any | null): Promise<void>;
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
    public timeoutRemove({ reason }?: any | null): Promise<void>;
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
    public massUpdateRoles(roles: Array<string>, { reason }?: any | null): Promise<void>;
    /**
     * Encrypts the member.
     * @returns {String}
     * @public
     * @method
     */
    public encrypt(): string;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} [format] The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format?: number): any;
    #private;
}
import Role from "./Role.js";
import User from "./User.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Client from "../Client.js";
//# sourceMappingURL=Member.d.ts.map