const erlpack = require("erlpack");
const { NAME, CALCULATED_INTENTS } = require("../../constants");

class Identify {

    constructor(token, shard, intents = CALCULATED_INTENTS) {

        this.op = 2;

        return erlpack.pack({
            op: this.op,
            d: {
                token,
                properties: {
                    os: "linux",
                    browser: `${NAME} (${require("../../../package.json").version})`,
                    device: `${NAME} (${require("../../../package.json").version})`
                },
                large_threshold: 250,
                shard,
                presence: {
                    activities: [{
                        name: `Starting shard ${shard[0]}...`,
                        type: 0
                    }],
                    status: "idle",
                    since: null,
                    afk: true
                },
                intents
            }
        });

    }

}

module.exports = Identify;