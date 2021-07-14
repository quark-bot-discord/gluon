class AuditLog {

    constructor(client, data) {

        this.client = client;

        this.id = BigInt(data.id);

        this.target_id = data.target_id ? BigInt(data.target_id) : null;

        this.executor_id = data.user_id ? BigInt(data.user_id) : null;

        if (data.options) {

            if (data.options.channel_id)
                this.channel_id = BigInt(data.options.channel_id);

            if (data.options.count)
                this.count = data.options.count;

        }

    }

}

module.exports = AuditLog;