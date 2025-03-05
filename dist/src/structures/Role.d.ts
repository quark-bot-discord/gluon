import util from "util";
import { APIRole, Snowflake } from "#typings/discord.js";
import type {
  RoleCacheJSON,
  RoleDiscordJSON,
  RoleStorageJSON,
  Role as RoleType,
  GuildCacheOptions as GuildCacheOptionsType,
  GluonCacheOptions as GluonCacheOptionsType,
  Client as ClientType,
} from "#typings/index.d.ts";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents a role belonging to a guild.
 */
declare class Role implements RoleType {
  #private;
  /**
   * Creates the structure for a role.
   * @param {Client} client The client instance.
   * @param {Object} data The raw role data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the role belongs to.
   * @param {Boolean?} [options.nocache] Whether this role should be cached or not.
   * @see {@link https://discord.com/developers/docs/topics/permissions#role-object-role-structure}
   */
  constructor(
    client: ClientType,
    data: APIRole | RoleCacheJSON | RoleDiscordJSON | RoleStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
  /**
   * The ID of the role.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * Whether the role is hoisted.
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get hoist(): boolean;
  /**
   * Whether the role is managed (by an application).
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get managed(): boolean;
  /**
   * Whether the role is mentionable.
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get mentionable(): boolean;
  /**
   * The hash of the role's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalIconHash(): string | null;
  /**
   * The icon URL of the role.
   * @readonly
   * @type {String?}
   * @public
   */
  get displayIconURL(): string | null;
  /**
   * The guild that this role belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): import("#typings/index.d.ts").Guild | null;
  /**
   * The ID of the guild that this role belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The name of the role.
   * @type {String}
   * @readonly
   * @public
   */
  get name(): string;
  /**
   * The color of the role.
   * @type {Number}
   * @readonly
   * @public
   */
  get color(): number;
  /**
   * The position of the role.
   * @type {Number}
   * @readonly
   * @public
   */
  get position(): number;
  /**
   * The permissions for the role.
   * @type {String}
   * @readonly
   * @public
   */
  get permissions(): string;
  /**
   * The attributes of the role.
   * @type {Object}
   * @readonly
   * @public
   */
  get tags(): import("#typings/discord.js").APIRoleTags | undefined;
  /**
   * Returns a mention for the role.
   * @type {String}
   * @readonly
   * @public
   */
  get mention(): string;
  /**
   * Returns a mention for the role.
   * @param {String} roleId The ID of the role to mention.
   * @param {String} guildId The ID of the guild that the role belongs to.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(roleId: Snowflake, guildId: Snowflake): string;
  /**
   * Returns the URL of the role's icon.
   * @param {String} id The ID of the role.
   * @param {String?} [hash] The hash of the role's icon.
   * @returns {String}
   */
  static getIconUrl(id: Snowflake, hash?: string | null): string | null;
  /**
   * Determines whether the role should be cached.
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
        id: string;
        name: string;
        color: number;
        position: number;
        permissions: string;
        icon: string | null;
        _attributes: number;
        tags: import("#typings/discord.js").APIRoleTags | undefined;
        hoist?: undefined;
        managed?: undefined;
        mentionable?: undefined;
      }
    | {
        id: string;
        name: string;
        color: number;
        position: number;
        permissions: string;
        icon: string | null;
        tags: import("#typings/discord.js").APIRoleTags | undefined;
        hoist: boolean;
        managed: boolean;
        mentionable: boolean;
        _attributes?: undefined;
      };
}
export default Role;
