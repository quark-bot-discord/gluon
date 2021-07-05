const Member = require("./Member");

class Interaction {

    constructor(client, data) {

        this.client = client;

        this.id = BigInt(data.id);

        this.type = data.type;

        this.guild = this.client.guilds.cache.get(data.guild_id) || null;

        if (!this.guild)
            this.guild_id = BigInt(data.guild_id);

        this.channel = this.guild?.channels.cache.get(data.channel_id) || null;

        if (!this.channel)
            this.channel_id = BigInt(data.channel_id);

        if (data.member)
            this.member = new Member(this.client, data.member, data.member.user.id, data.guild_id);

        this.token = data.token;

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

            this.client.error(error.stack?.toString() || JSON.parse(error) || error.toString());
            throw error;

        }

    }

}

module.exports = Interaction;