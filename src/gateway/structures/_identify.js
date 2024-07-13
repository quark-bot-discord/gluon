const erlpack = require("erlpack");
const { NAME, CALCULATED_INTENTS } = require("../../constants");

function _identify(token, shard, intents = CALCULATED_INTENTS) {
  return erlpack.pack({
    op: 2,
    d: {
      token,
      properties: {
        os: "linux",
        browser: `${NAME} (${require("../../../package.json").version})`,
        device: `${NAME} (${require("../../../package.json").version})`,
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
