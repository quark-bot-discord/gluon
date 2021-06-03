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
        // this.request.addRequest(gateway.getGatewayBot);
        // this.request.addRequest(gateway.getGatewayBot);
        // this.request.addRequest(gateway.getGatewayBot);
        // this.request.addRequest(gateway.getGatewayBot);
        // this.request.addRequest(gateway.getGatewayBot);
        console.log("getGatewayBot");

    }

    connect() {

    }

    reconnect() {

    }
}

module.exports = WS;