import Channel from "./Channel.js";
import util from "util";
/**
 * Represents a thread within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
 */
declare class Thread extends Channel {
  #private;
  /**
   * Creates the structure for a thread.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this thread belongs to.
   * @param {Boolean?} [options.nocache] Whether this thread should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
   */
  constructor(client: any, data: any, { guildId, nocache }?: any);
  /**
   * The ID of the member who created this thread.
   * @type {String}
   * @readonly
   * @public
   */
  get ownerId(): string;
  /**
   * The member who created this thread.
   * @type {Member?}
   * @readonly
   * @public
   */
  get owner(): any;
  /**
   * The ID of the text channel that this thread belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get parentId(): string;
  /**
   * The text channel that this thread belongs to.
   * @type {TextChannel?}
   * @readonly
   * @public
   */
  get parent(): any;
  /**
   * Determines whether the thread should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   * @override
   */
  static shouldCache(gluonCacheOptions: any, guildCacheOptions: any): boolean;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format: any):
    | {
        owner_id: string;
        parent_id: string;
        id: string;
        type: any;
        name: any;
        topic: any;
        rate_limit_per_user: any;
        position: any;
        _attributes: any;
        _cacheOptions: any;
        messages: any;
        permission_overwrites: any;
        nsfw?: undefined;
      }
    | {
        owner_id: string;
        parent_id: string;
        id: string;
        type: any;
        name: any;
        topic: any;
        rate_limit_per_user: any;
        position: any;
        nsfw: boolean;
        messages: any;
        permission_overwrites: any;
        _attributes?: undefined;
        _cacheOptions?: undefined;
      };
}
export default Thread;
