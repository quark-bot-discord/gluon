const User = require("./User");

class Member {

    constructor(client, data, user_id, guild_id) {

        this.client = client;

        if (data.user)
            new User(client, data.user);
        /* should check whether member actually *needs* to be cached */
        /* only really needed if serverlog or modlog is enabled, otherwise kinda irrelevant */
        this.id = user_id;

        if (data.nick)
            this.nick = data.nick;

        this.joined_at = parseInt(new Date(data.joined_at).getTime() / 1000);

        this.deaf = data.deaf;

        this.mute = data.mute;

        if (data.pending == false)
            this.pending = data.pending;

        this.user = client.users.cache[user_id];

        this.guild = client.guilds.cache[guild_id];

        this.client.guilds.cache[guild_id].members.cache[user_id] = this;

    }

}

module.exports = Member;