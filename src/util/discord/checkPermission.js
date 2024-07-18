const { PERMISSIONS } = require("../../constants");

/**
 * Checks if a set of permissions contains a specific permission.
 * @param {BigInt} memberPermission The permissions to check.
 * @param {BigInt} permission The permission to check for.
 * @param {Boolean?} adminOverride Whether the admin permission should be taken into consideration.
 * @returns {Boolean}
 */
function checkPermission(memberPermission, permission, adminOverride = true) {
  if (typeof memberPermission != "bigint") throw new TypeError("GLUON: Permissions must be a BigInt.");
  if (typeof permission != "bigint")
    throw new TypeError("GLUON: Permission must be a BigInt.");
  if (
    adminOverride == true &&
    (memberPermission & PERMISSIONS.ADMINISTRATOR) ==
      PERMISSIONS.ADMINISTRATOR
  )
    return true;
  return (memberPermission & permission) == permission;
}

module.exports = checkPermission;
