const { CDN_BASE_URL } = require("../../constants");

/**
 * Returns the avatar url of a user.
 * @param {BigInt | String} id The id of the user.
 * @param {BigInt | String} guild_id The id of the guild the user belongs to.
 * @param {String} hash The avatar hash of the user.
 * @returns {String}
 */
function getMemberAvatar(id, guild_id, hash) {
  if (!id) throw new TypeError("GLUON: Member id must be provided.");
  if (!guild_id) throw new TypeError("GLUON: Guild id must be provided.");
  if (hash && typeof hash !== "string")
    throw new TypeError("GLUON: Member avatar hash must be a string.");
  return hash
    ? `${CDN_BASE_URL}/guilds/${String(guild_id)}/users/${String(id)}/avatars/${hash}.${
        hash.startsWith("a_") ? "gif" : "png"
      }`
    : null;
}

module.exports = getMemberAvatar;
