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
const { NAME, GATEWAY_RECONNECT_CLOSE_CODES } = require("../constants");
const generateWebsocketURL = require("../util/generateWebsocketURL");
const { OPEN } = require("ws");
const RequestGuildMembers = require("./structures/_8");

/* https://canary.discord.com/developers/docs/topics/gateway#disconnections */

class WS {
  constructor(
    client,
    url,
    shard,
    intents,
    sessionId = null,
    sequence = null,
    resumeGatewayUrl = null,
    softRestartFunction = null
  ) {
    this.token = client.token;
    this.shard = shard;

    this.intents = intents;

    this.url = url;

    this.client = client;

    this.request = this.client.request;

    this.eventHandler = new EventHandler(this.client, this);

    this.sessionId = sessionId;
    this.s = sequence;

    this.resuming = sessionId != null && sequence != null ? true : false;

    this.heartbeatSetInterval = null;
    this.heartbeatInterval = null;
    this.waitingForHeartbeatACK = false;

    this.monitorOpened = null;

    this.libName = chalk.magenta.bold(`[${NAME.toUpperCase()}]`);
    this.shardNorminal = chalk.green(`[Shard: ${this.shard[0]}]`);
    this.shardWarning = chalk.yellow(`[Shard: ${this.shard[0]}]`);
    this.shardCatastrophic = chalk.red(`[Shard: ${this.shard[0]}]`);

    this.ws = new WebSocket(url);

    this.resumeGatewayUrl = resumeGatewayUrl;

    this.retries = 1;

    this.softRestartFunction = softRestartFunction
      ? softRestartFunction
      : () => process.exit(1);

    this.addListeners();
  }

  handleIncoming(data) {
    if (!data) return;

    if (data.s) this.s = data.s;

    this.client.emit("raw", data);

    switch (data.op) {
      // Dispatch
      case 0: {
        try {
          this.eventHandler[data.t] ? this.eventHandler[data.t](data.d) : null;
        } catch (error) {
          this.client.emit(
            "debug",
            `${this.libName} ${
              this.shardCatastrophic
            } @ ${this.time()} => ERROR at ${data.t}: ${error}`
          );

          console.log(error);
        } finally {
          break;
        }
      }

      // Heartbeat
      case 1: {
        this.client.emit(
          "debug",
          `${this.libName} ${
            this.shardNorminal
          } @ ${this.time()} => Gateway requested heartbeat`
        );

        this.heartbeat(true);

        break;
      }

      // Reconnect
      case 7: {
        this.client.emit(
          "debug",
          `${this.libName} ${
            this.shardWarning
          } @ ${this.time()} => Received reconnect`
        );

        // reconnect to websocket with session id
        this.reconnect();

        break;
      }

      // Invalid Session
      case 9: {
        this.client.emit(
          "debug",
          `${this.libName} ${
            this.shardWarning
          } @ ${this.time()} => INVALID SESSION`
        );

        if (data.d != false) this.resume();
        else
          setTimeout(() => {
            this.identify();
          }, (Math.floor(Math.random() * 6) + 1) * 1000);

        break;
      }

      // Hello
      case 10: {
        this.heartbeatInterval = data.d.heartbeat_interval;

        this.client.emit(
          "debug",
          `${this.libName} ${this.shardNorminal} @ ${this.time()} => HELLO`
        );

        if (this.resuming != true) {
          this.heartbeatInit();
          this.identify();
        } else this.resume();

        break;
      }

      // Heartbeat ACK
      case 11: {
        this.waitingForHeartbeatACK = false;

        this.client.emit(
          "debug",
          `${this.libName} ${
            this.shardNorminal
          } @ ${this.time()} => Heartbeat acknowledged`
        );

        break;
      }
    }
  }

  updatePresence(name, type, status, afk, since) {
    if (this.ws.readyState != OPEN) return;

    this.ws.send(new UpdatePresence(name, type, status, afk, since));
  }

  heartbeatInit() {
    this.heartbeat();

    this.heartbeatSetInterval = setInterval(() => {
      this.heartbeat();
    }, this.heartbeatInterval);
  }

  heartbeat(response = false) {
    if (this.resuming == true && response != true) return;

    this.client.emit(
      "debug",
      `${this.libName} ${
        this.shardNorminal
      } @ ${this.time()} => Sending heartbeat...`
    );

    if (response != true) this.waitingForHeartbeatACK = true;

    this.ws.send(new Heartbeat(this.s));
    // we'll close the websocket if a heartbeat ACK is not received
    // unless its us responding to an opcode 1
    if (response != true)
      setTimeout(() => {
        if (this.waitingForHeartbeatACK == true && this.resuming != true) {
          this.client.emit(
            "debug",
            `${this.libName} ${
              this.shardCatastrophic
            } @ ${this.time()} => Heartbeat ACK not received`
          );
          this.shutDownWebsocket(4000);
        }
      }, 10000);
  }

