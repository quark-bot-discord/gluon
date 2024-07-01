const { CDN_BASE_URL } = require("../constants");

function getEventImage(hash, id) {
  return hash
    ? `${CDN_BASE_URL}/guild-events/${id}/${hash}.${hash.startsWith("a_") ? "gif" : "png"}`
    : null;
}

module.exports = getEventImage;
