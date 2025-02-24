import Channel from "./Channel.js";
import util from "util";
/**
 * Represents a text channel within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
 */
declare class TextChannel extends Channel {
  #private;
  /**
   * Creates the structure for a text channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @param {Boolean?} [options.nocache] Whether this channel should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
   */
  constructor(client: any, data: any, { guildId, nocache }?: any);
  /**
   * Bulk deletes all the message IDs provided.
   * @param {String[]} messages An array of message IDs, as strings.
   * @param {Object?} [options] Additional options for this method.
   * @param {String?} [options.reason] The reason for this action.
   * @returns {Promise<void>}
   * @method
   * @async
   * @public
   * @throws {Error | TypeError}
   */
  bulkDelete(messages: any, { reason }?: any): Promise<void>;
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
export default TextChannel;
