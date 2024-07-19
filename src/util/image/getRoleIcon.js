const { CDN_BASE_URL } = require("../../constants");

/**
 * Returns the role icon url.
 * @param {BigInt | String} id The id of the role.
 * @param {String} hash The hash of the role icon.
 * @returns {String}
 */
function getRoleIcon(id, hash) {
  if (!id) throw new TypeError("GLUON: Role id must be provided.");
  if (hash && typeof hash !== "string") throw new TypeError("GLUON: Role icon hash must be a string.");
  return hash
    ? `${CDN_BASE_URL}/role-icons/${String(id)}/${hash}.${
        hash.startsWith("a_") ? "gif" : "png"
      }`
    : null;
}

module.exports = getRoleIcon;
