/* i think one process should be able to handle multiple shards (ideally max_concurrency's worth) */
import {
  CHANNEL_TYPES,
  DEFAULT_MESSAGE_EXPIRY_SECONDS,
  DEFAULT_USER_EXPIRY_SECONDS,
  DEFAULT_POLLING_TIME,
  GLUON_DEBUG_LEVELS,
  NAME,
  TO_JSON_TYPES_ENUM,
} from "./constants.js";

import EventsEmitter from "events";
import hash from "hash.js";
import { TypedEmitter } from "tiny-typed-emitter";

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

/**
 * A client user, which is able to handle multiple shards.
 * @extends {TypedEmitter<{
 *  "ready": (shardGuilds: String[]) => void
 *  "resumed": () => void
 *  "guildCreate": (guild: Guild) => void
 *  "guildDelete": (guild: Guild) => void
 *  "guildUpdate": (oldGuild: Guild, newGuild: Guild) => void
 *  "messageCreate": (message: Message) => void
 *  "messageUpdate": (oldMessage: Message, newMessage: Message) => void
 *  "messageDelete": (message: Message) => void
 *  "messageDeleteBulk": (messages: Message[]) => void
 *  "guildAuditLogEntryCreate": (auditLog: AuditLog) => void
 *  "guildBanAdd": (bannedUser: User) => void
 *  "guildBanRemove": (unbannedUser: User) => void
 *  "guildMemberAdd": (member: Member) => void
 *  "guildMemberUpdate": (oldMember: Member, newMember: Member) => void
 *  "guildMemberRemove": (member: Member) => void
 *  "buttonClick": (interaction: ButtonClick) => void
 *  "menuSelect": (interaction: OptionSelect) => void
 *  "modalResponse": (interaction: ModalResponse) => void
 *  "slashCommand": (interaction: SlashCommand) => void
 *  "slashCommandAutocomplete": (interaction: SlashCommand) => void
 *  "voiceStateUpdate": (oldVoiceState: VoiceState, newVoiceState: VoiceState) => void
 *  "voiceChannelStatusUpdate": (data: Object) => void
 *  "channelCreate": (channel: TextChannel | VoiceChannel | CategoryChannel) => void
 *  "channelUpdate": (oldChannel: TextChannel | VoiceChannel | CategoryChannel, newChannel: TextChannel | VoiceChannel | CategoryChannel) => void
 *  "channelDelete": (channel: TextChannel | VoiceChannel | CategoryChannel) => void
 *  "channelPinsUpdate": (data: Object) => void
 *  "threadCreate": (thread: Thread) => void
 *  "threadUpdate": (oldThread: Thread, newThread: Thread)
 *  "threadDelete": (thread: Thread) => void
 *  "threadListSync": (threads: Thread[]) => void
 *  "inviteCreate": (invite: Invite) => void
 *  "inviteDelete": (data: Object, invite: Invite) => void
 *  "roleCreate": (role: Role) => void
 *  "roleUpdate": (oldRole: Role, newRole: Role) => void
 *  "roleDelete": (role: Role) => void
 *  "emojiCreate": (emoji: Emoji) => void
 *  "emojiUpdate": (oldEmoji: Emoji, newEmoji: Emoji) => void
 *  "emojiDelete": (emoji: Emoji) => void
 *  "entitlementCreate": (entitlement: Object) => void
 *  "entitlementUpdate": (entitlement: Object) => void
 *  "entitlementDelete": (entitlement: Object) => void
 *  "guildScheduledEventCreate": (scheduledEvent: ScheduledEvent) => void
 *  "guildScheduledEventUpdate": (oldScheduledEvent: ScheduledEvent, newScheduledEvent: ScheduledEvent) => void
 *  "guildScheduledEventDelete": (scheduledEvent: ScheduledEvent) => void
 *  "guildScheduledEventUserAdd": (data: Object, user: User) => void
 *  "guildScheduledEventUserRemove": (data: Object, user: User) => void
 *  "initialised": () => void
 *  "messagePollVoteAdd": (data: Object) => void
 *  "messagePollVoteRemove": (data: Object) => void
 *  "messageReactionAdd": (data: Object) => void
 *  "messageReactionRemove": (data: Object) => void
 *  "webhooksUpdate": (data: Object) => void
 * }>}
 */
