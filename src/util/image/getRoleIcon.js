const { CDN_BASE_URL } = require("../../constants");

function getRoleIcon(hash, id) {
  return hash
    ? `${CDN_BASE_URL}/role-icons/${id}/${hash}.${
        hash.startsWith("a_") ? "gif" : "png"
      }`
    : null;
}

module.exports = getRoleIcon;
