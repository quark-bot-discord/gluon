import Client from "../Client.js";
import { LIMITS, PERMISSIONS } from "../constants.js";
import Message from "../structures/Message.js";
import checkPermission from "../util/discord/checkPermission.js";
import BaseCacheManager from "./BaseCacheManager.js";

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
   * @param {Channel} channel The channel that is being managed.
   */
  constructor(client, guild, channel) {
    super(client, { structureType: ChannelMessageManager });
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
      ChannelMessageManager.fetchMessages(
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
   * @throws {Error}
   */
  async fetchPinned() {
    const data = await this.#_client.request.makeRequest("getPinned", [
      this.#channel.id,
    ]);

    const messages = [];
    for (let i = 0; i < data.length; i++)
      messages.push(
        new Message(this.#_client, data[i], {
          channel_id: data[i].channel_id,
          guild_id: this.#channel.guild.id,
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
      guild_id: guildId,
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
    { around, before, after, limit },
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

    const body = {};

    if (around) body.around = around;

    if (before) body.before = before;

    if (after) body.after = after;

    if (limit) body.limit = limit;

    const data = await client.request.makeRequest(
      "getChannelMessages",
      [channelId],
      body,
    );

    const messages = [];
    for (let i = 0; i < data.length; i++)
      messages.push(
        new Message(client, data[i], {
          channel_id: data[i].channel_id,
          guild_id: guildId,
        }),
      );
    return messages;
  }
}

export default ChannelMessageManager;
