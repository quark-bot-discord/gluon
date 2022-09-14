function bundleRole(role) {
    const data = {};
    data.id = role.id.toString();
    data.position = role.position;
    data.permissions = role.permissions.toString();
    return data;
}

module.exports = bundleRole;