  identify() {
    this.client.emit(
      "debug",
      `${this.libName} ${
        this.shardNorminal
      } @ ${this.time()} => IDENTIFY with TOKEN: "${this.token}", SHARD: "${
        this.shard
      }" and INTENTS: "${this.intents}"`
    );

    this.ws.send(new Identify(this.token, this.shard, this.intents));
  }

  reconnect() {
    this.client.emit(
      "debug",
      `${this.libName} ${
        this.shardWarning
      } @ ${this.time()} => Attempting reconnect...`
    );

    this.resuming = true;

    this.shutDownWebsocket(4901);

    this.client.emit(
      "debug",
      `${this.libName} ${
        this.shardWarning
      } @ ${this.time()} => Shard reconnecting`
    );
  }

  resume() {
    this.resuming = true;

    this.waitingForHeartbeatACK = false;

    this.client.emit(
      "debug",
      `${this.libName} ${
        this.shardWarning
      } @ ${this.time()} => RESUMING with token ${this.token}, session id ${
        this.sessionId
      } and sequence ${this.s}`
    );

    this.ws.send(new Resume(this.token, this.sessionId, this.s));

    this.resuming = false;
  }

  time() {
    return chalk.magenta(new Date().toGMTString());
  }

  addListeners() {
    this.client.emit(
      "debug",
      `${this.libName} ${
        this.shardWarning
      } @ ${this.time()} => Adding websocket listeners`
    );

    this.zlib = new ZlibSync.Inflate({
      chunkSize: 128 * 1024,
    });

    this.ws.once("open", () => {
      this.client.emit(
        "debug",
        `${this.libName} ${
          this.shardNorminal
        } @ ${this.time()} => Websocket opened`
      );

      clearTimeout(this.monitorOpened);
    });

    this.ws.once("close", (data) => {
      this.client.emit(
        "debug",
        `${this.libName} ${
          data < 2000 ? this.shardNorminal : this.shardCatastrophic
        } @ ${this.time()} => Websocket closed with code ${data}`
      );

      this.ws.removeAllListeners();

      clearInterval(this.terminateSocketTimeout);

      clearInterval(this.heartbeatSetInterval);

      this.waitingForHeartbeatACK = false;

      if (
        data < 2000 ||
        data == 4901 ||
        GATEWAY_RECONNECT_CLOSE_CODES.includes(data)
      )
        this.resuming = true;
      else process.exit(1);

      if (this.retries <= 5)
        setTimeout(() => {
          this.client.emit(
            "debug",
            `${this.libName} ${this.shardWarning} @ ${this.time()} => Attempt ${
              this.retries
            } at re-opening websocket`
          );

          this.retries++;

          this.ws = new WebSocket(generateWebsocketURL(this.resumeGatewayUrl));

          this.monitorOpened = setTimeout(() => {
            this.client.emit(
              "debug",
              `${this.libName} ${
                this.shardWarning
              } @ ${this.time()} => Attempt ${
                this.retries
              } failed to re-open websocket, shutting down websocket with code ${data}`
            );

            this.shutDownWebsocket(data);
          }, 10000);

          this.addListeners();
        }, this.retries * 1000);
      else process.exit(1);
    });

    this.ws.on("message", (data) => {
      /* Made with the help of https://github.com/abalabahaha/eris/blob/69f812c43cd8d9591d2ca455f7c8b672267a2ff6/lib/gateway/Shard.js#L2156 */

      if (data instanceof ArrayBuffer) data = Buffer.from(data);
      else if (Array.isArray(data)) data = Buffer.concat(data);

      if (data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xffff) {
        this.zlib.push(data, ZlibSync.Z_SYNC_FLUSH);
        if (this.zlib.err) throw this.zlib.msg;

        data = Buffer.from(this.zlib.result);
        return this.handleIncoming(erlpack.unpack(data));
      } else this.zlib.push(data, false);
    });

    this.ws.on("error", (data) => {
      this.client.emit(
        "debug",
        `${this.libName} ${
          this.shardCatastrophic
        } @ ${this.time()} => ${data?.stack?.toString()}`
      );

      this.shutDownWebsocket();
    });
  }

  async shutDownWebsocket(code = 1000) {
    this.client.emit(
      "debug",
      `${this.libName} ${
        this.shardWarning
      } @ ${this.time()} => Closing websocket...`
    );

    this.ws.close(code);

    this.terminateSocketTimeout = setTimeout(() => {
      this.client.emit(
        "debug",
        `${this.libName} ${
          this.shardCatastrophic
        } @ ${this.time()} => Terminating websocket`
      );
      this.ws.terminate();
      setTimeout(() => {
        this.softRestartFunction();
      }, 1000);
    }, 5000);
  }
}

module.exports = WS;
