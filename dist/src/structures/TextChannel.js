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
var _TextChannel__client;
import { GLUON_DEBUG_LEVELS, PERMISSIONS } from "../constants.js";
import GuildChannel from "./GuildChannel.js";
import Message from "./Message.js";
import checkPermission from "../util/discord/checkPermission.js";
import util from "util";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents a text channel within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
 */
class TextChannel extends GuildChannel {
  /**
   * Creates the structure for a text channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @param {Boolean?} [options.nocache] Whether this channel should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
   */
  constructor(client, data, { guildId, nocache = false }) {
    super(client, data, { guildId });
    _TextChannel__client.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${guildId} not found for text channel.`);
    }
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _TextChannel__client, client, "f");
    const shouldCache = GuildChannel.shouldCache(
      __classPrivateFieldGet(this, _TextChannel__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (nocache === false && shouldCache) {
      this.guild.channels.set(data.id, this);
      __classPrivateFieldGet(this, _TextChannel__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE TEXTCHANNEL ${guildId} ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _TextChannel__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE TEXTCHANNEL ${guildId} ${data.id} (${nocache} ${shouldCache})`,
      );
    }
    if ("messages" in data && data.messages)
      for (let i = 0; i < data.messages.length; i++)
        new Message(
          __classPrivateFieldGet(this, _TextChannel__client, "f"),
          data.messages[i],
          {
            channelId: this.id,
            guildId,
          },
        );
  }
  /**
   * Bulk deletes all the message IDs provided.
   * @param {String[]} messages An array of message IDs, as strings.
   * @param {Object?} [options] Additional options for this method.
   * @param {String?} [options.reason] The reason for this action.
   * @returns {Promise<void>}
   * @method
   * @async
   * @public
   * @throws {Error | TypeError}
   */
  async bulkDelete(messages, { reason } = {}) {
    if (!this.guild) {
      throw new Error(
        `GLUON: Guild ${this.guildId} not found for text channel.`,
      );
    }
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
    // @ts-expect-error TS(2339): Property 'messages' does not exist on type '{}'.
    body.messages = messages;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    await __classPrivateFieldGet(
      this,
      _TextChannel__client,
      "f",
    ).request.makeRequest("postBulkDeleteMessages", [this.id], body);
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
  [((_TextChannel__client = new WeakMap()), util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
        };
      }
    }
  }
}
export default TextChannel;
//# sourceMappingURL=TextChannel.js.map
