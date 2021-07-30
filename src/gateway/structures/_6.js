class Resume {

    constructor(erlpack, token, session_id, seq) {

        this.op = 6;

        return erlpack.pack({
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