const User = require("./User");
const Member = require("./Member");

class Message {

    constructor(client, data) {

        this.client = client;

        // messages only ever need to be cached if logging is enabled
        // but this should always return a "refined" message, so commands can be handled
        if (data.author)
            this.author = new User(client, data.author);

        if (data.member)
            this.member = new Member(client, data.member, data.author.id, data.guild_id);

        this.id = data.id;
        // should only be stored if file logging is enabled
        if (data.attachments.length != 0)
            this.attachments = data.attachments;

        this.content = data.content || null;

        if (data.embeds.length != 0)
            this.embeds = data.embeds;

        if (data.mentions.length != 0)
            this.mentions = data.mentions;

        if (data.mention_roles.length != 0)
            this.mention_roles = data.mention_roles;

        if (data.referenced_message)
            this.referenced_message = data.referenced_message;

        if (data.timestamp)
            this.timestamp = parseInt(new Date(data.timestamp).getTime() / 1000);

        if (data.guild_id && data.channel_id) {

            this.channel = client.guilds.cache[data.guild_id].channels.cache[data.channel_id];

            this.guild = client.guilds.cache[data.guild_id];

            client.guilds.cache[data.guild_id].channels.cache[data.channel_id].messages.cache[this.id] = this;

        }

    }
    /* https://discord.com/developers/docs/resources/channel#create-message */
    async reply(content, options = {}) {

        const body = {};

        if (content) body.content = content;
        if (options.embed) body.embed = options.embed.toJSON();
        if (options.components) body.components = options.components.toJSON();
        
        body.message_reference = {
            message_id: this.id,
            channel_id: this.channel.id,
            guild_id: this.channel.guild.id
        };
        
        try {
            
            const data = await this.client.request.makeRequest("postCreateMessage", [this.channel.id], body);
            return new Message(this.client, data);

        } catch (error) {

            throw error;

        }

    }

}

module.exports = Message;