const { PERMISSIONS } = require("../constants");
const Channel = require("./Channel");
const Message = require("./Message");
const checkPermission = require("../util/checkPermission");

/**
 * Represents a text channel within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
 */
class TextChannel extends Channel {

    /**
     * Creates the structure for a text channel.
     * @param {Client} client The client instance.
     * @param {Object} data Raw channel data.
     * @param {String} guild_id The ID of the guild that this channel belongs to.
     * @param {Boolean?} nocache Whether this channel should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
     */
    constructor(client, data, guild_id, nocache = false) {

        super(client, data, guild_id);

        if (nocache == false && this.client.cacheChannels == true)
            this.guild?.channels.cache.set(data.id, this);

        if (data.messages)
            for (let i = 0; i < data.messages.length; i++)
                new Message(this.client, data.messages[i], this.id.toString(), guild_id);

    }

    /**
     * Bulk deletes all the message IDs provided.
     * @param {String[]} messages An array of message IDs, as strings.
     * @returns {void}
     */
    async bulkDelete(messages, { reason } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.MANAGE_MESSAGES))
            throw { status: 403, error: "The bot does not have the MANAGE_MESSAGES permission." };

        const body = {};

        body.messages = messages;

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        await this.client.request.makeRequest("postBulkDeleteMessages", [this.id], body);

    }

}

module.exports = TextChannel;