import { GluonCacheOptions as GluonCacheOptionsType } from "../../typings/index.d.js";
declare class GluonCacheOptions implements GluonCacheOptionsType {
  #private;
  constructor({
    userTTL,
    messageTTL,
    cacheMessages,
    cacheUsers,
    cacheMembers,
    cacheChannels,
    cacheGuilds,
    cacheRoles,
    cacheVoiceStates,
    cacheEmojis,
    cacheInvites,
    cacheScheduledEvents,
  }?: {
    userTTL?: number;
    messageTTL?: number;
    cacheMessages?: boolean;
    cacheUsers?: boolean;
    cacheMembers?: boolean;
    cacheChannels?: boolean;
    cacheGuilds?: boolean;
    cacheRoles?: boolean;
    cacheVoiceStates?: boolean;
    cacheEmojis?: boolean;
    cacheInvites?: boolean;
    cacheScheduledEvents?: boolean;
  });
  /**
   * Set whether gluon should cache messages by default.
   * @param {Boolean} value Whether to cache messages or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheMessages(value: boolean): this;
  /**
   * Get whether gluon should cache messages by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheMessages(): boolean;
  /**
   * Set whether gluon should cache users by default.
   * @param {Boolean} value Whether to cache users or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheUsers(value: boolean): this;
  /**
   * Get whether gluon should cache users by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheUsers(): boolean;
  /**
   * Set whether gluon should cache members by default.
   * @param {Boolean} value Whether to cache members or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheMembers(value: boolean): this;
  /**
   * Get whether gluon should cache members by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheMembers(): boolean;
  /**
   * Set whether gluon should cache channels by default.
   * @param {Boolean} value Whether to cache channels or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheChannels(value: boolean): this;
  /**
   * Get whether gluon should cache channels by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheChannels(): boolean;
  /**
   * Set whether gluon should cache guilds by default.
   * @param {Boolean} value Whether to cache guilds or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheGuilds(value: boolean): this;
  /**
   * Get whether gluon should cache guilds by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheGuilds(): boolean;
  /**
   * Set whether gluon should cache roles by default.
   * @param {Boolean} value Whether to cache roles or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheRoles(value: boolean): this;
  /**
   * Get whether gluon should cache roles by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheRoles(): boolean;
  /**
   * Set whether gluon should cache voice states by default.
   * @param {Boolean} value Whether to cache voice states or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheVoiceStates(value: boolean): this;
  /**
   * Get whether gluon should cache voice states by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheVoiceStates(): boolean;
  /**
   * Set whether gluon should cache emojis by default.
   * @param {Boolean} value Whether to cache emojis or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheEmojis(value: boolean): this;
  /**
   * Get whether gluon should cache emojis by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheEmojis(): boolean;
  /**
   * Set whether gluon should cache invites by default.
   * @param {Boolean} value Whether to cache invites or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheInvites(value: boolean): this;
  /**
   * Get whether gluon should cache invites by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheInvites(): boolean;
  /**
   * Set whether gluon should cache scheduled events by default.
   * @param {Boolean} value Whether to cache scheduled events or not.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setCacheScheduledEvents(value: boolean): this;
  /**
   * Get whether gluon should cache scheduled events by default.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get cacheScheduledEvents(): boolean;
  /**
   * Set the default TTL for users in the cache.
   * @param {Number} seconds The number of seconds to cache users for.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setUserTTL(seconds: number): this;
  /**
   * Get the default TTL for users in the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get userTTL(): number;
  /**
   * Set the default TTL for messages in the cache.
   * @param {Number} seconds The number of seconds to cache messages for.
   * @returns {GluonCacheOptions}
   * @public
   * @throws {TypeError}
   * @method
   */
  setMessageTTL(seconds: number): this;
  /**
   * Get the default TTL for messages in the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get messageTTL(): number;
  /**
   * @method
   * @public
   */
  toString(): string;
}
export default GluonCacheOptions;
