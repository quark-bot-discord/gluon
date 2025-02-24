import User from "./User.js";
import util from "util";
/**
 * Represents a guild invite.
 */
declare class Invite {
  #private;
  /**
   * Creates the structure for an invite.
   * @param {Client} client The client instance.
   * @param {Object} data The raw invite data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the invite belongs to.
   * @param {Boolean?} [options.nocache] Whether this invite should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-structure}
   */
  constructor(client: any, data: any, { guildId, nocache }?: any);
  /**
   * The id of the channel the invite is directed to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId(): string;
  /**
   * The channel the invite is directed to.
   * @type {(TextChannel | VoiceChannel)?}
   * @readonly
   * @public
   */
  get channel(): any;
  /**
   * The code of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): any;
  /**
   * The code of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get code(): any;
  /**
   * The id of the guild that this invite belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The guild that this role belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): any;
  /**
   * The number of times the invite has been used.
   * @type {Number?}
   * @readonly
   * @public
   */
  get uses(): any;
  /**
   * The UNIX timestamp of when the invite expires.
   * @type {Number?}
   * @readonly
   * @public
   */
  get expires(): any;
  /**
   * The user who created the invite.
   * @type {User?}
   * @readonly
   * @public
   */
  get inviter(): User | undefined;
  /**
   * The URL of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get url(): string;
  /**
   * The maximum number of uses allowed for the invite.
   * @type {Number?}
   * @readonly
   * @public
   */
  get maxUses(): any;
  /**
   * Returns the URL of the invite.
   * @param {String} code The code of the invite.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getUrl(code: any): string;
  /**
   * Determines whether the invite should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
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
   */
  toJSON(format: any):
    | {
        code: any;
        channel: any;
        inviter:
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
            }
          | undefined;
        uses: any;
        expires: number | undefined;
        max_uses: any;
        expires_at?: undefined;
      }
    | {
        code: any;
        channel: any;
        inviter:
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
            }
          | undefined;
        uses: any;
        expires_at: string | undefined;
        max_uses: any;
        expires?: undefined;
      };
}
export default Invite;
