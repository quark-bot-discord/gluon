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
var _OptionSelect__client,
  _OptionSelect_custom_id,
  _OptionSelect_message,
  _OptionSelect_values;
import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Interaction from "./Interaction.js";
import Message from "./Message.js";
import util from "util";
/**
 * Represents when an option is selected.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
class OptionSelect extends Interaction {
  /**
   * Creates an option selected interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this interaction belongs to.
   * @param {String} options.channelId The ID of the channel that this interaction belongs to.
   */
  constructor(client, data, { channelId, guildId }) {
    super(client, data);
    _OptionSelect__client.set(this, void 0);
    _OptionSelect_custom_id.set(this, void 0);
    _OptionSelect_message.set(this, void 0);
    _OptionSelect_values.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _OptionSelect__client, client, "f");
    /**
     * The custom id of the select menu.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _OptionSelect_custom_id,
      data.data.custom_id,
      "f",
    );
    /**
     * The message which the option belongs to.
     * @type {Message}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _OptionSelect_message,
      new Message(
        __classPrivateFieldGet(this, _OptionSelect__client, "f"),
        data.message,
        {
          channelId,
          guildId,
        },
      ),
      "f",
    );
    /**
     * The values selected from the select menu.
     * @type {Array<Object>}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
     * @private
     */
    __classPrivateFieldSet(this, _OptionSelect_values, data.data.values, "f");
  }
  /**
   * The custom id of the select menu.
   * @type {String}
   * @readonly
   * @public
   */
  get customId() {
    return __classPrivateFieldGet(this, _OptionSelect_custom_id, "f");
  }
  /**
   * The message which the option belongs to.
   * @type {Message}
   * @readonly
   * @public
   */
  get message() {
    return __classPrivateFieldGet(this, _OptionSelect_message, "f");
  }
  /**
   * The values selected from the select menu.
   * @type {Array<Object>}
   * @readonly
   * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
   * @public
   */
  get values() {
    return __classPrivateFieldGet(this, _OptionSelect_values, "f");
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<OptionSelect: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_OptionSelect__client = new WeakMap()),
  (_OptionSelect_custom_id = new WeakMap()),
  (_OptionSelect_message = new WeakMap()),
  (_OptionSelect_values = new WeakMap()),
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
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        return {
          ...super.toJSON(format),
          custom_id: this.customId,
          message: this.message.toJSON(format),
          values: this.values,
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          data: {
            custom_id: this.customId,
            values: this.values,
          },
          message: this.message.toJSON(format),
        };
      }
    }
  }
}
export default OptionSelect;
//# sourceMappingURL=OptionSelect.js.map
