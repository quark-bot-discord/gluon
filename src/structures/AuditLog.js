const User = require("./User");

class AuditLog {

    constructor(client, data, users) {

        this.client = client;

        this.id = BigInt(data.id);

        this.target_id = data.target_id ? BigInt(data.target_id) : null;

        if (users && users.length != 0 && this.target_id) {
            const user = users.find(u => u.id == this.target_id);
            this.target = new User(this.client, user);
        }

        this.executor_id = data.user_id ? BigInt(data.user_id) : null;

        if (users && users.length != 0 && this.executor_id) {
            const user = users.find(u => u.id == this.executor_id);
            this.executor = new User(this.client, user);
        }

        this.reason = data.reason || null;

        if (data.options) {

            if (data.options.channel_id)
                this.channel_id = BigInt(data.options.channel_id);

            if (data.options.count)
                this.count = parseInt(data.options.count);

        }

    }

}

module.exports = AuditLog;