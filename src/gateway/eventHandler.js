const { EVENTS } = require("../constants");
const Guild = require("../structures/Guild");
const Member = require("../structures/Member");
const Message = require("../structures/Message");
const User = require("../structures/User");

class EventHandler {

    constructor(client, ws) {

        this.client = client;

        this.ws = ws;

    }

    READY(data) {

        this.ws.sessionId = data.session_id;

        const user = new User(this.client, data.user);
        
        this.client.user = user;
        
        this.client.emit(EVENTS.READY);

    }

    GUILD_CREATE(data) {

        if (data.unavailable == false) {

            new Guild(this.client, data);

        }

    }

    MESSAGE_CREATE(data) {

        const message = new Message(this.client, data, data.channel_id, data.guild_id);

        this.client.emit(EVENTS.MESSAGE_CREATE, message);

    }

    MESSAGE_UPDATE(data) {

        const oldMessage = this.client.guilds.cache.get(data.guild_id).channels.cache.get(data.channel_id).messages.cache.get(data.id) || null;
        const newMessage = new Message(this.client, data, data.channel_id, data.guild_id);
        this.client.emit(EVENTS.MESSAGE_UPDATE, oldMessage, newMessage);

    }

    MESSAGE_DELETE(data) {

        const message = this.client.guilds.cache.get(data.guild_id).channels.cache.get(data.channel_id).messages.cache.get(data.id) || null;
        this.client.guilds.cache.get(data.guild_id).channels.cache.get(data.channel_id).messages.cache.delete(data.id);
        this.client.emit(EVENTS.MESSAGE_DELETE, message);

    }

    GUILD_MEMBER_ADD(data) {

        new User(this.client, data.user);
        const member = new Member(this.client, data, data.user.id, data.guild_id);
        this.client.emit("guildMemberAdd", member);

    }

    GUILD_MEMBER_REMOVE(data) {



    }

}

module.exports = EventHandler;