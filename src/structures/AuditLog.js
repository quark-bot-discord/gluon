class AuditLog {

    constructor(client, data) {

        this.client = client;

        this.id = data.id;

        this.target_id = data.target_id;

        this.executor_id = data.user_id;

        if (data.options) {

            if (data.options.channel_id)
                this.channel_id = data.options.channel_id;

            if (data.options.count)
                this.count = data.options.count;

        }

    }

}

module.exports = AuditLog;