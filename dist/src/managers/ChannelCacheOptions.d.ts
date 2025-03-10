import type { ChannelCacheOptions as ChannelCacheOptionsType } from "../../typings/index.d.ts";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents the cache options for a channel.
 * All options are enabled by default.
 */
declare class ChannelCacheOptions implements ChannelCacheOptionsType {
  #private;
  /**
   * Creates the cache options for a channel.
   * @param {Number} cache_options The preset cache options for this channel.
   * @public
   * @constructor
   */
  constructor(cache_options?: number);
  /**
   * Sets whether to cache messages or not.
   * @param {Boolean} option Whether to cache messages or not.
   * @public
   * @throws {TypeError}
   * @method
   */
  setMessageCaching(option: boolean): void;
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setFileCaching(option: boolean): void;
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setContentCaching(option: boolean): void;
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setPollCaching(option: boolean): void;
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setReactionCaching(option: boolean): void;
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setEmbedCaching(option: boolean): void;
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setAttributeCaching(option: boolean): void;
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setReferenceCaching(option: boolean): void;
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setStickerCaching(option: boolean): void;
  /**
   * Sets whether to cache messages or not
   * @param {Boolean} option The option to set.
   * @public
   * @throws {TypeError}
   * @method
   */
  setWebhookCaching(option: boolean): void;
  /**
   * Disables all caching options.
   * @public
   * @method
   * @returns {void}
   */
  setDisableAll(): void;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get messageCaching(): boolean;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get fileCaching(): boolean;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get contentCaching(): boolean;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get pollCaching(): boolean;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get reactionCaching(): boolean;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get embedCaching(): boolean;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get attributeCaching(): boolean;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get referenceCaching(): boolean;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get stickerCaching(): boolean;
  /**
   * Returns whether to cache messages or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get webhookCaching(): boolean;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format: JsonTypes): number;
}
export default ChannelCacheOptions;
