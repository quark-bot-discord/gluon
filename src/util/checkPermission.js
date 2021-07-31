const { PERMISSIONS } = require("../constants");

function checkPermission(member, permission) {
    if (!member.permissions || !permission)
        return true;
    if ((member.permissions & PERMISSIONS.ADMINISTRATOR) == PERMISSIONS.ADMINISTRATOR)
        return true;
    return (member.permissions & permission) == permission;
}

module.exports = checkPermission;