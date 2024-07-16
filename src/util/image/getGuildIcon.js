const { CDN_BASE_URL } = require("../constants");

function getGuildIcon(hash, id) {
  return hash
    ? `${CDN_BASE_URL}/icons/${id}/${hash}.${
        hash.startsWith("a_") ? "gif" : "png"
      }`
    : null;
}

module.exports = getGuildIcon;
