import Role from "../../structures/Role.js";

/**
 * Returns the permissions of a member based on their roles.
 * @param {Role[]} roles An array of roles to check permissions for.
 * @returns {String} The permissions of the member.
 */
function checkMemberPermissions(roles) {
  if (roles == undefined)
    throw new TypeError("GLUON: Member roles must be provided.");

  if (!Array.isArray(roles))
    throw new TypeError("GLUON: Member roles must be an array.");

  if (!roles.every((role) => role instanceof Role))
    throw new TypeError(
      "GLUON: Member roles must be an array of Role instances.",
    );

  let permissions = 0n;

  if (roles.length != 0) {
    for (let i = 0; i < roles.length; i++)
      permissions |= BigInt(roles[i].permissions);
    return String(permissions);
  } else return String(0n);
}

export default checkMemberPermissions;
