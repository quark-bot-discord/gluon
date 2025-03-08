/* eslint-disable class-methods-use-this */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'ws'.... Remove this comment to see the full error message
import WebSocket from "ws";
import erlpack from "erlpack";
import ZlibSync from "zlib-sync";
import _heartbeat from "./structures/_heartbeat.js";
import _identify from "./structures/_identify.js";
import EventHandler from "./eventHandler.js";
import { GATEWAY_RECONNECT_CLOSE_CODES } from "../constants.js";
import generateWebsocketURL from "../util/gluon/generateWebsocketURL.js";
import _updatePresence from "./structures/_updatePresence.js";
import _resume from "./structures/_resume.js";
import type { Client as ClientType } from "typings/index.d.ts";
import {
  ActivityType,
  GatewayCloseCodes,
  GatewayOpcodes,
  GatewayReceivePayload,
  PresenceUpdateStatus,
} from "#typings/discord.js";
import { Events, GluonDebugLevels } from "#typings/enums.js";

/* https://canary.discord.com/developers/docs/topics/gateway#disconnections */

class Shard {
  shard: number;
  terminateSocketTimeout: NodeJS.Timeout | null = null;
  zlib: ZlibSync.Inflate = new ZlibSync.Inflate({
    chunkSize: 128 * 1024,
  });
  #token;
  #_client;
  #_sessionId;
  #_s;
  #resuming;
  #heartbeatSetInterval: NodeJS.Timeout | null = null;
  // @ts-expect-error TS(7008): Member '#heartbeatInterval' implicitly has an 'any... Remove this comment to see the full error message
  #heartbeatInterval;
  #waitingForHeartbeatACK;
  // @ts-expect-error TS(7008): Member '#monitorOpened' implicitly has an 'any' ty... Remove this comment to see the full error message
  #monitorOpened;
  #ws;
  #resumeGatewayUrl: string | null;
  #retries: number;
  #halted;
  // @ts-expect-error TS(7008): Member '#lastReconnect' implicitly has an 'any' ty... Remove this comment to see the full error message
  #lastReconnect;
  // @ts-expect-error TS(7008): Member '#latencyMs' implicitly has an 'any' type.
  #latencyMs;
  // @ts-expect-error TS(7008): Member '#lastHeartbeatTimestamp' implicitly has an... Remove this comment to see the full error message
  #lastHeartbeatTimestamp;
  #eventHandler;
  constructor(
    client: ClientType,
    token: string,
    url: string,
    shardId: number,
    sessionId: string | null = null,
    sequence: number | null = null,
    resumeGatewayUrl: string | null = null,
  ) {
    this.#token = token;
    this.shard = shardId;

    this.#_client = client;

    this.#eventHandler = new EventHandler(this.#_client, this);

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

    this.#halted = false;

    this.#lastReconnect = null;

    this.#lastHeartbeatTimestamp = null;
    this.#latencyMs = null;

    this.#addListeners();
  }

