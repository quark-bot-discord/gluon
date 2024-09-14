export default PermissionOverwrite;
declare class PermissionOverwrite {
    /**
     * Creates the structure for a permission overwrite.
     * @param {Client} client The client instance.
     * @param {Object} data The raw permission overwrite data.
     */
    constructor(client: Client, data: any);
    /**
     * The ID of the overwrite.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The type of the overwrite. 0 for role, 1 for member.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get type(): string;
    /**
     * The permissions for the overwrite.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get allow(): string;
    /**
     * The denied permissions for the overwrite.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get deny(): string;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} format The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format: number): any;
    #private;
}
import Client from "../Client.js";
//# sourceMappingURL=PermissionOverwrite.d.ts.map