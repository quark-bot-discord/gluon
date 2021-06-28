const Member = require("./Member");
const Message = require("./Message");
const User = require("./User");

class ButtonClick {

    constructor(client, data) {

        this.client = client;

        this.id = BigInt(data.id);

        this.type = data.type;

        this.custom_id = data.data.custom_id;

        this.guild = this.client.guilds.cache.get(data.guild_id);

        this.channel = this.guild.channels.cache.get(data.channel_id);

        if (data.member)
            this.member = new Member(this.client, data.member, data.member.user.id, this.guild.id.toString());

        if (data.user)
            this.user = new User(this.client, data.user);

        this.token = data.token;

        this.message = new Message(this.client, data.message, data.channel_id, data.guild_id, true);

    }

    async reply(content, { embed, components, quiet } = {}) {

        const body = {};

        body.type = 4;
        body.data = {};

        if (content)
            body.data.content = content;
        if (embed) 
            body.data.embed = embed.toJSON();
        if (components) 
            body.data.components = components.toJSON();
        if (quiet == true)
            body.data.flags = 64;

        try {

            await this.client.request.makeRequest("postInteractionResponse", [this.id, this.token], body);

        } catch (error) {

            this.client.error(error.stack.toString());
            throw error;

        }

    }

}

module.exports = ButtonClick;