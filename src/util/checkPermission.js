function checkPermission(member, permission) {
    if (!member.permissions || !permission)
        return true;
    return (member.permissions & permission) == permission;
}

module.exports = checkPermission;