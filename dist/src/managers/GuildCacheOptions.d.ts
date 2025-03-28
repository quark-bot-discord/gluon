import { GuildCacheOptions as GuildCacheOptionsType } from "../../typings/index.d.js";
import { JsonTypes } from "#typings/enums.js";
declare class GuildCacheOptions implements GuildCacheOptionsType {
  #private;
  constructor(cache_options?: number);
  /**
   * Whether to cache messages or not.
   * @param {Boolean} option Whether to cache messages or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setMessageCaching(option: boolean): this;
  /**
   * Whether to cache files or not.
   * @param {Boolean} option Whether to cache files or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setFileCaching(option: boolean): this;
  /**
   * Whether to cache voice states or not.
   * @param {Boolean} option Whether to cache voice states or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setVoiceStateCaching(option: boolean): this;
  /**
   * Whether to cache members or not.
   * @param {Boolean} option Whether to cache members or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setMemberCaching(option: boolean): this;
  /**
   * Whether to cache roles or not.
   * @param {Boolean} option Whether to cache roles or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setRoleCaching(option: boolean): this;
  /**
   * Whether to cache channels or not.
   * @param {Boolean} option Whether to cache channels or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setChannelCaching(option: boolean): this;
  /**
   * Whether to cache emojis or not.
   * @param {Boolean} option Whether to cache emojis or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setEmojiCaching(option: boolean): this;
  /**
   * Whether to cache threads or not.
   * @param {Boolean} option Whether to cache threads or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setThreadCaching(option: boolean): this;
  /**
   * Whether to cache invites or not.
   * @param {Boolean} option Whether to cache invites or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setInviteCaching(option: boolean): this;
  /**
   * Whether to cache scheduled events or not.
   * @param {Boolean} option Whether to cache scheduled events or not.
   * @returns {GuildCacheOptions}
   * @throws {TypeError}
   * @public
   */
  setScheduledEventCaching(option: boolean): this;
  setAuditLogCaching(option: boolean): this;
  /**
   * Returns whether to cache files or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get messageCaching(): boolean;
  /**
   * Returns whether to cache files or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get fileCaching(): boolean;
  /**
   * Returns whether to cache voice states or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get voiceStateCaching(): boolean;
  /**
   * Returns whether to cache members or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get memberCaching(): boolean;
  /**
   * Returns whether to cache roles or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get roleCaching(): boolean;
  /**
   * Returns whether to cache channels or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get channelCaching(): boolean;
  /**
   * Returns whether to cache emojis or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get emojiCaching(): boolean;
  /**
   * Returns whether to cache threads or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get threadCaching(): boolean;
  /**
   * Returns whether to cache invites or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get inviteCaching(): boolean;
  /**
   * Returns whether to cache scheduled events or not.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get scheduledEventCaching(): boolean;
  get auditLogCaching(): boolean;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format: JsonTypes): number;
}
export default GuildCacheOptions;
