import GluonCacheOptions from "./managers/GluonCacheOptions.js";
import GuildCacheOptions from "./managers/GuildCacheOptions.js";
import { APIEmoji } from "#typings/discord.js";
import {
  Client as ClientType,
  User as UserType,
  UserManager as UserManagerType,
  GuildManager as GuildManagerType,
  CommandBuilder,
  ClientOptions,
  ClientEvents,
  ClientCacheCounts,
  ClientProcessData,
  GuildCacheJSON,
} from "../typings/index.d.js";
import { TypedEmitter } from "tiny-typed-emitter";
import { GluonDebugLevels } from "../typings/enums.js";
declare class Client extends TypedEmitter<ClientEvents> implements ClientType {
  #private;
  request: any;
  readonly _cacheOptions: GluonCacheOptions;
  readonly _defaultGuildCacheOptions: GuildCacheOptions;
  /**
   * Creates the client and sets the default options.
   * @constructor
   * @param {Object?} options The options to pass to the client.
   * @param {Boolean?} options.cacheMessages Whether to cache messages.
   * @param {Boolean?} options.cacheUsers Whether to cache users.
   * @param {Boolean?} options.cacheMembers Whether to cache members.
   * @param {Boolean?} options.cacheChannels Whether to cache channels.
   * @param {Boolean?} options.cacheGuilds Whether to cache guilds.
   * @param {Boolean?} options.cacheVoiceStates Whether to cache voice states.
   * @param {Boolean?} options.cacheRoles Whether to cache roles.
   * @param {Boolean?} options.cacheScheduledEvents Whether to cache scheduled events.
   * @param {Boolean?} options.cacheEmojis Whether to cache emojis.
   * @param {Boolean?} options.cacheInvites Whether to cache invites.
   * @param {Number?} options.defaultMessageExpiry The default expiry time for messages.
   * @param {Number?} options.defaultUserExpiry The default expiry time for users.
   * @param {Number} options.intents The intents to use when connecting.
   * @param {Number?} options.totalShards The total number of shards to manage.
   * @param {Array<Number>?} options.shardIds The ids of the shards to manage.
   * @param {Object?} options.sessionData The session data for the client.
   * @param {Object?} options.initCache The initial cache data for the client.
   * @param {Function?} options.softRestartFunction The function to call when a soft restart is needed.
   * @throws {TypeError}
   * @public
   * @method
   */
  constructor({
    cacheMessages,
    cacheUsers,
    cacheMembers,
    cacheChannels,
    cacheGuilds,
    cacheVoiceStates,
    cacheRoles,
    cacheScheduledEvents,
    cacheEmojis,
    cacheInvites,
    defaultMessageExpiry,
    defaultUserExpiry,
    intents,
    totalShards,
    shardIds,
    sessionData,
    initCache,
    softRestartFunction,
    ip,
    rpsLimit,
  }: ClientOptions);
  /**
   * The ids of the shards that this client is managing.
   * @type {Array<Number>}
   * @readonly
   * @public
   */
  get shardIds(): number[];
  /**
   * The total number of shards that this client is managing.
   * @type {Number}
   * @readonly
   * @public
   */
  get totalShards(): number;
  /**
   * The intents that this client is using.
   * @type {Number}
   * @readonly
   * @public
   */
  get intents(): number;
  get user(): UserType;
  set user(user: UserType);
  /**
   * The user manager for this client.
   * @type {UserManager}
   * @readonly
   * @public
   */
  get users(): UserManagerType;
  /**
   * The guild manager for this client.
   * @type {GuildManager}
   * @readonly
   * @public
   */
  get guilds(): GuildManagerType;
  /**
   * The session data for this client.
   * @type {Object}
   * @readonly
   * @public
   */
  get sessionData(): any[];
  /**
   * The function to call when a soft restart is needed.
   * @public
   * @method
   * @returns {void}
   */
  softRestartFunction(): void;
  /**
   * Stops all shards.
   * @public
   * @method
   * @returns {void}
   */
  halt(): void;
  /**
   * Monitors the current process.
   * @public
   * @method
   * @returns {Object}
   */
  checkProcess(): ClientProcessData;
  /**
   * Outputs a debug message if NODE_ENV=development.
   * @param {Number} status The debug status level.
   * @param {String} message The message to emit.
   * @returns {void}
   * @method
   * @public
   */
  _emitDebug(status: GluonDebugLevels, message: string): void;
  /**
   * Counts how many items are in each cache.
   * @returns {Object}
   * @public
   * @method
   */
  getCacheCounts(): ClientCacheCounts;
  get initialized(): boolean;
  get ready(): boolean;
  /**
   * Counts how many members are in all of Quark's servers.
   * @returns {Number}
   * @public
   * @method
   */
  getMemberCount(): number;
  /**
   * Bundles all guilds.
   * @returns {Array<Object>}
   * @public
   * @method
   */
  bundleCache(): GuildCacheJSON[];
  /**
   * Registers commands, overwriting all previous ones.
   * @param {Array<Command>} commands Array of commands to register.
   * @returns {Array<Object>}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#registering-a-command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  registerCommands(commands: CommandBuilder[]): Promise<any>;
  /**
   * Fetches the emojis for this client.
   * @returns {Array<Object>}
   * @public
   * @method
   * @async
   */
  fetchEmojis(): Promise<APIEmoji[]>;
  /**
   * Creates an emoji for this client.
   * @param {Object} emoji The emoji to create.
   * @param {String} emoji.name The name of the emoji.
   * @param {String} emoji.image The image of the emoji (base64, should start with "data:image/png;base64,").
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  createEmoji({ name, image }: { name: string; image: string }): Promise<any>;
  setInitialized(): void;
  setReady(): void;
  /**
   * Sets the bot's status across all shards.
   * @param {Object} status Status options.
   * @param {String} status.name The bot's new status.
   * @param {Number} [status.type] The type of status.
   * @param {String} [status.status] The bot's status.
   * @param {Boolean} [status.afk] Whether the bot is afk.
   * @param {Number} [status.since] The time since the bot has been afk.
   * @returns {void}
   * @public
   * @method
   * @throws {TypeError}
   */
  setStatus({
    name,
    type,
    status,
    afk,
    since,
  }: {
    name: string;
    type?: number;
    status?: string;
    afk?: boolean;
    since?: number;
  }): void;
  /**
   * Initiates the login sequence
   * @param {String} token The authorization token
   * @returns {void}
   * @public
   * @method
   * @throws {TypeError}
   */
  login(token: string): void;
}
export default Client;
