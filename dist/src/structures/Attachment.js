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
var _Attachment__client,
  _Attachment__id,
  _Attachment__channel_id,
  _Attachment__urlData,
  _Attachment_name,
  _Attachment_size;
import fetch from "node-fetch";
import Client from "../Client.js";
import { CDN_BASE_URL, TO_JSON_TYPES_ENUM } from "../constants.js";
import util from "util";
/**
 * Represents an attachment.
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure}
 */
class Attachment {
  /**
   * Creates a structure for an attachment.
   * @param {Client} client The client instance.
   * @param {Object} data Attachment data from Discord.
   * @param {Object} options Additional options for the attachment.
   * @param {String} options.channelId The ID of the channel that this attachment belongs to.
   */
  constructor(client, data, { channelId } = {}) {
    _Attachment__client.set(this, void 0);
    _Attachment__id.set(this, void 0);
    _Attachment__channel_id.set(this, void 0);
    _Attachment__urlData.set(this, void 0);
    _Attachment_name.set(this, void 0);
    _Attachment_size.set(this, void 0);
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _Attachment__client, client, "f");
    /**
     * The id of the attachment.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Attachment__id, BigInt(data.id), "f");
    /**
     * The name of the file.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _Attachment_name, data.filename, "f");
    /**
     * The size of the file.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _Attachment_size, data.size, "f");
    if (data.url) {
      /**
       * Data about the file url.
       * @type {Object?}
       * @private
       */
      __classPrivateFieldSet(this, _Attachment__urlData, {}, "f");
      const urlParams = new URL(data.url).searchParams;
      // @ts-expect-error TS(2339): Property 'ex' does not exist on type '{}'.
      __classPrivateFieldGet(this, _Attachment__urlData, "f").ex = BigInt(
        `0x${urlParams.get("ex")}`,
      );
      // @ts-expect-error TS(2339): Property 'is' does not exist on type '{}'.
      __classPrivateFieldGet(this, _Attachment__urlData, "f").is = BigInt(
        `0x${urlParams.get("is")}`,
      );
      // @ts-expect-error TS(2339): Property 'hm' does not exist on type '{}'.
      __classPrivateFieldGet(this, _Attachment__urlData, "f").hm = BigInt(
        `0x${urlParams.get("hm")}`,
      );
    }
    /**
     * The channel that this attachment belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Attachment__channel_id,
      BigInt(channelId),
      "f",
    );
  }
  /**
   * The id of the attachment.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _Attachment__id, "f"));
  }
  /**
   * The name of the file.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return __classPrivateFieldGet(this, _Attachment_name, "f");
  }
  /**
   * The size of the file.
   * @type {Number}
   * @readonly
   * @public
   */
  get size() {
    return __classPrivateFieldGet(this, _Attachment_size, "f");
  }
  /**
   * The url to the file.
   * @type {String}
   * @readonly
   * @public
   */
  get url() {
    if (!__classPrivateFieldGet(this, _Attachment__urlData, "f")) return null;
    const url = new URL(
      `${CDN_BASE_URL}/attachments/${this.channelId}/${this.id}/${this.name}`,
    );
    // @ts-expect-error TS(2339): Property 'ex' does not exist on type '{}'.
    url.searchParams.append(
      "ex",
      __classPrivateFieldGet(this, _Attachment__urlData, "f").ex.toString(16),
    );
    // @ts-expect-error TS(2339): Property 'is' does not exist on type '{}'.
    url.searchParams.append(
      "is",
      __classPrivateFieldGet(this, _Attachment__urlData, "f").is.toString(16),
    );
    // @ts-expect-error TS(2339): Property 'hm' does not exist on type '{}'.
    url.searchParams.append(
      "hm",
      __classPrivateFieldGet(this, _Attachment__urlData, "f").hm.toString(16),
    );
    return url.href;
  }
  /**
   * The channel that this attachment belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId() {
    return __classPrivateFieldGet(this, _Attachment__channel_id, "f")
      ? String(__classPrivateFieldGet(this, _Attachment__channel_id, "f"))
      : undefined;
  }
  /**
   * Fetches the data of the attachment.
   * @returns {Promise<ArrayBuffer>}
   * @public
   */
  async fetchData() {
    // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
    const res = await fetch(this.url);
    return res.arrayBuffer();
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<Attachment: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_Attachment__client = new WeakMap()),
  (_Attachment__id = new WeakMap()),
  (_Attachment__channel_id = new WeakMap()),
  (_Attachment__urlData = new WeakMap()),
  (_Attachment_name = new WeakMap()),
  (_Attachment_size = new WeakMap()),
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
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        return {
          id: this.id,
          filename: this.name,
          size: this.size,
        };
      }
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          filename: this.name,
          size: this.size,
          url: this.url,
        };
      }
    }
  }
}
export default Attachment;
//# sourceMappingURL=Attachment.js.map
