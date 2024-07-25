import { CDN_BASE_URL } from "../../constants.js";

/**
 * Returns the url to the user's avatar.
 * @param {BigInt | String} id The id of the user that the avatar belongs to.
 * @param {String} hash The hash of the avatar.
 * @returns {String}
 */
function getAvatarUrl(id, hash) {
  if (!id) throw new TypeError("GLUON: User id must be provided.");
  if (hash && typeof hash !== "string")
    throw new TypeError("GLUON: Avatar hash must be a string.");
  return hash
    ? // eslint-disable-next-line quotes
      `${CDN_BASE_URL}/avatars/${String(id)}/${hash}.${
        hash.startsWith("a_") == true ? "gif" : "png"
      }`
    : `${CDN_BASE_URL}/embed/avatars/${String((BigInt(id) >> 22n) % 6n)}.png`;
}

export default getAvatarUrl;
