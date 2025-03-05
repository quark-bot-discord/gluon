import User from "./User.js";
import util from "util";
import type {
  Invite as InviteType,
  InviteCacheJSON,
  InviteDiscordJSON,
  InviteStorageJSON,
  UserCacheJSON,
  UserStorageJSON,
  UserDiscordJSON,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
  Client as ClientType,
} from "#typings/index.d.ts";
import {
  APIExtendedInvite,
  GatewayInviteCreateDispatchData,
  GatewayInviteDeleteDispatchData,
  Snowflake,
} from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
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
      | InviteStorageJSON
      | GatewayInviteCreateDispatchData
      | GatewayInviteDeleteDispatchData,
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
  get channel(): import("#typings/index.d.ts").AllChannels | null;
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
  get guild(): import("#typings/index.d.ts").Guild | null;
  /**
   * The number of times the invite has been used.
   * @type {Number?}
   * @readonly
   * @public
   */
  get uses(): number | undefined;
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
  get maxUses(): number | undefined;
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
  toJSON(format?: JsonTypes):
    | {
        code: string;
        channel:
          | import("#typings/index.d.ts").GuildChannelCacheJSON
          | import("#typings/index.d.ts").GuildChannelDiscordJSON
          | import("#typings/index.d.ts").GuildChannelStorageJSON
          | import("#typings/index.d.ts").CategoryChannelCacheJSON
          | import("#typings/index.d.ts").CategoryChannelStorageJSON
          | undefined;
        inviter: UserCacheJSON | UserStorageJSON;
        uses: number | undefined;
        expires: number | undefined;
        max_uses: number | undefined;
        expires_at?: undefined;
      }
    | {
        code: string;
        channel:
          | import("#typings/index.d.ts").GuildChannelCacheJSON
          | import("#typings/index.d.ts").GuildChannelDiscordJSON
          | import("#typings/index.d.ts").GuildChannelStorageJSON
          | import("#typings/index.d.ts").CategoryChannelCacheJSON
          | import("#typings/index.d.ts").CategoryChannelStorageJSON
          | undefined;
        inviter: UserDiscordJSON;
        uses: number | undefined;
        expires_at: string | undefined;
        max_uses: number | undefined;
        expires?: undefined;
      };
}
export default Invite;
