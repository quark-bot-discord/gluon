const erlpack = require("erlpack");

class UpdatePresence {

    constructor(name, type = 0, status = "online", afk = false, since = null) {

        this.op = 3;

        return erlpack.pack({
            op: this.op,
            d: {
                since: since,
                activities: [{
                    name: name,
                    type: type
                }],
                status: status,
                afk: afk
            }
        });

    }

}

module.exports = UpdatePresence;