import { Role } from "#typings/index.js";

/**
 * Checks the permissions of a member based on their roles.
 *
 * @param {Role[]} roles - An array of roles assigned to the member.
 * @returns {string} A string representation of the combined permissions of the member.
 * @throws {TypeError} If the roles parameter is not provided or is not an array.
 */
function checkMemberPermissions(roles: Role[]): string {
  if (roles == undefined)
    throw new TypeError("GLUON: Member roles must be provided.");

  if (!Array.isArray(roles))
    throw new TypeError("GLUON: Member roles must be an array.");

  let permissions = 0n;

  if (roles.length != 0) {
    for (let i = 0; i < roles.length; i++)
      permissions |= BigInt(roles[i].permissions);
    return String(permissions);
  }
  return String(0n);
}

export default checkMemberPermissions;
