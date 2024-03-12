const erlpack = require("erlpack");

class RequestGuildMembers {

    constructor(guild_id, query = "", limit = 0, presences = false, user_ids, nonce) {

        this.op = 8;

        return erlpack.pack({
            op: this.op,
            d: {
                guild_id,
                query,
                limit,
                presences,
                user_ids,
                nonce
            }
        });

    }

}

module.exports = RequestGuildMembers;