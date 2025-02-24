import {
  STICKER_FORMATS,
  CDN_BASE_URL,
  STICKER_FORMATS_ENUM,
  TO_JSON_TYPES_ENUM,
  MEDIA_BASE_URL,
} from "../constants.js";
import util from "util";

/**
 * Represents an sticker.
 */
class Sticker {
  #_client;
  #_id;
  #name;
  #format_type;
  /**
   * Creates the structure for a sticker
   * @param {Client} client The client instance.
   * @param {Object} data Sticker data from Discord.
   */
  constructor(client: any, data: any) {
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the sticker.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The name of the sticker.
     * @type {String}
     * @private
     */
    this.#name = data.name;

    /**
     * The format type of the sticker.
     * @type {Number}
     * @private
     */
    this.#format_type = data.format_type;
  }

  /**
   * The ID of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The name of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * The format of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get format() {
    return STICKER_FORMATS[this.formatType];
  }

  /**
   * The format type of the sticker.
   * @type {Number}
   * @readonly
   * @public
   */
  get formatType() {
    return this.#format_type;
  }

  /**
   * The URL to an image of the sticker. Returns NULL if image is a LOTTIE file.
   * @type {String?}
   * @readonly
   * @public
   */
  get previewImageURL() {
    let cdnImageFormat;

    switch (this.formatType) {
      case STICKER_FORMATS_ENUM.LOTTIE: {
        return null;
      }
      case STICKER_FORMATS_ENUM.GIF: {
        return `${MEDIA_BASE_URL}/stickers/${this.id}.gif`;
      }
      case STICKER_FORMATS_ENUM.PNG:
      case STICKER_FORMATS_ENUM.APNG:
      default: {
        cdnImageFormat = "png";
        break;
      }
    }

    return `${CDN_BASE_URL}/stickers/${this.id}.${cdnImageFormat}`;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Sticker: ${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format: any) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          name: this.name,
          format_type: this.formatType,
        };
      }
    }
  }
}

export default Sticker;
