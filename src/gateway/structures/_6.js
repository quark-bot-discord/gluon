class Resume {

    constructor(token, session_id, seq) {

        this.op = 6;

        return require("erlpack").pack({
            op: this.op,
            d: {
                token,
                session_id,
                seq
            }
        });

    }

}

module.exports = Resume;