const User = require("./User");
const Member = require("./Member");

class Message {

    constructor(client, data, channel_id, guild_id) {

        this.client = client;

        // messages only ever need to be cached if logging is enabled
        // but this should always return a "refined" message, so commands can be handled
        if (data.author)
            this.author = new User(client, data.author);

        if (data.member)
            this.member = new Member(client, data.member, data.author.id, data.guild_id);

        this.id = data.id;
        // should only be stored if file logging is enabled
        if (data.attachments)
            this.attachments = data.attachments;

        this.content = data.content || null;

        if (data.embeds)
            this.embeds = data.embeds;

        if (data.mentions)
            this.mentions = data.mentions;

        if (data.mention_roles)
            this.mention_roles = data.mention_roles;

        if (data.referenced_message) {

            this.message_reference = {};

            this.message_reference.message_id = data.referenced_message.id;

            if (data.referenced_message.channel_id)
                this.message_reference.channel_id = data.referenced_message.channel_id;

            if (data.referenced_message.guild_id)
                this.message_reference.guild_id = data.referenced_message.guild_id;

        }

        if (data.timestamp)
            this.timestamp = parseInt(new Date(data.timestamp).getTime() / 1000);

        this.channel = client.guilds.cache[guild_id].channels.cache[channel_id];

        this.guild = client.guilds.cache[guild_id];

        client.guilds.cache[guild_id].channels.cache[channel_id].messages.cache[this.id] = this;

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