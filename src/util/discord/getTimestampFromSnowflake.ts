/**
 * Gives the UNIX timestamp for when the snowflake was created.
 * @param {String} snowflake The snowflake (or id).
 * @returns {Number}
 */
function getTimestamp(snowflake: string): number {
  if (!snowflake) throw new TypeError("GLUON: Snowflake must be provided.");
  if (typeof snowflake !== "string")
    throw new TypeError("GLUON: Snowflake must be a string.");
  return ((Number(BigInt(snowflake) >> 22n) + 1420070400000) / 1000) | 0;
}

export default getTimestamp;
