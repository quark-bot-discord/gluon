import ClientType from "src/interfaces/Client.js";
import util from "util";
import { APIOverwrite } from "discord-api-types/v10";
import {
  JsonTypes,
  PermissionOverwriteCacheJSON,
  PermissionOverwriteDiscordJSON,
  PermissionOverwriteStorageJSON,
  PermissionOverwrite as PermissionOverwriteType,
} from "../../typings/index.d.js";
declare class PermissionOverwrite implements PermissionOverwriteType {
  #private;
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
  );
  /**
   * The ID of the overwrite.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The type of the overwrite. 0 for role, 1 for member.
   * @type {String}
   * @readonly
   * @public
   */
  get type(): import("discord-api-types/v10").OverwriteType;
  /**
   * The permissions for the overwrite.
   * @type {String}
   * @readonly
   * @public
   */
  get allow(): string;
  /**
   * The denied permissions for the overwrite.
   * @type {String}
   * @readonly
   * @public
   */
  get deny(): string;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format: JsonTypes): {
    id: string;
    type: import("discord-api-types/v10").OverwriteType;
    allow: string;
    deny: string;
  };
}
export default PermissionOverwrite;
