const WebSocket = require("ws");
const erlpack = require("erlpack");
const Heartbeat = require("./structures/_1");
const Identify = require("./structures/_2");

class WS {

    constructor(request, url, shard, token) {

        this.token = token;
        this.shard = shard;

        this.ws = new WebSocket(url);
        this.request = request;

        this.isInitialHeartbeat = true;

        this.ws.on("open", () => {

            console.log(`Websocket opened for shard ${shard[0]}`);

        });

        this.ws.on("close", data => {

            console.log(`Websocket for shard ${shard[0]} closed with code ${data}`);

        });

        this.ws.on("message", data => {
            
            if (!Buffer.isBuffer(data)) data = Buffer.from(new Uint8Array(data));
            
            this.handleIncoming(erlpack.unpack(data));

        });

    }

    handleIncoming(data) {
        console.log(1);
        console.log(data);
        if (!data) return;
        
        switch (data.op) {
            // Dispatch
            case 0: {

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
                    console.log(erlpack.unpack(new Identify(this.token, this.shard)));
                    this.ws.send(new Identify(this.token, this.shard));

                }

                break;

            }

        }

    }

    connect() {

    }

    reconnect() {

    }
}

module.exports = WS;