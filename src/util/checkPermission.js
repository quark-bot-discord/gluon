const { PERMISSIONS } = require("../constants");

function checkPermission(member, permission, adminOverride = true) {
    if (!permission)
        return true;
    member.permissions = BigInt(member.permissions);
    if (adminOverride == true && (member.permissions & PERMISSIONS.ADMINISTRATOR) == PERMISSIONS.ADMINISTRATOR)
        return true;
    return (member.permissions & permission) == permission;
}

module.exports = checkPermission;