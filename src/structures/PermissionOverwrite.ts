import util from "util";
import { APIOverwrite } from "#typings/discord.js";
import type {
  PermissionOverwriteCacheJSON,
  PermissionOverwriteDiscordJSON,
  PermissionOverwriteStorageJSON,
  PermissionOverwrite as PermissionOverwriteType,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { JsonTypes } from "../../typings/enums.js";

class PermissionOverwrite implements PermissionOverwriteType {
  // #_client;
  #_id;
  #type;
  #allow;
  #deny;
  /**
   * Creates the structure for a permission overwrite.
   * @param {Client} client The client instance.
   * @param {Object} data The raw permission overwrite data.
   */
  constructor(
    client: ClientType,
    data:
      | APIOverwrite
      | PermissionOverwriteCacheJSON
      | PermissionOverwriteDiscordJSON
      | PermissionOverwriteStorageJSON,
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    // this.#_client = client;
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
   * @method
   * @public
   */
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format: JsonTypes) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
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
