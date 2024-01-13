const { PERMISSIONS } = require("../constants");
const ChannelMessageManager = require("../managers/ChannelMessageManager");
const checkPermission = require("../util/checkPermission");
const Message = require("./Message");

/**
 * Represents a channel within Discord.
 * @see {@link https://discord.com/developers/docs/resources/channel}
 */
class Channel {

    /**
     * Creates the base structure for a channel.
     * @constructor
     * @param {Client} client The client instance.
     * @param {Object} data Raw channel data.
     * @param {String} guild_id The ID of the guild that this channel belongs to.
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure}
     */
    constructor(client, data, guild_id) {

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The id of the channel.
         * @type {BigInt}
         */
        this.id = BigInt(data.id);

        /**
         * The name of the channel.
         * @type {String}
         */
        this.name = data.name;

        /**
         * The guild that this channel belongs to.
         * @type {Guild?}
         */
        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!this.guild)
            /**
             * The ID of the guild that this channel belongs to.
             * @type {BigInt?}
             */
            this.guild_id = BigInt(guild_id);

        /**
         * The type of channel.
         * @type {Number}
         */
        this.type = data.type;

        const existing = this.guild?.channels.cache.get(data.id) || null;

        this._cache_options = existing ? existing._cache_options : 0;

        /**
         * The message manager for this channel.
         * @type {ChannelMessageManager}
         */
        this.messages = existing && existing.messages && existing.messages.cache ? existing.messages : new ChannelMessageManager(client, this);

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

}

module.exports = Channel;