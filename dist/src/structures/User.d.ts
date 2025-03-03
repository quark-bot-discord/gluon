import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import util from "util";
import ClientType from "src/interfaces/Client.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { APIUser } from "discord-api-types/v10";
import {
  JsonTypes,
  UserCacheJSON,
  UserDiscordJSON,
  UserStorageJSON,
  User as UserType,
} from "../../typings/index.d.js";
/**
 * Represents a Discord user.
 * @see {@link https://discord.com/developers/docs/resources/user}
 */
declare class User implements UserType {
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
    client: ClientType,
    data: APIUser | UserCacheJSON | UserDiscordJSON | UserStorageJSON,
    {
      nocache,
    }?: {
      nocache?: boolean;
    },
  );
  /**
   * Overrides the user's avatar with a custom URL.
   * @param {String} url The URL of the avatar to override the user's avatar with.
   * @public
   * @method
   * @returns {void}
   */
  overrideAvatarURL(url: string): void;
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
  get username(): string;
  /**
   * The global name of the user.
   * @type {String}
   * @readonly
   * @public
   */
  get globalName(): string | null;
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
  get _cached(): number;
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
  get tag(): string;
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
  static getMention(id: Snowflake): string;
  /**
   * Returns the URL to the user's avatar.
   * @param {String} id The ID of the user to get the avatar for.
   * @param {String?} [hash] The hash of the avatar.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getAvatarUrl(id: Snowflake, hash?: string | null): string;
  /**
   * Determines whether the user should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions: GluonCacheOptions): boolean;
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
  toJSON(format?: JsonTypes):
    | {
        id: string;
        avatar: string | null;
        _cached: number;
        bot: boolean;
        username: string;
        global_name: string | null;
        discriminator: number | undefined;
      }
    | {
        id: string;
        avatar: string | null;
        bot: boolean;
        username: string;
        global_name: string | null;
        discriminator: string | null;
        _cached?: undefined;
      };
}
export default User;
