function checkPermission(permissions, permission) {
    if (!permissions || !permission)
        return true;
    return (permissions & permission) == permission;
}

module.exports = checkPermission;