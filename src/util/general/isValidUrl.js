/**
 * Checks if a URL is valid.
 * @param {String} url The URL to validate.
 * @returns {Boolean}
 */
function isValidUrl(url) {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
}

export default isValidUrl;
