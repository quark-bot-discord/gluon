import util from "util";
/**
 * Represents an sticker.
 */
declare class Sticker {
  #private;
  /**
   * Creates the structure for a sticker
   * @param {Client} client The client instance.
   * @param {Object} data Sticker data from Discord.
   */
  constructor(client: any, data: any);
  /**
   * The ID of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The name of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get name(): any;
  /**
   * The format of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get format(): string | null;
  /**
   * The format type of the sticker.
   * @type {Number}
   * @readonly
   * @public
   */
  get formatType(): any;
  /**
   * The URL to an image of the sticker. Returns NULL if image is a LOTTIE file.
   * @type {String?}
   * @readonly
   * @public
   */
  get previewImageURL(): string | null;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format: any): {
    id: string;
    name: any;
    format_type: any;
  };
}
export default Sticker;
