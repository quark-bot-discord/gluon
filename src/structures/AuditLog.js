const User = require("./User");

/**
 * Represents an audit log entry.
 */
class AuditLog {

    /**
     * 
     * @param {Client} client The client instance.
     * @param {Object} data Audit log data from Discord.
     * @param {Object[]} users Resolved users who are involved with the audit log entries. 
     */
    constructor(client, data, users) {

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The id of the audit log entry.
         * @type {BigInt}
         */
        this.id = BigInt(data.id);

        if (data.guild_id) {
            /**
             * The guild that this audit log belongs to.
             * @type {Guild?}
             */
            this.guild = this.client.guilds.cache.get(data.guild_id) || null;
        
            if (!this.guild)
                /**
                 * The ID of the guild that this audit log belongs to.
                 * @type {BigInt?}
                 */
                this.guild_id = BigInt(data.guild_id);
        }

        if (data.action_type)
            this.action_type = data.action_type;

        /**
         * The id of the target user.
         * @type {BigInt?}
         */
        this.target_id = data.target_id ? BigInt(data.target_id) : null;

        if (users && users.length != 0 && this.target_id) {
            const user = users.find(u => u.id == this.target_id);
            if (user)
                /**
                 * The resolved target user.
                 * @type {User?}
                 */
                this.target = new User(this.client, user);
        }

        /**
         * The id of the executor user.
         * @type {BigInt?}
         */
        this.executor_id = data.user_id ? BigInt(data.user_id) : null;

        if (users && users.length != 0 && this.executor_id) {
            const user = users.find(u => u.id == this.executor_id);
            if (user)
                /**
                 * The resolved executor user.
                 * @type {User?}
                 */
                this.executor = new User(this.client, user);
        }

        /**
         * The reason for this audit log entry.
         * @type {String?}
         */
        this.reason = data.reason || null;

        if (data.options) {

            if (data.options.channel_id)
                /**
                 * The channel id involved with this audit log entry.
                 * @type {BigInt?}
                 */
                this.channel_id = BigInt(data.options.channel_id);

            if (data.options.count)
                /**
                 * The count of this type of audit log entry.
                 * @type {Number?}
                 */
                this.count = parseInt(data.options.count);

            if (data.options.delete_member_days)
                this.delete_member_days = data.delete_member_days;

            if (data.options.members_removed)
                this.members_removed = data.members_removed;

        }

        if (data.changes)
            /**
             * The changes in this audit log entry.
             * @type {Object?}
             */
            this.changes = data.changes;

    }

    toJSON() {

        const noBigInt = {
            id: this.id.toString(),
            guild_id: this.guild ? this.guild.id.toString() : this.guild_id?.toString(),
            action_type: this.action_type,
            target_id: this.target_id?.toString(),
            executor_id: this.executor_id?.toString(),
            reason: this.reason,
            channel_id: this.channel_id?.toString(),
            count: this.count?.toString(),
            changes: this.changes
        };

        return JSON.stringify(noBigInt);

    }

}

module.exports = AuditLog;