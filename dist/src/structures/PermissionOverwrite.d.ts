import util from "util";
declare class PermissionOverwrite {
  #private;
  /**
   * Creates the structure for a permission overwrite.
   * @param {Client} client The client instance.
   * @param {Object} data The raw permission overwrite data.
   */
  constructor(client: any, data: any);
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
  get type(): any;
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
  toJSON(format: any): {
    id: string;
    type: any;
    allow: string;
    deny: string;
  };
}
export default PermissionOverwrite;
