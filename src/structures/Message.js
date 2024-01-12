const User = require("./User");
const Member = require("./Member");
const Attachment = require("./Attachment");
const { PERMISSIONS, GLUON_CACHING_OPTIONS } = require("../constants");
const checkPermission = require("../util/checkPermission");
const Sticker = require("./Sticker");
const getTimestamp = require("../util/getTimestampFromSnowflake");
const { inspect } = require("util");

/**
 * A message belonging to a channel within a guild.
 */
class Message {

    /**
     * Creates the structure for a message.
     * @constructor
     * @param {Client} client The client instance.
     * @param {Object} data Message data returned from Discord.
     * @param {String} channel_id The id of the channel that the message belongs to.
     * @param {String} guild_id The id of the guild that the channel belongs to.
     * @param {Boolean?} nocache Whether this message should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/channel#message-object}
     */
    constructor(client, data, channel_id, guild_id, nocache = false) {

        let onlyfiles = false;

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The guild that this message belongs to.
         * @type {Guild?}
         */
        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!this.guild)
            /**
             * The id of the guild that this message belongs to.
             * @type {BigInt?}
             */
            this.guild_id = BigInt(guild_id);

        /**
         * The channel that this message belongs to.
         * @type {Channel?}
         */
        this.channel = this.guild?.channels.cache.get(channel_id) || null;

        if (!this.channel)
            /**
             * The id of the channel that this message belongs to.
             * @type {BigInt?}
             */
            this.channel_id = BigInt(channel_id);

        const existing = this.channel?.messages.cache.get(data.id) || null;

        if (this.guild) {

            onlyfiles = ((this.guild._cache_options & GLUON_CACHING_OPTIONS.FILES_ONLY) == GLUON_CACHING_OPTIONS.FILES_ONLY);

            if (this.channel)
                nocache = ((this.guild._cache_options & GLUON_CACHING_OPTIONS.NO_MESSAGES) == GLUON_CACHING_OPTIONS.NO_MESSAGES) || ((this.channel._cache_options & GLUON_CACHING_OPTIONS.NO_MESSAGES) == GLUON_CACHING_OPTIONS.NO_MESSAGES);

        }

        /**
         * The id of the message.
         * @type {BigInt}
         */
        this.id = BigInt(data.id);

        // messages only ever need to be cached if logging is enabled
        // but this should always return a "refined" message, so commands can be handled
        if (data.author)
            /**
             * The message author.
             * @type {User?}
             */
            this.author = new User(this.client, data.author, !data.webhook_id || nocache, true);
        else if (existing && existing.author)
            this.author = existing.author;

        if (data.member)
            /**
             * The member who sent the message.
             * @type {Member?}
             */
            this.member = new Member(this.client, data.member, data.author.id, data.guild_id, data.author, nocache, true);
        else if (data.author)
            this.member = this.guild ? this.guild.members.cache.get(data.author.id) : null;
        else if (existing && existing.member)
            this.member = existing.member;

        // should only be stored if file logging is enabled
        /**
         * The message attachments.
         * @type {Attachment[]?}
         */
        this.attachments = [];
        if (data.attachments != undefined)
            for (let i = 0; i < data.attachments.length; i++)
                this.attachments.push(new Attachment(this.client, data.attachments[i]));
        else if (existing && existing.attachments)
            this.attachments = existing.attachments;

        /**
         * The message content.
         * @type {String?}
         */
        if (onlyfiles != true) {
            this.content = data.content;
            if (!this.content && existing && existing.content)
                this.content = existing.content;
            else if (!this.content)
                this.content = null;
        }

        /**
         * The message embeds.
         * @type {Object[]}
         */
        this.embeds = data.embeds;
        if (this.embeds == undefined && existing && existing.embeds != undefined)
            this.embeds = existing.embeds;
        else if (this.embeds == undefined)
            this.embeds = [];

        /**
         * Whether any users were mentioned within the message.
         * @type {Boolean}
         */
        this.mentions = data.mentions?.length != 0 || undefined;
        if (this.mentions == undefined && existing && existing.mentions != undefined)
            this.mentions = existing.mentions;
        else if (this.mentions == undefined)
            this.mentions = false;

