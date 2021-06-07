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

        this.resuming = false;

        this.isInitialHeartbeat = true;

        this.hearbeatSetInterval = null;

        this.ws.on("open", () => {

            this.client.emit("debug", `Websocket opened for shard ${this.shard[0]}`);

            if (this.resuming == true)
                this.ws.send(new Resume(this.token, this.sessionId, this.s));

        });

        this.ws.on("close", data => {

            this.client.emit("debug", `Websocket for shard ${this.shard[0]} closed with code ${data}`);
        
        });

        this.ws.on("message", data => {

            if (!Buffer.isBuffer(data)) data = Buffer.from(new Uint8Array(data));
            
            this.handleIncoming(erlpack.unpack(data));

        });

        this.ws.on("error", data => {

            this.client.emit("error", `error: ${data}`);
            
        });

    }

    handleIncoming(data) {

        if (!data) return;

        if (data.s) this.s = data.s;

        this.client.emit("raw", data);

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

        this.resuming = true;

        this.ws = new WebSocket(this.url);
        
        this.client.emit("debug", `Shard ${this.shard[0]} reconnecting...`);

    }
}

module.exports = WS;