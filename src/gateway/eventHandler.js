const { EVENTS } = require("../constants");
const Guild = require("../structures/Guild");

class EventHandler {

    constructor(client, ws) {

        this.client = client;

        this.ws = ws;

    }

    READY(data) {

        this.ws.sessionId = data.session_id;

        this.client.user = data.user;
        
        this.client.emit(EVENTS.READY);

    }

    GUILD_CREATE(data) {

        if (data.unavailable == false) {

            new Guild(this.client, data);

        }

    }

    MESSAGE_CREATE(data) {

        this.client.emit(EVENTS.MESSAGE_CREATE, data);

    }

}

module.exports = EventHandler;