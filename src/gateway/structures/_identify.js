const erlpack = require("erlpack");
const { NAME, CALCULATED_INTENTS, GLUON_VERSION } = require("../../constants");

function _identify(token, shard, intents = CALCULATED_INTENTS) {
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
