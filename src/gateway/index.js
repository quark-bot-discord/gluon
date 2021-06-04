class WS {

    constructor(WebSocket, request) {

        this.WebsSocket = WebSocket;
        this.request = request;

    }

    /**
     * Fetches the gateway info before connecting to the websocket
     */
    getGateway() {

        this.request.makeRequest("getGatewayBot")
            .then(res => {
                console.log(res);
            });
        this.request.makeRequest("getGatewayBot")
            .then(res => {
                console.log(res);
            });
        this.request.makeRequest("getGatewayBot")
            .then(res => {
                console.log(res);
            });
        this.request.makeRequest("getGatewayBot")
            .then(res => {
                console.log(res);
            });
        this.request.makeRequest("getGatewayBot")
            .then(res => {
                console.log(res);
            });
        this.request.makeRequest("getGatewayBot")
            .then(res => {
                console.log(res);
            });
        this.request.makeRequest("getGatewayBot")
            .then(res => {
                console.log(res);
            });
        this.request.makeRequest("getGatewayBot")
            .then(res => {
                console.log(res);
            });

    }

    connect() {

    }

    reconnect() {

    }
}

module.exports = WS;