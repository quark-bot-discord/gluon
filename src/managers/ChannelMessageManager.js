const Channel = require("../structures/Channel");
const Message = require("../structures/Message");

/**
 * Manages all messages within a channel.
 */
class ChannelMessageManager {
  #_client;
  #channel;
  #cache;

  /**
   * Creates a channel message manager.
   * @param {Client} client The client instance.
   * @param {Channel} channel The channel that is being managed.
   */
  constructor(client, channel) {
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
     * The cache for messages.
     * @type {Map<String, Message>}
     * @private
     */
    this.#cache = new Map();
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
    if (typeof options === "object") {
      if (this.#cache.size != 0) {
        const cachedMessages = [];
        this.#cache.forEach((key, value) => {
          if (options.before && value.id < options.before)
            cachedMessages.push(value);
        });
      }

      const body = {};

      if (options.around) body.around = options.around;

      if (options.before) body.before = options.before;

      if (options.after) body.after = options.after;

      if (options.limit) body.limit = options.limit;

      const data = await this.#_client.request.makeRequest(
        "getChannelMessages",
        [this.#channel.id],
        body
      );
      const messages = [];
      for (let i = 0; i < data.length; i++)
        messages.push(
          new Message(this.#_client, data[i], {
            channel_id: data[i].channel_id,
            guild_id: this.#channel.guild.id,
          })
        );
      return messages;
    } else if (typeof options === "string") {
      const cachedMessage = this.#cache.get(options);
      if (cachedMessage) return cachedMessage;

      const data = await this.#_client.request.makeRequest(
        "getChannelMessage",
        [this.#channel.id, options]
      );

      return new Message(this.#_client, data, {
        channel_id: this.#channel.id,
        guild_id: this.#channel.guild.id,
      });
    } else
      throw new TypeError(
        "GLUON: Must provide an object of options or a string of a message ID."
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
        })
      );
    return messages;
  }

  /**
   * Sweeps messages from the channel which have been flagged for deletion, or moves messages to local storage if the guild has increased cache limits.
   * @param {Number} cacheCount The maximum number of messages that may be stored for this channel, or 0 for no limit.
   * @param {Number} currentTime The current UNIX time.
   * @returns {Number} The remaining number of messages in the channel.
   * @public
   * @method
   * @throws {TypeError}
   */
  sweepMessages(cacheCount, currentTime) {

    if (typeof cacheCount !== "number")
      throw new TypeError("GLUON: Cache count must be a number.");

    if (typeof currentTime !== "number")
      throw new TypeError("GLUON: Current time must be a number.");

    if (this.#cache.size == 0) return;

    const currentCacheSize = this.#cache.size;
    const currentCacheKeys = this.#cache.keys();
    const currentCacheValues = this.#cache.values();

    for (let i = 0, cacheSize = currentCacheSize; i < currentCacheSize; i++) {
      const currentCacheValue = currentCacheValues.next().value;
      if (currentCacheValue)
        if (
          currentCacheValue.timestamp + this.#_client.defaultMessageExpiry <
            currentTime ||
          (cacheCount != 0 ? cacheSize > cacheCount : false)
        ) {
          if (this.#_client.increasedCache.get(this.#channel.guild.id))
            currentCacheValue.shelf();
          else {
            this.#cache.delete(currentCacheKeys.next().value);
            cacheSize--;
          }
        }
    }

    return this.#cache.size;
  }

  /**
   * Gets a message from the cache.
   * @param {String} id The ID of the message to retrieve.
   * @returns {Message?}
   * @public
   * @method
   * @throws {TypeError}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Adds a message to the cache.
   * @param {String} id The ID of the message to cache.
   * @param {Message} message The message to cache.
   * @returns {Message}
   * @public
   * @method
   * @throws {TypeError}
   */
  set(id, message) {
    if (!(message instanceof Message))
      throw new TypeError("GLUON: Message must be a Message instance.");
    if (typeof id !== "string")
      throw new TypeError("GLUON: Message ID must be a string.");
    return this.#cache.set(id, message);
  }

  /**
   * Deletes a message from the cache.
   * @param {String} id The ID of the message to delete.
   * @returns {Boolean}
   * @public
   * @method
   * @throws {TypeError}
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.delete(id);
  }

  /**
   * Returns the size of the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get size() {
    return this.#cache.size;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return [...this.#cache.values()];
  }
}

module.exports = ChannelMessageManager;
