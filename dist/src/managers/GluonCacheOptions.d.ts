export default GluonCacheOptions;
declare class GluonCacheOptions {
    constructor({ userTTL, messageTTL, cacheMessages, cacheUsers, cacheMembers, cacheChannels, cacheGuilds, cacheRoles, cacheVoiceStates, cacheEmojis, cacheInvites, cacheScheduledEvents, }?: {});
    /**
     * Set whether gluon should cache messages by default.
     * @param {Boolean} value Whether to cache messages or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheMessages(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache messages by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheMessages(): boolean;
    /**
     * Set whether gluon should cache users by default.
     * @param {Boolean} value Whether to cache users or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheUsers(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache users by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheUsers(): boolean;
    /**
     * Set whether gluon should cache members by default.
     * @param {Boolean} value Whether to cache members or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheMembers(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache members by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheMembers(): boolean;
    /**
     * Set whether gluon should cache channels by default.
     * @param {Boolean} value Whether to cache channels or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheChannels(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache channels by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheChannels(): boolean;
    /**
     * Set whether gluon should cache guilds by default.
     * @param {Boolean} value Whether to cache guilds or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheGuilds(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache guilds by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheGuilds(): boolean;
    /**
     * Set whether gluon should cache roles by default.
     * @param {Boolean} value Whether to cache roles or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheRoles(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache roles by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheRoles(): boolean;
    /**
     * Set whether gluon should cache voice states by default.
     * @param {Boolean} value Whether to cache voice states or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheVoiceStates(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache voice states by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheVoiceStates(): boolean;
    /**
     * Set whether gluon should cache emojis by default.
     * @param {Boolean} value Whether to cache emojis or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheEmojis(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache emojis by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheEmojis(): boolean;
    /**
     * Set whether gluon should cache invites by default.
     * @param {Boolean} value Whether to cache invites or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheInvites(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache invites by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheInvites(): boolean;
    /**
     * Set whether gluon should cache scheduled events by default.
     * @param {Boolean} value Whether to cache scheduled events or not.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setCacheScheduledEvents(value: boolean): GluonCacheOptions;
    /**
     * Get whether gluon should cache scheduled events by default.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get cacheScheduledEvents(): boolean;
    /**
     * Set the default TTL for users in the cache.
     * @param {Number} seconds The number of seconds to cache users for.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setUserTTL(seconds: number): GluonCacheOptions;
    /**
     * Get the default TTL for users in the cache.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get userTTL(): number;
    /**
     * Set the default TTL for messages in the cache.
     * @param {Number} seconds The number of seconds to cache messages for.
     * @returns {GluonCacheOptions}
     * @public
     * @throws {TypeError}
     * @method
     */
    public setMessageTTL(seconds: number): GluonCacheOptions;
    /**
     * Get the default TTL for messages in the cache.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get messageTTL(): number;
    /**
     * @method
     * @public
     */
    public toString(): string;
    #private;
}
//# sourceMappingURL=GluonCacheOptions.d.ts.map