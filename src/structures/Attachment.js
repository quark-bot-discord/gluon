import fetch from "node-fetch";
import Client from "../Client.js";
import { CDN_BASE_URL, TO_JSON_TYPES_ENUM } from "../constants.js";
import util from "util";

/**
 * Represents an attachment.
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure}
 */
class Attachment {
  #_client;
  #_id;
  #_channel_id;
  #_urlData;
  #name;
  #size;

  /**
   * Creates a structure for an attachment.
   * @param {Client} client The client instance.
   * @param {Object} data Attachment data from Discord.
   * @param {Object} options Additional options for the attachment.
   * @param {String} options.channelId The ID of the channel that this attachment belongs to.
   */
  constructor(client, data, { channelId } = {}) {
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
    this.#_client = client;

    /**
     * The id of the attachment.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The name of the file.
     * @type {String}
     * @private
     */
    this.#name = data.filename;

    /**
     * The size of the file.
     * @type {Number}
     * @private
     */
    this.#size = data.size;

    if (data.url) {
      /**
       * Data about the file url.
       * @type {Object?}
       * @private
       */
      this.#_urlData = {};

      const urlParams = new URL(data.url).searchParams;
      this.#_urlData.ex = BigInt(`0x${urlParams.get("ex")}`);
      this.#_urlData.is = BigInt(`0x${urlParams.get("is")}`);
      this.#_urlData.hm = BigInt(`0x${urlParams.get("hm")}`);
    }

    /**
     * The channel that this attachment belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_channel_id = BigInt(channelId);
  }

  /**
   * The id of the attachment.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The name of the file.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * The size of the file.
   * @type {Number}
   * @readonly
   * @public
   */
  get size() {
    return this.#size;
  }

  /**
   * The url to the file.
   * @type {String}
   * @readonly
   * @public
   */
  get url() {
    if (!this.#_urlData) return null;

    const url = new URL(
      `${CDN_BASE_URL}/attachments/${this.channelId}/${this.id}/${this.name}`,
    );
    url.searchParams.append("ex", this.#_urlData.ex.toString(16));
    url.searchParams.append("is", this.#_urlData.is.toString(16));
    url.searchParams.append("hm", this.#_urlData.hm.toString(16));

    return url.href;
  }

  /**
   * The channel that this attachment belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId() {
    return this.#_channel_id ? String(this.#_channel_id) : undefined;
  }

  /**
   * Fetches the data of the attachment.
   * @returns {Promise<ArrayBuffer>}
   * @public
   */
  async fetchData() {
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
