/* eslint-disable class-methods-use-this */
import WebSocket from "ws";
import erlpack from "erlpack";
import ZlibSync from "zlib-sync";
import _heartbeat from "./structures/_heartbeat.js";
import _identify from "./structures/_identify.js";
import EventHandler from "./eventHandler.js";
import {
  GATEWAY_RECONNECT_CLOSE_CODES,
  GLUON_DEBUG_LEVELS,
} from "../constants.js";
import generateWebsocketURL from "../util/gluon/generateWebsocketURL.js";
import _updatePresence from "./structures/_updatePresence.js";
import _resume from "./structures/_resume.js";

/* https://canary.discord.com/developers/docs/topics/gateway#disconnections */

class Shard {
  #token;
  #intents;
  #_client;
  #_sessionId;
  #_s;
  #resuming;
  #heartbeatSetInterval;
  #heartbeatInterval;
  #waitingForHeartbeatACK;
  #monitorOpened;
  #ws;
  #resumeGatewayUrl;
  #retries;
  #halted;
  #lastReconnect;
  constructor(
    client,
    token,
    url,
    shardId,
    totalShards,
    intents,
    sessionId = null,
    sequence = null,
    resumeGatewayUrl = null,
    softRestartFunction = null,
  ) {
    this.#token = token;
    this.shard = shardId;
    this.totalShards = totalShards;

    this.#intents = intents;

    this.#_client = client;

    this.eventHandler = new EventHandler(this.#_client, this);

    this.#_sessionId = sessionId;
    this.#_s = sequence;

    this.#resuming = sessionId != null && sequence != null ? true : false;

    this.#heartbeatSetInterval = null;
    this.#heartbeatInterval = null;
    this.#waitingForHeartbeatACK = false;

    this.#monitorOpened = null;

    this.#ws = new WebSocket(url);

    this.#resumeGatewayUrl = resumeGatewayUrl;

    this.#retries = 1;

    this.softRestartFunction = softRestartFunction
      ? softRestartFunction
      : () => process.exit(1);

    this.#halted = false;

    this.#lastReconnect = null;

    this.#addListeners();
  }

  #handleIncoming(data) {
    if (this.#halted === true) return;

    if (!data) return;

    if (data.s) this.#_s = data.s;

    if (process.env.NODE_ENV == "development") this.#_client.emit("raw", data);

    switch (data.op) {
      // Dispatch
      case 0: {
        try {
          this.eventHandler[data.t] ? this.eventHandler[data.t](data.d) : null;
        } catch (error) {
          this.#_client._emitDebug(
            GLUON_DEBUG_LEVELS.ERROR,
            `ERROR at ${data.t}: ${error}`,
          );
          console.error(error);
        }
        break;
      }

      // Heartbeat
      case 1: {
        this.#_client._emitDebug(
          GLUON_DEBUG_LEVELS.INFO,
          "Heartbeat requested",
        );

        this.#heartbeat(true);

        break;
      }

      // Reconnect
      case 7: {
        this.#_client._emitDebug(
          GLUON_DEBUG_LEVELS.INFO,
          "Reconnect requested",
        );

        // reconnect to websocket with session id
        this.#reconnect();

        break;
      }

      // Invalid Session
      case 9: {
        this.#_client._emitDebug(GLUON_DEBUG_LEVELS.DANGER, "Invalid session");

        if (data.d != false) this.#resume();
        else
          setTimeout(
            () => {
              this.#identify();
            },
            (Math.floor(Math.random() * 6) + 1) * 1000,
          );

        break;
      }

      // Hello
      case 10: {
        this.#heartbeatInterval = data.d.heartbeat_interval;

        this.#_client._emitDebug(GLUON_DEBUG_LEVELS.INFO, "Hello received");

        this.#lastReconnect = Date.now();

        this.#heartbeatInit();

        if (this.#resuming != true) this.#identify();
        else this.#resume();

        break;
      }

      // Heartbeat ACK
      case 11: {
        this.#waitingForHeartbeatACK = false;

        this.#_client._emitDebug(
          GLUON_DEBUG_LEVELS.INFO,
          "Heartbeat acknowledged",
        );

        break;
      }

      default: {
        this.#_client._emitDebug(
          GLUON_DEBUG_LEVELS.WARN,
          `Unknown opcode: ${data.op}`,
        );