class Client extends EventsEmitter {
  #token;
  #intents;
  #_cacheOptions;
  #_defaultGuildCacheOptions;
  #_sessionData;
  #shards;
  #shardIds;
  #totalShards;
  #users;
  #guilds;
  #softRestartFunction;
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
  } = {}) {
    if (typeof intents !== "number")
      throw new TypeError("GLUON: Intents is not a number.");

    super();

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

    /**
     * The cache options for this client.
     * @type {GluonCacheOptions}
     * @private
     * @readonly
     * @see {@link GluonCacheOptions}
     */
    this.#_cacheOptions = new GluonCacheOptions({
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

    /**
     * The default guild cache options for this client.
     * @type {GuildCacheOptions}
     * @private
     */
    this.#_defaultGuildCacheOptions = new GuildCacheOptions();

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
     * The client user.
     * @type {User?}
     */
    this.user = null;

    if (initCache?.clientUser) this.user = new User(this, initCache.clientUser);

    /**
     * The user manager for this client.
     * @type {UserManager}
     */
    this.#users = new UserManager(this);

    /**
     * The guild manager for this client.
     * @type {GuildManager}
     */
    this.#guilds = new GuildManager(this);

    if (initCache?.guilds)
      for (let i = 0; i < initCache.guilds.length; i++)
        new Guild(this, initCache.guilds[i]);

    this.#softRestartFunction = softRestartFunction;
  }

  /**
   * The ids of the shards that this client is managing.
   * @type {Array<Number>}
   * @readonly
   * @public
   */
  get shardIds() {
    return this.#shardIds;
  }

  /**
   * The total number of shards that this client is managing.
   * @type {Number}
   * @readonly
   * @public
   */
  get totalShards() {
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
   * The function to call when a soft restart is needed.
   * @public
   * @method
   * @returns {void}
   */
  softRestartFunction() {
    this.#softRestartFunction ? this.#softRestartFunction() : process.exit(1);
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
  checkProcess() {
    let guildIds = [];
    this.guilds.forEach((guild) => guildIds.push(guild.id));
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
  _emitDebug(status, message) {
    if (process.env.NODE_ENV !== "development") return;
    const libName = chalk.magenta.bold(`[${NAME.toUpperCase()}]`);
    let shardStatus;
    const shardString = `[Shard: ${this.shardIds ? this.shardIds.join(", ") : "???"}]`;
    switch (status) {
      case GLUON_DEBUG_LEVELS.INFO: {
        shardStatus = chalk.blue(chalk.bgWhite("[Info]"), shardString);
        break;
      }
      case GLUON_DEBUG_LEVELS.WARN: {
        shardStatus = chalk.yellow(chalk.bgYellowBright("[Warn]"), shardString);
        break;
      }
      case GLUON_DEBUG_LEVELS.DANGER: {
        shardStatus = chalk.yellow(chalk.bgRed("[Danger]"), shardString);
        break;
      }
      case GLUON_DEBUG_LEVELS.ERROR: {
        shardStatus = chalk.red(chalk.bgRedBright("[Error]"), shardString);
        break;
      }
      case GLUON_DEBUG_LEVELS.NONE:
      default: {
        shardStatus = chalk.gray(shardString);
        break;
      }
    }
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
  getCacheCounts() {
    let totalMessages = 0;
    let totalMembers = 0;
    let totalChannels = 0;
    let totalRoles = 0;

    this.guilds.forEach((guild) => {
      guild.channels.forEach((channel) => {
        switch (channel.type) {
          case CHANNEL_TYPES.GUILD_NEWS_THREAD:
          case CHANNEL_TYPES.GUILD_PUBLIC_THREAD:
          case CHANNEL_TYPES.GUILD_PRIVATE_THREAD:
          case CHANNEL_TYPES.GUILD_TEXT:
          case CHANNEL_TYPES.GUILD_NEWS:
          case CHANNEL_TYPES.GUILD_FORUM: {
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
    });

    return {
      users: this.users.size,
      guilds: this.guilds.size,
      messages: totalMessages,
      members: totalMembers,
      channels: totalChannels,
      roles: totalRoles,
    };
  }

  /**
   * Returns the cache options for this client.
   * @type {GluonCacheOptions}
   * @readonly
   * @public
   */
  get _cacheOptions() {
    return this.#_cacheOptions;
  }

  /**
   * Returns the global guild cache options for this client.
   * @type {GuildCacheOptions}
   * @readonly
   * @public
   */
  get _defaultGuildCacheOptions() {
    return this.#_defaultGuildCacheOptions;
  }

  /**
   * Counts how many members are in all of Quark's servers.
   * @returns {Number}
   * @public
   * @method
   */
  getMemberCount() {
    let memberCount = 0;

    this.guilds.forEach((guild) => {
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
    return this.guilds.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT);
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
  registerCommands(commands) {
    if (
      !Array.isArray(commands) ||
      !commands.every((c) => c instanceof Command)
    )
      throw new TypeError("GLUON: Commands is not an array.");

    const body = [];

    for (let i = 0; i < commands.length; i++) body.push(commands[i]);

    return this.request.makeRequest(
      "bulkOverwriteGlobalApplicationCommands",
      [this.user.id],
      body,
    );
  }

  /**
   * Sets the bot's status across all shards.
   * @param {Object} status Status options.
   * @param {String} status.name The bot's new status.
   * @param {Number} status.type The type of status.
   * @param {String} status.status The bot's status.
   * @param {Boolean} status.afk Whether the bot is afk.
   * @param {Number} status.since The time since the bot has been afk.
   * @returns {void}
   * @public
   * @method
   * @throws {TypeError}
   */
  setStatus({ name, type, status, afk, since } = {}) {
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
  login(token) {
    if (typeof token !== "string")
      throw new TypeError("GLUON: Token is not a string.");
    /* sets the token and starts logging the bot in to the gateway, shard by shard */
    this.#token = token;

    this.request = new BetterRequestHandler(this, this.#token);

    this.request
      .makeRequest("getGatewayBot")
      .then((gatewayInfo) => {
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
        )
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

        setInterval(async () => {
          this.guilds.forEach((guild) => {
            guild._intervalCallback();
          });

          this.users._intervalCallback();
        }, DEFAULT_POLLING_TIME); // every 1 minute 1000 * 60
      })
      .catch((error) => {
        this._emitDebug(
          GLUON_DEBUG_LEVELS.ERROR,
          "Get gateway bot request failed, terminating process",
        );

        console.error(error);

        process.exit(0);
      });
  }
}

export default Client;
