import fetch from "node-fetch";
import Client from "../Client.js";
import { CDN_BASE_URL, TO_JSON_TYPES_ENUM } from "../constants.js";
import util from "util";
import {
  AttachmentCacheJSON,
  AttachmentDiscordJSON,
  AttachmentRaw,
  AttachmentStorageJSON,
  AttachmentType,
} from "./interfaces/Attachment.js";
import ClientType from "src/interfaces/Client.js";
import { Snowflake } from "src/interfaces/gluon.js";

/**
 * Represents an attachment.
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure}
 */
class Attachment implements AttachmentType {
  #_client;
  #_id;
  #_channel_id;
  #_urlData;
  #name;
  #size;

  /**
   * Creates a structure for an attachment.
   */
  constructor(
    client: ClientType,
    data:
      | AttachmentRaw
      | AttachmentStorageJSON
      | AttachmentCacheJSON
      | AttachmentDiscordJSON,
    { channelId }: { channelId: Snowflake },
  ) {
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

    if ("url" in data && data.url) {
      /**
       * Data about the file url.
       * @type {Object?}
       * @private
       */
      this.#_urlData = {};

      const urlParams = new URL(data.url).searchParams;
      // @ts-expect-error TS(2339): Property 'ex' does not exist on type '{}'.
      this.#_urlData.ex = BigInt(`0x${urlParams.get("ex")}`);
      // @ts-expect-error TS(2339): Property 'is' does not exist on type '{}'.
      this.#_urlData.is = BigInt(`0x${urlParams.get("is")}`);
      // @ts-expect-error TS(2339): Property 'hm' does not exist on type '{}'.
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
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The name of the file.
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * The size of the file.
   * @readonly
   * @public
   */
  get size() {
    return this.#size;
  }

  /**
   * The url to the file.
   * @readonly
   * @public
   */
  get url() {
    if (!this.#_urlData) return null;

    const url = new URL(
      `${CDN_BASE_URL}/attachments/${this.channelId}/${this.id}/${this.name}`,
    );
    // @ts-expect-error TS(2339): Property 'ex' does not exist on type '{}'.
    url.searchParams.append("ex", this.#_urlData.ex.toString(16));
    // @ts-expect-error TS(2339): Property 'is' does not exist on type '{}'.
    url.searchParams.append("is", this.#_urlData.is.toString(16));
    // @ts-expect-error TS(2339): Property 'hm' does not exist on type '{}'.
    url.searchParams.append("hm", this.#_urlData.hm.toString(16));

    return url.href;
  }

  /**
   * The channel that this attachment belongs to.
   * @readonly
   * @public
   */
  get channelId() {
    return this.#_channel_id ? String(this.#_channel_id) : null;
  }

  /**
   * Fetches the data of the attachment.
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
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   */
  toJSON(format: TO_JSON_TYPES_ENUM) {
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
