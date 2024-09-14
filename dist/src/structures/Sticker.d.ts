export default Sticker;
/**
 * Represents an sticker.
 */
declare class Sticker {
    /**
     * Creates the structure for a sticker
     * @param {Client} client The client instance.
     * @param {Object} data Sticker data from Discord.
     */
    constructor(client: Client, data: any);
    /**
     * The ID of the sticker.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The name of the sticker.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get name(): string;
    /**
     * The format of the sticker.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get format(): string;
    /**
     * The format type of the sticker.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get formatType(): number;
    /**
     * The URL to an image of the sticker. Returns NULL if image is a LOTTIE file.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get previewImageURL(): string;
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
import Client from "../Client.js";
//# sourceMappingURL=Sticker.d.ts.map