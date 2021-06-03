class WS {
    constructor(WebSocket, request) {
        this.WebsSocket = WebSocket;
        this.request = request;
    }

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