/* eslint-disable class-methods-use-this */
const WebSocket = require("ws");
const erlpack = require("erlpack");
const ZlibSync = require("zlib-sync");
const Heartbeat = require("./structures/_1");
const Identify = require("./structures/_2");
const UpdatePresence = require("./structures/_3");
const Resume = require("./structures/_6");
const EventHandler = require("./eventHandler");
const chalk = require("chalk");
const { NAME } = require("../constants");

/* https://canary.discord.com/developers/docs/topics/gateway#disconnections */

class WS {

    constructor(client, url, shard, intents, sessionId = null, sequence = null) {

        this.token = client.token;
        this.shard = shard;

        this.intents = intents;

        this.url = url;

        this.client = client;

        this.ws = new WebSocket(url);
        this.request = this.client.request;

        this.eventHandler = new EventHandler(this.client, this);

        this.sessionId = sessionId;
        this.s = sequence;

        this.resuming = sessionId && sequence != null ? true : false;

        this.isInitialHeartbeat = sessionId && sequence != null ? false : true;

        this.heartbeatSetInterval = null;
        this.waitingForHeartbeatACK = false;

        this.libName = chalk.magenta.bold(`[${NAME.toUpperCase()}]`);
        this.shardNorminal = chalk.green(`[Shard: ${this.shard[0]}]`);
        this.shardWarning = chalk.yellow(`[Shard: ${this.shard[0]}]`);
        this.shardCatastrophic = chalk.red(`[Shard: ${this.shard[0]}]`);

        this.retries = 0;

        this.addListeners();

    }

    handleIncoming(data) {

        if (!data) 
            return;

        if (data.s)
            this.s = data.s;

        this.client.emit("raw", data);

        switch (data.op) {

            // Dispatch
            case 0: {

                try {

                    this.eventHandler[data.t] ? this.eventHandler[data.t](data.d) : null;

                } catch (error) {

                    this.client.emit("debug", `${this.libName} ${this.shardCatastrophic} @ ${this.time()} => ERROR at ${data.t}: ${error}`);
                    this.client.error(error.stack.toString());

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

                this.client.emit("debug", `${this.libName} ${data.d == false ? this.shardCatastrophic : this.shardWarning} @ ${this.time()} => INVALID SESSION`);
                this.client.error("INVALID SESSION");

                if (data.d != false)
                    this.reconnect();
                else
                    process.exit(1);

                break;

            }

            // Hello
            case 10: {

                this.heartbeat();

                this.heartbeatSetInterval = setInterval((() => {

                    this.heartbeat();

                }), data.d.heartbeat_interval);

                this.client.emit("debug", `${this.libName} ${this.shardNorminal} @ ${this.time()} => HELLO`);

                break;

            }

            // Heartbeat ACK
            case 11: {

                this.waitingForHeartbeatACK = false;

                if (this.isInitialHeartbeat == true) {

                    this.isInitialHeartbeat = false;

                    this.identify();

                }// else if (this.resuming == true)
                // this.resume();

                this.client.emit("debug", `${this.libName} ${this.shardNorminal} @ ${this.time()} => Heartbeat acknowledged`);

                break;

            }

        }

    }

    updatePresence(name, type, status, afk, since) {

        this.ws.send(new UpdatePresence(name, type, status, afk, since));

    }

    heartbeat() {

        if (this.resuming == true)
            return;

        this.client.emit("debug", `${this.libName} ${this.shardNorminal} @ ${this.time()} => Sending heartbeat...`);

        this.waitingForHeartbeatACK = true;

        this.ws.send(new Heartbeat(this.s));
        // we'll close the websocket if a heartbeat ACK is not received 
        setTimeout(() => {
            if (this.waitingForHeartbeatACK == true)
                this.shutDownWebsocket(4000);
        }, 2000);

    }

    identify() {

        this.client.emit("debug", `${this.libName} ${this.shardNorminal} @ ${this.time()} => IDENTIFY`);

        this.ws.send(new Identify(this.token, this.shard, this.intents));

    }

    reconnect() {

        this.resuming = true;

        this.shutDownWebsocket();

        this.client.emit("debug", `${this.libName} ${this.shardWarning} @ ${this.time()} => Shard reconnecting`);

    }

    resume() {

        this.resuming = true;

        this.client.emit("debug", `${this.libName} ${this.shardWarning} @ ${this.time()} => RESUMING`);

        this.ws.send(new Resume(this.token, this.sessionId, this.s));

        this.resuming = false;

    }

    time() {

        return chalk.magenta(new Date().toGMTString());

    }

    addListeners() {

        this.zlib = new ZlibSync.Inflate({

            chunkSize: 128 * 1024

        });

        this.ws.on("open", () => {

            this.client.emit("debug", `${this.libName} ${this.shardNorminal} @ ${this.time()} => Websocket opened`);

        });

        this.ws.on("close", data => {

            this.client.emit("debug", `${this.libName} ${data < 2000 ? this.shardNorminal : this.shardCatastrophic} @ ${this.time()} => Websocket closed with code ${data}`);

            clearInterval(this.heartbeatSetInterval);

            if (data < 2000)
                this.resuming = true;
            else
                process.exit(0);

            if (this.retries < 5)
                setTimeout(() => {

                    this.retries++;

                    this.ws = new WebSocket(this.url);

                    this.addListeners();

                }, 1000);
            else
                process.exit(0);

        });

        this.ws.on("message", data => {
            /* Made with the help of https://github.com/abalabahaha/eris/blob/69f812c43cd8d9591d2ca455f7c8b672267a2ff6/lib/gateway/Shard.js#L2156 */

            if (data instanceof ArrayBuffer)
                data = Buffer.from(data);
            else if (Array.isArray(data))
                data = Buffer.concat(data);

            if (data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xFFFF) {

                this.zlib.push(data, ZlibSync.Z_SYNC_FLUSH);
                if (this.zlib.err) {
                    this.client.error(this.zlib.msg);
                    return;
                }

                data = Buffer.from(this.zlib.result);
                return this.handleIncoming(erlpack.unpack(data));

            } else
                this.zlib.push(data, false);

        });

        this.ws.on("error", data => {

            this.client.error(data.stack.toString());

        });

    }

    shutDownWebsocket(code = 1000) {

        this.ws.close(code);

        setTimeout(() => {

            if ([this.ws.OPEN, this.ws.CLOSING].includes(this.ws.readyState))
                this.ws.terminate();

        }, 5000);

    }

}

module.exports = WS;