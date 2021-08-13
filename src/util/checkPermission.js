const { PERMISSIONS } = require("../constants");

function checkPermission(member, permission) {
    if (!permission)
        return true;
    if (member.guild?.owner_id == member.id)
        return true;
    member.permissions = BigInt(member.permissions);
    if ((member.permissions & PERMISSIONS.ADMINISTRATOR) == PERMISSIONS.ADMINISTRATOR)
        return true;
    return (member.permissions & permission) == permission;
}

module.exports = checkPermission;