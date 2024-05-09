/**
 * Gives the UNIX timestamp for when the snowflake was created.
 * @param {BigInt | String} snowflake The snowflake (or id).
 * @returns {Number}
 */
function getTimestamp(snowflake) {

    return ((Number(BigInt(snowflake) >> 22n) + 1420070400000) / 1000) | 0;

}

module.exports = getTimestamp;