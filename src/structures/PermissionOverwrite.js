import { TO_JSON_TYPES_ENUM } from "../constants.js";

class PermissionOverwrite {
  #_client;
  #_id;
  #type;
  #allow;
  #deny;
  constructor(client, data) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;
    /**
     * The id of the overwrite.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);
    /**
     * The type of the overwrite.
     * @type {String}
     * @private
     */
    this.#type = data.type;
    /**
     * The permissions for the overwrite.
     * @type {BigInt}
     * @private
     */
    this.#allow = BigInt(data.allow);
    /**
     * The denied permissions for the overwrite.
     * @type {BigInt}
     * @private
     */
    this.#deny = BigInt(data.deny);
  }

  /**
   * The ID of the overwrite.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The type of the overwrite. 0 for role, 1 for member.
   * @type {String}
   * @readonly
   * @public
   */
  get type() {
    return this.#type;
  }

  /**
   * The permissions for the overwrite.
   * @type {String}
   * @readonly
   * @public
   */
  get allow() {
    return String(this.#allow);
  }

  /**
   * The denied permissions for the overwrite.
   * @type {String}
   * @readonly
   * @public
   */
  get deny() {
    return String(this.#deny);
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<PermissionOverwrite: ${this.id}>`;
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} format The format to return the data in.
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
