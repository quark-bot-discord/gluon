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
var _ChannelMessageManager__client,
  _ChannelMessageManager_channel,
  _ChannelMessageManager_guild;
import { LIMITS, PERMISSIONS } from "../constants.js";
import Message from "../structures/Message.js";
import checkPermission from "../util/discord/checkPermission.js";
import BaseCacheManager from "./BaseCacheManager.js";
import { ChannelType } from "#typings/discord.js";
import getGuild from "#src/util/gluon/getGuild.js";
import getChannel from "#src/util/gluon/getChannel.js";
import { GluonPermissionsError } from "#typings/errors.js";
import { getTimestamp } from "#src/util.js";
/**
 * Manages all messages within a channel.
 */
class ChannelMessageManager extends BaseCacheManager {
  /**
   * Creates a channel message manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this message manager belongs to.
   * @param {Channel} channel The channel that is being managed.
   * @throws {TypeError}
   * @constructor
   * @public
   */
  constructor(client, guild, channel) {
    super(client, { structureType: ChannelMessageManager });
    _ChannelMessageManager__client.set(this, void 0);
    _ChannelMessageManager_channel.set(this, void 0);
    _ChannelMessageManager_guild.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");
    if (!channel)
      throw new TypeError("GLUON: Channel must be a valid channel instance.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _ChannelMessageManager__client, client, "f");
    /**
     * The channel that is being managed.
     * @type {TextChannel | VoiceChannel | Thread}
     * @private
     */
    __classPrivateFieldSet(this, _ChannelMessageManager_channel, channel, "f");
    /**
     * The guild that this message manager belongs to.
     * @type {Guild}
     * @private
     */
    __classPrivateFieldSet(this, _ChannelMessageManager_guild, guild, "f");
  }
  /**
   * The guild that this message manager belongs to.
   * @type {Guild}
   * @readonly
   */
  get guild() {
    return __classPrivateFieldGet(this, _ChannelMessageManager_guild, "f");
  }
  /**
   * The channel that is being managed.
   * @type {TextChannel | VoiceChannel | Thread}
   * @readonly
   * @public
   */
  get channel() {
    return __classPrivateFieldGet(this, _ChannelMessageManager_channel, "f");
  }
  get(key) {
    return super.get(key);
  }
  /**
   * Fetches a message from the cache or from the rules.
   * @param {Snowflake} key The ID of the message to fetch.
   * @returns {Promise<Message | null>}
   * @public
   * @async
   * @method
   */
  async fetchFromRules(key) {
    return super.fetchFromRules(key);
  }
  async fetchWithRules(key) {
    return super.fetchWithRules(key);
  }
  async fetch(options) {
    if (
      !checkPermission(
        (
          await __classPrivateFieldGet(
            this,
            _ChannelMessageManager_guild,
            "f",
          ).me()
        ).permissions,
        PERMISSIONS.VIEW_CHANNEL,
      )
    ) {
      throw new GluonPermissionsError("ViewChannel");
    }
    if (
      !checkPermission(
        (
          await __classPrivateFieldGet(
            this,
            _ChannelMessageManager_guild,
            "f",
          ).me()
        ).permissions,
        PERMISSIONS.READ_MESSAGE_HISTORY,
      )
    ) {
      throw new GluonPermissionsError("ReadMessageHistory");
    }
    if (typeof options === "object") {
      return ChannelMessageManager.fetchMessages(
        __classPrivateFieldGet(this, _ChannelMessageManager__client, "f"),
        __classPrivateFieldGet(this, _ChannelMessageManager_guild, "f").id,
        __classPrivateFieldGet(this, _ChannelMessageManager_channel, "f").id,
        options,
      );
    } else if (typeof options === "string") {
      return ChannelMessageManager.fetchMessage(
        __classPrivateFieldGet(this, _ChannelMessageManager__client, "f"),
        __classPrivateFieldGet(this, _ChannelMessageManager_guild, "f").id,
        __classPrivateFieldGet(this, _ChannelMessageManager_channel, "f").id,
        options,
      );
    } else
      throw new TypeError(
        "GLUON: Must provide an object of options or a string of a message ID.",
      );
  }
  /**
   * Fetches all the pinned messages that belong to the channel.
   * @returns {Promise<Array<Message>>}
   * @public
   * @async
   * @method
   */
  async fetchPinned() {
    const data = await __classPrivateFieldGet(
      this,
      _ChannelMessageManager__client,
      "f",
    ).request.makeRequest("getChannelPins", [
      __classPrivateFieldGet(this, _ChannelMessageManager_channel, "f").id,
    ]);
    const messages = [];
    for (let i = 0; i < data.length; i++)
      messages.push(
        new Message(
          __classPrivateFieldGet(this, _ChannelMessageManager__client, "f"),
          data[i],
          {
            channelId: data[i].channel_id,
            guildId: __classPrivateFieldGet(
              this,
              _ChannelMessageManager_channel,
              "f",
            ).guildId,
          },
        ),
      );
    return messages;
  }
  /**
   * Adds a message to the cache.
   * @param {String} id The ID of the message to cache.
   * @param {Message} message The message to cache.
   * @returns {Message}
   * @public
   * @method
   * @throws {TypeError}
   * @override
   */
  set(id, message) {
    if (!(message instanceof Message))
      throw new TypeError("GLUON: Message must be a Message instance.");
    super.set(
      id,
      message,
      __classPrivateFieldGet(this, _ChannelMessageManager__client, "f")
        ._cacheOptions.messageTTL,
    );
  }
  /**
   * Returns the cache manager.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @param {String} channelId The ID of the channel.
   * @returns {ChannelMessageManager}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static getCacheManager(client, guildId, channelId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    const guild = client.guilds.get(guildId);
    if (!guild) {
      throw new Error(`Guild not found in cache: ${guildId}`);
    }
    const channel = guild.channels.get(channelId);
    if (!channel) {
      throw new Error(`Channel not found in cache: ${channelId}`);
    }
    if (channel.type === ChannelType.GuildCategory) {
      throw new Error(
        "GLUON: Cannot get message manager for a category channel.",
      );
    }
    return channel.messages;
  }
  /**
   * Gets a message from the cache.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @param {String} channelId The ID of the channel.
   * @param {String} messageId The ID of the message.
   * @returns {Message?}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static getMessage(client, guildId, channelId, messageId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID must be a string.");
    const cacheManager = ChannelMessageManager.getCacheManager(
      client,
      guildId,
      channelId,
    );
    return cacheManager.get(messageId);
  }
  static async fetchMessage(client, guildId, channelId, messageId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID is not a string.");
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error(`Guild not found in cache: ${guildId}`);
    }
    if (
      !checkPermission((await guild.me()).permissions, PERMISSIONS.VIEW_CHANNEL)
    ) {
      throw new GluonPermissionsError("ViewChannel");
    }
    if (
      !checkPermission(
        (await guild.me()).permissions,
        PERMISSIONS.READ_MESSAGE_HISTORY,
      )
    ) {
      throw new GluonPermissionsError("ReadMessageHistory");
    }
    const fromCache = ChannelMessageManager.getMessage(
      client,
      guildId,
      channelId,
      messageId,
    );
    if (fromCache) return fromCache;
    const data = await client.request.makeRequest("getChannelMessage", [
      channelId,
      messageId,
    ]);
    return new Message(client, data, {
      channelId,
      guildId,
    });
  }
  /**
   * Fetches a collection of messages from the channel.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @param {String} channelId The ID of the channel.
   * @param {Object} options The options for fetching messages.
   * @param {String} options.around The ID of the message to fetch messages around.
   * @param {String} options.before The ID of the message to fetch messages before.
   * @param {String} options.after The ID of the message to fetch messages after.
   * @param {Number} options.limit The maximum number of messages to fetch.
   * @returns {Array<Message>}
   * @public
   * @async
   * @static
   * @method
   * @throws {TypeError | Error}
   */
  static async fetchMessages(
    client,
    guildId,
    channelId,
    { around, before, after, limit } = {},
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (around && typeof around !== "string")
      throw new TypeError("GLUON: Around is not a string.");
    if (before && typeof before !== "string")
      throw new TypeError("GLUON: Before is not a string.");
    if (after && typeof after !== "string")
      throw new TypeError("GLUON: After is not a string.");
    if (typeof limit !== "undefined" && typeof limit !== "number")
      throw new TypeError("GLUON: Limit is not a number.");
    if (
      typeof limit !== "undefined" &&
      (limit < LIMITS.MIN_MESSAGES_FETCH_LIMIT ||
        limit > LIMITS.MAX_MESSAGES_FETCH_LIMIT)
    )
      throw new RangeError(
        `GLUON: Limit must be between ${LIMITS.MIN_MESSAGES_FETCH_LIMIT} and ${LIMITS.MAX_MESSAGES_FETCH_LIMIT}.`,
      );
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error(`Guild not found in cache: ${guildId}`);
    }
    if (
      !checkPermission((await guild.me()).permissions, PERMISSIONS.VIEW_CHANNEL)
    ) {
      throw new GluonPermissionsError("ViewChannel");
    }
    if (
      !checkPermission(
        (await guild.me()).permissions,
        PERMISSIONS.READ_MESSAGE_HISTORY,
      )
    ) {
      throw new GluonPermissionsError("ReadMessageHistory");
    }
    let providedFilters = 0;
    if (around) providedFilters++;
    if (before) providedFilters++;
    if (after) providedFilters++;
    if (providedFilters > 1)
      throw new Error(
        "GLUON: Only one of around, before, or after may be provided.",
      );
    const channel = getChannel(client, guildId, channelId);
    if (!channel) {
      throw new Error(`Channel not found in cache: ${channelId}`);
    }
    if (channel.type === ChannelType.GuildCategory) {
      throw new Error("GLUON: Cannot fetch messages from a category channel.");
    }
    const cachedMessages = channel.messages.toJSON();
    const cachedMessagesToReturn = cachedMessages
      .filter((message) => {
        if (around)
          return (
            Math.abs(getTimestamp(message.id) - getTimestamp(around)) < 100
          );
        if (before) return message.id < before;
        if (after) return message.id > after;
        return false;
      })
      .sort((a, b) => {
        return getTimestamp(b.id) - getTimestamp(a.id);
      });
    if (cachedMessagesToReturn.length > 0) {
      if (limit) {
        return cachedMessagesToReturn
          .map(
            (m) =>
              new Message(client, m, { channelId, guildId, nocache: true }),
          )
          .slice(0, limit);
      }
      return cachedMessagesToReturn.map(
        (m) => new Message(client, m, { channelId, guildId, nocache: true }),
      );
    }
    const body = {};
    // @ts-expect-error TS(2339): Property 'around' does not exist on type '{}'.
    if (around) body.around = around;
    // @ts-expect-error TS(2339): Property 'before' does not exist on type '{}'.
    else if (before) body.before = before;
    // @ts-expect-error TS(2339): Property 'after' does not exist on type '{}'.
    else if (after) body.after = after;
    // @ts-expect-error TS(2339): Property 'limit' does not exist on type '{}'.
    if (limit) body.limit = limit;
    const data = await client.request.makeRequest(
      "getChannelMessages",
      [channelId],
      body,
    );
    const messages = [];
    for (let i = 0; i < data.length; i++) {
      messages.push(
        new Message(client, data[i], {
          channelId: data[i].channel_id,
          guildId,
        }),
      );
    }
    return messages;
  }
  /**
   * Bulk deletes channel messages.
   * @param {Client} client The client instance.
   * @param {String} channelId The id of the channel to purge messages in.
   * @param {Array<String>} messages An array of message ids to delete.
   * @param {Object} options
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   * @static
   */
  static async purgeChannelMessages(
    client,
    guildId,
    channelId,
    messages,
    { reason } = {},
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (
      !Array.isArray(messages) ||
      !messages.every((m) => typeof m === "string")
    )
      throw new TypeError(
        "GLUON: Messages is not an array of message id strings.",
      );
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason is not a string.");
    const channel = getChannel(client, guildId, channelId);
    if (!channel) {
      throw new Error(`Channel not found in cache: ${channelId}`);
    }
    if (channel.type === ChannelType.GuildCategory) {
      throw new Error("GLUON: Cannot purge messages in a category channel.");
    }
    const guild = channel.guild;
    if (!guild) {
      throw new Error(`Guild not found in cache: ${guildId}`);
    }
    if (
      !checkPermission(
        channel.checkPermission(await guild.me()),
        PERMISSIONS.MANAGE_MESSAGES,
      )
    ) {
      throw new GluonPermissionsError("ManageMessages");
    }
    const body = {};
    // @ts-expect-error TS(2339): Property 'messages' does not exist on type '{}'.
    body.messages = messages;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    await client.request.makeRequest(
      "postBulkDeleteMessages",
      [channelId],
      body,
    );
  }
}
(_ChannelMessageManager__client = new WeakMap()),
  (_ChannelMessageManager_channel = new WeakMap()),
  (_ChannelMessageManager_guild = new WeakMap());
ChannelMessageManager.identifier = "messages";
export default ChannelMessageManager;
//# sourceMappingURL=ChannelMessageManager.js.map
