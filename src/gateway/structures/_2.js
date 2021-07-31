const { NAME, CALCULATED_INTENTS } = require("../../constants");

class Identify {

    constructor(token, shard, intents = CALCULATED_INTENTS) {

        this.op = 2;

        return require("erlpack").pack({
            op: this.op,
            d: {
                token,
                properties: {
                    $os: "linux",
                    /* Could potentially add this as a client option as setting this to specific values triggers there to be a mobile indicator */
                    $browser: NAME,
                    $device: NAME
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