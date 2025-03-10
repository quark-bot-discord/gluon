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
var _ModalResponse_values, _ModalResponse_custom_id;
import Interaction from "./Interaction.js";
import util from "util";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents when a modal is submitted.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-interaction}
 * @extends {Interaction}
 */
class ModalResponse extends Interaction {
  /**
   * Creates a modal submitted interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client, data) {
    super(client, data);
    _ModalResponse_values.set(this, void 0);
    _ModalResponse_custom_id.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    /**
     * The custom id of the button.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _ModalResponse_custom_id,
      data.data.custom_id,
      "f",
    );
    /**
     * The entered modal values.
     * @type {Array<Object>}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _ModalResponse_values,
      data.data.components[0].components,
      "f",
    );
  }
  /**
   * The custom id of the modal.
   * @type {String}
   * @readonly
   * @public
   */
  get customId() {
    return __classPrivateFieldGet(this, _ModalResponse_custom_id, "f");
  }
  /**
   * The entered modal values.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get values() {
    return __classPrivateFieldGet(this, _ModalResponse_values, "f");
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<ModalResponse: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_ModalResponse_values = new WeakMap()),
  (_ModalResponse_custom_id = new WeakMap()),
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
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          ...super.toJSON(format),
          values: this.values,
          custom_id: this.customId,
          member: this.member ? this.member.toJSON(format) : null,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          data: {
            custom_id: this.customId,
            components: [
              {
                components: this.values,
              },
            ],
          },
          member: this.member ? this.member.toJSON(format) : null,
        };
      }
    }
  }
}
export default ModalResponse;
//# sourceMappingURL=ModalResponse.js.map
