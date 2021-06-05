const erlpack = require("erlpack");
const { NAME, CALCULATED_INTENTS } = require("../../constants");

class Identify {

    constructor(token, shard) {

        this.op = 2;

        return erlpack.pack({
            op: this.op,
            d: {
                token: token,
                properties: {
                    $os: "linux",
                    $browser: NAME,
                    $device: NAME
                },
                large_threshold: 250,
                shard: shard,
                presence: {
                    activities: [{
                        name: `Starting shard ${shard[0]}...`,
                        type: 0
                    }],
                    status: "online",
                    since: null,
                    afk: false
                },
                intents: CALCULATED_INTENTS
            }
        });

    }

}

module.exports = Identify;