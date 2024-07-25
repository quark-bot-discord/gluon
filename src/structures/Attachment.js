const { CDN_BASE_URL } = require("../constants");

/**
 * Represents an attachment.
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure}
 */
class Attachment {
  #_client;
  #_id;
  #_parentStructure;
  #_urlData;
  #name;
  #size;

  /**
   * Creates a structure for an attachment.
   * @param {Client} client The client instance.
   * @param {Object} data Attachment data from Discord.
   */
  constructor(client, data, { _parentStructure } = {}) {
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

    /**
     * Data about the file url.
     * @type {Object}
     * @private
     */
    this.#_urlData = {};

    const urlParams = new URL(data.url).searchParams;
    this.#_urlData.ex = BigInt(`0x${urlParams.get("ex")}`);
    this.#_urlData.is = BigInt(`0x${urlParams.get("is")}`);
    this.#_urlData.hm = BigInt(`0x${urlParams.get("hm")}`);

    /**
     * The parent structure that this attachment belongs to.
     * @type {Object}
     * @private
     */
    this.#_parentStructure = _parentStructure;
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
    const url = new URL(
      `${CDN_BASE_URL}/attachments/${this.#_parentStructure.id}/${this.id}/${
        this.name
      }`,
    );
    url.searchParams.append("ex", this.#_urlData.ex.toString(16));
    url.searchParams.append("is", this.#_urlData.is.toString(16));
    url.searchParams.append("hm", this.#_urlData.hm.toString(16));

    return url.href;
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
  toJSON() {
    return {
      id: this.id,
      filename: this.name,
      size: this.size,
      url: this.url,
    };
  }
}

module.exports = Attachment;
