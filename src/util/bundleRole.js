function bundleRole(role) {
    const data = {};
    data.id = role.id.toString();
    data.name = role.name;
    data.color = role.color;
    data.position = role.position;
    data.permissions = role.permissions.toString();
    data._attributes = role._attributes;
    data.tags = role.tags;
    return data;
}

module.exports = bundleRole;