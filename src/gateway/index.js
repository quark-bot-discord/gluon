const WebSocket = require("ws");
const erlpack = require("erlpack");
const Heartbeat = require("./structures/_1");
const Identify = require("./structures/_2");
const EventHandler = require("./eventHandler");
const Resume = require("./structures/_6");

class WS {

    constructor(client, url, shard) {

        this.token = client.token;
        this.shard = shard;

        this.url = url;

        this.ws = new WebSocket(url);
        this.request = client.request;

        this.client = client;

        this.eventHandler = new EventHandler(client, this);

        this.sessionId = null;
        this.s = null;

        this.isInitialHeartbeat = true;

        this.hearbeatSetInterval = null;

        this.ws.on("open", () => {

            console.log(`Websocket opened for shard ${this.shard[0]}`);

        });

        this.ws.on("close", data => {

            console.log(`Websocket for shard ${this.shard[0]} closed with code ${data}`);

        });

        this.ws.on("message", data => {
            console.log("message");
            if (!Buffer.isBuffer(data)) data = Buffer.from(new Uint8Array(data));
            
            this.handleIncoming(erlpack.unpack(data));

        });

        this.ws.on("error", data => {
            console.log("error");
            console.log(data);
        });

    }

    handleIncoming(data) {
        console.log(data);
        if (!data) return;
        if (data.s) this.s = data.s;
        switch (data.op) {
            // Dispatch
            case 0: {

                this.eventHandler[data.t](data.d);

                break;

            }
            // Heartbeat
            case 1: {

                this.ws.send(new Heartbeat(data.s));

                break;

            }
            // Reconnect
            case 7: {

                // reconnect to websocket with session id
                this.reconnect();

                break;

            }
            // Invalid Session
            case 9: {

                break;

            }
            // Hello
            case 10: {
                
                this.heartbeat();

                this.hearbeatSetInterval = setInterval((() => {

                    this.heartbeat();

                }), data.d.heartbeat_interval);

                break;

            }
            // Heartbeat ACK
            case 11: {

                if (this.isInitialHeartbeat == true) {

                    this.isInitialHeartbeat = false;
                    
                    this.identify();

                }

                break;

            }

        }

    }

    heartbeat() {

        this.ws.send(new Heartbeat());

    }

    identify() {

        this.ws.send(new Identify(this.token, this.shard));

    }

    reconnect() {

        clearInterval(this.hearbeatSetInterval);

        this.ws.terminate();

        this.ws = new WebSocket(this.url);
        console.log(`Shard ${this.shard[0]} reconnecting...`);
        this.ws.send(new Resume(this.token, this.sessionId, this.s));

    }
}

module.exports = WS;