const {
  STICKER_FORMATS,
  CDN_BASE_URL,
  STICKER_FORMATS_ENUM,
} = require("../constants");

/**
 * Represents an sticker.
 */
class Sticker {
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data Sticker data from Discord.
   */
  constructor(client, data) {
    /**
     * The client instance.
     * @type {Client}
     */
    this._client = client;

    /**
     * The id of the sticker.
     * @type {BigInt}
     */
    this.id = BigInt(data.id);

    /**
     * The name of the sticker.
     * @type {String}
     */
    this.name = data.name;

    /**
     * The format type of the sticker.
     * @type {Number}
     */
    this.format_type = data.format_type;
  }

  /**
   * The format of the sticker.
   * @type {String}
   * @readonly
   */
  get format() {
    return STICKER_FORMATS[this.format_type];
  }

  /**
   * The URL to an image of the sticker. Returns NULL if image is a LOTTIE file.
   * @type {String?}
   * @readonly
   */
  get previewImageURL() {
    let cdnImageFormat;

    switch (this.format_type) {
      case STICKER_FORMATS_ENUM.LOTTIE: {
        return null;
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
}

module.exports = Sticker;
