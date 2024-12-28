export default Thread;
/**
 * Represents a thread within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
 */
declare class Thread extends Channel {
    /**
     * Creates the structure for a thread.
     * @param {Client} client The client instance.
     * @param {Object} data Raw channel data.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The ID of the guild that this thread belongs to.
     * @param {Boolean?} [options.nocache] Whether this thread should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
     */
    constructor(client: Client, data: any, { guildId, nocache }?: {
        guildId: string;
        nocache?: boolean | null;
    });
    /**
     * The ID of the member who created this thread.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get ownerId(): string;
    /**
     * The member who created this thread.
     * @type {Member?}
     * @readonly
     * @public
     */
    public readonly get owner(): Member | null;
    /**
     * The text channel that this thread belongs to.
     * @type {TextChannel?}
     * @readonly
     * @public
     */
    public readonly get parent(): TextChannel | null;
    #private;
}
import Channel from "./Channel.js";
import Client from "../Client.js";
//# sourceMappingURL=Thread.d.ts.map