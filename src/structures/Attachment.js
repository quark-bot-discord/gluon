/**
 * Represents an attachment.
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure}
 */
class Attachment {
  /**
   * Creates a structure for an attachment.
   * @param {Client} client The client instance.
   * @param {Object} data Attachment data from Discord.
   */
  constructor(client, data) {
    /**
     * The client instance.
     * @type {Client}
     */
    this.client = client;

    /**
     * The id of the attachment.
     * @type {BigInt}
     */
    this.id = BigInt(data.id);

    /**
     * The name of the file.
     * @type {String}
     */
    this.name = data.filename;

    /**
     * The size of the file.
     * @type {Number}
     */
    this.size = data.size;

    /**
     * The url to the file.
     * @type {String}
     */
    this.url = data.url;
  }
}

module.exports = Attachment;
