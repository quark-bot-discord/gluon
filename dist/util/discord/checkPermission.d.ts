export default checkPermission;
/**
 * Checks if a set of permissions contains a specific permission.
 * @param {String} memberPermission The permissions to check.
 * @param {String} permission The permission to check for.
 * @param {Boolean?} adminOverride Whether the admin permission should be taken into consideration.
 * @returns {Boolean}
 */
declare function checkPermission(memberPermission: string, permission: string, adminOverride?: boolean | null): boolean;
//# sourceMappingURL=checkPermission.d.ts.map