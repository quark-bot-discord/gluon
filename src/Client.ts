/* i think one process should be able to handle multiple shards (ideally max_concurrency's worth) */
import {
  DEFAULT_MESSAGE_EXPIRY_SECONDS,
  DEFAULT_USER_EXPIRY_SECONDS,
  DEFAULT_POLLING_TIME,
  NAME,
} from "./constants.js";

import hash from "hash.js";

import BetterRequestHandler from "./rest/betterRequestHandler.js";
import Shard from "./gateway/index.js";
const chalk =
  process.env.NODE_ENV === "development"
    ? (await import("chalk")).default
    : null;

import UserManager from "./managers/UserManager.js";
import GuildManager from "./managers/GuildManager.js";
import Guild from "./structures/Guild.js";
import User from "./structures/User.js";
import generateWebsocketURL from "./util/gluon/generateWebsocketURL.js";
import GluonCacheOptions from "./managers/GluonCacheOptions.js";
import GuildCacheOptions from "./managers/GuildCacheOptions.js";
import Command from "./util/builder/commandBuilder.js";
import {
  APIEmoji,
  APIGatewayBotInfo,
  ChannelType,
  Snowflake,
} from "#typings/discord.js";
import {
  Client as ClientType,
  User as UserType,
  Guild as GuildType,
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
import { GluonDebugLevels, JsonTypes } from "../typings/enums.js";

class Client extends TypedEmitter<ClientEvents> implements ClientType {
  request: any;
  #user: UserType | null;
  // @ts-expect-error TS(7008): Member '#token' implicitly has an 'any' type.
  #token: string;
  #intents;
  public readonly _cacheOptions;
  public readonly _defaultGuildCacheOptions;
  #_sessionData;
  // @ts-expect-error TS(7008): Member '#shards' implicitly has an 'any[]' type.
  #shards;
  #shardIds?: number[];
  #totalShards?: number;
  #users: UserManagerType;
  #guilds: GuildManagerType;
  #softRestartFunction;
  #ready = false;
  #initialized = false;
  #ip;
  #rpsLimit;
  #baseUrl;
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
    cacheMessages = false,
    cacheUsers = false,
    cacheMembers = false,
    cacheChannels = false,
    cacheGuilds = false,
    cacheVoiceStates = false,
    cacheRoles = false,
    cacheScheduledEvents = false,
    cacheEmojis = false,
    cacheInvites = false,
    defaultMessageExpiry = DEFAULT_MESSAGE_EXPIRY_SECONDS,
    defaultUserExpiry = DEFAULT_USER_EXPIRY_SECONDS,
    intents,
    totalShards,
    shardIds,
    sessionData,
    initCache,
    softRestartFunction,
    ip,
    rpsLimit,
    baseUrl,
  }: ClientOptions) {
    super();

    if (typeof cacheMessages !== "boolean")
      throw new TypeError("GLUON: Cache messages is not a boolean.");
    if (typeof cacheUsers !== "boolean")
      throw new TypeError("GLUON: Cache users is not a boolean.");
    if (typeof cacheMembers !== "boolean")
      throw new TypeError("GLUON: Cache members is not a boolean.");
    if (typeof cacheChannels !== "boolean")
      throw new TypeError("GLUON: Cache channels is not a boolean.");
    if (typeof cacheGuilds !== "boolean")
      throw new TypeError("GLUON: Cache guilds is not a boolean.");
    if (typeof cacheVoiceStates !== "boolean")
      throw new TypeError("GLUON: Cache voice states is not a boolean.");
    if (typeof cacheRoles !== "boolean")
      throw new TypeError("GLUON: Cache roles is not a boolean.");
    if (typeof cacheScheduledEvents !== "boolean")
      throw new TypeError("GLUON: Cache scheduled events is not a boolean.");
    if (typeof cacheEmojis !== "boolean")
      throw new TypeError("GLUON: Cache emojis is not a boolean.");
    if (typeof cacheInvites !== "boolean")
      throw new TypeError("GLUON: Cache invites is not a boolean.");
    if (typeof defaultMessageExpiry !== "number")
      throw new TypeError("GLUON: Default message expiry is not a number.");
    if (typeof defaultUserExpiry !== "number")
      throw new TypeError("GLUON: Default user expiry is not a number.");
    if (typeof intents !== "number")
      throw new TypeError("GLUON: Intents is not a number.");
    if (typeof totalShards !== "undefined" && typeof totalShards !== "number")
      throw new TypeError("GLUON: Total shards is not a number.");
    if (
      typeof shardIds !== "undefined" &&
      (!Array.isArray(shardIds) ||
        shardIds.length === 0 ||
        !shardIds.every((id) => typeof id === "number"))
    )
      throw new TypeError(
        "GLUON: Shard ids is not an array of shard ids (numbers).",
      );
    if (typeof sessionData !== "undefined" && typeof sessionData !== "object")
      throw new TypeError("GLUON: Session data is not an object.");
    if (typeof initCache !== "undefined" && typeof initCache !== "object")
      throw new TypeError("GLUON: Init cache is not an object.");
    if (
      typeof softRestartFunction !== "undefined" &&
      typeof softRestartFunction !== "function"
    )
      throw new TypeError("GLUON: Soft restart function is not a function.");

    /**
     * The shards that this client is managing.
     * @type {Array<Shard>}
     * @private
     */
    this.#shards = [];

    /**
     * The intents to use when connecting with this client.
     * @type {Number}
     * @private
     */
    this.#intents = intents;

    this.#ip = ip;
    this.#rpsLimit = rpsLimit;
    this.#baseUrl = baseUrl;

    this._cacheOptions = new GluonCacheOptions({
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
      userTTL: defaultUserExpiry,
      messageTTL: defaultMessageExpiry,
    });

    this._defaultGuildCacheOptions = new GuildCacheOptions();

    /**
     * An array of the shard ids that this client is handling.
     * @type {Number[]?}
     * @private
     */
    this.#shardIds = shardIds;

    /**
     * The total shards the bot is using.
     * @type {Number?}
     * @private
     */
    this.#totalShards = totalShards;

    /**
     * The session data for this client.
     * @type {Object?}
     * @private
     */
    this.#_sessionData = sessionData;

    /**
     * The user manager for this client.
     * @type {UserManager}
     */
    this.#users = new UserManager(this);

    /**
     * The client user.
     * @type {User?}
     */
    this.#user = null;

    if (initCache?.clientUser)
      this.#user = new User(this, initCache.clientUser);

    /**
     * The guild manager for this client.
     * @type {GuildManager}
     */
    this.#guilds = new GuildManager(this);

    if (initCache?.guilds) {
      for (let i = 0; i < initCache.guilds.length; i++) {
        new Guild(this, initCache.guilds[i]);
      }
    }

    this.#softRestartFunction = softRestartFunction;
  }

  /**
   * The ids of the shards that this client is managing.
   * @type {Array<Number>}
   * @readonly
   * @public
   */
  get shardIds() {
    if (!this.#shardIds) {
      throw new Error(
        "GLUON: Shard ids are not set. Please set this value before accessing it or call Client#login before checking this property.",
      );
    }
    return this.#shardIds;
  }

  /**
   * The total number of shards that this client is managing.
   * @type {Number}
   * @readonly
   * @public
   */
  get totalShards() {
    if (!this.#totalShards) {
      throw new Error(
        "GLUON: Total shards is not set. Please set this value before accessing it or call Client#login before checking this property.",
      );
    }
    return this.#totalShards;
  }

  /**
   * The intents that this client is using.
   * @type {Number}
   * @readonly
   * @public
   */
  get intents() {
    return this.#intents;
  }

  get user() {
    if (!this.#user) {
      throw new Error(
        "GLUON: Client user is not set. Please login before accessing this property.",
      );
    }
    return this.#user;
  }

  set user(user: UserType) {
    this.#user = user;
  }

  /**
   * The user manager for this client.
   * @type {UserManager}
   * @readonly
   * @public
   */
  get users() {
    return this.#users;
  }

  /**
   * The guild manager for this client.
   * @type {GuildManager}
   * @readonly
   * @public
   */
  get guilds() {
    return this.#guilds;
  }

  /**
   * The session data for this client.
   * @type {Object}
   * @readonly
   * @public
   */
  get sessionData() {
    return this.#shards.map((shard) => shard.getSessionData());
  }

  /**
   * The function to call when a soft restart is needed.
   * @public
   * @method
   * @returns {void}
   */
  softRestartFunction() {
    if (this.#softRestartFunction) {
      this.#softRestartFunction();
    } else {
      process.exit(1);
    }
  }

  /**
   * Stops all shards.
   * @public
   * @method
   * @returns {void}
   */
  halt() {
    for (let i = 0; i < this.#shards.length; i++) this.#shards[i].halt();
  }

  /**
   * Monitors the current process.
   * @public
   * @method
   * @returns {Object}
   */
  checkProcess(): ClientProcessData {
    const guildIds: Snowflake[] = [];
    this.guilds.forEach((guild: GuildType) => guildIds.push(guild.id));
    const processInformation = {
      totalShards: this.totalShards,
      shardsManaged: this.shardIds,
      shards: [],
      guildCount: this.guilds.size,
      memberCount: this.getMemberCount(),
      cacheCounts: this.getCacheCounts(),
      guilds: guildIds,
      processId: hash
        .sha256()
        .update(`${this.shardIds.join("_")}-${this.totalShards}`)
        .digest("hex"),
      restLatency: this.request.latency / 2,
    };
    for (let i = 0; i < this.#shards.length; i++)
      // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
      processInformation.shards.push(this.#shards[i].check());
    return processInformation;
  }

  /**
   * Outputs a debug message if NODE_ENV=development.
   * @param {Number} status The debug status level.
   * @param {String} message The message to emit.
   * @returns {void}
   * @method
   * @public
   */
  _emitDebug(status: GluonDebugLevels, message: string) {
    if (process.env.NODE_ENV !== "development") return;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const libName = chalk.magenta.bold(`[${NAME.toUpperCase()}]`);
    let shardStatus;
    const shardString = `[Shard: ${this.shardIds ? this.shardIds.join(", ") : "???"}]`;
    switch (status) {
      case GluonDebugLevels.Info: {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        shardStatus = chalk.blue(chalk.bgWhite("[Info]"), shardString);
        break;
      }
      case GluonDebugLevels.Warn: {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        shardStatus = chalk.yellow(chalk.bgYellowBright("[Warn]"), shardString);
        break;
      }
      case GluonDebugLevels.Danger: {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        shardStatus = chalk.yellow(chalk.bgRed("[Danger]"), shardString);
        break;
      }
      case GluonDebugLevels.Error: {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        shardStatus = chalk.red(chalk.bgRedBright("[Error]"), shardString);
        break;
      }
      case GluonDebugLevels.None:
      default: {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        shardStatus = chalk.gray(shardString);
        break;
      }
    }
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const time = chalk.magenta(new Date().toTimeString().split(" ")[0]);
    const emitString = `${libName} ${shardStatus} @ ${time} => ${message}`;
    console.info(emitString);
  }

  /**
   * Counts how many items are in each cache.
   * @returns {Object}
   * @public
   * @method
   */
  getCacheCounts(): ClientCacheCounts {
    let totalMessages = 0;
    let totalMembers = 0;
    let totalChannels = 0;
    let totalRoles = 0;
    let totalEmojis = 0;
    let totalVoiceStates = 0;

    this.guilds.forEach((guild) => {
      guild.channels.forEach((channel) => {
        switch (channel.type) {
          case ChannelType.AnnouncementThread:
          case ChannelType.PublicThread:
          case ChannelType.PrivateThread:
          case ChannelType.GuildText:
          case ChannelType.GuildAnnouncement:
          case ChannelType.GuildForum: {
            totalMessages += channel.messages.size;
            break;
          }
          default:
            break;
        }

        totalChannels++;
      });

      totalMembers += guild.members.size;

      totalRoles += guild.roles.size;

      totalVoiceStates += guild.voiceStates.size;

      totalEmojis += guild.emojis.size;
    });

    return {
      users: this.users.size,
      guilds: this.guilds.size,
      messages: totalMessages,
      members: totalMembers,
      channels: totalChannels,
      roles: totalRoles,
      emojis: totalEmojis,
      voiceStates: totalVoiceStates,
    };
  }

  get initialized() {
    return this.#initialized;
  }

  get ready() {
    return this.#ready;
  }

  /**
   * Counts how many members are in all of Quark's servers.
   * @returns {Number}
   * @public
   * @method
   */
  getMemberCount() {
    let memberCount = 0;

    this.guilds.forEach((guild: GuildType) => {
      memberCount += guild.memberCount;
    });

    return memberCount;
  }

  /**
   * Bundles all guilds.
   * @returns {Array<Object>}
   * @public
   * @method
   */
  bundleCache() {
    return this.guilds.toJSON(JsonTypes.CACHE_FORMAT) as GuildCacheJSON[];
  }

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
  async registerCommands(commands: CommandBuilder[]) {
    if (
      !Array.isArray(commands) ||
      !commands.every((c) => c instanceof Command)
    )
      throw new TypeError(
        "GLUON: Commands is not an array of Command objects.",
      );

    if (!this.user?.id) {
      throw new Error(
        "GLUON: Cannot register commands before the client is logged in.",
      );
    }

    return this.request.makeRequest(
      "bulkOverwriteGlobalApplicationCommands",
      [this.user.id],
      commands,
    );
  }

  /**
   * Fetches the emojis for this client.
   * @returns {Array<Object>}
   * @public
   * @method
   * @async
   */
  async fetchEmojis(): Promise<APIEmoji[]> {
    return this.request.makeRequest("getClientEmojis", [this.user.id]);
  }

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
  async createEmoji({ name, image }: { name: string; image: string }) {
    if (typeof name !== "string")
      throw new TypeError(`GLUON: Name is not a string. Got ${typeof name}`);
    if (typeof image !== "string")
      throw new TypeError(`GLUON: Image is not a string. Got ${typeof image}`);

    if (!this.user?.id) {
      throw new Error(
        "GLUON: Cannot create emojis before the client is logged in.",
      );
    }

    return this.request.makeRequest("postAddClientEmoji", [this.user.id], {
      name,
      image,
    });
  }

  setInitialized(): void {
    this.#initialized = true;
  }

  setReady(): void {
    this.#ready = true;
  }

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
  }) {
    if (typeof name !== "string")
      throw new TypeError("GLUON: Name is not a string.");
    if (typeof type !== "undefined" && typeof type !== "number")
      throw new TypeError("GLUON: Type is not a number.");
    if (typeof status !== "undefined" && typeof status !== "string")
      throw new TypeError("GLUON: Status is not a string.");
    if (typeof afk !== "undefined" && typeof afk !== "boolean")
      throw new TypeError("GLUON: AFK is not a boolean.");
    if (typeof since !== "undefined" && typeof since !== "number")
      throw new TypeError("GLUON: Since is not a number.");
    for (let i = 0; i < this.#shards.length; i++)
      this.#shards[i].updatePresence(name, type, status, afk, since);
  }

  /**
   * Initiates the login sequence
   * @param {String} token The authorization token
   * @returns {void}
   * @public
   * @method
   * @throws {TypeError}
   */
  login(token: string) {
    if (typeof token !== "string")
      throw new TypeError("GLUON: Token is not a string.");
    /* sets the token and starts logging the bot in to the gateway, shard by shard */
    this.#token = token;

    this.request = new BetterRequestHandler(this, this.#token, {
      ip: this.#ip,
      rpsLimit: this.#rpsLimit,
      apiBaseUrl: this.#baseUrl,
    });

    this.request
      .makeRequest("getGatewayBot")
      .then((gatewayInfo: APIGatewayBotInfo) => {
        let remainingSessionStarts = gatewayInfo.session_start_limit.remaining;

        if (
          !this.shardIds ||
          !Array.isArray(this.shardIds) ||
          this.shardIds.length === 0
        )
          this.#shardIds = [...Array(gatewayInfo.shards).keys()];

        if (!this.totalShards) this.#totalShards = gatewayInfo.shards;

        for (
          let i = 0;
          i < this.shardIds.length && remainingSessionStarts !== 0;
          i++, remainingSessionStarts--
        ) {
          setTimeout(() => {
            for (
              let n = 0;
              n < gatewayInfo.session_start_limit.max_concurrency;
              n++
            )
              this.#shards.push(
                new Shard(
                  this,
                  this.#token,
                  generateWebsocketURL(
                    this.#_sessionData
                      ? this.#_sessionData[i].resumeGatewayUrl
                      : gatewayInfo.url,
                  ),
                  this.shardIds[i],
                  this.#_sessionData
                    ? this.#_sessionData[i].sessionId
                    : undefined,
                  this.#_sessionData
                    ? this.#_sessionData[i].sequence
                    : undefined,
                  this.#_sessionData
                    ? this.#_sessionData[i].resumeGatewayUrl
                    : undefined,
                ),
              );
          }, 6000 * i);
        }

        setInterval(async () => {
          this.guilds.forEach((guild: GuildType) => {
            guild._intervalCallback();
          });

          this.guilds._intervalCallback();
          this.users._intervalCallback();
        }, DEFAULT_POLLING_TIME); // every 1 minute 1000 * 60

        return null;
      })
      .catch((error: Error) => {
        this._emitDebug(
          GluonDebugLevels.Error,
          "Get gateway bot request failed, terminating process",
        );

        console.error(error);

        process.exit(0);
      });
  }
}

export default Client;
