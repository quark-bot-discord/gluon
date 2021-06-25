const User = require("./User");
const Member = require("./Member");
const Attachment = require("./Attachment");

class Message {

    constructor(client, data, channel_id, guild_id, nocache = false) {

        this.client = client;

        // messages only ever need to be cached if logging is enabled
        // but this should always return a "refined" message, so commands can be handled
        if (data.author)
            this.author = new User(this.client, data.author, !data.webhook_id);

        if (data.member)
            this.member = new Member(this.client, data.member, data.author.id, data.guild_id, data.author, nocache);

        this.id = data.id;
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

        // When the message was created
        this.timestamp = parseInt(new Date(data.timestamp).getTime() / 1000);

        this.channel = this.client.guilds.cache.get(guild_id).channels.cache.get(channel_id);
        
        this.guild = this.client.guilds.cache.get(guild_id);

        if (this.author.bot != true && !data.webhook_id && nocache == false && this.client.cacheMessages == true)
            this.guild.channels.cache.get(channel_id).messages.cache.set(this.id, this);

    }
    /* https://discord.com/developers/docs/resources/channel#create-message */
    async reply(content, options = {}) {

        const body = {};

        if (content)
            body.content = content;
        if (options.embed)
            body.embed = options.embed.toJSON();
        if (options.components)
            body.components = options.components.toJSON();
        if (options.files)
            body.files = options.files;

        body.message_reference = {
            message_id: this.id,
            channel_id: this.channel.id,
            guild_id: this.guild.id
        };

        try {

            const data = await this.client.request.makeRequest("postCreateMessage", [this.channel.id], body);
            return new Message(this.client, data, this.channel.id, this.guild.id);

        } catch (error) {

            throw error;

        }

    }

    async edit(content, options = {}) {
       
        if (!this.client.user.id === this.author.id) throw Error("Can't edit another member's message.");
        const body = {};

        if (content)
            body.content = content;
        if (options.embed)
            body.embed = options.embed.toJSON();
        if (options.components)
            body.components = options.components.toJSON();
            
        if (this.referenced_message)
            body.message_reference = {
                message_id: this.id,
                channel_id: this.channel.id,
                guild_id: this.guild.id
            };

        try {

            const data = await this.client.request.makeRequest("patchEditMessage", [this.channel.id, this.id], body);
            return new Message(this.client, data, this.channel.id, this.guild.id);

        } catch (error) {

            throw error;

        }

    }

}

module.exports = Message;