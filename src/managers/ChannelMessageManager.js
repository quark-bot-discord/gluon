import Client from "../Client.js";
import { LIMITS, PERMISSIONS } from "../constants.js";
import Message from "../structures/Message.js";
import checkPermission from "../util/discord/checkPermission.js";
import BaseCacheManager from "./BaseCacheManager.js";
import GuildChannelsManager from "./GuildChannelsManager.js";

/**
 * Manages all messages within a channel.
 */
class ChannelMessageManager extends BaseCacheManager {
  #_client;
  #channel;
  #guild;
  static identifier = "messages";
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

    if (!(client instanceof Client))
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
    this.#_client = client;

    /**
     * The channel that is being managed.
     * @type {Channel}
     * @private
     */
    this.#channel = channel;

    /**
     * The guild that this message manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;
  }

  /**
   * The guild that this message manager belongs to.
   * @type {Guild}
   * @readonly
   */
  get guild() {
    return this.#guild;
  }

  /**
   * Fetches a collection of messages or a singular message from the channel.
   * @param {Object | String} options Either an object of {@link https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params|options} or a message id.
   * @returns {Promise<Array<Message>> | Promise<Message>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(options) {
    if (
      !checkPermission(
        (await this.#guild.me()).permissions,
        PERMISSIONS.VIEW_CHANNEL,
      )
    )
      throw new Error("MISSING PERMISSIONS: VIEW_CHANNEL");
    if (
      !checkPermission(
        (await this.#guild.me()).permissions,
        PERMISSIONS.READ_MESSAGE_HISTORY,
      )
    )
      throw new Error("MISSING PERMISSIONS: READ_MESSAGE_HISTORY");
    if (typeof options === "object") {
      return ChannelMessageManager.fetchMessages(
        this.#_client,
        this.#guild.id,
        this.#channel.id,
        options,
      );
    } else if (typeof options === "string") {
      return ChannelMessageManager.fetchMessage(
        this.#_client,
        this.#guild.id,
        this.#channel.id,
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
    const data = await this.#_client.request.makeRequest("getChannelPins", [
      this.#channel.id,
    ]);

    const messages = [];
    for (let i = 0; i < data.length; i++)
      messages.push(
        new Message(this.#_client, data[i], {
          channelId: data[i].channel_id,
          guildId: this.#channel.guild.id,
        }),
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
    return super.set(id, message);
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
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    return client.guilds.get(guildId).channels.get(channelId).messages;
  }

  /**
   * Gets a message from the cache.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @param {String} channelId The ID of the channel.
   * @param {String} messageId The ID of the message.
   * @returns {Message}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static getMessage(client, guildId, channelId, messageId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID must be a string.");
    return ChannelMessageManager.getCacheManager(
      client,
      guildId,
      channelId,
    ).get(messageId);
  }

  /**
   * Fetches a message from the channel.
   * @param {Client} client The client instance.
   * @param {String} guildId The ID of the guild.
   * @param {String} channelId The ID of the channel.
   * @param {String} messageId The ID of the message.
   * @returns {Message}
   * @public
   * @async
   * @static
   * @method
   * @throws {TypeError | Error}
   */
  static async fetchMessage(client, guildId, channelId, messageId) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client is not a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID is not a string.");

    if (
      !checkPermission(
        (
          await ChannelMessageManager.getCacheManager(
            client,
            guildId,
            channelId,
          ).guild.me()
        ).permissions,
        PERMISSIONS.VIEW_CHANNEL,
      )
    )
      throw new Error("MISSING PERMISSIONS: VIEW_CHANNEL");
    if (
      !checkPermission(
        (
          await ChannelMessageManager.getCacheManager(
            client,
            guildId,
            channelId,
          ).guild.me()
        ).permissions,
        PERMISSIONS.READ_MESSAGE_HISTORY,
      )
    )
      throw new Error("MISSING PERMISSIONS: READ_MESSAGE_HISTORY");

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
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client is not a Client instance.");
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

    if (
      !checkPermission(
        (
          await ChannelMessageManager.getCacheManager(
            client,
            guildId,
            channelId,
          ).guild.me()
        ).permissions,
        PERMISSIONS.VIEW_CHANNEL,
      )
    )
      throw new Error("MISSING PERMISSIONS: VIEW_CHANNEL");
    if (
      !checkPermission(
        (
          await ChannelMessageManager.getCacheManager(
            client,
            guildId,
            channelId,
          ).guild.me()
        ).permissions,
        PERMISSIONS.READ_MESSAGE_HISTORY,
      )
    )
      throw new Error("MISSING PERMISSIONS: READ_MESSAGE_HISTORY");

    let providedFilters = 0;
    if (around) providedFilters++;
    if (before) providedFilters++;
    if (after) providedFilters++;

    if (providedFilters > 1)
      throw new Error(
        "GLUON: Only one of around, before, or after may be provided.",
      );

    const body = {};

    if (around) body.around = around;
    else if (before) body.before = before;
    else if (after) body.after = after;

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
    if (!(client instanceof Client))
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

    if (
      !checkPermission(
        GuildChannelsManager.getChannel(
          client,
          guildId,
          channelId,
        ).checkPermission(
          await GuildChannelsManager.getChannel(
            client,
            guildId,
            channelId,
          ).guild.me(),
        ),
        PERMISSIONS.MANAGE_MESSAGES,
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_MESSAGES");

    const body = {};

    body.messages = messages;

    if (reason) body["X-Audit-Log-Reason"] = reason;

    await client.request.makeRequest(
      "postBulkDeleteMessages",
      [channelId],
      body,
    );
  }
}

export default ChannelMessageManager;
