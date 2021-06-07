const User = require("./User");
const Member = require("./Member");

class Message {

    constructor(client, data) {

        this.client = client;

        // messages only ever need to be cached if logging is enabled
        // but this should always return a "refined" message, so commands can be handled
        new User(client, data.author);

        new Member(client, data.member, data.author.id, data.guild_id);

        this.id = data.id;
        // should only be stored if file logging is enabled
        if (data.attachments.length != 0)
            this.attachments = data.attachments;

        this.author = data.author.id;

        this.content = data.content || null;

        if (data.embeds.length != 0)
            this.embeds = data.embeds;

        if (data.mentions.length != 0)
            this.mentions = data.mentions;

        if (data.mention_roles.length != 0)
            this.mention_roles = data.mention_roles;

        if (data.referenced_message)
            this.referenced_message = data.referenced_message;

        this.timestamp = parseInt(new Date(data.timestamp).getTime() / 1000);

        this.channel = client.guilds.cache[data.guild_id].channels.cache[data.channel_id];

        client.guilds.cache[data.guild_id].channels.cache[data.channel_id].messages.cache[this.id] = this;

    }

}

module.exports = Message;