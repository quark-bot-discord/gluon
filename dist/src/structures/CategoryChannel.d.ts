export default CategoryChannel;
declare class CategoryChannel {
    /**
     * Creates the structure for a category channel.
     * @param {Client} client The client instance.
     * @param {Object} data The raw channel data.
     * @param {Object} options The additional options for this structure.
     * @param {String} options.guildId The ID of the guild that this channel belongs to.
     * @param {Boolean} options.nocache Whether this channel should be cached or not.
     */
    constructor(client: Client, data: any, { guildId, nocache }?: {
        guildId: string;
        nocache: boolean;
    });
    /**
     * The ID of the channel.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The ID of the guild that this channel belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The guild that this channel belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * The name of the channel.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get name(): string;
    /**
     * The type of channel.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get type(): number;
    /**
     * The permission overwrites for the channel.
     * @type {Array<PermissionOverwrite>}
     * @readonly
     * @public
     */
    public readonly get permissionOverwrites(): PermissionOverwrite[];
    /**
     * Whether the channel is nsfw.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get nsfw(): boolean;
    /**
     * The mention string of the channel.
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
import PermissionOverwrite from "./PermissionOverwrite.js";
import Client from "../Client.js";
//# sourceMappingURL=CategoryChannel.d.ts.map