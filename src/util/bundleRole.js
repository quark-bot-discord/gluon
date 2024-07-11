/**
 * Copies all the role data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for a role as the "data" parameter to reconstruct this.
 * @param {Role} role A role to bundle.
 * @returns {Object}
 */
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
