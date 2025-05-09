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
  get type(): import("#typings/discord.js").OverwriteType;
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
    type: import("#typings/discord.js").OverwriteType;
    allow: string;
    deny: string;
  };
}
export default PermissionOverwrite;