        break;
      }
    }
  }

  halt() {
    this.#halted = true;
    this.#_client._emitDebug(GLUON_DEBUG_LEVELS.DANGER, "Halting websocket");
  }

  check() {
    return {
      shard: this.shard,
      websocketState: this.#ws.readyState,
      sessionId: this.#_sessionId,
      lastReconnect: this.#lastReconnect,
    };
  }

  jitter() {
    return Math.random();
  }

  updatePresence(name, type, status, afk, since) {
    if (this.#ws.readyState != WebSocket.OPEN) return;

    this.#ws.send(_updatePresence(name, type, status, afk, since));
  }

  #heartbeatInit() {
    setTimeout(() => {
      this.#heartbeat();

      this.#heartbeatSetInterval = setInterval(() => {
        this.#heartbeat();
      }, this.#heartbeatInterval);
    }, this.#heartbeatInterval * this.jitter());
  }

  #heartbeat(response = false) {
    if (this.#resuming == true && response != true) return;

    this.#_client._emitDebug(GLUON_DEBUG_LEVELS.INFO, "Sending heartbeat");

    if (response != true) this.#waitingForHeartbeatACK = true;

    this.#ws.send(_heartbeat(this.#_s));
    // we'll close the websocket if a heartbeat ACK is not received
    // unless its us responding to an opcode 1
    if (response != true)
      setTimeout(() => {
        if (this.#waitingForHeartbeatACK == true && this.#resuming != true) {
          this.#_client._emitDebug(
            GLUON_DEBUG_LEVELS.ERROR,
            "Heartbeat ACK not received",
          );
          this.#shutDownWebsocket(4000);
        }
      }, 10000);
  }

  #identify() {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `Identifying with token ${this.#token}, shard ${this.shard} (total shards: ${this.totalShards}) and intents ${this.#intents}`,
    );

    this.#ws.send(
      _identify(this.#token, [this.shard, this.totalShards], this.#intents),
    );
  }

  #reconnect() {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      "Attempting to reconnect",
    );

    this.#resuming = true;

    this.#shutDownWebsocket(4901);

    this.#_client._emitDebug(GLUON_DEBUG_LEVELS.INFO, "Shard reconnecting");
  }

  #resume() {
    this.#resuming = true;

    this.#waitingForHeartbeatACK = false;

    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `Resuming with token ${this.#token}, session id ${this.#_sessionId} and sequence ${this.#_s}`,
    );

    this.#ws.send(_resume(this.#token, this.#_sessionId, this.#_s));

    this.#resuming = false;
  }

  #addListeners() {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      "Adding websocket listeners",
    );

    this.zlib = new ZlibSync.Inflate({
      chunkSize: 128 * 1024,
    });

    this.#ws.once("open", () => {
      this.#_client._emitDebug(GLUON_DEBUG_LEVELS.INFO, "Websocket opened");

      clearTimeout(this.#monitorOpened);
    });

    this.#ws.once("close", (data) => {
      this.#_client._emitDebug(
        data < 2000 ? GLUON_DEBUG_LEVELS.INFO : GLUON_DEBUG_LEVELS.ERROR,
        `Websocket closed with code ${data}`,
      );

      this.#ws.removeAllListeners();

      clearInterval(this.terminateSocketTimeout);

      clearInterval(this.#heartbeatSetInterval);

      this.#waitingForHeartbeatACK = false;

      if (
        data < 2000 ||
        data == 4901 ||
        GATEWAY_RECONNECT_CLOSE_CODES.includes(data)
      )
        this.#resuming = true;
      else process.exit(1);

      if (this.#retries <= 5)
        setTimeout(() => {
          this.#_client._emitDebug(
            GLUON_DEBUG_LEVELS.WARN,
            `Attempt ${this.#retries} at re-opening websocket`,
          );

          this.#retries++;

          this.#ws = new WebSocket(
            generateWebsocketURL(this.#resumeGatewayUrl),
          );

          this.#monitorOpened = setTimeout(() => {
            this.#_client._emitDebug(
              GLUON_DEBUG_LEVELS.ERROR,
              `Attempt ${this.#retries} failed to re-open websocket, shutting down websocket with code ${data}`,
            );

            this.#shutDownWebsocket(data);
          }, 10000);

          this.#addListeners();
        }, this.#retries * 1000);
      else process.exit(1);
    });

    this.#ws.on("message", (data) => {
      /* Made with the help of https://github.com/abalabahaha/eris/blob/69f812c43cd8d9591d2ca455f7c8b672267a2ff6/lib/gateway/Shard.js#L2156 */

      if (data instanceof ArrayBuffer) data = Buffer.from(data);
      else if (Array.isArray(data)) data = Buffer.concat(data);

      if (data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xffff) {
        this.zlib.push(data, ZlibSync.Z_SYNC_FLUSH);
        if (this.zlib.err) throw new Error(this.zlib.msg);

        data = Buffer.from(this.zlib.result);
        return this.#handleIncoming(erlpack.unpack(data));
      } else this.zlib.push(data, false);
    });

    this.#ws.on("error", (data) => {
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.ERROR,
        data?.stack?.toString(),
      );

      this.#shutDownWebsocket();
    });
  }

  async #shutDownWebsocket(code = 1000) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `Closing websocket with code ${code}`,
    );

    this.#ws.close(code);

    this.terminateSocketTimeout = setTimeout(() => {
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.ERROR,
        "Forcibly terminating websocket",
      );
      this.#ws.terminate();
      setTimeout(() => {
        this.softRestartFunction();
      }, 1000);
    }, 5000);
  }

  resetRetries() {
    this.#retries = 0;
  }

  /**
   * @param {String} id
   */
  set sessionId(id) {
    this.#_sessionId = id;
  }

  /**
   * @param {String} url
   */
  set resumeGatewayUrl(url) {
    this.#resumeGatewayUrl = url;
  }
}

export default Shard;
