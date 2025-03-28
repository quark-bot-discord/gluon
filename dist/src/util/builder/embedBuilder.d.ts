import { UnixMillisecondsTimestamp, UnixTimestamp } from "#typings/gluon.js";
import type {
  EmbedBuilderCacheJSON,
  EmbedBuilderDiscordJSON,
  EmbedBuilderStorageJSON,
  Embed as EmbedType,
} from "typings/index.d.ts";
import {
  APIEmbed,
  APIEmbedAuthor,
  APIEmbedField,
  APIEmbedFooter,
  APIEmbedImage,
  APIEmbedThumbnail,
  APIEmbedVideo,
} from "#typings/discord.js";
import { JsonTypes } from "../../../typings/enums.js";
/**
 * Helps to create an embed for a message.
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure}
 */
declare class Embed implements EmbedType {
  /**
   * The title of the embed.
   * @type {String}
   * @public
   */
  title: string | undefined;
  /**
   * The description of the embed.
   * @type {String}
   * @public
   */
  description: string | undefined;
  /**
   * The url of the embed.
   * @type {String}
   * @public
   */
  url: string | undefined;
  /**
   * The timestamp of the embed.
   * @type {Number}
   * @public
   */
  timestamp: UnixMillisecondsTimestamp | undefined;
  /**
   * The color of the embed.
   * @type {Number}
   * @public
   */
  color: number | undefined;
  /**
   * The footer of the embed.
   * @type {EmbedFooter}
   * @public
   */
  footer: APIEmbedFooter | undefined;
  /**
   * The author of the embed.
   * @type {EmbedAuthor}
   * @public
   */
  author: APIEmbedAuthor | undefined;
  /**
   * The fields of the embed.
   * @type {Array<EmbedField>}
   * @public
   */
  fields: Array<APIEmbedField>;
  /**
   * The image of the embed.
   * @type {EmbedMedia}
   * @public
   */
  image: APIEmbedImage | undefined;
  /**
   * The thumbnail of the embed.
   * @type {EmbedMedia}
   * @public
   */
  thumbnail: APIEmbedThumbnail | undefined;
  /**
   * The video of the embed.
   * @type {EmbedMedia}
   * @public
   */
  video: APIEmbedVideo | undefined;
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
  constructor(
    data?:
      | APIEmbed
      | EmbedBuilderCacheJSON
      | EmbedBuilderDiscordJSON
      | EmbedBuilderStorageJSON,
  );
  /**
   * Sets the title of the embed.
   * @param {String} title The title of the embed.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setTitle(title: string): this;
  /**
   * Sets the embed description.
   * @param {String} text The description.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setDescription(text: string): this;
  /**
   * Sets the url of the embed.
   * @param {String} url The url.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setURL(url: string): this;
  /**
   * Sets the timestamp displayed on the embed.
   * @param {Number?} [timestamp] The UNIX timestamp.
   * @returns {Embed}
   * @method
   * @public
   */
  setTimestamp(timestamp?: UnixTimestamp): this;
  /**
   * Sets the color of the embed.
   * @param {String | Number} color The color.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setColor(color: string | number): this;
  /**
   * Sets the embed thumbnail image.
   * @param {String} url The url of the thumbnail.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setThumbnail(url: string): this;
  /**
   * Sets the embed footer.
   * @param {String} text The footer text.
   * @param {String?} [icon] The url of the footer icon.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setFooter(text: string, icon?: string | null): this;
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
  setAuthor(name: string, url?: string | null, icon_url?: string | null): this;
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
  addField(name: string, value: string, inline?: boolean): this;
  /**
   * Sets the embed image url.
   * @param {String} url The image url.
   * @returns {Embed}
   * @method
   * @public
   */
  setImage(url: string): this;
  /**
   * Sets the embed video url.
   * @param {String} url The video url.
   * @returns {Embed}
   * @method
   * @public
   */
  setVideo(url: string): this;
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
    format?: JsonTypes,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ):
    | {
        title: string | undefined;
        description: string | undefined;
        url: string | undefined;
        timestamp: number | undefined;
        color: number | undefined;
        footer: APIEmbedFooter | undefined;
        author: APIEmbedAuthor | undefined;
        fields: APIEmbedField[];
        image: APIEmbedImage | undefined;
        thumbnail: APIEmbedThumbnail | undefined;
        video: APIEmbedVideo | undefined;
      }
    | {
        title: string | undefined;
        description: string | undefined;
        url: string | undefined;
        timestamp: string | undefined;
        color: number | undefined;
        footer: APIEmbedFooter | undefined;
        author: APIEmbedAuthor | undefined;
        fields: APIEmbedField[];
        image: APIEmbedImage | undefined;
        thumbnail: APIEmbedThumbnail | undefined;
        video: APIEmbedVideo | undefined;
      };
}
export default Embed;
