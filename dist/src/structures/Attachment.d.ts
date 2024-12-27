export default Attachment;
/**
 * Represents an attachment.
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure}
 */
declare class Attachment {
    [x: number]: () => string;
    /**
     * Creates a structure for an attachment.
     * @param {Client} client The client instance.
     * @param {Object} data Attachment data from Discord.
     * @param {Object} options Additional options for the attachment.
     * @param {String} options.channelId The ID of the channel that this attachment belongs to.
     */
    constructor(client: Client, data: any, { channelId }?: {
        channelId: string;
    });
    /**
     * The id of the attachment.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The name of the file.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get name(): string;
    /**
     * The size of the file.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get size(): number;
    /**
     * The url to the file.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get url(): string;
    /**
     * The channel that this attachment belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get channelId(): string;
    /**
     * Fetches the data of the attachment.
     * @returns {Promise<ArrayBuffer>}
     * @public
     */
    public fetchData(): Promise<ArrayBuffer>;
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
import Client from "../Client.js";
//# sourceMappingURL=Attachment.d.ts.map