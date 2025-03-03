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
var _ButtonClick__client, _ButtonClick_custom_id, _ButtonClick_message;
import Interaction from "./Interaction.js";
import Message from "./Message.js";
import util from "util";
import { JsonTypes } from "../../typings/index.d.js";
/**
 * Represents when a button is clicked.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
class ButtonClick extends Interaction {
  /**
   * Creates a button click interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this interaction belongs to.
   * @param {String} options.channelId The ID of the channel that this interaction belongs to.
   */
  constructor(client, data, { guildId, channelId }) {
    super(client, data);
    _ButtonClick__client.set(this, void 0);
    _ButtonClick_custom_id.set(this, void 0);
    _ButtonClick_message.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _ButtonClick__client, client, "f");
    /**
     * The custom id of the button.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _ButtonClick_custom_id,
      data.data.custom_id,
      "f",
    );
    /**
     * The message which the button belongs to.
     * @type {Message}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _ButtonClick_message,
      new Message(
        __classPrivateFieldGet(this, _ButtonClick__client, "f"),
        data.message,
        {
          channelId,
          guildId,
        },
      ),
      "f",
    );
  }
  /**
   * The custom id of the button.
   * @type {String}
   * @readonly
   * @public
   */
  get customId() {
    return __classPrivateFieldGet(this, _ButtonClick_custom_id, "f");
  }
  /**
   * The message which the button belongs to.
   * @type {Message}
   * @readonly
   * @public
   * @see {@link Message}
   */
  get message() {
    return __classPrivateFieldGet(this, _ButtonClick_message, "f");
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<ButtonClick: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_ButtonClick__client = new WeakMap()),
  (_ButtonClick_custom_id = new WeakMap()),
  (_ButtonClick_message = new WeakMap()),
  util.inspect.custom)]() {
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
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.CACHE_FORMAT: {
        return {
          ...super.toJSON(format),
          data: {
            custom_id: this.customId,
          },
          message: this.message.toJSON(format),
          member: this.member ? this.member.toJSON(format) : null,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          data: {
            custom_id: this.customId,
          },
          message: this.message.toJSON(format),
          member: this.member ? this.member.toJSON(format) : null,
        };
      }
    }
  }
}
export default ButtonClick;
//# sourceMappingURL=ButtonClick.js.map
