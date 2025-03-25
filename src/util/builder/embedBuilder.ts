import { UnixMillisecondsTimestamp, UnixTimestamp } from "#typings/gluon.js";
import { LIMITS } from "../../constants.js";
import hexToInt from "../general/hexToInt.js";
import isValidUrl from "../general/isValidUrl.js";
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
class Embed implements EmbedType {
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
  ) {
    this.fields = [];
    if (data) {
      if (data.title) this.setTitle(data.title);
      if (data.description) this.setDescription(data.description);
      if (data.url) this.setURL(data.url);
      if (data.timestamp)
        this.setTimestamp((new Date(data.timestamp).getTime() / 1000) | 0);
      if (data.color) this.setColor(data.color);
      if (data.footer) this.setFooter(data.footer.text, data.footer.icon_url);
      if (data.author)
        this.setAuthor(data.author.name, data.author.url, data.author.icon_url);
      if (data.fields && Array.isArray(data.fields))
        data.fields.map((field) =>
          this.addField(field.name, field.value, field.inline),
        );
      if (data.image) this.setImage(data.image.url);
      if (data.thumbnail) this.setThumbnail(data.thumbnail.url);
      if (data.video?.url) this.setVideo(data.video.url);
    }
  }

  /**
   * Sets the title of the embed.
   * @param {String} title The title of the embed.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setTitle(title: string) {
    if (!title || typeof title !== "string")
      throw new TypeError("GLUON: Embed title must be provided.");

    this.title =
      title && title.length > LIMITS.MAX_EMBED_TITLE
        ? `${title.substring(0, LIMITS.MAX_EMBED_TITLE - 3)}...`
        : title;

    return this;
  }

  /**
   * Sets the embed description.
   * @param {String} text The description.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setDescription(text: string) {
    if (!text || typeof text !== "string")
      throw new TypeError("GLUON: Embed description must be provided.");

    this.description =
      text && text.length > LIMITS.MAX_EMBED_DESCRIPTION
        ? `${text.substring(0, LIMITS.MAX_EMBED_DESCRIPTION - 3)}...`
        : text;

    return this;
  }

  /**
   * Sets the url of the embed.
   * @param {String} url The url.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setURL(url: string) {
    if (!url || typeof url !== "string")
      throw new TypeError("GLUON: Embed url must be provided.");

    this.url = url;

    return this;
  }

  /**
   * Sets the timestamp displayed on the embed.
   * @param {Number?} [timestamp] The UNIX timestamp.
   * @returns {Embed}
   * @method
   * @public
   */
  setTimestamp(timestamp?: UnixTimestamp) {
    if (timestamp) this.timestamp = timestamp * 1000;
    else this.timestamp = Date.now();

    return this;
  }

  /**
   * Sets the color of the embed.
   * @param {String | Number} color The color.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setColor(color: string | number) {
    if (!color) throw new TypeError("GLUON: Embed color must be provided.");

    if (typeof color === "string") {
      if (color[0] === "#") color = color.substring(1);

      this.color = hexToInt(color);
    } else if (typeof color === "number") this.color = color;

    return this;
  }

  /**
   * Sets the embed thumbnail image.
   * @param {String} url The url of the thumbnail.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setThumbnail(url: string) {
    if (!url || typeof url !== "string")
      throw new TypeError("GLUON: Embed thumbnail url must be provided.");

    this.thumbnail = {
      url,
    };

    return this;
  }

  /**
   * Sets the embed footer.
   * @param {String} text The footer text.
   * @param {String?} [icon] The url of the footer icon.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setFooter(text: string, icon?: string | null) {
    if (!text || typeof text !== "string")
      throw new TypeError("GLUON: Embed footer text must be provided.");

    this.footer = {
      text:
        text && text.length > LIMITS.MAX_EMBED_FOOTER_TEXT
          ? `${text.substring(0, LIMITS.MAX_EMBED_FOOTER_TEXT - 3)}...`
          : text,
    };
    if (icon) this.footer.icon_url = icon;

    return this;
  }

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
  setAuthor(name: string, url?: string | null, icon_url?: string | null) {
    if (!name || typeof name !== "string")
      throw new TypeError("GLUON: Embed author name must be provided.");

    this.author = {
      name:
        name && name.length > LIMITS.MAX_EMBED_AUTHOR_NAME
          ? `${name.substring(0, LIMITS.MAX_EMBED_AUTHOR_NAME - 3)}...`
          : name,
    };

    if (url) this.author.url = url;
    if (icon_url) this.author.icon_url = icon_url;

    return this;
  }

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
  addField(name: string, value: string, inline = false) {
    if (this.fields.length >= LIMITS.MAX_EMBED_FIELDS)
      throw new RangeError(
        `GLUON: Embed fields cannot exceed ${LIMITS.MAX_EMBED_FIELDS} fields.`,
      );

    if (
      !name ||
      !value ||
      typeof name !== "string" ||
      typeof value !== "string"
    )
      throw new TypeError(
        "GLUON: Embed field name and value must be provided.",
      );

    this.fields.push({
      name:
        name && name.length > LIMITS.MAX_EMBED_FIELD_NAME
          ? `${name.substring(0, LIMITS.MAX_EMBED_FIELD_NAME - 3)}...`
          : name,
      value:
        value && value.length > LIMITS.MAX_EMBED_FIELD_VALUE
          ? `${value.substring(0, LIMITS.MAX_EMBED_FIELD_VALUE - 3)}...`
          : value,
      inline,
    });

    return this;
  }

  /**
   * Sets the embed image url.
   * @param {String} url The image url.
   * @returns {Embed}
   * @method
   * @public
   */
  setImage(url: string) {
    if (!url && typeof url !== "string")
      throw new TypeError("GLUON: Embed image url must be a string.");

    this.image = {
      url,
    };

    return this;
  }

  /**
   * Sets the embed video url.
   * @param {String} url The video url.
   * @returns {Embed}
   * @method
   * @public
   */
  setVideo(url: string) {
    if (!url || typeof url !== "string")
      throw new TypeError("GLUON: Embed video url must be a string.");

    this.video = {
      url,
    };

    return this;
  }

  /**
   * Returns the character count of the embed.
   * @returns {Number}
   * @readonly
   * @public
   */
  get characterCount() {
    let count = 0;

    count += this.title ? this.title.length : 0;
    count += this.description ? this.description.length : 0;
    count += this.footer?.text ? this.footer.text.length : 0;
    count += this.author?.name ? this.author.name.length : 0;

    for (let i = 0; i < this.fields.length; i++)
      count +=
        (this.fields[i].name?.length || 0) +
        (this.fields[i].value?.length || 0);

    return count;
  }

  /**
   * Converts the embed into string form.
   * @returns {String}
   * @method
   * @public
   */
  toString() {
    let string = "";

    string += this.title ? `## ${this.title}\n\n` : "";

    string += this.description ? `${this.description}\n\n` : "";

    for (let i = 0; i < this.fields.length; i++)
      string +=
        this.fields[i].name !== "\u200b"
          ? `**${this.fields[i].name}**:\n${this.fields[i].value}\n`
          : `${this.fields[i].value}\n`;

    string += this.footer ? `-# ${this.footer.text}` : "";

    return string;
  }

  /**
   * Returns the correct Discord format for an embed.
   * @returns {Object}
   * @method
   * @public
   */
  toJSON(
    format?: JsonTypes,
    { suppressValidation = false }: { suppressValidation: boolean } = {
      suppressValidation: false,
    },
  ) {
    if (suppressValidation !== true) {
      if (this.title && typeof this.title !== "string")
        throw new TypeError("GLUON: Embed title must be a string.");
      if (this.title && this.title.length > LIMITS.MAX_EMBED_TITLE)
        throw new RangeError(
          `GLUON: Embed title must be less than ${LIMITS.MAX_EMBED_TITLE} characters.`,
        );
      if (this.description && typeof this.description !== "string")
        throw new TypeError("GLUON: Embed description must be a string.");
      if (
        this.description &&
        this.description.length > LIMITS.MAX_EMBED_DESCRIPTION
      )
        throw new RangeError(
          `GLUON: Embed description must be less than ${LIMITS.MAX_EMBED_DESCRIPTION} characters.`,
        );
      if (this.url && typeof this.url !== "string")
        throw new TypeError("GLUON: Embed url must be a string.");
      if (this.url && isValidUrl(this.url) === false)
        throw new TypeError("GLUON: Embed url must be a valid url.");
      if (this.timestamp && typeof this.timestamp !== "number")
        throw new TypeError("GLUON: Embed timestamp must be a number.");
      if (this.color && typeof this.color !== "number")
        throw new TypeError("GLUON: Embed color must be a number.");
      if (this.footer && typeof this.footer !== "object")
        throw new TypeError("GLUON: Embed footer must be an object.");
      if (this.footer && typeof this.footer.text !== "string")
        throw new TypeError("GLUON: Embed footer text must be a string.");
      if (
        this.footer?.text &&
        this.footer.text.length > LIMITS.MAX_EMBED_FOOTER_TEXT
      )
        throw new RangeError(
          `GLUON: Embed footer text must be less than ${LIMITS.MAX_EMBED_FOOTER_TEXT} characters.`,
        );
      if (
        this.footer?.icon_url &&
        typeof this.footer.icon_url !== "string"
      )
        throw new TypeError("GLUON: Embed footer icon url must be a string.");
      if (
        this.footer?.icon_url &&
        isValidUrl(this.footer.icon_url) === false
      )
        throw new TypeError(
          "GLUON: Embed footer icon url must be a valid url.",
        );
      if (this.author && typeof this.author !== "object")
        throw new TypeError("GLUON: Embed author must be an object.");
      if (this.author && typeof this.author.name !== "string")
        throw new TypeError("GLUON: Embed author name must be a string.");
      if (
        this.author?.name &&
        this.author.name.length > LIMITS.MAX_EMBED_AUTHOR_NAME
      )
        throw new RangeError(
          `GLUON: Embed author name must be less than ${LIMITS.MAX_EMBED_AUTHOR_NAME} characters.`,
        );
      if (this.author?.url && typeof this.author.url !== "string")
        throw new TypeError("GLUON: Embed author url must be a string.");
      if (
        this.author?.url &&
        isValidUrl(this.author.url) === false
      )
        throw new TypeError("GLUON: Embed author url must be a valid url.");
      if (
        this.author?.icon_url &&
        typeof this.author.icon_url !== "string"
      )
        throw new TypeError("GLUON: Embed author icon url must be a string.");
      if (
        this.author?.icon_url &&
        isValidUrl(this.author.icon_url) === false
      )
        throw new TypeError(
          "GLUON: Embed author icon url must be a valid url.",
        );
      if (this.fields && !Array.isArray(this.fields))
        throw new TypeError("GLUON: Embed fields must be an array.");
      if (this.fields && this.fields.length > LIMITS.MAX_EMBED_FIELDS)
        throw new RangeError(
          `GLUON: Embed fields cannot exceed ${LIMITS.MAX_EMBED_FIELDS} fields.`,
        );
      if (
        !this.fields.every(
          (field) =>
            typeof field === "object" &&
            typeof field.name === "string" &&
            typeof field.value === "string" &&
            typeof field.inline === "boolean",
        )
      )
        throw new TypeError(
          "GLUON: Embed fields must be an array of objects with name (string), value (string), and inline (boolean) properties.",
        );
      if (this.image && typeof this.image !== "object")
        throw new TypeError("GLUON: Embed image must be an object.");
      if (this.image && typeof this.image.url !== "string")
        throw new TypeError("GLUON: Embed image url must be a string.");
      if (this.image?.url && isValidUrl(this.image.url) === false)
        throw new TypeError("GLUON: Embed image url must be a valid url.");
      if (this.thumbnail && typeof this.thumbnail !== "object")
        throw new TypeError("GLUON: Embed thumbnail must be an object.");
      if (this.thumbnail && typeof this.thumbnail.url !== "string")
        throw new TypeError("GLUON: Embed thumbnail url must be a string.");
      if (
        this.thumbnail?.url &&
        isValidUrl(this.thumbnail.url) === false
      )
        throw new TypeError("GLUON: Embed thumbnail url must be a valid url.");
      if (this.video && typeof this.video !== "object")
        throw new TypeError("GLUON: Embed video must be an object.");
      if (this.video && typeof this.video.url !== "string")
        throw new TypeError("GLUON: Embed video url must be a string.");
      if (this.video?.url && isValidUrl(this.video.url) === false)
        throw new TypeError("GLUON: Embed video url must be a valid url.");
    }
    switch (format) {
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.CACHE_FORMAT: {
        return {
          title: this.title,
          description: this.description,
          url: this.url,
          timestamp: this.timestamp,
          color: this.color,
          footer: this.footer,
          author: this.author,
          fields: this.fields,
          image: this.image,
          thumbnail: this.thumbnail,
          video: this.video,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          title: this.title,
          description: this.description,
          url: this.url,
          timestamp: this.timestamp
            ? new Date(this.timestamp).toISOString()
            : undefined,
          color: this.color,
          footer: this.footer,
          author: this.author,
          fields: this.fields,
          image: this.image,
          thumbnail: this.thumbnail,
          video: this.video,
        };
      }
    }
  }
}

export default Embed;
