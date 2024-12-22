export default Poll;
declare class Poll {
    /**
     * Creates the structure for a poll.
     * @param {Client} client The client instance.
     * @param {Object} data The raw poll data from Discord.
     * @param {Object} options The additional options for this structure.
     * @param {String} options.guildId The ID of the guild that this poll belongs to.
     */
    constructor(client: Client, data: any, { guildId }?: {
        guildId: string;
    });
    /**
     * The ID of the guild that this poll belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The guild that this poll belongs to.
     * @type {Guild}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * The question of the poll.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get question(): string;
    /**
     * The answers of the poll.
     * @type {Array<Object>}
     * @readonly
     * @public
     */
    public readonly get answers(): any[];
    /**
     * The UNIX timestamp of the expiry time for the poll.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get expiry(): number;
    /**
     * Whether the poll allows multiselect.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get allowMultiselect(): boolean;
    /**
     * The layout type of the poll.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get layoutType(): string;
    /**
     * The raw layout type of the poll.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get rawLayoutType(): number;
    /**
     * The poll responses.
     * @type {MessagePollManager}
     * @readonly
     * @public
     */
    public readonly get _results(): MessagePollManager;
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
import MessagePollManager from "../managers/MessagePollManager.js";
import Client from "../Client.js";
//# sourceMappingURL=Poll.d.ts.map