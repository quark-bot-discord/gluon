import ClientType from "src/interfaces/Client.js";
import util from "util";
import { APISticker, StickerFormatType } from "discord-api-types/v10";
import {
  Sticker as StickerType,
  StickerCacheJSON,
  StickerDiscordJSON,
  StickerStorageJSON,
  JsonTypes,
} from "../../typings/index.d.js";
/**
 * Represents an sticker.
 */
declare class Sticker implements StickerType {
  #private;
  /**
   * Creates the structure for a sticker
   * @param {Client} client The client instance.
   * @param {Object} data Sticker data from Discord.
   */
  constructor(
    client: ClientType,
    data:
      | APISticker
      | StickerCacheJSON
      | StickerDiscordJSON
      | StickerStorageJSON,
  );
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
  get name(): string;
  /**
   * The format of the sticker.
   * @type {String}
   * @readonly
   * @public
   */
  get format(): StickerFormatType;
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
  toJSON(format: JsonTypes): {
    id: string;
    name: string;
    format_type: StickerFormatType;
  };
}
export default Sticker;
