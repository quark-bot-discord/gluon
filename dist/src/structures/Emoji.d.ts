import ClientType from "src/interfaces/Client.js";
import util from "util";
import {
  Emoji as EmojiType,
  EmojiCacheJSON,
  EmojiDiscordJSON,
  EmojiStorageJSON,
  JsonTypes,
  GuildCacheOptions as GuildCacheOptionsType,
  GluonCacheOptions as GluonCacheOptionsType,
} from "../../typings/index.d.js";
import { APIEmoji, Snowflake } from "discord-api-types/v10";
/**
 * Represents an emoji.
 * @see {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure}
 */
declare class Emoji implements EmojiType {
  #private;
  /**
   * Creates the structure for an emoji.
   * @param {Client} client The client instance.
   * @param {Object} data The raw emoji data from Discord.
   * @param {Object} options The options for this emoji.
   * @param {String} options.guildId The id of the guild that the emoji belongs to.
   * @param {Boolean?} [options.nocache] Whether this emoji should be cached or not.
   */
  constructor(
    client: ClientType,
    data: APIEmoji | EmojiCacheJSON | EmojiDiscordJSON | EmojiStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
  /**
   * Whether the emoji requires colons.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get requireColons(): boolean;
  /**
   * Whether the emoji is managed.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get managed(): boolean;
  /**
   * Whether the emoji is animated.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get animated(): boolean;
  /**
   * Checks if the emoji is animated.
   * @param {Number} attributes The attributes of the emoji.
   * @returns {Boolean}
   */
  static isAnimated(attributes: number): boolean;
  /**
   * Whether the emoji is available.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get available(): boolean;
  /**
   * The mention string for the emoji.
   * @type {String}
   * @readonly
   * @public
   */
  get mention(): string;
  /**
   * The url for the emoji.
   * @type {String}
   * @readonly
   * @public
   */
  get url(): string | null;
  /**
   * The id of the guild that this emoji belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The guild that this emoji belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): any;
  /**
   * The id of the emoji, if it is custom.
   * @type {String?}
   * @readonly
   * @public
   */
  get id(): string | null;
  /**
   * The name of the emoji.
   * @type {String}
   * @readonly
   * @public
   */
  get name(): string | null;
  /**
   * Returns the mention string for an emoji.
   * @param {String} name The name of the emoji.
   * @param {String?} id The id of the emoji.
   * @param {Boolean?} animated Whether the emoji is animated.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(
    name: string,
    id: Snowflake | null,
    animated?: boolean,
  ): string;
  /**
   * Returns the url for an emoji.
   * @param {String} id The id of the emoji.
   * @param {Boolean} [animated] Whether the emoji is animated.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getUrl(id: Snowflake, animated?: boolean): string;
  /**
   * Determines whether the emoji should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ): boolean;
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
  ): EmojiCacheJSON | EmojiDiscordJSON | EmojiStorageJSON;
}
export default Emoji;