        /**
         * Whether any roles were mentioned within the message.
         * @type {Boolean}
         */
        this.mention_roles = data.mention_roles?.length != 0 || undefined;
        if (this.mention_roles == undefined && existing && existing.mention_roles != undefined)
            this.mention_roles = existing.mention_roles;
        else if (this.mention_roles == undefined)
            this.mention_roles = false;

        /**
         * Whether everyone was mentioned within the message.
         * @type {Boolean}
         */
        this.mention_everyone = data.mention_everyone || undefined;
        if (this.mention_everyone == undefined && existing && existing.mention_everyone != undefined)
            this.mention_everyone = existing.mention_everyone;
        else if (this.mention_everyone == undefined)
            this.mention_everyone = false;

        /**
         * The message that this message references.
         * @type {Object}
         */
        this.reference = {};
        if (data.referenced_message)
            this.reference.message_id = BigInt(data.referenced_message.id);
        else if (existing && existing.reference?.message_id)
            this.reference.message_id = existing.reference.message_id;

        /**
         * The type of message.
         * @type {Number}
         */
        this.type = data.type;
        if (typeof this.type != "number" && existing && typeof existing.type == "number")
            this.type = existing.type;

        /**
         * The UNIX (seconds) timestamp for when this message was created.
         * @type {Number}
         */
        this.timestamp = getTimestamp(this.id);

        /**
         * Stickers sent with this message.
         * @type {Sticker[]}
         */
        this.sticker_items = [];
        if (data.sticker_items != undefined)
            for (let i = 0; i < data.sticker_items.length; i++)
                this.sticker_items.push(new Sticker(this.client, data.sticker_items[i]));
        else if (existing && existing.sticker_items != undefined)
            this.sticker_items = existing.sticker_items;

        if (this.author && this.author.bot != true && !data.webhook_id && nocache == false && this.client.cacheMessages == true) {
            this.channel?.messages.cache.set(data.id, this);
            if (!this.channel)
                this.client.emit("debug", `${this.guild?.id?.toString() || this.guild_id?.toString()} NO CHANNEL`);
        }

    }

    /**
     * Replies to the message.
     * @param {String} content The message content.
     * @param {Object} param1 Embeds, components and files to attach to the message.
     * @returns {Promise<Message>}
     * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
     */
    async reply(content, { embed, components, files } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.SEND_MESSAGES))
            return null;

        const body = {};

        if (content)
            body.content = content;
        if (embed)
            body.embeds = [embed.toJSON()];
        if (components)
            body.components = components.toJSON();
        if (files)
            body.files = files;

        body.message_reference = {
            message_id: this.id.toString(),
            channel_id: this.channel?.id.toString() || this.channel_id.toString(),
            guild_id: this.guild?.id.toString() || this.guild_id.toString()
        };

        const data = await this.client.request.makeRequest("postCreateMessage", [this.channel?.id || this.channel_id], body);

        return new Message(this.client, data, this.channel?.id.toString() || this.channel_id, this.guild?.id.toString() || this.guild_id);

    }

    /**
     * Edits the message, assuming it is sent by the client user.
     * @param {String} content The message content.
     * @param {Object} options Embeds and components to attach to the message.
     * @returns {Promise<Message>}
     * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
     */
    async edit(content, { embed, components } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.SEND_MESSAGES))
            return null;

        const body = {};

        if (content)
            body.content = content;
        if (embed)
            body.embeds = [embed.toJSON()];
        if (components)
            body.components = components.toJSON();

        if (this.referenced_message)
            body.message_reference = {
                message_id: this.id.toString(),
                channel_id: this.channel?.id.toString() || this.channel_id.toString(),
                guild_id: this.guild?.id.toString() || this.guild_id.toString()
            };

        const data = await this.client.request.makeRequest("patchEditMessage", [this.channel?.id || this.channel_id, this.id], body);

        return new Message(this.client, data, this.channel?.id.toString() || this.channel_id, this.guild?.id.toString() || this.guild_id);

    }

}

module.exports = Message;