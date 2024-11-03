import {
  GLUON_DEBUG_LEVELS,
  PERMISSIONS,
  TO_JSON_TYPES_ENUM,
} from "../constants.js";
import Channel from "./Channel.js";
import Message from "./Message.js";
import checkPermission from "../util/discord/checkPermission.js";
import util from "util";
import Client from "../Client.js";

/**
 * Represents a text channel within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
 */
class TextChannel extends Channel {
  #_client;
  /**
   * Creates the structure for a text channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @param {Boolean?} options.nocache Whether this channel should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
   */
  constructor(client, data, { guildId, nocache = false } = { nocache: false }) {
    super(client, data, { guildId });

    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    const shouldCache = Channel.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (nocache === false && shouldCache) {
      this.guild.channels.set(data.id, this);
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE TEXTCHANNEL ${guildId} ${data.id}`,
      );
    } else {
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE TEXTCHANNEL ${guildId} ${data.id} (${nocache} ${shouldCache})`,
      );
    }

    if (data.messages)
      for (let i = 0; i < data.messages.length; i++)
        new Message(this.#_client, data.messages[i], {
          channelId: this.id,
          guildId,
        });
  }

  /**
   * Bulk deletes all the message IDs provided.
   * @param {String[]} messages An array of message IDs, as strings.
   * @returns {Promise<void>}
   * @method
   * @async
   * @public
   * @throws {Error | TypeError}
   */
  async bulkDelete(messages, { reason } = {}) {
    if (
      !checkPermission(
        this.checkPermission(await this.guild.me()),
        PERMISSIONS.MANAGE_MESSAGES,
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_MESSAGES");

    if (
      !Array.isArray(messages) ||
      !messages.every((m) => typeof m === "string")
    )
      throw new TypeError("GLUON: Messages is not an array of strings.");

    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason is not a string.");

    const body = {};

    body.messages = messages;

    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this.#_client.request.makeRequest(
      "postBulkDeleteMessages",
      [this.id],
      body,
    );
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<TextChannel: ${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
        };
      }
    }
  }
}

export default TextChannel;
