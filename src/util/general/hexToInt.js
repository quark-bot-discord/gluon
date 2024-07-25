function hexToInt(hex) {
  if (typeof hex !== "string")
    throw new TypeError("GLUON: Hex string must be a string.");
  if (!/^[0-9A-Fa-f]+$/.test(hex))
    throw new TypeError("GLUON: Hex string must be a valid hex string.");
  return parseInt(hex, 16);
}

module.exports = hexToInt;
