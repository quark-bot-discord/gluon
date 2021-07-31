class Heartbeat {

    constructor(d) {

        this.op = 1;

        return require("erlpack").pack({
            op: this.op,
            d: d ? d : null
        });

    }

}

module.exports = Heartbeat;