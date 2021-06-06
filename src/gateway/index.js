const WebSocket = require("ws");
const erlpack = require("erlpack");
const Heartbeat = require("./structures/_1");
const Identify = require("./structures/_2");
const { EVENTS } = require("../constants");

class WS {

    constructor(client, url, shard) {

        this.token = client.token;
        this.shard = shard;

        this.ws = new WebSocket(url);
        this.request = client.request;

        this.client = client;

        this.sessionId = null;

        this.isInitialHeartbeat = true;

        this.ws.on("open", () => {

            console.log(`Websocket opened for shard ${this.shard[0]}`);

        });

        this.ws.on("close", data => {

            console.log(`Websocket for shard ${this.shard[0]} closed with code ${data}`);

        });

        this.ws.on("message", data => {
            
            if (!Buffer.isBuffer(data)) data = Buffer.from(new Uint8Array(data));
            
            this.handleIncoming(erlpack.unpack(data));

        });

    }

    handleIncoming(data) {
        console.log(data);
        if (!data) return;
        
        switch (data.op) {
            // Dispatch
            case 0: {

                this.handleEvent(data.t, data.d);

                break;

            }
            // Heartbeat
            case 1: {

                this.ws.send(new Heartbeat(data.s));

                break;

            }
            // Reconnect
            case 7: {

                break;

            }
            // Invalid Session
            case 9: {

                break;

            }
            // Hello
            case 10: {
                
                this.ws.send(new Heartbeat());

                setInterval((() => {

                    this.ws.send(new Heartbeat());

                }), data.d.heartbeat_interval);

                break;

            }
            // Heartbeat ACK
            case 11: {

                if (this.isInitialHeartbeat == true) {

                    this.isInitialHeartbeat = false;
                    
                    this.ws.send(new Identify(this.token, this.shard));

                }

                break;

            }

        }

    }

    handleEvent(type, data) {

        switch (type) {

            case "READY": {

                this.sessionId = data.session_id;

                this.client.user = data.user;
                
                this.client.emit(EVENTS.READY);

                break;

            }

            case "GUILD_CREATE": {

                

            }

        }

    }

    connect() {

    }

    reconnect() {

    }
}

module.exports = WS;