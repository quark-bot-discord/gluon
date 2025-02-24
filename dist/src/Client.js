var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _Client_token,
  _Client_intents,
  _Client__cacheOptions,
  _Client__defaultGuildCacheOptions,
  _Client__sessionData,
  _Client_shards,
  _Client_shardIds,
  _Client_totalShards,
  _Client_users,
  _Client_guilds,
  _Client_softRestartFunction;
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
    super();
    // @ts-expect-error TS(7008): Member '#token' implicitly has an 'any' type.
    _Client_token.set(this, void 0);
    _Client_intents.set(this, void 0);
    _Client__cacheOptions.set(this, void 0);
    _Client__defaultGuildCacheOptions.set(this, void 0);
    _Client__sessionData.set(this, void 0);
    // @ts-expect-error TS(7008): Member '#shards' implicitly has an 'any[]' type.
    _Client_shards.set(this, void 0);
    _Client_shardIds.set(this, void 0);
    _Client_totalShards.set(this, void 0);
    _Client_users.set(this, void 0);
    _Client_guilds.set(this, void 0);
    _Client_softRestartFunction.set(this, void 0);
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
    __classPrivateFieldSet(this, _Client_shards, [], "f");
    /**
     * The intents to use when connecting with this client.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _Client_intents, intents, "f");
    /**
     * The cache options for this client.
     * @type {GluonCacheOptions}
     * @private
     * @readonly
     * @see {@link GluonCacheOptions}
     */
    __classPrivateFieldSet(
      this,
      _Client__cacheOptions,
      new GluonCacheOptions({
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
      }),
      "f",
    );
    /**
     * The default guild cache options for this client.
     * @type {GuildCacheOptions}
     * @private
     */
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    __classPrivateFieldSet(
      this,
      _Client__defaultGuildCacheOptions,
      new GuildCacheOptions(),
      "f",
    );
    /**
     * An array of the shard ids that this client is handling.
     * @type {Number[]?}
     * @private
     */
    __classPrivateFieldSet(this, _Client_shardIds, shardIds, "f");
    /**
     * The total shards the bot is using.
     * @type {Number?}
     * @private
     */
    __classPrivateFieldSet(this, _Client_totalShards, totalShards, "f");
    /**
     * The session data for this client.
     * @type {Object?}
     * @private
     */
    __classPrivateFieldSet(this, _Client__sessionData, sessionData, "f");
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
    __classPrivateFieldSet(this, _Client_users, new UserManager(this), "f");
    /**
     * The guild manager for this client.
     * @type {GuildManager}
     */
    __classPrivateFieldSet(this, _Client_guilds, new GuildManager(this), "f");
    if (initCache?.guilds)
      for (let i = 0; i < initCache.guilds.length; i++)
        new Guild(this, initCache.guilds[i]);
    __classPrivateFieldSet(
      this,
      _Client_softRestartFunction,
      softRestartFunction,
      "f",
    );
  }
  /**
   * The ids of the shards that this client is managing.
   * @type {Array<Number>}
   * @readonly
   * @public
   */
  get shardIds() {
    return __classPrivateFieldGet(this, _Client_shardIds, "f");
  }
  /**
   * The total number of shards that this client is managing.
   * @type {Number}
   * @readonly
   * @public
   */
  get totalShards() {
    return __classPrivateFieldGet(this, _Client_totalShards, "f");
  }
  /**
   * The intents that this client is using.
   * @type {Number}
   * @readonly
   * @public
   */
  get intents() {
    return __classPrivateFieldGet(this, _Client_intents, "f");
  }
  /**
   * The user manager for this client.
   * @type {UserManager}
   * @readonly
   * @public
   */
  get users() {
    return __classPrivateFieldGet(this, _Client_users, "f");
  }
  /**
   * The guild manager for this client.
   * @type {GuildManager}
   * @readonly
   * @public
   */
  get guilds() {
    return __classPrivateFieldGet(this, _Client_guilds, "f");
  }
  /**
   * The session data for this client.
   * @type {Object}
   * @readonly
   * @public
   */
  get sessionData() {
    return __classPrivateFieldGet(this, _Client_shards, "f").map((shard) =>
      shard.getSessionData(),
    );
  }
  /**
   * The function to call when a soft restart is needed.
   * @public
   * @method
   * @returns {void}
   */
  softRestartFunction() {
    __classPrivateFieldGet(this, _Client_softRestartFunction, "f")
      ? __classPrivateFieldGet(this, _Client_softRestartFunction, "f").call(
          this,
        )
      : process.exit(1);
  }
  /**
   * Stops all shards.
   * @public
   * @method
   * @returns {void}
   */
  halt() {
    for (
      let i = 0;
      i < __classPrivateFieldGet(this, _Client_shards, "f").length;
      i++
    )
      __classPrivateFieldGet(this, _Client_shards, "f")[i].halt();
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
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        .update(`${this.shardIds.join("_")}-${this.totalShards}`)
        .digest("hex"),
      restLatency: this.request.latency / 2,
    };
    for (
      let i = 0;
      i < __classPrivateFieldGet(this, _Client_shards, "f").length;
      i++
    )
      // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
      processInformation.shards.push(
        __classPrivateFieldGet(this, _Client_shards, "f")[i].check(),
      );
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
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const libName = chalk.magenta.bold(`[${NAME.toUpperCase()}]`);
    let shardStatus;
    const shardString = `[Shard: ${this.shardIds ? this.shardIds.join(", ") : "???"}]`;
    switch (status) {
      case GLUON_DEBUG_LEVELS.INFO: {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        shardStatus = chalk.blue(chalk.bgWhite("[Info]"), shardString);
        break;
      }
      case GLUON_DEBUG_LEVELS.WARN: {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        shardStatus = chalk.yellow(chalk.bgYellowBright("[Warn]"), shardString);
        break;
      }
      case GLUON_DEBUG_LEVELS.DANGER: {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        shardStatus = chalk.yellow(chalk.bgRed("[Danger]"), shardString);
        break;
      }
      case GLUON_DEBUG_LEVELS.ERROR: {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        shardStatus = chalk.red(chalk.bgRedBright("[Error]"), shardString);
        break;
      }
      case GLUON_DEBUG_LEVELS.NONE:
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
  getCacheCounts() {
    let totalMessages = 0;
    let totalMembers = 0;
    let totalChannels = 0;
    let totalRoles = 0;
    let totalEmojis = 0;
    let totalVoiceStates = 0;
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
  /**
   * Returns the cache options for this client.
   * @type {GluonCacheOptions}
   * @readonly
   * @public
   */
  get _cacheOptions() {
    return __classPrivateFieldGet(this, _Client__cacheOptions, "f");
  }
  /**
   * Returns the global guild cache options for this client.
   * @type {GuildCacheOptions}
   * @readonly
   * @public
   */
  get _defaultGuildCacheOptions() {
    return __classPrivateFieldGet(this, _Client__defaultGuildCacheOptions, "f");
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
  async registerCommands(commands) {
    if (
      !Array.isArray(commands) ||
      !commands.every((c) => c instanceof Command)
    )
      throw new TypeError(
        "GLUON: Commands is not an array of Command objects.",
      );
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
  async fetchEmojis() {
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
  async createEmoji({ name, image }) {
    if (typeof name !== "string")
      throw new TypeError(`GLUON: Name is not a string. Got ${typeof name}`);
    if (typeof image !== "string")
      throw new TypeError(`GLUON: Image is not a string. Got ${typeof image}`);
    return this.request.makeRequest("postAddClientEmoji", [this.user.id], {
      name,
      image,
    });
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
    for (
      let i = 0;
      i < __classPrivateFieldGet(this, _Client_shards, "f").length;
      i++
    )
      __classPrivateFieldGet(this, _Client_shards, "f")[i].updatePresence(
        name,
        type,
        status,
        afk,
        since,
      );
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
    __classPrivateFieldSet(this, _Client_token, token, "f");
    this.request = new BetterRequestHandler(
      this,
      __classPrivateFieldGet(this, _Client_token, "f"),
    );
    this.request
      .makeRequest("getGatewayBot")
      .then((gatewayInfo) => {
        let remainingSessionStarts = gatewayInfo.session_start_limit.remaining;
        if (
          !this.shardIds ||
          !Array.isArray(this.shardIds) ||
          this.shardIds.length === 0
        )
          __classPrivateFieldSet(
            this,
            _Client_shardIds,
            [...Array(gatewayInfo.shards).keys()],
            "f",
          );
        if (!this.totalShards)
          __classPrivateFieldSet(
            this,
            _Client_totalShards,
            gatewayInfo.shards,
            "f",
          );
        for (
          let i = 0;
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          i < this.shardIds.length && remainingSessionStarts !== 0;
          i++, remainingSessionStarts--
        )
          setTimeout(() => {
            for (
              let n = 0;
              n < gatewayInfo.session_start_limit.max_concurrency;
              n++
            )
              __classPrivateFieldGet(this, _Client_shards, "f").push(
                new Shard(
                  this,
                  __classPrivateFieldGet(this, _Client_token, "f"),
                  generateWebsocketURL(
                    __classPrivateFieldGet(this, _Client__sessionData, "f")
                      ? __classPrivateFieldGet(this, _Client__sessionData, "f")[
                          i
                        ].resumeGatewayUrl
                      : gatewayInfo.url,
                  ),
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  this.shardIds[i],
                  __classPrivateFieldGet(this, _Client__sessionData, "f")
                    ? __classPrivateFieldGet(this, _Client__sessionData, "f")[i]
                        .sessionId
                    : undefined,
                  __classPrivateFieldGet(this, _Client__sessionData, "f")
                    ? __classPrivateFieldGet(this, _Client__sessionData, "f")[i]
                        .sequence
                    : undefined,
                  __classPrivateFieldGet(this, _Client__sessionData, "f")
                    ? __classPrivateFieldGet(this, _Client__sessionData, "f")[i]
                        .resumeGatewayUrl
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
(_Client_token = new WeakMap()),
  (_Client_intents = new WeakMap()),
  (_Client__cacheOptions = new WeakMap()),
  (_Client__defaultGuildCacheOptions = new WeakMap()),
  (_Client__sessionData = new WeakMap()),
  (_Client_shards = new WeakMap()),
  (_Client_shardIds = new WeakMap()),
  (_Client_totalShards = new WeakMap()),
  (_Client_users = new WeakMap()),
  (_Client_guilds = new WeakMap()),
  (_Client_softRestartFunction = new WeakMap());
export default Client;
//# sourceMappingURL=Client.js.map
