const User = require("./User");
const Member = require("./Member");
const Attachment = require("./Attachment");
const { PERMISSIONS } = require("../constants");

/**
 * A message belonging to a channel within a guild.
 */
class Message {

    /**
     * Creates the structure for a message.
     * @constructor
     * @param {Client} client The client instance.
     * @param {object} data Message data returned from Discord. {@link https://discord.com/developers/docs/resources/channel#message-object}
     * @param {string} channel_id The id of the channel that the message belongs to.
     * @param {string} guild_id The id of the guild that the channel belongs to.
     * @param {boolean?} nocache Whether this message should be cached or not.
     */
    constructor(client, data, channel_id, guild_id, nocache = false) {

        this.client = client;

        this.id = BigInt(data.id);

        // messages only ever need to be cached if logging is enabled
        // but this should always return a "refined" message, so commands can be handled
        if (data.author)
            this.author = new User(this.client, data.author, !data.webhook_id || nocache);

        if (data.member)
            this.member = new Member(this.client, data.member, data.author.id, data.guild_id, data.author, nocache);

        // should only be stored if file logging is enabled
        if (data.attachments) {
            this.attachments = [];
            for (let i = 0; i < data.attachments.length; i++)
                this.attachments.push(new Attachment(this.client, data.attachments[i]));
        }

        this.content = data.content || null;

        this.embeds = data.embeds;

        this.mentions = data.mentions;

        this.mention_roles = data.mention_roles;

        if (data.referenced_message) {

            this.reference = {};

            this.reference.message_id = data.referenced_message.id;

            if (data.referenced_message.channel_id)
                this.reference.channel_id = data.referenced_message.channel_id;

            if (data.referenced_message.guild_id)
                this.reference.guild_id = data.referenced_message.guild_id;

        }

        // when the message was created
        this.timestamp = (new Date(data.timestamp).getTime() / 1000) | 0;

        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!this.guild)
            this.guild_id = BigInt(guild_id);

        this.channel = this.guild?.channels.cache.get(channel_id) || null;

        if (!this.channel)
            this.channel_id = BigInt(channel_id);

        if (this.author && this.author.bot != true && !data.webhook_id && nocache == false && this.client.cacheMessages == true)
            this.guild.channels.cache.get(channel_id)?.messages.cache.set(data.id, this);

    }
    /* https://discord.com/developers/docs/resources/channel#create-message */
    async reply(content, { embed, components, files } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.SEND_MESSAGES))
            return null;

        const body = {};

        if (content)
            body.content = content;
        if (embed)
            body.embed = embed.toJSON();
        if (components)
            body.components = components.toJSON();
        if (files)
            body.files = files;

        body.message_reference = {
            message_id: this.id.toString(),
            channel_id: this.channel?.id.toString() || this.channel_id.toString(),
            guild_id: this.guild?.id.toString() || this.guild_id.toString()
        };

        try {

            const data = await this.client.request.makeRequest("postCreateMessage", [this.channel?.id || this.channel_id], body);
            return new Message(this.client, data, this.channel?.id.toString() || this.channel_id, this.guild?.id.toString() || this.guild_id);

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    async edit(content, { embed, components } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.SEND_MESSAGES))
            return null;

        const body = {};

        if (content)
            body.content = content;
        if (embed)
            body.embed = embed.toJSON();
        if (components)
            body.components = components.toJSON();

        if (this.referenced_message)
            body.message_reference = {
                message_id: this.id.toString(),
                channel_id: this.channel?.id.toString() || this.channel_id.toString(),
                guild_id: this.guild?.id.toString() || this.guild_id.toString()
            };

        try {

            const data = await this.client.request.makeRequest("patchEditMessage", [this.channel?.id || this.channel_id, this.id], body);
            return new Message(this.client, data, this.channel?.id.toString() || this.channel_id, this.guild?.id.toString() || this.guild_id);

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

}

module.exports = Message;