export default Emoji;
/**
 * Represents an emoji.
 * @see {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure}
 */
declare class Emoji {
    /**
     * Checks if the emoji is animated.
     * @param {Number} attributes The attributes of the emoji.
     * @returns {Boolean}
     */
    static isAnimated(attributes: number): boolean;
    /**
     * Returns the mention string for an emoji.
     * @param {String} name The name of the emoji.
     * @param {String?} id The id of the emoji.
     * @param {Boolean?} animated Whether the emoji is animated.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getMention(name: string, id: string | null, animated: boolean | null): string;
    /**
     * Returns the url for an emoji.
     * @param {String} id The id of the emoji.
     * @param {Boolean} animated Whether the emoji is animated.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getUrl(id: string, animated?: boolean): string;
    /**
     * Determines whether the emoji should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions, guildCacheOptions: GuildCacheOptions): boolean;
    /**
     * Creates the structure for an emoji.
     * @param {Client} client The client instance.
     * @param {Object} data The raw emoji data from Discord.
     * @param {Object} options The options for this emoji.
     * @param {String} options.guildId The id of the guild that the emoji belongs to.
     * @param {Boolean?} options.nocache Whether this emoji should be cached or not.
     */
    constructor(client: Client, data: any, { guildId, nocache }?: {
        guildId: string;
        nocache: boolean | null;
    });
    /**
     * Whether the emoji requires colons.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get requireColons(): boolean;
    /**
     * Whether the emoji is managed.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get managed(): boolean;
    /**
     * Whether the emoji is animated.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get animated(): boolean;
    /**
     * Whether the emoji is available.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get available(): boolean;
    /**
     * The mention string for the emoji.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get mention(): string;
    /**
     * The url for the emoji.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get url(): string;
    /**
     * The id of the guild that this emoji belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The guild that this emoji belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * The id of the emoji, if it is custom.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The name of the emoji.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get name(): string;
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
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Client from "../Client.js";
//# sourceMappingURL=Emoji.d.ts.map