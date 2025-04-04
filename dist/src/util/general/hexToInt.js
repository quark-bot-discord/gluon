/**
 * Returns the integer representation of a hex string.
 * @param {String} hex The hex string to convert to an integer.
 * @returns {Number}
 */
function hexToInt(hex) {
  if (typeof hex !== "string")
    throw new TypeError("GLUON: Hex string must be a string.");
  if (hex.startsWith("0x")) hex = hex.slice(2);
  else if (hex.startsWith("#")) hex = hex.slice(1);
  if (!/^[0-9A-Fa-f]+$/.test(hex))
    throw new TypeError("GLUON: Hex string must be a valid hex string.");
  return parseInt(hex, 16);
}
export default hexToInt;
//# sourceMappingURL=hexToInt.js.map
