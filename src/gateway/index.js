class WS {

    constructor(WebSocket, request) {

        this.WebsSocket = WebSocket;
        this.request = request;
    
    }

    /**
     * Fetches the gateway info before connecting to the websocket
     */
    getGateway() {

        this.request.makeRequest("getGatewayBot");
        this.request.makeRequest("getGatewayBot");
        this.request.makeRequest("getGatewayBot");
        this.request.makeRequest("getGatewayBot");
        this.request.makeRequest("getGatewayBot");
        this.request.makeRequest("getGatewayBot");
        this.request.makeRequest("getGatewayBot");
        this.request.makeRequest("getGatewayBot");

    }

    connect() {

    }

    reconnect() {

    }
}

module.exports = WS;