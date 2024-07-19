const { CDN_BASE_URL } = require("../../constants");

/**
 * Returns the guild icon url.
 * @param {BigInt | String} id The id of the guild.
 * @param {String} hash The hash of the guild icon.
 * @returns {String}
 */
function getGuildIcon(id, hash) {
  if (!id) throw new TypeError("GLUON: Guild id must be provided.");
  if (hash && typeof hash !== "string") throw new TypeError("GLUON: Guild icon hash must be a string.");
  return hash
    ? `${CDN_BASE_URL}/icons/${String(id)}/${String(hash)}.${
        hash.startsWith("a_") ? "gif" : "png"
      }`
    : null;
}

module.exports = getGuildIcon;
