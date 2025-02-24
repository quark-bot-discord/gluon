import util from "util";
/**
 * Represents an attachment.
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure}
 */
declare class Attachment {
  #private;
  /**
   * Creates a structure for an attachment.
   * @param {Client} client The client instance.
   * @param {Object} data Attachment data from Discord.
   * @param {Object} options Additional options for the attachment.
   * @param {String} options.channelId The ID of the channel that this attachment belongs to.
   */
  constructor(client: any, data: any, { channelId }?: any);
  /**
   * The id of the attachment.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The name of the file.
   * @type {String}
   * @readonly
   * @public
   */
  get name(): any;
  /**
   * The size of the file.
   * @type {Number}
   * @readonly
   * @public
   */
  get size(): any;
  /**
   * The url to the file.
   * @type {String}
   * @readonly
   * @public
   */
  get url(): string | null;
  /**
   * The channel that this attachment belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId(): string | undefined;
  /**
   * Fetches the data of the attachment.
   * @returns {Promise<ArrayBuffer>}
   * @public
   */
  fetchData(): Promise<ArrayBuffer>;
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
  toJSON(format: any):
    | {
        id: string;
        filename: any;
        size: any;
        url?: undefined;
      }
    | {
        id: string;
        filename: any;
        size: any;
        url: string | null;
      };
}
export default Attachment;
