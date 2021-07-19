function getTimestamp(snowflake) {
    return ((Number(snowflake >> 22n) + 1420070400000) / 1000) | 0;
}

module.exports = getTimestamp;