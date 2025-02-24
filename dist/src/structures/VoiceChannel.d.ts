import Channel from "./Channel.js";
import util from "util";
/**
 * Represents a voice channel.
 * @extends {Channel}
 */
declare class VoiceChannel extends Channel {
  #private;
  /**
   * Creates the structure for a voice channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the voice channel belongs to.
   * @param {Boolean?} [options.nocache] Whether the voice channel should be cached.
   */
  constructor(client: any, data: any, { guildId, nocache }?: any);
  /**
   * The bitrate of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get bitrate(): any;
  /**
   * The user limit of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get userLimit(): any;
  /**
   * The region of the voice channel.
   * @type {String}
   * @readonly
   * @public
   */
  get rtcRegion(): any;
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
        bitrate: any;
        user_limit: any;
        rtc_region: any;
        id: string;
        type: any;
        name: any;
        topic: any;
        rate_limit_per_user: any;
        position: any;
        parent_id: string | undefined;
        _attributes: any;
        _cacheOptions: any;
        messages: any;
        permission_overwrites: any;
        nsfw?: undefined;
      }
    | {
        bitrate: any;
        user_limit: any;
        rtc_region: any;
        id: string;
        type: any;
        name: any;
        topic: any;
        rate_limit_per_user: any;
        position: any;
        parent_id: string | undefined;
        nsfw: boolean;
        messages: any;
        permission_overwrites: any;
        _attributes?: undefined;
        _cacheOptions?: undefined;
      };
}
export default VoiceChannel;
