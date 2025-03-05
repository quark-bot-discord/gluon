var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _Sticker__id, _Sticker_name, _Sticker_format_type;
import { CDN_BASE_URL, MEDIA_BASE_URL } from "../constants.js";
import util from "util";
import { StickerFormatType } from "discord-api-types/v10";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents an sticker.
 */
class Sticker {
  /**
   * Creates the structure for a sticker
   * @param {Client} client The client instance.
   * @param {Object} data Sticker data from Discord.
   */
  constructor(client, data) {
    // #_client;
    _Sticker__id.set(this, void 0);
    _Sticker_name.set(this, void 0);
    _Sticker_format_type.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    // this.#_client = client;
    /**
     * The id of the sticker.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Sticker__id, BigInt(data.id), "f");
    /**
     * The name of the sticker.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _Sticker_name, data.name, "f");
    /**
     * The format type of the sticker.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _Sticker_format_type, data.format_type, "f");
  }
  /**
   * The ID of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _Sticker__id, "f"));
  }
  /**
   * The name of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return __classPrivateFieldGet(this, _Sticker_name, "f");
  }
  /**
   * The format of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get format() {
    return __classPrivateFieldGet(this, _Sticker_format_type, "f");
  }
  /**
   * The URL to an image of the sticker. Returns NULL if image is a LOTTIE file.
   * @type {String?}
   * @readonly
   * @public
   */
  get previewImageURL() {
    let cdnImageFormat;
    switch (this.format) {
      case StickerFormatType.Lottie: {
        return null;
      }
      case StickerFormatType.GIF: {
        return `${MEDIA_BASE_URL}/stickers/${this.id}.gif`;
      }
      case StickerFormatType.PNG:
      case StickerFormatType.APNG:
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
  [((_Sticker__id = new WeakMap()),
  (_Sticker_name = new WeakMap()),
  (_Sticker_format_type = new WeakMap()),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          name: this.name,
          format_type: this.format,
        };
      }
    }
  }
}
export default Sticker;
//# sourceMappingURL=Sticker.js.map
