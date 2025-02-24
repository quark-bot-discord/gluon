import util from "util";
declare class CategoryChannel {
  #private;
  /**
   * Creates the structure for a category channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @param {Boolean?} [options.nocache] Whether this channel should be cached or not.
   */
  constructor(client: any, data: any, { guildId, nocache }?: any);
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
  get name(): any;
  /**
   * The type of channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get type(): any;
  /**
   * The permission overwrites for the channel.
   * @type {Array<PermissionOverwrite>}
   * @readonly
   * @public
   */
  get permissionOverwrites(): any;
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
  toJSON(format: any): {
    id: string;
    guild_id: string;
    name: any;
    type: any;
    nsfw: boolean;
    permission_overwrites: any;
  };
}
export default CategoryChannel;
