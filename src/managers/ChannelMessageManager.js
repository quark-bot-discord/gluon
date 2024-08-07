import { PERMISSIONS } from "../constants.js";
import Channel from "../structures/Channel.js";
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
  /**
   * Creates a channel message manager.
   * @param {Client} client The client instance.
   * @param {Channel} channel The channel that is being managed.
   */
  constructor(client, guild, channel) {
    super(client, { useRedis: true, identifier: "messages" });
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
      if (this.toJSON().length != 0) {
        const cachedMessages = [];
        const rawCache = this.toJSON();
        for (let i = 0; i < rawCache.length; i++) {
          if (options.before && BigInt(rawCache[i].id) < BigInt(options.before))
            cachedMessages.push(rawCache[i]);
          else if (
            options.after &&
            BigInt(rawCache[i].id) > BigInt(options.after)
          )
            cachedMessages.push(rawCache[i]);
        }
      }

      const body = {};

      if (options.around) body.around = options.around;

      if (options.before) body.before = options.before;

      if (options.after) body.after = options.after;

      if (options.limit) body.limit = options.limit;

      const data = await this.#_client.request.makeRequest(
        "getChannelMessages",
        [this.#channel.id],
        body,
      );
      const messages = [];
      for (let i = 0; i < data.length; i++)
        messages.push(
          new Message(this.#_client, data[i], {
            channel_id: data[i].channel_id,
            guild_id: this.#channel.guild.id,
          }),
        );
      return messages;
    } else if (typeof options === "string") {
      const cachedMessage = await this.get(options);
      if (cachedMessage) return cachedMessage;

      const data = await this.#_client.request.makeRequest(
        "getChannelMessage",
        [this.#channel.id, options],
      );

      return new Message(this.#_client, data, {
        channel_id: this.#channel.id,
        guild_id: this.#channel.guild.id,
      });
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
}

export default ChannelMessageManager;
