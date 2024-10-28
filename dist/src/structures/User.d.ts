export default User;
/**
 * Represents a Discord user.
 * @see {@link https://discord.com/developers/docs/resources/user}
 */
declare class User {
    /**
     * Returns a mention string for the user.
     * @param {String} id The ID of the user to mention.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getMention(id: string): string;
    /**
     * Returns the URL to the user's avatar.
     * @param {String} id The ID of the user to get the avatar for.
     * @param {String?} hash The hash of the avatar.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getAvatarUrl(id: string, hash: string | null): string;
    /**
     * Determines whether the user should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions): boolean;
    /**
     * Creates a structure for a user.
     * @param {Client} client The client instance.
     * @param {Object} data The raw user data.
     * @param {Object?} options Additional options for this structure.
     * @param {Boolean?} options.nocache Whether the user should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/user#user-object}
     */
    constructor(client: Client, data: any, { nocache }?: any | null);
    /**
     * Overrides the user's avatar with a custom URL.
     * @param {String} url The URL of the avatar to override the user's avatar with.
     * @public
     * @method
     * @returns {void}
     */
    public overrideAvatarURL(url: string): void;
    /**
     * The ID of the user.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The username of the user.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get username(): string;
    /**
     * The global name of the user.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get globalName(): string;
    /**
     * The discriminator of the user.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get discriminator(): string;
    /**
     * The UNIX (seconds) timestamp when this user was last cached.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get _cached(): number;
    /**
     * The mention string for the user.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get mention(): string;
    /**
     * The hash of the users's avatar, as it was received from Discord.
     * @readonly
     * @type {String?}
     * @public
     */
    public readonly get _originalAvatarHash(): string;
    /**
     * The avatar URL of the user.
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get displayAvatarURL(): string;
    /**
     * The username of the user, including their discriminator if they are a bot (username#0001).
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get tag(): string;
    /**
     * The UNIX (seconds) timestamp of when this user created their Discord account.
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get createdTimestamp(): number;
    /**
     * Whether the user is a bot or not.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get bot(): boolean;
    /**
     * Whether the user has an animated avatar or not.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get avatarIsAnimated(): boolean;
    /**
     * Whether the user has an avatar or not.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get hasAvatar(): boolean;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} format The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format: number): any;
    #private;
}
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import Client from "../Client.js";
//# sourceMappingURL=User.d.ts.map