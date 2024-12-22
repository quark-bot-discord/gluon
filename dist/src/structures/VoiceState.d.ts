export default VoiceState;
/**
 * Represents a voice state.
 */
declare class VoiceState {
    /**
     * Determines whether the voice state should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions, guildCacheOptions: GuildCacheOptions): boolean;
    /**
     * Creates the structure for a voice state.
     * @param {Client} client The client instance.
     * @param {Object} data The raw voice state data from Discord.
     * @param {Object} options The additional options for this structure.
     * @param {String} options.guildId The id of the guild that the voice state belongs to.
     * @param {Boolean?} options.nocache Whether this voice state should be cached.
     */
    constructor(client: Client, data: any, { guildId, nocache }?: {
        guildId: string;
        nocache: boolean | null;
    });
    /**
     * Is server deafened?
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get deaf(): boolean;
    /**
     * Is server muted?
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get mute(): boolean;
    /**
     * Is self defeaned?
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get selfDeaf(): boolean;
    /**
     * Is self muted?
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get selfMute(): boolean;
    /**
     * Is streaming?
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get selfStream(): boolean;
    /**
     * Is sharing video?
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get selfVideo(): boolean;
    /**
     * Is suppressed (for stage channels)?
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get suppress(): boolean;
    /**
     * The guild that this voice state belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * The id of the guild that this voice state belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The channel involved.
     * @type {Channel?}
     * @readonly
     * @public
     */
    public readonly get channel(): Channel;
    /**
     * The id of the channel involved.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get channelId(): string;
    /**
     * The member the voice state is about.
     * @type {Member?}
     * @readonly
     * @public
     */
    public readonly get member(): Member;
    /**
     * The id of the user the voice state is about.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get memberId(): string;
    /**
     * The UNIX time the user joined the voice channel.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get joined(): number;
    /**
     * The UNIX timestamp of when the user requested to speak.
     * @type {Number?}
     * @readonly
     * @public
     */
    public readonly get requestToSpeakTimestamp(): number;
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
import Member from "./Member.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Client from "../Client.js";
//# sourceMappingURL=VoiceState.d.ts.map