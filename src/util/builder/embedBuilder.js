import { LIMITS } from "../../constants.js";
import hexToInt from "../general/hexToInt.js";

/**
 * Helps to create an embed for a message.
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure}
 */
class Embed {
  /**
   * Creates an embed structure.
   */
  constructor() {
    this.type = "rich";
    this.fields = [];
  }

  /**
   * Sets the title of the embed.
   * @param {String} title The title of the embed.
   * @returns {Embed}
   */
  setTitle(title) {
    if (!title) throw new TypeError("GLUON: Embed title must be provided.");

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
   */
  setDescription(text) {
    if (!text)
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
   */
  setURL(url) {
    if (!url) throw new TypeError("GLUON: Embed url must be provided.");

    this.url = url;

    return this;
  }

  /**
   * Sets the timestamp displayed on the embed.
   * @param {Number?} timestamp The UNIX timestamp.
   * @returns {Embed}
   */
  setTimestamp(timestamp) {
    if (timestamp) this.timestamp = new Date(timestamp * 1000).toISOString();
    else this.timestamp = new Date().toISOString();

    return this;
  }

  /**
   * Sets the color of the embed.
   * @param {String | Number} color The color.
   * @returns {Embed}
   */
  setColor(color) {
    if (!color) throw new TypeError("GLUON: Embed color must be provided.");

    if (typeof color == "string") {
      if (color[0] == "#") color = color.substring(1);

      this.color = hexToInt(color);
    } else if (typeof color == "number") this.color = color;

    return this;
  }

  /**
   * Sets the embed thumbnail image.
   * @param {String} url The url of the thumbnail.
   * @returns {Embed}
   */
  setThumbnail(url) {
    if (!url)
      throw new TypeError("GLUON: Embed thumbnail url must be provided.");

    this.thumbnail = {
      url,
    };

    return this;
  }

  /**
   * Sets the embed footer.
   * @param {String} text The footer text.
   * @param {String?} icon The url of the footer icon.
   * @returns {Embed}
   */
  setFooter(text, icon) {
    if (!text)
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
   */
  setAuthor(name, url, icon_url) {
    if (!name)
      throw new TypeError("GLUON: Embed author name must be provided.");

    this.author = {};

    if (name)
      this.author.name =
        name && name.length > LIMITS.MAX_EMBED_AUTHOR_NAME
          ? `${name.substring(0, LIMITS.MAX_EMBED_AUTHOR_NAME - 3)}...`
          : name;
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
   */
  addField(name, value, inline = false) {
    if (this.fields.length >= LIMITS.MAX_EMBED_FIELDS)
      throw new RangeError(
        `GLUON: Embed fields cannot exceed ${LIMITS.MAX_EMBED_FIELDS} fields.`,
      );

    if (!name || !value)
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
   */
  setImage(url) {
    this.image = {
      url,
    };

    return this;
  }

  /**
   * Converts the embed into string form.
   * @returns {String}
   */
  toString() {
    let string = "";

    string += this.title ? `## ${this.title}\n\n` : "";

    string += this.description ? `${this.description}\n\n` : "";

    for (let i = 0; i < this.fields.length; i++)
      string +=
        this.fields[i].name != "\u200b"
          ? `**${this.fields[i].name}**:\n${this.fields[i].value}\n`
          : `${this.fields[i].value}\n`;

    string += this.footer ? this.footer.text : "";

    return string;
  }

  /**
   * Returns the correct Discord format for an embed.
   * @returns {Object}
   */
  toJSON() {
    return {
      title: this.title,
      type: this.type,
      description: this.description,
      url: this.url,
      timestamp: this.timestamp,
      color: this.color,
      footer: this.footer,
      author: this.author,
      fields: this.fields,
      image: this.image,
      thumbnail: this.thumbnail,
    };
  }

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
}

export default Embed;
