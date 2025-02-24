/**
 * Combines multiple permissions into a single permission.
 * @param  {...String} permissions The permissions to combine.
 * @returns {String} The combined permissions.
 */
declare function combinePermissions(...permissions: string[]): string;
export default combinePermissions;
