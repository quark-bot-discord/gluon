const { CDN_BASE_URL } = require("../../constants");

/**
 * Returns the image url for a guild event.
 * @param {BigInt | String} id The id of the event.
 * @param {String} hash The hash of the event image.
 * @returns {String | null}
 */
function getEventImage(id, hash) {
  if (!id) throw new TypeError("GLUON: Event id must be provided.");
  if (hash && typeof hash !== "string")
    throw new TypeError("GLUON: Event hash must be a string.");
  return hash
    ? `${CDN_BASE_URL}/guild-events/${String(id)}/${hash}.${
        hash.startsWith("a_") ? "gif" : "png"
      }`
    : null;
}

module.exports = getEventImage;
