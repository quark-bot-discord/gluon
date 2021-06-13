const WebSocket = require("ws");
const erlpack = require("erlpack");
const ZlibSync = require("zlib-sync");
const Heartbeat = require("./structures/_1");
const Identify = require("./structures/_2");
const EventHandler = require("./eventHandler");
const Resume = require("./structures/_6");

class WS {

    constructor(client, url, shard) {

        this.token = client.token;
        this.shard = shard;

        this.url = url;

        this.client = client;

        this.ws = new WebSocket(url);
        this.request = this.client.request;

        this.eventHandler = new EventHandler(this.client, this);
        
        this.sessionId = null;
        this.s = null;

        this.resuming = false;

        this.isInitialHeartbeat = true;
        
        this.hearbeatSetInterval = null;

        this.zlib = new ZlibSync.Inflate({
            chunkSize: 128 * 1024
        });

        this.ws.on("open", () => {

            this.client.emit("debug", `[GLUON] [Shard: ${this.shard[0]}] => Websocket opened`);

            if (this.resuming == true)
                this.ws.send(new Resume(this.token, this.sessionId, this.s));

        });

        this.ws.on("close", data => {

            this.client.emit("debug", `[GLUON] [Shard: ${this.shard[0]}] => Websocket closed with code ${data}`);

            this.ws = new WebSocket(this.url);
        
        });

        this.ws.on("message", data => {
        /* Made with the help of https://github.com/abalabahaha/eris/blob/69f812c43cd8d9591d2ca455f7c8b672267a2ff6/lib/gateway/Shard.js#L2156 */
        if(data instanceof ArrayBuffer) {
             data = Buffer.from(data);
        } else if(Array.isArray(data)) { 
            data = Buffer.concat(data); 
        }
            if(data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xFFFF) {
                this.zlib.push(data, ZlibSync.Z_SYNC_FLUSH);
                    if(this.zlib.err) {
                        this.client.emit("error", `Error using zlib ${this.zlib.msg}`)
                        return;
                    }
    
                    data = Buffer.from(this.zlib.result);
                    return this.handleIncoming(erlpack.unpack(data));
             } else {
                this.zlib.push(data, false);
             }
        })

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

                try {

                    this.eventHandler[data.t](data.d);

                } catch (error) {
                    console.log(error);
                    this.client.emit("debug", `[GLUON] [Shard: ${this.shard[0]}] => Unknown event ${data.t}`);

                }

                break;

            }
            // Heartbeat
            case 1: {

                this.heartbeat();

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

                this.client.emit("debug", `[GLUON] [Shard: ${this.shard[0]}] => HELLO`);

                break;

            }
            // Heartbeat ACK
            case 11: {

                if (this.isInitialHeartbeat == true) {

                    this.isInitialHeartbeat = false;
                    
                    this.identify();

                }

                this.client.emit("debug", `[GLUON] [Shard: ${this.shard[0]}] => Hearbeat acknowledged`);

                break;

            }

        }

    }

    heartbeat() {

        this.client.emit("debug", `[GLUON] [Shard: ${this.shard[0]}] => Sending heartbeat...`);

        this.ws.send(new Heartbeat(this.s));

    }

    identify() {

        this.client.emit("debug", `[GLUON] [Shard: ${this.shard[0]}] => IDENTIFY`);

        this.ws.send(new Identify(this.token, this.shard));

    }

    reconnect() {

        clearInterval(this.hearbeatSetInterval);

        this.ws.terminate();

        this.resuming = true;
        
        this.client.emit("debug", `[GLUON] [Shard: ${this.shard[0]}] => Shard reconnecting`);

    }
}

module.exports = WS;