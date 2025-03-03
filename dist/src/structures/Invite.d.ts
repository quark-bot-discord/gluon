import User from "./User.js";
import util from "util";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  Invite as InviteType,
  InviteCacheJSON,
  InviteDiscordJSON,
  InviteStorageJSON,
  JsonTypes,
  UserCacheJSON,
  UserStorageJSON,
  UserDiscordJSON,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
  Client as ClientType,
} from "../../typings/index.d.js";
import { APIExtendedInvite } from "discord-api-types/v10";
/**
 * Represents a guild invite.
 */
declare class Invite implements InviteType {
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
  constructor(
    client: ClientType,
    data:
      | APIExtendedInvite
      | InviteCacheJSON
      | InviteDiscordJSON
      | InviteStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
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
  get id(): string;
  /**
   * The code of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get code(): string;
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
  get uses(): number;
  /**
   * The UNIX timestamp of when the invite expires.
   * @type {Number?}
   * @readonly
   * @public
   */
  get expires(): number | undefined;
  /**
   * The user who created the invite.
   * @type {User?}
   * @readonly
   * @public
   */
  get inviter(): User | undefined;
  get inviterId(): string;
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
  get maxUses(): number;
  /**
   * Returns the URL of the invite.
   * @param {String} code The code of the invite.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getUrl(code: string): string;
  /**
   * Determines whether the invite should be cached.
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
  toJSON(format: JsonTypes):
    | {
        code: string;
        channel: any;
        inviter: UserCacheJSON | UserStorageJSON;
        uses: number;
        expires: number | undefined;
        max_uses: number;
        expires_at?: undefined;
      }
    | {
        code: string;
        channel: any;
        inviter: UserDiscordJSON;
        uses: number;
        expires_at: string | undefined;
        max_uses: number;
        expires?: undefined;
      };
}
export default Invite;
