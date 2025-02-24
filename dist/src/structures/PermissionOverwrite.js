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
var _PermissionOverwrite__client,
  _PermissionOverwrite__id,
  _PermissionOverwrite_type,
  _PermissionOverwrite_allow,
  _PermissionOverwrite_deny;
import Client from "../Client.js";
import { TO_JSON_TYPES_ENUM } from "../constants.js";
import util from "util";
class PermissionOverwrite {
  /**
   * Creates the structure for a permission overwrite.
   * @param {Client} client The client instance.
   * @param {Object} data The raw permission overwrite data.
   */
  constructor(client, data) {
    _PermissionOverwrite__client.set(this, void 0);
    _PermissionOverwrite__id.set(this, void 0);
    _PermissionOverwrite_type.set(this, void 0);
    _PermissionOverwrite_allow.set(this, void 0);
    _PermissionOverwrite_deny.set(this, void 0);
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _PermissionOverwrite__client, client, "f");
    /**
     * The id of the overwrite.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _PermissionOverwrite__id,
      BigInt(data.id),
      "f",
    );
    /**
     * The type of the overwrite.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _PermissionOverwrite_type, data.type, "f");
    /**
     * The permissions for the overwrite.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _PermissionOverwrite_allow,
      BigInt(data.allow),
      "f",
    );
    /**
     * The denied permissions for the overwrite.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _PermissionOverwrite_deny,
      BigInt(data.deny),
      "f",
    );
  }
  /**
   * The ID of the overwrite.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _PermissionOverwrite__id, "f"));
  }
  /**
   * The type of the overwrite. 0 for role, 1 for member.
   * @type {String}
   * @readonly
   * @public
   */
  get type() {
    return __classPrivateFieldGet(this, _PermissionOverwrite_type, "f");
  }
  /**
   * The permissions for the overwrite.
   * @type {String}
   * @readonly
   * @public
   */
  get allow() {
    return String(
      __classPrivateFieldGet(this, _PermissionOverwrite_allow, "f"),
    );
  }
  /**
   * The denied permissions for the overwrite.
   * @type {String}
   * @readonly
   * @public
   */
  get deny() {
    return String(__classPrivateFieldGet(this, _PermissionOverwrite_deny, "f"));
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<PermissionOverwrite: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_PermissionOverwrite__client = new WeakMap()),
  (_PermissionOverwrite__id = new WeakMap()),
  (_PermissionOverwrite_type = new WeakMap()),
  (_PermissionOverwrite_allow = new WeakMap()),
  (_PermissionOverwrite_deny = new WeakMap()),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          type: this.type,
          allow: this.allow,
          deny: this.deny,
        };
      }
    }
  }
}
export default PermissionOverwrite;
//# sourceMappingURL=PermissionOverwrite.js.map
