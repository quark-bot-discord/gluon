import util from "util";
/**
 * Represents a Discord user.
 * @see {@link https://discord.com/developers/docs/resources/user}
 */
declare class User {
  #private;
  /**
   * Creates a structure for a user.
   * @param {Client} client The client instance.
   * @param {Object} data The raw user data.
   * @param {Object?} options Additional options for this structure.
   * @param {Boolean?} [options.nocache] Whether the user should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/user#user-object}
   */
  constructor(
    client: any,
    data: any,
    {
      nocache,
    }?: {
      nocache?: false;
    },
  );
  /**
   * Overrides the user's avatar with a custom URL.
   * @param {String} url The URL of the avatar to override the user's avatar with.
   * @public
   * @method
   * @returns {void}
   */
  overrideAvatarURL(url: any): void;
  /**
   * The ID of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The username of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get username(): any;
  /**
   * The global name of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get globalName(): any;
  /**
   * The discriminator of the user.
   * @type {String?}
   * @readonly
   * @public
   */
  get discriminator(): string | null;
  /**
   * The UNIX (seconds) timestamp when this user was last cached.
   * @type {Number}
   * @readonly
   * @public
   */
  get _cached(): any;
  /**
   * The mention string for the user.
   * @type {String}
   * @readonly
   * @public
   */
  get mention(): string;
  /**
   * The hash of the users's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalAvatarHash(): string | null;
  /**
   * The avatar URL of the user.
   * @readonly
   * @type {String}
   * @public
   */
  get displayAvatarURL(): any;
  /**
   * The username of the user, including their discriminator if they are a bot (username#0001).
   * @readonly
   * @type {String}
   * @public
   */
  get tag(): any;
  /**
   * The UNIX (seconds) timestamp of when this user created their Discord account.
   * @readonly
   * @type {Number}
   * @public
   */
  get createdTimestamp(): number;
  /**
   * Whether the user is a bot or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get bot(): boolean;
  /**
   * Whether the user has an animated avatar or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get avatarIsAnimated(): boolean;
  /**
   * Whether the user has an avatar or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get hasAvatar(): boolean;
  /**
   * Returns a mention string for the user.
   * @param {String} id The ID of the user to mention.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(id: any): string;
  /**
   * Returns the URL to the user's avatar.
   * @param {String} id The ID of the user to get the avatar for.
   * @param {String?} [hash] The hash of the avatar.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getAvatarUrl(id: any, hash: any): string;
  /**
   * Determines whether the user should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions: any): boolean;
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
  toJSON(format: any):
    | {
        id: string;
        avatar: string | null;
        _cached: any;
        bot: boolean;
        username: any;
        global_name: any;
        discriminator: string | null;
      }
    | {
        id: string;
        avatar: string | null;
        bot: boolean;
        username: any;
        global_name: any;
        discriminator: string | null;
        _cached?: undefined;
      };
}
export default User;
