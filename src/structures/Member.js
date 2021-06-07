class Member {

    constructor(client, data, user_id, guild_id) {

        this.id = user_id;

        if (data.nick)
            this.nick = data.nick;

        this.joined_at = parseInt(new Date(data.joined_at).getTime() / 1000);

        this.deaf = data.deaf;

        this.mute = data.mute;

        if (data.pending == false)
            this.pending = data.pending;

        client.guilds.cache[guild_id].members.cache[user_id] = this;

    }

}

module.exports = Member;