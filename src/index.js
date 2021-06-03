const WebSocket = require("ws");
const Request = require("./request/index");
const WS = require("./gateway/index");

class Client {

    constructor() {

        this.baseURL = "https://discord.com/api";
        this.version = "9";

    }

    login(token) {
        
        this.token = token;

        this.request = new Request(this.baseURL, this.version, this.token);
        
        this.ws = new WS(WebSocket, this.request);
        this.ws.getGateway();

    }

}

module.exports = Client;