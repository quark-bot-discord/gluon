/**
 * Represents an author in an embed.
 * @typedef {Object} EmbedAuthor
 * @property {String} name The author name.
 * @property {String} [url] The author url.
 * @property {String} [icon_url] The author icon url.
 */
/**
 * Represents an embed field.
 * @typedef {Object} EmbedField
 * @property {String} name The field name.
 * @property {String} value The field value.
 * @property {Boolean} inline Whether the field should be inline.
 */
/**
 * Represents an embed footer.
 * @typedef {Object} EmbedFooter
 * @property {String} text The footer text.
 * @property {String} [icon_url] The footer icon url.
 */
/**
 * Represents embed media.
 * @typedef {Object} EmbedMedia
 * @property {String} url The media url.
 */
/**
 * Helps to create an embed for a message.
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure}
 */
declare class Embed {
  /**
   * The title of the embed.
   * @type {String}
   * @public
   */
  title: any;
  /**
   * The description of the embed.
   * @type {String}
   * @public
   */
  description: any;
  /**
   * The url of the embed.
   * @type {String}
   * @public
   */
  url: any;
  /**
   * The timestamp of the embed.
   * @type {Number}
   * @public
   */
  timestamp: any;
  /**
   * The color of the embed.
   * @type {Number}
   * @public
   */
  color: any;
  /**
   * The footer of the embed.
   * @type {EmbedFooter}
   * @public
   */
  footer: any;
  /**
   * The author of the embed.
   * @type {EmbedAuthor}
   * @public
   */
  author: any;
  /**
   * The fields of the embed.
   * @type {Array<EmbedField>}
   * @public
   */
  fields: any;
  /**
   * The image of the embed.
   * @type {EmbedMedia}
   * @public
   */
  image: any;
  /**
   * The thumbnail of the embed.
   * @type {EmbedMedia}
   * @public
   */
  thumbnail: any;
  /**
   * The video of the embed.
   * @type {EmbedMedia}
   * @public
   */
  video: any;
  /**
   * Creates an embed structure.
   * @param {Object?} [data] The embed data.
   * @param {String?} [data.title] The title of the embed.
   * @param {String?} [data.description] The description of the embed.
   * @param {String?} [data.url] The url of the embed.
   * @param {Number?} [data.timestamp] The timestamp of the embed.
   * @param {String?} [data.color] The color of the embed.
   * @param {Object?} [data.footer] The footer of the embed.
   * @param {String?} [data.footer.text] The footer text.
   * @param {String?} [data.footer.icon_url] The footer icon url.
   * @param {Object?} [data.author] The author of the embed.
   * @param {String?} [data.author.name] The author name.
   * @param {String?} [data.author.url] The author url.
   * @param {String?} [data.author.icon_url] The author icon url.
   * @param {Array?} [data.fields] The fields of the embed.
   * @param {String?} [data.fields.name] The field name.
   * @param {String?} [data.fields.value] The field value.
   * @param {Boolean?} [data.fields.inline] Whether the field should be inline.
   * @param {Object?} [data.image] The image of the embed.
   * @param {String?} [data.image.url] The image url.
   * @param {Object?} [data.thumbnail] The thumbnail of the embed.
   * @param {String?} [data.thumbnail.url] The thumbnail url.
   * @param {Object?} [data.video] The video of the embed.
   * @param {String?} [data.video.url] The video url.
   * @constructor
   */
  constructor(data?: any);
  /**
   * Sets the title of the embed.
   * @param {String} title The title of the embed.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setTitle(title: any): this;
  /**
   * Sets the embed description.
   * @param {String} text The description.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setDescription(text: any): this;
  /**
   * Sets the url of the embed.
   * @param {String} url The url.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setURL(url: any): this;
  /**
   * Sets the timestamp displayed on the embed.
   * @param {Number?} [timestamp] The UNIX timestamp.
   * @returns {Embed}
   * @method
   * @public
   */
  setTimestamp(timestamp: any): this;
  /**
   * Sets the color of the embed.
   * @param {String | Number} color The color.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setColor(color: any): this;
  /**
   * Sets the embed thumbnail image.
   * @param {String} url The url of the thumbnail.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setThumbnail(url: any): this;
  /**
   * Sets the embed footer.
   * @param {String} text The footer text.
   * @param {String?} [icon] The url of the footer icon.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setFooter(text: any, icon: any): this;
  /**
   * Sets the embed author info.
   * @param {String?} name The embed author.
   * @param {String?} url The url.
   * @param {String?} icon_url The embed author image url.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setAuthor(name: any, url: any, icon_url: any): this;
  /**
   * Adds a field to the embed.
   * @param {String} name Sets the embed field name.
   * @param {String} value Sets the embed field value.
   * @param {Boolean?} inline Whether this field should be displayed inline.
   * @returns {Embed}
   * @throws {RangeError | TypeError}
   * @method
   * @public
   */
  addField(name: any, value: any, inline?: boolean): this;
  /**
   * Sets the embed image url.
   * @param {String} url The image url.
   * @returns {Embed}
   * @method
   * @public
   */
  setImage(url: any): this;
  /**
   * Sets the embed video url.
   * @param {String} url The video url.
   * @returns {Embed}
   * @method
   * @public
   */
  setVideo(url: any): this;
  /**
   * Returns the character count of the embed.
   * @returns {Number}
   * @readonly
   * @public
   */
  get characterCount(): number;
  /**
   * Converts the embed into string form.
   * @returns {String}
   * @method
   * @public
   */
  toString(): string;
  /**
   * Returns the correct Discord format for an embed.
   * @returns {Object}
   * @method
   * @public
   */
  toJSON(
    format: number,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ): {
    title: any;
    description: any;
    url: any;
    timestamp: any;
    color: any;
    footer: any;
    author: any;
    fields: any;
    image: any;
    thumbnail: any;
    video: any;
  };
}
export default Embed;