  #handleIncoming(data: GatewayReceivePayload) {
    if (this.#halted === true) return;

    if (!data) return;

    if (data.s) this.#_s = data.s;

    if (process.env.NODE_ENV == "development")
      this.#_client.emit(Events.RAW, data);

    switch (data.op) {
      // Dispatch
      case GatewayOpcodes.Dispatch: {
        try {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (this.#eventHandler[data.t]) {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            this.#eventHandler[data.t](data.d);
          }
        } catch (error) {
          this.#_client._emitDebug(
            GluonDebugLevels.Error,
            `ERROR at ${data.t}: ${error}`,
          );
          throw error;
        }
        break;
      }

      // Heartbeat
      case GatewayOpcodes.Heartbeat: {
        this.#_client._emitDebug(GluonDebugLevels.Info, "Heartbeat requested");

        this.#heartbeat(true);

        break;
      }

      // Reconnect
      case GatewayOpcodes.Reconnect: {
        this.#_client._emitDebug(GluonDebugLevels.Info, "Reconnect requested");

        // reconnect to websocket with session id
        this.#reconnect();

        break;
      }

      // Invalid Session
      case GatewayOpcodes.InvalidSession: {
        this.#_client._emitDebug(GluonDebugLevels.Danger, "Invalid session");

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
      case GatewayOpcodes.Hello: {
        this.#heartbeatInterval = data.d.heartbeat_interval;

        this.#_client._emitDebug(GluonDebugLevels.Info, "Hello received");

        this.#lastReconnect = Date.now();

        this.#heartbeatInit();

        if (this.#resuming !== true) this.#identify();
        else this.#resume();

        break;
      }

      // Heartbeat ACK
      case GatewayOpcodes.HeartbeatAck: {
        this.#waitingForHeartbeatACK = false;

        this.#latencyMs = Date.now() - this.#lastHeartbeatTimestamp;

        this.#_client._emitDebug(
          GluonDebugLevels.Info,
          "Heartbeat acknowledged",
        );

        break;
      }

      default: {
        this.#_client._emitDebug(
          GluonDebugLevels.Warn,
          `Unknown opcode: ${(data as { op: number }).op}`,
        );

        break;
      }
    }
  }

  halt() {
    this.#halted = true;
    this.#_client._emitDebug(GluonDebugLevels.Danger, "Halting websocket");
  }

  check() {
    return {
      shard: this.shard,
      websocketState: this.#ws.readyState,
      lastReconnect: this.#lastReconnect,
      latency: this.#latencyMs / 2,
    };
  }

  jitter() {
    return Math.random();
  }

  updatePresence(
    name: string,
    type?: ActivityType,
    status?: PresenceUpdateStatus,
    afk?: boolean,
    since?: number | null,
  ) {
    if (this.#ws.readyState != WebSocket.OPEN) return;

    this.#ws.send(_updatePresence(name, type, status, afk, since));
  }

  getSessionData() {
    return {
      sessionId: this.#_sessionId,
      sequence: this.#_s,
      resumeGatewayUrl: this.#resumeGatewayUrl,
    };
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

    this.#_client._emitDebug(GluonDebugLevels.Info, "Sending heartbeat");

    if (response != true) {
      this.#waitingForHeartbeatACK = true;
      this.#lastHeartbeatTimestamp = Date.now();
    }

    this.#ws.send(_heartbeat(this.#_s));
    // we'll close the websocket if a heartbeat ACK is not received
    // unless its us responding to an opcode 1
    if (response != true)
      setTimeout(() => {
        if (this.#waitingForHeartbeatACK == true && this.#resuming != true) {
          this.#_client._emitDebug(
            GluonDebugLevels.Error,
            "Heartbeat ACK not received",
          );
          this.#shutDownWebsocket(4000);
        }
      }, 10000);
  }

  #identify() {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `Identifying with token ${this.#token}, shard ${this.shard} (total shards: ${this.#_client.totalShards}) and intents ${this.#_client.intents}`,
    );

    this.#ws.send(
      _identify(
        this.#token,
        [this.shard, this.#_client.totalShards],
        this.#_client.intents,
      ),
    );
  }

  #reconnect() {
    this.#_client._emitDebug(GluonDebugLevels.Info, "Attempting to reconnect");

    this.#resuming = true;

    this.#shutDownWebsocket(4901);

    this.#_client._emitDebug(GluonDebugLevels.Info, "Shard reconnecting");
  }

  #resume() {
    this.#resuming = true;

    this.#waitingForHeartbeatACK = false;

    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `Resuming with token ${this.#token}, session id ${this.#_sessionId} and sequence ${this.#_s}`,
    );

    if (!this.#_sessionId || !this.#_s) {
      throw new Error("GLUON: Session ID or sequence not found");
    }

    this.#ws.send(_resume(this.#token, this.#_sessionId, this.#_s));

    this.#resuming = false;
  }

  #addListeners() {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      "Adding websocket listeners",
    );

    this.#ws.once("open", () => {
      this.#_client._emitDebug(GluonDebugLevels.Info, "Websocket opened");

      clearTimeout(this.#monitorOpened);
    });

    this.#ws.once("close", (data: GatewayCloseCodes | 4901) => {
      this.#_client._emitDebug(
        data < 2000 ? GluonDebugLevels.Info : GluonDebugLevels.Error,
        `Websocket closed with code ${data}`,
      );

      this.#ws.removeAllListeners();

      if (this.terminateSocketTimeout) {
        clearInterval(this.terminateSocketTimeout);
        this.terminateSocketTimeout = null;
      }

      if (this.#heartbeatSetInterval) {
        clearInterval(this.#heartbeatSetInterval);
        this.#heartbeatSetInterval = null;
      }

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
            GluonDebugLevels.Warn,
            `Attempt ${this.#retries} at re-opening websocket`,
          );

          this.#retries++;

          this.#ws = new WebSocket(
            generateWebsocketURL(this.#resumeGatewayUrl),
          );

          this.#monitorOpened = setTimeout(() => {
            this.#_client._emitDebug(
              GluonDebugLevels.Error,
              `Attempt ${this.#retries} failed to re-open websocket, shutting down websocket with code ${data}`,
            );

            this.#shutDownWebsocket(data);
          }, 10000);

          this.#addListeners();
        }, this.#retries * 1000);
      else process.exit(1);
    });

    this.#ws.on("message", (data: any) => {
      /* Made with the help of https://github.com/abalabahaha/eris/blob/69f812c43cd8d9591d2ca455f7c8b672267a2ff6/lib/gateway/Shard.js#L2156 */

      if (data instanceof ArrayBuffer) data = Buffer.from(data);
      else if (Array.isArray(data)) data = Buffer.concat(data);

      if (data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xffff) {
        this.zlib.push(data, ZlibSync.Z_SYNC_FLUSH);
        if (this.zlib.err) throw new Error(this.zlib.msg ?? undefined);

        if (this.zlib.result) {
          data = Buffer.from(this.zlib.result as ArrayBuffer);
        } else {
          throw new Error("Zlib error");
        }
        return this.#handleIncoming(erlpack.unpack(data));
      } else this.zlib.push(data, false);
    });

    this.#ws.on("error", (data: any) => {
      this.#_client._emitDebug(GluonDebugLevels.Error, data?.stack?.toString());

      this.#shutDownWebsocket();
    });
  }

  async #shutDownWebsocket(code = 1000) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `Closing websocket with code ${code}`,
    );

    this.#ws.close(code);

    this.terminateSocketTimeout = setTimeout(() => {
      this.#_client._emitDebug(
        GluonDebugLevels.Error,
        "Forcibly terminating websocket",
      );
      this.#ws.terminate();
      setTimeout(() => {
        this.#_client.softRestartFunction();
      }, 1000);
    }, 5000);
  }

  resetRetries() {
    this.#retries = 0;
  }

  /**
   * @param {String} id
   */
  set sessionId(id: string) {
    this.#_sessionId = id;
  }

  /**
   * @param {String} url
   */
  set resumeGatewayUrl(url: string) {
    this.#resumeGatewayUrl = url;
  }
}

export default Shard;
