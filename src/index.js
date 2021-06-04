const WebSocket = require("ws");
const Request = require("./rest/requestHandler");
const WS = require("./gateway/index");
const {BASE_URL, VERSION} = require('./constants');

class Client {

    constructor() {

        this.baseURL = BASE_URL;
        this.version = VERSION;

    }

    /**
     * Initiates the login sequence
     * @param {string} token The authorization token
     */
    login(token) {
        /* sets the token and starts logging the bot in to the gateway, shard by shard */
        this.token = token;

        this.request = new Request(this.baseURL, this.version, this.token);
        
        this.ws = new WS(WebSocket, this.request);
        this.ws.getGateway();

    }

}

module.exports = Client;