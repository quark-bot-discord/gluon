export default Invite;
/**
 * Represents a guild invite.
 */
declare class Invite {
    /**
     * Returns the URL of the invite.
     * @param {String} code The code of the invite.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getUrl(code: string): string;
    /**
     * Determines whether the invite should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions, guildCacheOptions: GuildCacheOptions): boolean;
    /**
     * Creates the structure for an invite.
     * @param {Client} client The client instance.
     * @param {Object} data The raw invite data from Discord.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The id of the guild that the invite belongs to.
     * @param {Boolean?} options.nocache Whether this invite should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-structure}
     */
    constructor(client: Client, data: any, { guildId, nocache }?: {
        guildId: string;
        nocache: boolean | null;
    });
    /**
     * The id of the channel the invite is directed to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get channelId(): string;
    /**
     * The channel the invite is directed to.
     * @type {(TextChannel | VoiceChannel)?}
     * @readonly
     * @public
     */
    public readonly get channel(): any;
    /**
     * The code of the invite.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The code of the invite.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get code(): string;
    /**
     * The id of the guild that this invite belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The guild that this role belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * The number of times the invite has been used.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get uses(): number;
    /**
     * The UNIX timestamp of when the invite expires.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get expires(): number;
    /**
     * The user who created the invite.
     * @type {User?}
     * @readonly
     * @public
     */
    public readonly get inviter(): User;
    /**
     * The URL of the invite.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get url(): string;
    /**
     * The maximum number of uses allowed for the invite.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get maxUses(): number;
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
import User from "./User.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Client from "../Client.js";
//# sourceMappingURL=Invite.d.ts.map