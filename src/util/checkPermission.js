const { PERMISSIONS } = require("../constants");

/**
 * Checks if a member has the given permission.
 * @param {Member} member The member to check.
 * @param {BigInt} permission The permission to check for.
 * @param {Boolean?} adminOverride Whether the admin permission should be taken into consideration.
 * @returns {Boolean}
 */
function checkPermission(member, permission, adminOverride = true) {
    if (!permission)
        return true;
    member.permissions = BigInt(member.permissions);
    if (adminOverride == true && (member.permissions & PERMISSIONS.ADMINISTRATOR) == PERMISSIONS.ADMINISTRATOR)
        return true;
    return (member.permissions & permission) == permission;
}

module.exports = checkPermission;