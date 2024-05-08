const User = require("./User");
const Member = require("./Member");
const Attachment = require("./Attachment");
const { PERMISSIONS, GLUON_CACHING_OPTIONS } = require("../constants");
const checkPermission = require("../util/checkPermission");
const Sticker = require("./Sticker");
const getTimestamp = require("../util/getTimestampFromSnowflake");
const hash = require("hash.js");
const encryptMessage = require("../util/encryptMessage");
const MessagePollManager = require("../managers/MessagePollManager");

/**
 * A message belonging to a channel within a guild.
 */
class Message {

    /**
     * Creates the structure for a message.
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

        if (this.attachments.length == 0 && onlyfiles == true)
            nocache = true;

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
         * The message poll.
         * @type {Object?}
         */
        this.poll = data.poll;
        if (this.poll == undefined && existing && existing.poll != undefined)
            this.poll = existing.poll;
        else if (this.poll == undefined)
            this.poll = undefined;

        if (this.poll)
            this.pollResponses = new MessagePollManager(data.pollResponses);

        /**
         * The message embeds.
         * @type {Object[]}
         */
        this.embeds = data.embeds;
        if (this.embeds == undefined && existing && existing.embeds != undefined)
            this.embeds = existing.embeds;
        else if (this.embeds == undefined)
            this.embeds = [];

        this._attributes = data._attributes || 0;

        if (data.mentions && data.mentions.length != 0)
            this._attributes |= (0b1 << 0);
        else if (data.mentions == undefined && existing && existing.mentions == true)
            this._attributes |= (0b1 << 0);

        if (data.mention_roles && data.mentions.length != 0)
            this._attributes |= (0b1 << 1);
        else if (data.mention_roles == undefined && existing && existing.mention_roles == true)
            this._attributes |= (0b1 << 1);

        if (data.mention_everyone != undefined && data.mention_everyone == true)
            this._attributes |= (0b1 << 2);
        else if (data.mention_everyone == undefined && existing && existing.mention_everyone == true)
            this._attributes |= (0b1 << 2);

        if (data.pinned != undefined && data.pinned == true)
            this._attributes |= (0b1 << 3);
        else if (data.pinned == undefined && existing && existing.pinned == true)
            this._attributes |= (0b1 << 3);

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
         * The id of the webhook this message is from.
         * @type {BigInt?}
         */
        if (data.webhook_id)
            this.webhook_id = BigInt(data.webhook_id);
        else if (existing && existing.webhook_id)
            this.webhook_id = existing.webhook_id;

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

        /**
         * The snapshot data about the message.
         * @type {Object?}
         */
        if (data.message_snapshots)
            this.message_snapshots = data.message_snapshots;
        else if (existing && existing.message_snapshots != undefined)
            this.message_snapshots = existing.message_snapshots;

        /* this.author && this.author.bot != true && !data.webhook_id && */
        if (nocache == false && this.client.cacheMessages == true) {
            this.channel?.messages.cache.set(data.id, this);
            if (!this.channel)
                this.client.emit("debug", `${this.guild?.id?.toString() || this.guild_id?.toString()} NO CHANNEL`);
        }

    }

    /**
     * Whether this message includes user mentions.
     * @readonly
     * @type {Boolean}
     */
    get mentions() {

        return (this._attributes & (0b1 << 0)) == (0b1 << 0);

    }

    /**
     * Whether this message includes role mentions.
     * @readonly
     * @type {Boolean}
     */
    get mention_roles() {

        return (this._attributes & (0b1 << 1)) == (0b1 << 1);

    }

    /**
     * Whether this message mentions everyone.
     * @readonly
     * @type {Boolean}
     */
    get mention_everyone() {

        return (this._attributes & (0b1 << 2)) == (0b1 << 2);

    }

    /**
     * Whether this message has been pinned.
     * @readonly
     * @type {Boolean}
     */
    get pinned() {

        return (this._attributes & (0b1 << 3)) == (0b1 << 3);

    }

    /**
     * The UNIX (seconds) timestamp for when this message was created.
     * @readonly
     * @type {Number}
     */
    get timestamp() {

        return getTimestamp(this.id);

    }

    /**
     * Replies to the message.
     * @param {String} content The message content.
     * @param {Object?} options Embeds, components and files to attach to the message.
     * @param {Embed?} options.embed Embed to send with the message.
     * @param {MessageComponents?} options.components Message components to send with the message.
     * @param {Array<Object>?} options.files Array of file objects for files to send with the message.
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
     * @param {Object?} options Embeds and components to attach to the message.
     * @param {Embed?} options.embed Embed to send with the message.
     * @param {MessageComponents?} options.components Message components to send with the message.
     * @param {Array<Object>?} options.files Array of file objects for files to send with the message.
     * @returns {Promise<Message>}
     * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
     */
    async edit(content, { embed, components, files } = {}) {

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

        if (this.referenced_message)
            body.message_reference = {
                message_id: this.id.toString(),
                channel_id: this.channel?.id.toString() || this.channel_id.toString(),
                guild_id: this.guild?.id.toString() || this.guild_id.toString()
            };

        const data = await this.client.request.makeRequest("patchEditMessage", [this.channel?.id || this.channel_id, this.id], body);

        return new Message(this.client, data, this.channel?.id.toString() || this.channel_id, this.guild?.id.toString() || this.guild_id);

    }

    /**
     * Moves the message to long-term storage. 
     */
    shelf() {

        const encryptedMessage = encryptMessage(this);

        this.client.storage.setItem(hash.sha512().update(`${this.guild ? this.guild.id : this.guild_id}_${this.channel ? this.channel.id : this.channel_id}_${this.id}`).digest("hex"), encryptedMessage)
            .then(() => {

                this.channel.messages.cache.delete(this.id.toString());

            });

    }

}

module.exports = Message;
