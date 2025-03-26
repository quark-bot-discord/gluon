import { Role } from "#typings/index.js";
/**
 * Checks the permissions of a member based on their roles.
 *
 * @param {Role[]} roles - An array of roles assigned to the member.
 * @returns {string} A string representation of the combined permissions of the member.
 * @throws {TypeError} If the roles parameter is not provided or is not an array.
 */
declare function checkMemberPermissions(roles: Role[]): string;
export default checkMemberPermissions;
