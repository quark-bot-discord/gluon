/**
 * Returns the permissions of a member based on their roles.
 * @param {Role[]} roles An array of roles to check permissions for.
 * @returns {String} The permissions of the member.
 */
declare function checkMemberPermissions(roles: any): string;
export default checkMemberPermissions;
