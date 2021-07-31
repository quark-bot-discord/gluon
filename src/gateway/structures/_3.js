class UpdatePresence {

    constructor(name, type = 0, status = "online", afk = false, since = null) {

        this.op = 3;

        let activities = [];

        if (name)
            activities.push({
                name,
                type
            });

        return require("erlpack").pack({
            op: this.op,
            d: {
                since,
                activities,
                status,
                afk
            }
        });

    }

}

module.exports = UpdatePresence;