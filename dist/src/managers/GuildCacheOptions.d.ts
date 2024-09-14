export default GuildCacheOptions;
declare class GuildCacheOptions {
    constructor(cache_options: any);
    /**
     * Whether to cache messages or not.
     * @param {Boolean} option Whether to cache messages or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setMessageCaching(option: boolean): GuildCacheOptions;
    /**
     * Whether to cache files or not.
     * @param {Boolean} option Whether to cache files or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setFileCaching(option: boolean): GuildCacheOptions;
    /**
     * Whether to cache voice states or not.
     * @param {Boolean} option Whether to cache voice states or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setVoiceStateCaching(option: boolean): GuildCacheOptions;
    /**
     * Whether to cache members or not.
     * @param {Boolean} option Whether to cache members or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setMemberCaching(option: boolean): GuildCacheOptions;
    /**
     * Whether to cache roles or not.
     * @param {Boolean} option Whether to cache roles or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setRoleCaching(option: boolean): GuildCacheOptions;
    /**
     * Whether to cache channels or not.
     * @param {Boolean} option Whether to cache channels or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setChannelCaching(option: boolean): GuildCacheOptions;
    /**
     * Whether to cache emojis or not.
     * @param {Boolean} option Whether to cache emojis or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setEmojiCaching(option: boolean): GuildCacheOptions;
    /**
     * Whether to cache threads or not.
     * @param {Boolean} option Whether to cache threads or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setThreadCaching(option: boolean): GuildCacheOptions;
    /**
     * Whether to cache invites or not.
     * @param {Boolean} option Whether to cache invites or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setInviteCaching(option: boolean): GuildCacheOptions;
    /**
     * Whether to cache scheduled events or not.
     * @param {Boolean} option Whether to cache scheduled events or not.
     * @returns {GuildCacheOptions}
     * @throws {TypeError}
     * @public
     */
    public setScheduledEventCaching(option: boolean): GuildCacheOptions;
    /**
     * Returns whether to cache files or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get messageCaching(): boolean;
    /**
     * Returns whether to cache files or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get fileCaching(): boolean;
    /**
     * Returns whether to cache voice states or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get voiceStateCaching(): boolean;
    /**
     * Returns whether to cache members or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get memberCaching(): boolean;
    /**
     * Returns whether to cache roles or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get roleCaching(): boolean;
    /**
     * Returns whether to cache channels or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get channelCaching(): boolean;
    /**
     * Returns whether to cache emojis or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get emojiCaching(): boolean;
    /**
     * Returns whether to cache threads or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get threadCaching(): boolean;
    /**
     * Returns whether to cache invites or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get inviteCaching(): boolean;
    /**
     * Returns whether to cache scheduled events or not.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get scheduledEventCaching(): boolean;
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
//# sourceMappingURL=GuildCacheOptions.d.ts.map