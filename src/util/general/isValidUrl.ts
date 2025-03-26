/**
 * Checks if a URL is valid.
 * @param {String} url The URL to validate.
 * @returns {Boolean}
 */
function isValidUrl(url: string) {
  try {
    return Boolean(new URL(url));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    return false;
  }
}

export default isValidUrl;
