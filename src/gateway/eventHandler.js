const { EVENTS } = require("../constants");

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

        console.log(data);

    }

}

module.exports = EventHandler;