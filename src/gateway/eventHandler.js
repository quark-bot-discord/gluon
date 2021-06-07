const { EVENTS } = require("../constants");
const Guild = require("../structures/Guild");
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

        const message = new Message(this.client, data);

        this.client.emit(EVENTS.MESSAGE_CREATE, message);

    }

}

module.exports = EventHandler;