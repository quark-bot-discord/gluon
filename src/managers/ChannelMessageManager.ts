import { LIMITS, PERMISSIONS } from "../constants.js";
import Message from "../structures/Message.js";
import checkPermission from "../util/discord/checkPermission.js";
import BaseCacheManager from "./BaseCacheManager.js";
import {
  ChannelMessageManager as ChannelMessageManagerType,
  StructureIdentifiers,
  Message as MessageType,
  Guild as GuildType,
  GuildChannel as GuildChannelType,
  Client as ClientType,
} from "#typings/index.d.js";
import { ChannelType, Snowflake } from "#typings/discord.js";
import getGuild from "#src/util/gluon/getGuild.js";
import getChannel from "#src/util/gluon/getChannel.js";

/**
 * Manages all messages within a channel.
 */
class ChannelMessageManager
  extends BaseCacheManager<MessageType>
  implements ChannelMessageManagerType
{
  #_client;
  #channel;
  #guild;
  static identifier = "messages" as StructureIdentifiers;
  /**
   * Creates a channel message manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this message manager belongs to.
   * @param {Channel} channel The channel that is being managed.
   * @throws {TypeError}
   * @constructor
   * @public
   */
  constructor(client: ClientType, guild: GuildType, channel: GuildChannelType) {
    super(client, { structureType: ChannelMessageManager });

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
    this.#_client = client;

    /**
     * The channel that is being managed.
     * @type {TextChannel | VoiceChannel | Thread}
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
   * The channel that is being managed.
   * @type {TextChannel | VoiceChannel | Thread}
   * @readonly
   * @public
   */
  get channel() {
    return this.#channel;
  }

  get(key: Snowflake) {
    return super.get(key) as MessageType | null;
  }

  /**
   * Fetches a message from the cache or from the rules.
   * @param {Snowflake} key The ID of the message to fetch.
   * @returns {Promise<Message | null>}
   * @public
   * @async
   * @method
   */
  async fetchFromRules(key: Snowflake): Promise<MessageType | null> {
    return super.fetchFromRules(key) as Promise<MessageType | null>;
  }

  async fetchWithRules(key: Snowflake): Promise<MessageType | null> {
    return super.fetchWithRules(key) as Promise<MessageType | null>;
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
  async fetch(
    options:
      | {
          around?: Snowflake;
          before?: Snowflake;
          after?: Snowflake;
          limit?: number;
        }
      | Snowflake,
  ) {
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
        new Message(this.#_client as ClientType, data[i], {
          channelId: data[i].channel_id,
          guildId: this.#channel.guildId,
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
  set(id: Snowflake, message: MessageType) {
    if (!(message instanceof Message))
      throw new TypeError("GLUON: Message must be a Message instance.");
    super.set(id, message, this.#_client._cacheOptions.messageTTL);
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
  static getCacheManager(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
  ) {
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
  static getMessage(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
    messageId: Snowflake,
  ) {
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
  static async fetchMessage(
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
    messageId: Snowflake,
  ) {
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
    )
      throw new Error("MISSING PERMISSIONS: VIEW_CHANNEL");
    if (
      !checkPermission(
        (await guild.me()).permissions,
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

    return new Message(client as ClientType, data, {
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
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
    {
      around,
      before,
      after,
      limit,
    }: {
      around?: Snowflake;
      before?: Snowflake;
      after?: Snowflake;
      limit?: number;
    } = {},
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
    )
      throw new Error("MISSING PERMISSIONS: VIEW_CHANNEL");
    if (
      !checkPermission(
        (await guild.me()).permissions,
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
        new Message(client as ClientType, data[i], {
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
    client: ClientType,
    guildId: Snowflake,
    channelId: Snowflake,
    messages: Snowflake[],
    { reason }: { reason?: string } = {},
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
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_MESSAGES");

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

export default ChannelMessageManager;
