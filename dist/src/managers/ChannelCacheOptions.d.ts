export default ChannelCacheOptions;
/**
 * Represents the cache options for a channel.
 * All options are enabled by default.
 */
declare class ChannelCacheOptions {
    /**
     * Creates the cache options for a channel.
     * @param {Number} cache_options The preset cache options for this channel.
     * @public
     * @constructor
     */
    constructor(cache_options: number);
    /**
     * Sets whether to cache messages or not.
     * @param {Boolean} option Whether to cache messages or not.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setMessageCaching(option: boolean): void;
    /**
     * Sets whether to cache messages or not
     * @param {Boolean} option The option to set.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setFileCaching(option: boolean): void;
    /**
     * Sets whether to cache messages or not
     * @param {Boolean} option The option to set.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setContentCaching(option: boolean): void;
    /**
     * Sets whether to cache messages or not
     * @param {Boolean} option The option to set.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setPollCaching(option: boolean): void;
    /**
     * Sets whether to cache messages or not
     * @param {Boolean} option The option to set.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setReactionCaching(option: boolean): void;
    /**
     * Sets whether to cache messages or not
     * @param {Boolean} option The option to set.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setEmbedCaching(option: boolean): void;
    /**
     * Sets whether to cache messages or not
     * @param {Boolean} option The option to set.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setAttributeCaching(option: boolean): void;
    /**
     * Sets whether to cache messages or not
     * @param {Boolean} option The option to set.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setReferenceCaching(option: boolean): void;
    /**
     * Sets whether to cache messages or not
     * @param {Boolean} option The option to set.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setStickerCaching(option: boolean): void;
    /**
     * Sets whether to cache messages or not
     * @param {Boolean} option The option to set.
     * @public
     * @throws {TypeError}
     * @method
     */
    public setWebhookCaching(option: boolean): void;
    /**
     * Disables all caching options.
     * @public
     * @method
     * @returns {void}
     */
    public setDisableAll(): void;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get messageCaching(): boolean;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get fileCaching(): boolean;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get contentCaching(): boolean;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get pollCaching(): boolean;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get reactionCaching(): boolean;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get embedCaching(): boolean;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get attributeCaching(): boolean;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get referenceCaching(): boolean;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get stickerCaching(): boolean;
    /**
     * Returns whether to cache messages or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get webhookCaching(): boolean;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} format The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format: number): any;
    #private;
}
//# sourceMappingURL=ChannelCacheOptions.d.ts.map