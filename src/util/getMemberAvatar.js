const { CDN_BASE_URL } = require("../constants");

function getMemberAvatar(hash, id, guild_id) {
  return hash
    ? `${CDN_BASE_URL}/guilds/${guild_id}/users/${id}/avatars/${hash}.${hash.startsWith("a_") ? "gif" : "png"}`
    : null;
}

module.exports = getMemberAvatar;
