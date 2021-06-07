const erlpack = require("erlpack");

class Resume {

    constructor(token, session_id, seq) {

        this.op = 6;

        return erlpack.pack({
            op: this.op,
            d: {
                token: token,
                session_id: session_id,
                seq: seq
            }
        });

    }

}

module.exports = Resume;