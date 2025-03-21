/**
 * Returns the escaped version of a string.
 * @param {String} str The string to escape.
 * @returns {String} The escaped string.
 */
export default function escapedString(str) {
  if (typeof str !== "string")
    throw new TypeError("GLUON: String must be provided.");
  return str.replace(/([\\`*_~])/g, "\\$1");
}
//# sourceMappingURL=escapedString.js.map
