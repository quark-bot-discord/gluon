import { PERMISSIONS } from "../../constants.js";

/**
 * Checks if a set of permissions contains a specific permission.
 * @param {String} memberPermission The permissions to check.
 * @param {String} permission The permission to check for.
 * @param {Boolean?} adminOverride Whether the admin permission should be taken into consideration.
 * @returns {Boolean}
 */
function checkPermission(
  memberPermission: string | null,
  permission: string,
  adminOverride = true,
) {
  if (typeof memberPermission != "string")
    throw new TypeError("GLUON: Permissions must be a String.");
  if (typeof permission != "string")
    throw new TypeError("GLUON: Permission must be a String.");
  if (
    adminOverride == true &&
    (BigInt(memberPermission) & BigInt(PERMISSIONS.ADMINISTRATOR)) ==
      BigInt(PERMISSIONS.ADMINISTRATOR)
  )
    return true;
  return (BigInt(memberPermission) & BigInt(permission)) == BigInt(permission);
}

export default checkPermission;
