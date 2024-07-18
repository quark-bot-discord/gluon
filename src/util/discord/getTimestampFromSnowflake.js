/**
 * Gives the UNIX timestamp for when the snowflake was created.
 * @param {BigInt | String} snowflake The snowflake (or id).
 * @returns {Number}
 */
function getTimestamp(snowflake) {
  if (!snowflake) throw new TypeError("GLUON: Snowflake must be provided.");
  if (typeof snowflake != "bigint" && typeof snowflake != "string")
    throw new TypeError("GLUON: Snowflake must be a BigInt or string.");
  return ((Number(BigInt(snowflake) >> 22n) + 1420070400000) / 1000) | 0;
}

module.exports = getTimestamp;
