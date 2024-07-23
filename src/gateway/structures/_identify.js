const erlpack = require("erlpack");
const { NAME, GLUON_VERSION } = require("../../constants");

/**
 * Creates an identify payload for the gateway.
 * @param {String} token The authorization token.
 * @param {Array<Number>} shard An array of shard ids which this process is managing.
 * @param {Number} intents The intents to use.
 * @returns {Buffer}
 */
function _identify(token, shard, intents) {
  if (typeof token !== "string")
    throw new TypeError("GLUON: Token must be a string.");
  if (!Array.isArray(shard))
    throw new TypeError("GLUON: Shard must be an array.");
  if (typeof intents !== "number")
    throw new TypeError("GLUON: Intents must be a number.");
  return erlpack.pack({
    op: 2,
    d: {
      token,
      properties: {
        os: "linux",
        browser: `${NAME} (${GLUON_VERSION})`,
        device: `${NAME} (${GLUON_VERSION})`,
      },
      large_threshold: 250,
      shard,
      presence: {
        activities: [
          {
            name: `Starting shard ${shard[0]}...`,
            type: 0,
          },
        ],
        status: "idle",
        since: null,
        afk: true,
      },
      intents,
    },
  });
}

module.exports = _identify;
