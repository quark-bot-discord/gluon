import util from "util";
import { APIGuildCategoryChannel, Snowflake } from "discord-api-types/v10";
import {
  CategoryChannelCacheJSON,
  CategoryChannelDiscordJSON,
  CategoryChannelStorageJSON,
  CategoryChannel as CategoryChannelType,
  PermissionOverwrite as PermissionOverwriteType,
  Client as ClientType,
  JsonTypes,
} from "../../typings/index.d.js";
declare class CategoryChannel implements CategoryChannelType {
  #private;
  /**
   * Creates the structure for a category channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @param {Boolean?} [options.nocache] Whether this channel should be cached or not.
   */
  constructor(
    client: ClientType,
    data:
      | APIGuildCategoryChannel
      | CategoryChannelCacheJSON
      | CategoryChannelDiscordJSON
      | CategoryChannelStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
  /**
   * The ID of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The ID of the guild that this channel belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The guild that this channel belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): any;
  /**
   * The name of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get name(): string | undefined;
  /**
   * The type of channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get type(): number;
  /**
   * The permission overwrites for the channel.
   * @type {Array<PermissionOverwrite>}
   * @readonly
   * @public
   */
  get permissionOverwrites(): PermissionOverwriteType[];
  /**
   * Whether the channel is nsfw.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get nsfw(): boolean;
  /**
   * The mention string of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get mention(): string;
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
   */
  toJSON(
    format?: JsonTypes,
  ):
    | CategoryChannelCacheJSON
    | CategoryChannelDiscordJSON
    | CategoryChannelStorageJSON;
}
export default CategoryChannel;
