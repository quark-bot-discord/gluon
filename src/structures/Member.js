const { CDN_BASE_URL } = require("../constants");
const User = require("./User");

class Member {

    constructor(client, data, user_id, guild_id) {

        this.client = client;

        if (data.user)
            new User(client, data.user);
        
        this.id = user_id;

        if (data.nick)
            this.nick = data.nick;

        this.joined_at = parseInt(new Date(data.joined_at).getTime() / 1000);

        this.deaf = data.deaf;

        this.mute = data.mute;

        if (data.pending == false)
            this.pending = data.pending;

        if (data.avatar)
            this.avatar = data.avatar;

        this.user = client.users.cache[user_id];

        this.guild = client.guilds.cache[guild_id];

        /* should check whether member actually *needs* to be cached */
        /* only really needed if serverlog or modlog is enabled, otherwise kinda irrelevant */
        this.client.guilds.cache[guild_id].members.cache[user_id] = this;

    }
    /* https://github.com/discord/discord-api-docs/pull/3081/files 👀 */
    get displayAvatarURL() {

        return this.avatar ? 
            `${CDN_BASE_URL}/guilds/${this.guild.id}/${this.user.id}/avatars/${this.avatar}.png` : 
            this.user.avatar ?
                `${CDN_BASE_URL}/avatars/${this.user.id}/${this.user.avatar}.png` :
                `${CDN_BASE_URL}/embed/avatars/${this.user.discriminator % 5}.png`;

    }

}

module.exports = Member;