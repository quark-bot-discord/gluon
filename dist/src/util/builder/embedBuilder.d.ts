export default Embed;
/**
 * Helps to create an embed for a message.
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure}
 */
declare class Embed {
    /**
     * Creates an embed structure.
     */
    constructor(data: any);
    fields: any[];
    /**
     * Sets the title of the embed.
     * @param {String} title The title of the embed.
     * @returns {Embed}
     * @throws {TypeError}
     * @method
     * @public
     */
    public setTitle(title: string, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    title: string;
    /**
     * Sets the embed description.
     * @param {String} text The description.
     * @returns {Embed}
     * @throws {TypeError}
     * @method
     * @public
     */
    public setDescription(text: string, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    description: string;
    /**
     * Sets the url of the embed.
     * @param {String} url The url.
     * @returns {Embed}
     * @throws {TypeError}
     * @method
     * @public
     */
    public setURL(url: string, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    url: string;
    /**
     * Sets the timestamp displayed on the embed.
     * @param {Number?} timestamp The UNIX timestamp.
     * @returns {Embed}
     * @method
     * @public
     */
    public setTimestamp(timestamp: number | null): Embed;
    timestamp: number;
    /**
     * Sets the color of the embed.
     * @param {String | Number} color The color.
     * @returns {Embed}
     * @throws {TypeError}
     * @method
     * @public
     */
    public setColor(color: string | number, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    color: number;
    /**
     * Sets the embed thumbnail image.
     * @param {String} url The url of the thumbnail.
     * @returns {Embed}
     * @throws {TypeError}
     * @method
     * @public
     */
    public setThumbnail(url: string, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    thumbnail: {
        url: string;
    };
    /**
     * Sets the embed footer.
     * @param {String} text The footer text.
     * @param {String?} icon The url of the footer icon.
     * @returns {Embed}
     * @throws {TypeError}
     * @method
     * @public
     */
    public setFooter(text: string, icon: string | null, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    footer: {
        text: string;
    };
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
    public setAuthor(name: string | null, url: string | null, icon_url: string | null, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    author: {};
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
    public addField(name: string, value: string, inline?: boolean | null, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    /**
     * Sets the embed image url.
     * @param {String} url The image url.
     * @returns {Embed}
     * @method
     * @public
     */
    public setImage(url: string, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    image: {
        url: string;
    };
    /**
     * Sets the embed video url.
     * @param {String} url The video url.
     * @returns {Embed}
     * @method
     * @public
     */
    public setVideo(url: string, { suppressValidation }?: {
        suppressValidation?: false;
    }): Embed;
    video: {
        url: string;
    };
    /**
     * Returns the character count of the embed.
     * @returns {Number}
     * @readonly
     * @public
     */
    public readonly get characterCount(): number;
    /**
     * Converts the embed into string form.
     * @returns {String}
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the correct Discord format for an embed.
     * @returns {Object}
     * @method
     * @public
     */
    public toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): any;
}
//# sourceMappingURL=embedBuilder.d.ts.map