const erlpack = require("erlpack");

class Heartbeat {

    constructor(d) {

        this.op = 1;

        return erlpack.pack({
            op: this.op,
            d: d ? d : null
        });

    }

}

module.exports = Heartbeat;