const { PERMISSIONS } = require("../constants");
const ChannelMessageManager = require("../managers/ChannelMessageManager");
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
     * @constructor
     * @param {Client} client The client instance.
     * @param {Object} data Raw channel data.
     * @param {String} guild_id The ID of the guild that this channel belongs to.
     * @param {Boolean?} nocache Whether this channel should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
     */
    constructor(client, data, guild_id, nocache = false) {

        super(client, data, guild_id);

        const existing = client.guilds.cache.get(guild_id)?.channels.cache.get(data.id) || null;

        /**
         * The message manager for this channel.
         * @type {ChannelMessageManager}
         */
        this.messages = existing && existing.messages && existing.messages.cache ? existing.messages : new ChannelMessageManager(client, this);

        if (nocache == false && this.client.cacheChannels == true)
            this.guild?.channels.cache.set(data.id, this);

        if (data.messages)
            for (let i = 0; i < data.messages.length; i++)
                new Message(this.client, data.messages[i], this.id.toString(), guild_id);

    }

    /**
     * Sends a message to this channel.
     * @param {String} content The message content.
     * @param {Object} param1 Embeds, components and files to include with the message.
     * @returns {Promise<Message>}
     * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
     */
    async send(content, { embed, components, files, embeds } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.SEND_MESSAGES))
            return null;

        const body = {};

        if (content)
            body.content = content;

        if (embed)
            body.embeds = [embed.toJSON()];
        else if (embeds && embeds.length != 0)
            body.embeds = embeds.map(e => e.toJSON());
        if (components)
            body.components = components.toJSON();
        if (files)
            body.files = files;

        const data = await this.client.request.makeRequest("postCreateMessage", [this.id], body);

        return new Message(this.client, data, this.id.toString(), this.guild?.id.toString() || this.guild_id.toString(), false);

    }

    /**
     * Bulk deletes all the message IDs provided.
     * @param {String[]} messages An array of message IDs, as strings.
     * @returns {void}
     */
    async bulkDelete(messages) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.MANAGE_MESSAGES))
            return null;

        const body = {};

        body.messages = messages;

        await this.client.request.makeRequest("postBulkDeleteMessages", [this.id], body);

    }

}

module.exports = TextChannel;