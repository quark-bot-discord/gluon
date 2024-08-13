/* i think one process should be able to handle multiple shards (ideally max_concurrency's worth) */
import {
  CHANNEL_TYPES,
  DEFAULT_MESSAGE_EXPIRY_SECONDS,
  DEFAULT_USER_EXPIRY_SECONDS,
  DEFAULT_POLLING_TIME,
  GLUON_DEBUG_LEVELS,
  NAME,
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
import Message from "./structures/Message.js";
import Guild from "./structures/Guild.js";
import User from "./structures/User.js";
import generateWebsocketURL from "./util/gluon/generateWebsocketURL.js";
import Member from "./structures/Member.js";
import cacheChannel from "./util/gluon/cacheChannel.js";
import Role from "./structures/Role.js";
import GluonCacheOptions from "./managers/GluonCacheOptions.js";
import GuildCacheOptions from "./managers/GuildCacheOptions.js";

/**
 * A client user, which is able to handle multiple shards.
 */
class Client extends EventsEmitter {
  #token;
  #intents;
  #_cacheOptions;
  #_defaultGuildCacheOptions;
  #_sessionData;

  /**
   * Creates the client and sets the default options.
   * @constructor
   * @param {Object?} options The options to pass to the client.
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

    this.shards = [];

    /**
     * The intents to use when connecting with this client.
     * @type {Number?}
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

    this.#_defaultGuildCacheOptions = new GuildCacheOptions();

    /**
     * An array of the shard ids that this client is handling.
     * @type {Number[]?}
     */
    this.shardIds = shardIds;

    /**
     * The total shards the bot is using.
     * @type {Number?}
     */
    this.totalShards = totalShards;

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
    this.users = new UserManager(this);

    /**
     * The guild manager for this client.
     * @type {GuildManager}
     */
    this.guilds = new GuildManager(this);

    if (initCache?.guilds)
      for (let i = 0; i < initCache.guilds.length; i++)
        new Guild(this, initCache.guilds[i]);

    this.increasedCache = new Map();
    this.increasedCacheMultipliers = new Map();

    this.softRestartFunction = softRestartFunction;
  }

  halt() {
    for (let i = 0; i < this.shards.length; i++) this.shards[i].halt();
  }

  checkShards() {
    let guildIds = [];
    this.guilds.forEach((guild) => guildIds.push(guild.id));
    const processInformation = {
      totalShards: this.totalShards,
      shards: [],
      guildCount: this.guilds.size,
      memberCount: this.getMemberCount(),
      cacheCounts: this.getCacheCounts(),
      guilds: guildIds,
      processId: hash
        .sha256()
        .update(`${this.shardIds.join("_")}-${this.totalShards}`)
        .digest("hex"),
    };
    for (let i = 0; i < this.shards.length; i++)
      processInformation.shards.push(this.shards[i].check());
    return processInformation;
  }

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
    const time = chalk.magenta(new Date().toGMTString());
    const emitString = `${libName} ${shardStatus} @ ${time} => ${message}`;
    console.info(emitString);
  }

  /**
   * Counts how many items are in each cache.
   * @returns {Object}
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
   */
  bundleCache() {
    return this.guilds;
  }

  /**
   * Fetches a message from a specific channel.
   * @param {BigInt} guild_id The ID of the guild that the message belongs to.
   * @param {BigInt} channel_id The ID of the channel that the message belongs to.
   * @param {BigInt} message_id The ID of the message to return.
   * @returns {Promise<Message>}
   */
  async fetchMessage(guild_id, channel_id, message_id) {
    const data = await this.request.makeRequest("getChannelMessage", [
      channel_id,
      message_id,
    ]);

    return new Message(this, data, {
      channel_id: channel_id.toString(),
      guild_id: guild_id.toString(),
    });
  }

  /**
   * Posts a webhook with the provided webhook id and token.
   * @param {Object} referenceData An object with the webhook id and token.
   * @param {String?} content The message to send with the webhook.
   * @param {Object?} options Embeds, components and files to attach to the webhook.
   */
  async postWebhook(
    { id, token },
    content,
    { embeds, components, files } = {},
  ) {
    const body = {};

    if (content) body.content = content;

    if (embeds) body.embeds = embeds;
    if (components) body.components;
    if (files) body.files = files;

    await this.request.makeRequest("postExecuteWebhook", [id, token], body);
  }

  /**
   * Posts a message to the specified channel.
   * @param {BigInt} channel_id The id of the channel to send the message to.
   * @param {BigInt} guild_id The id of the guild which the channel belongs to.
   * @param {String?} content The message content.
   * @param {Object?} options Embeds, components and files to attach to the message.
   * @returns {Promise<Message>}
   */
  async sendMessage(
    channel_id,
    guild_id,
    content,
    { embed, embeds, components, files, suppressMentions = false } = {},
  ) {
    const body = {};

    if (content) body.content = content;

    if (embed) body.embeds = [embed];
    else if (embeds && embeds.length != 0) body.embeds = embeds;
    if (components) body.components = components;
    if (files) body.files = files;
    if (suppressMentions == true) {
      body.allowed_mentions = {};
      body.allowed_mentions.parse = [];
    }

    const data = await this.request.makeRequest(
      "postCreateMessage",
      [channel_id],
      body,
    );

    return new Message(this, data, {
      channel_id: channel_id.toString(),
      guild_id: guild_id.toString(),
      nocache: false,
    });
  }

  /**
   * Edits a specified message.
   * @param {BigInt} channel_id The id of the channel that the message belongs to.
   * @param {BigInt} guild_id The id of the guild that the channel belongs to.
   * @param {BigInt} message_id The id of the message to edit.
   * @param {String?} content The message content.
   * @param {Object?} options Embeds, components and files to attach to the message.
   * @returns {Promise<Message>}
   */
  async editMessage(
    channel_id,
    guild_id,
    message_id,
    content,
    { embed, components } = {},
  ) {
    const body = {};

    if (content) body.content = content;
    if (embed) body.embeds = [embed];
    if (components) body.components = components;

    if (this.referenced_message)
      body.message_reference = {
        message_id: message_id.toString(),
        channel_id: channel_id.toString(),
        guild_id: guild_id.toString(),
      };

    const data = await this.request.makeRequest(
      "patchEditMessage",
      [channel_id, message_id],
      body,
    );

    return new Message(this, data, { channel_id, guild_id });
  }

  /**
   * Adds a specified channel as a follower to Quark's status channel.
   * @param {BigInt} channel_id The id of the channel to add as a follower.
   */
  async followStatusChannel(channel_id) {
    const body = {};

    body.webhook_channel_id = channel_id;

    await this.request.makeRequest(
      "postFollowNewsChannel",
      ["822906135048487023"],
      body,
    );
  }

  /**
   * Fetches the webhooks for a specified channel.
   * @param {BigInt} channel_id The id of the channel to fetch the webhooks from.
   * @returns {Promise<Array<Object>>}
   */
  fetchChannelWebhooks(channel_id) {
    return this.request.makeRequest("getChannelWebhooks", [channel_id]);
  }

  /**
   * Deletes a webhook.
   * @param {BigInt} webhook_id The id of the webhook to delete.
   */
  async deleteWebhook(webhook_id) {
    await this.request.makeRequest("deleteWebhook", [webhook_id]);
  }

  /**
   * Fetches a member, checking the cache first.
   * @param {String | BigInt} guild_id The id of the guild the member belongs to.
   * @param {String | BigInt} user_id The id of the member to fetch.
   * @returns {Promise<Member>}
   */
  async fetchMember(guild_id, user_id) {
    const guild = this.guilds.get(guild_id.toString());

    const cached = guild.members.get(user_id.toString());
    if (cached) return cached;

    const data = await this.request.makeRequest("getGuildMember", [
      guild_id,
      user_id,
    ]);

    return new Member(this, data, {
      user_id: user_id.toString(),
      guild_id: guild_id.toString(),
      user: data.user,
    });
  }

  /**
   * Fetches a channel, checking the cache first.
   * @param {String | BigInt} guild_id The id of the guild the channel belongs to.
   * @param {String | BigInt} channel_id The id of the channel to fetch.
   * @returns {Promise<TextChannel | VoiceChannel>}
   */
  async fetchChannel(guild_id, channel_id) {
    const guild = this.guilds.get(guild_id.toString());

    const cached = guild.channels.get(channel_id.toString());

    if (cached) return cached;

    const data = await this.request.makeRequest("getChannel", [channel_id]);

    return cacheChannel(this, data, guild_id.toString());
  }

  /**
   * Fetches a role, checking the cache first.
   * @param {String | BigInt} guild_id The id of the guild the role belongs to.
   * @param {String | BigInt | null} user_id The id of the role to fetch, or null to return all roles.
   * @returns {Promise<Role | Array<Role>>}
   */
  async fetchRole(guild_id, role_id) {
    const guild = this.guilds.get(guild_id.toString());

    const cached = role_id
      ? guild.roles.get(role_id.toString())
      : Array.from(guild.roles.cache, ([key, value]) => value);

    if (cached) return cached;

    const data = await this.request.makeRequest("getRoles", [guild_id]);

    if (!role_id) return data.map((role) => new Role(this, role, { guild_id }));

    let matchedRole;
    for (let i = 0; i < data.length; i++) {
      const role = new Role(this, data[i], { guild_id });
      if (role.id == role_id) matchedRole = role;
    }

    return matchedRole;
  }

  /**
   * Bulk deletes channel messages.
   * @param {BigInt} channel_id The id of the channel to purge messages in.
   * @param {Array<String>} messages An array of message ids to delete.
   * @param {Object} options
   */
  async purgeChannelMessages(channel_id, messages, { reason }) {
    const body = {};

    body.messages = messages;

    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this.request.makeRequest(
      "postBulkDeleteMessages",
      [channel_id],
      body,
    );
  }

  /**
   * Deletes one message.
   * @param {BigInt} channel_id The id of the channel that the message belongs to.
   * @param {BigInt} message_id The id of the message to delete.
   * @param {Object} options
   */
  async deleteChannelMessage(channel_id, message_id, { reason }) {
    const body = {};

    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this.request.makeRequest(
      "deleteChannelMessage",
      [channel_id, message_id],
      body,
    );
  }

  /**
   * Fetches messages from a specified channel.
   * @param {BigInt} guild_id The id of the guild that the channel belongs to.
   * @param {BigInt} channel_id The id of the channel to fetch messages from.
   * @param {Object} options The filter options to determine which messages should be returned.
   * @returns {Promise<Array<Message>>}
   */
  async fetchChannelMessages(
    guild_id,
    channel_id,
    { around, before, after, limit },
  ) {
    const body = {};

    if (around) body.around = around;

    if (before) body.before = before;

    if (after) body.after = after;

    if (limit) body.limit = limit;

    const data = await this.request.makeRequest(
      "getChannelMessages",
      [channel_id],
      body,
    );

    const messages = [];
    for (let i = 0; i < data.length; i++)
      messages.push(
        new Message(this, data[i], {
          channel_id: data[i].channel_id,
          guild_id: guild_id,
        }),
      );

    return messages;
  }

  /**
   * Creates a webhook in the given channel with the name "Quark"
   * @param {BigInt} channel_id The id of the channel to create the webhook in.
   * @returns {Promise<Object>}
   */
  async createWebhook(channel_id) {
    const body = {};

    body.name = "Quark";

    const data = await this.request.makeRequest(
      "postCreateWebhook",
      [channel_id],
      body,
    );

    return data;
  }

  /**
   * Modified a webhook with the given webhook id.
   * @param {BigInt} webhook_id The id of the webhook to modify.
   * @param {Object} options The options to modify the webhook with.
   * @returns {Promise<Object>}
   */
  async modifyWebhook(webhook_id, { channel_id }) {
    const body = {};

    body.channel_id = channel_id.toString();

    const data = await this.request.makeRequest(
      "patchModifyWebhook",
      [webhook_id],
      body,
    );

    return data;
  }

  /**
   * Fetches a webhook by the webhook's id.
   * @param {BigInt | String} webhook_id The id of the webhook to fetch.
   * @returns {Promise<Object>}
   */
  async fetchWebhook(webhook_id) {
    const data = await this.request.makeRequest("getWebhook", [webhook_id]);

    return data;
  }

  /**
   * Registers commands, overwriting all previous ones.
   * @param {Array<Command>} commands Array of commands to register.
   * @returns {Array<Object>}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#registering-a-command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands}
   */
  async registerCommands(commands) {
    const body = [];

    for (let i = 0; i < commands.length; i++) body.push(commands[i]);

    const data = await this.request.makeRequest(
      "bulkOverwriteGlobalApplicationCommands",
      [this.user.id],
      body,
    );

    return data;
  }

  /**
   * Adds a role to a member.
   * @param {String | BigInt} guildId The guild id the member belongs to.
   * @param {String | BigInt} userId The id of the member who the action is occuring on.
   * @param {String | BigInt} roleId The id of the role to add.
   */
  async addMemberRole(guildId, userId, roleId) {
    await this.request.makeRequest("putAddGuildMemberRole", [
      guildId,
      userId,
      roleId,
    ]);
  }

  /**
   * Removes a role from a member.
   * @param {String | BigInt} guildId The guild id the member belongs to.
   * @param {String | BigInt} userId The id of the member who the action is occuring on.
   * @param {String | BigInt} roleId The id of the role to remove.
   */
  async removeMemberRole(guildId, userId, roleId) {
    await this.request.makeRequest("deleteRemoveMemberRole", [
      guildId,
      userId,
      roleId,
    ]);
  }

  /**
   * Searches for members via a search query.
   * @param {String | BigInt} guildId The id of the guild to search.
   * @param {String} query The search query.
   * @returns {Promise<Array<Member>?>} The members which match the search query.
   */
  async search(guildId, query) {
    const body = {};

    body.query = query;

    body.limit = 1000;

    const data = await this.request.makeRequest(
      "getSearchGuildMembers",
      [guildId],
      body,
    );
    if (data.length != 0) {
      const members = [];

      for (let i = 0; i < data.length; i++)
        members.push(
          new Member(this, data[i], {
            user_id: data[i].user.id,
            guild_id: guildId.toString(),
            user: data[i].user,
          }),
        );

      return members;
    } else return null;
  }

  /**
   * Sets the bot's status across all shards.
   * @param {Object} status Status options.
   */
  setStatus({ name, type, status, afk, since } = {}) {
    for (let i = 0; i < this.shards.length; i++)
      this.shards[i].updatePresence(name, type, status, afk, since);
  }

  /**
   * Initiates the login sequence
   * @param {String} token The authorization token
   */
  login(token) {
    /* sets the token and starts logging the bot in to the gateway, shard by shard */
    this.#token = token;

    this.request = new BetterRequestHandler(this, this.#token);

    this.request
      .makeRequest("getGatewayBot")
      .then((gatewayInfo) => {
        let remainingSessionStarts = gatewayInfo.session_start_limit.remaining;

        if (!this.shardIds || this.shardIds.length == 0)
          this.shardIds = [...Array(gatewayInfo.shards).keys()];

        if (!this.totalShards) this.totalShards = gatewayInfo.shards;

        for (
          let i = 0;
          i < this.shardIds.length && remainingSessionStarts != 0;
          i++, remainingSessionStarts--
        )
          setTimeout(() => {
            for (
              let n = 0;
              n < gatewayInfo.session_start_limit.max_concurrency;
              n++
            )
              this.shards.push(
                new Shard(
                  this,
                  this.#token,
                  generateWebsocketURL(
                    this.#_sessionData
                      ? this.#_sessionData[i].resumeGatewayUrl
                      : gatewayInfo.url,
                  ),
                  this.shardIds[i],
                  this.totalShards,
                  this.#intents,
                  this.#_sessionData
                    ? this.#_sessionData[i].sessionId
                    : undefined,
                  this.#_sessionData
                    ? this.#_sessionData[i].sequence
                    : undefined,
                  this.#_sessionData
                    ? this.#_sessionData[i].resumeGatewayUrl
                    : undefined,
                  this.softRestartFunction,
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
        this.emit(
          "debug",
          "Get gateway bot request failed, terminating process",
        );

        console.error(error);

        process.exit(0);
      });
  }
}

export default Client;
