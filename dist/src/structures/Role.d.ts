export default Role;
/**
 * Represents a role belonging to a guild.
 */
declare class Role {
    [x: number]: () => string;
    /**
     * Returns a mention for the role.
     * @param {String} roleId The ID of the role to mention.
     * @param {String} guildId The ID of the guild that the role belongs to.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getMention(roleId: string, guildId: string): string;
    /**
     * Returns the URL of the role's icon.
     * @param {String} id The ID of the role.
     * @param {String?} [hash] The hash of the role's icon.
     * @returns {String}
     */
    static getIconUrl(id: string, hash?: string | null): string;
    /**
     * Determines whether the role should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions, guildCacheOptions: GuildCacheOptions): boolean;
    /**
     * Creates the structure for a role.
     * @param {Client} client The client instance.
     * @param {Object} data The raw role data from Discord.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The id of the guild that the role belongs to.
     * @param {Boolean?} [options.nocache] Whether this role should be cached or not.
     * @see {@link https://discord.com/developers/docs/topics/permissions#role-object-role-structure}
     */
    constructor(client: Client, data: any, { guildId, nocache }?: {
        guildId: string;
        nocache?: boolean | null;
    });
    /**
     * The ID of the role.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * Whether the role is hoisted.
     * @readonly
     * @returns {Boolean}
     * @public
     */
    public readonly get hoist(): boolean;
    /**
     * Whether the role is managed (by an application).
     * @readonly
     * @returns {Boolean}
     * @public
     */
    public readonly get managed(): boolean;
    /**
     * Whether the role is mentionable.
     * @readonly
     * @returns {Boolean}
     * @public
     */
    public readonly get mentionable(): boolean;
    /**
     * The hash of the role's avatar, as it was received from Discord.
     * @readonly
     * @type {String?}
     * @public
     */
    public readonly get _originalIconHash(): string | null;
    /**
     * The icon URL of the role.
     * @readonly
     * @type {String?}
     * @public
     */
    public readonly get displayIconURL(): string | null;
    /**
     * The guild that this role belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild | null;
    /**
     * The ID of the guild that this role belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The name of the role.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get name(): string;
    /**
     * The color of the role.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get color(): number;
    /**
     * The position of the role.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get position(): number;
    /**
     * The permissions for the role.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get permissions(): string;
    /**
     * The attributes of the role.
     * @type {Object}
     * @readonly
     * @public
     */
    public readonly get tags(): any;
    /**
     * Returns a mention for the role.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get mention(): string;
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
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Client from "../Client.js";
//# sourceMappingURL=Role.d.ts.map