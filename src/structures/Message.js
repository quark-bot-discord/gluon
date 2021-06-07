const User = require("./User");
const Member = require("./Member");

class Message {

    constructor(client, data) {
        // messages only ever need to be cached if logging is enabled
        // but this should always return a "refined" message, so commands can be handled
        new User(client, data.author);

        new Member(client, data.member, data.author.id, data.guild_id);

        this.id = data.id;

        this.attachments = data.attachments;

        this.author = data.author.id;

        this.content = data.content || null;

        this.embeds = data.embeds;

        this.mentions = data.mentions;

        this.mention_roles = [];

        this.referenced_message = data.referenced_message;

        this.timestamp = parseInt(new Date(data.timestamp).getTime() / 1000);

        client.guilds.cache[data.guild_id].channels.cache[data.channel_id].messages.cache[this.id] = this;

    }

}

module.exports = Message;