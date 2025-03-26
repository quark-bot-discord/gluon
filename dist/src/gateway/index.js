var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _Shard_instances,
  _Shard__token,
  _Shard__client,
  _Shard__sessionId,
  _Shard__s,
  _Shard_resuming,
  _Shard_heartbeatSetInterval,
  _Shard_heartbeatInterval,
  _Shard_waitingForHeartbeatACK,
  _Shard_monitorOpened,
  _Shard_ws,
  _Shard_resumeGatewayUrl,
  _Shard_retries,
  _Shard_halted,
  _Shard_lastReconnect,
  _Shard_latencyMs,
  _Shard_lastHeartbeatTimestamp,
  _Shard_eventHandler,
  _Shard_handleIncoming,
  _Shard_heartbeatInit,
  _Shard_heartbeat,
  _Shard_identify,
  _Shard_reconnect,
  _Shard_resume,
  _Shard_addListeners,
  _Shard_shutDownWebsocket;
/* eslint-disable class-methods-use-this */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'ws'.... Remove this comment to see the full error message
import WebSocket from "ws";
import erlpack from "erlpack";
import ZlibSync from "zlib-sync";
import { _heartbeat } from "./structures/_heartbeat.js";
import { _identify } from "./structures/_identify.js";
import EventHandler from "./eventHandler.js";
import { GATEWAY_RECONNECT_CLOSE_CODES } from "../constants.js";
import generateWebsocketURL from "../util/gluon/generateWebsocketURL.js";
import { _updatePresence } from "./structures/_updatePresence.js";
import { _resume } from "./structures/_resume.js";
import { GatewayOpcodes } from "#typings/discord.js";
import { Events, GluonDebugLevels } from "#typings/enums.js";
/* https://canary.discord.com/developers/docs/topics/gateway#disconnections */
class Shard {
  constructor(
    client,
    token,
    url,
    shardId,
    sessionId = null,
    sequence = null,
    resumeGatewayUrl = null,
  ) {
    _Shard_instances.add(this);
    this.terminateSocketTimeout = null;
    _Shard__token.set(this, void 0);
    _Shard__client.set(this, void 0);
    _Shard__sessionId.set(this, void 0);
    _Shard__s.set(this, void 0);
    _Shard_resuming.set(this, void 0);
    _Shard_heartbeatSetInterval.set(this, null);
    // @ts-expect-error TS(7008): Member '#heartbeatInterval' implicitly has an 'any... Remove this comment to see the full error message
    _Shard_heartbeatInterval.set(this, void 0);
    _Shard_waitingForHeartbeatACK.set(this, void 0);
    // @ts-expect-error TS(7008): Member '#monitorOpened' implicitly has an 'any' ty... Remove this comment to see the full error message
    _Shard_monitorOpened.set(this, void 0);
    _Shard_ws.set(this, void 0);
    _Shard_resumeGatewayUrl.set(this, void 0);
    _Shard_retries.set(this, void 0);
    _Shard_halted.set(this, void 0);
    // @ts-expect-error TS(7008): Member '#lastReconnect' implicitly has an 'any' ty... Remove this comment to see the full error message
    _Shard_lastReconnect.set(this, void 0);
    // @ts-expect-error TS(7008): Member '#latencyMs' implicitly has an 'any' type.
    _Shard_latencyMs.set(this, void 0);
    // @ts-expect-error TS(7008): Member '#lastHeartbeatTimestamp' implicitly has an... Remove this comment to see the full error message
    _Shard_lastHeartbeatTimestamp.set(this, void 0);
    _Shard_eventHandler.set(this, void 0);
    __classPrivateFieldSet(this, _Shard__token, token, "f");
    this.shard = shardId;
    __classPrivateFieldSet(this, _Shard__client, client, "f");
    __classPrivateFieldSet(
      this,
      _Shard_eventHandler,
      new EventHandler(__classPrivateFieldGet(this, _Shard__client, "f"), this),
      "f",
    );
    __classPrivateFieldSet(this, _Shard__sessionId, sessionId, "f");
    __classPrivateFieldSet(this, _Shard__s, sequence, "f");
    __classPrivateFieldSet(
      this,
      _Shard_resuming,
      sessionId != null && sequence != null ? true : false,
      "f",
    );
    __classPrivateFieldSet(this, _Shard_heartbeatSetInterval, null, "f");
    __classPrivateFieldSet(this, _Shard_heartbeatInterval, null, "f");
    __classPrivateFieldSet(this, _Shard_waitingForHeartbeatACK, false, "f");
    __classPrivateFieldSet(this, _Shard_monitorOpened, null, "f");
    __classPrivateFieldSet(this, _Shard_ws, new WebSocket(url), "f");
    __classPrivateFieldSet(
      this,
      _Shard_resumeGatewayUrl,
      resumeGatewayUrl,
      "f",
    );
    __classPrivateFieldSet(this, _Shard_retries, 1, "f");
    __classPrivateFieldSet(this, _Shard_halted, false, "f");
    __classPrivateFieldSet(this, _Shard_lastReconnect, null, "f");
    __classPrivateFieldSet(this, _Shard_lastHeartbeatTimestamp, null, "f");
    __classPrivateFieldSet(this, _Shard_latencyMs, null, "f");
    __classPrivateFieldGet(
      this,
      _Shard_instances,
      "m",
      _Shard_addListeners,
    ).call(this);
  }
  halt() {
    __classPrivateFieldSet(this, _Shard_halted, true, "f");
    __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
      GluonDebugLevels.Danger,
      "Halting websocket",
    );
  }
  check() {
    return {
      shard: this.shard,
      websocketState: __classPrivateFieldGet(this, _Shard_ws, "f").readyState,
      lastReconnect: __classPrivateFieldGet(this, _Shard_lastReconnect, "f"),
      latency: __classPrivateFieldGet(this, _Shard_latencyMs, "f") / 2,
    };
  }
  jitter() {
    return Math.random();
  }
  updatePresence(name, type, status, afk, since) {
    if (
      __classPrivateFieldGet(this, _Shard_ws, "f").readyState != WebSocket.OPEN
    )
      return;
    __classPrivateFieldGet(this, _Shard_ws, "f").send(
      _updatePresence(name, type, status, afk, since),
    );
  }
  getSessionData() {
    return {
      sessionId: __classPrivateFieldGet(this, _Shard__sessionId, "f"),
      sequence: __classPrivateFieldGet(this, _Shard__s, "f"),
      resumeGatewayUrl: __classPrivateFieldGet(
        this,
        _Shard_resumeGatewayUrl,
        "f",
      ),
    };
  }
  resetRetries() {
    __classPrivateFieldSet(this, _Shard_retries, 0, "f");
  }
  /**
   * @param {String} id
   */
  set sessionId(id) {
    __classPrivateFieldSet(this, _Shard__sessionId, id, "f");
  }
  /**
   * @param {String} url
   */
  set resumeGatewayUrl(url) {
    __classPrivateFieldSet(this, _Shard_resumeGatewayUrl, url, "f");
  }
}
(_Shard__token = new WeakMap()),
  (_Shard__client = new WeakMap()),
  (_Shard__sessionId = new WeakMap()),
  (_Shard__s = new WeakMap()),
  (_Shard_resuming = new WeakMap()),
  (_Shard_heartbeatSetInterval = new WeakMap()),
  (_Shard_heartbeatInterval = new WeakMap()),
  (_Shard_waitingForHeartbeatACK = new WeakMap()),
  (_Shard_monitorOpened = new WeakMap()),
  (_Shard_ws = new WeakMap()),
  (_Shard_resumeGatewayUrl = new WeakMap()),
  (_Shard_retries = new WeakMap()),
  (_Shard_halted = new WeakMap()),
  (_Shard_lastReconnect = new WeakMap()),
  (_Shard_latencyMs = new WeakMap()),
  (_Shard_lastHeartbeatTimestamp = new WeakMap()),
  (_Shard_eventHandler = new WeakMap()),
  (_Shard_instances = new WeakSet()),
  (_Shard_handleIncoming = function _Shard_handleIncoming(data) {
    if (__classPrivateFieldGet(this, _Shard_halted, "f") === true) return;
    if (!data) return;
    if (data.s) __classPrivateFieldSet(this, _Shard__s, data.s, "f");
    if (process.env.NODE_ENV == "development")
      __classPrivateFieldGet(this, _Shard__client, "f").emit(Events.RAW, data);
    switch (data.op) {
      // Dispatch
      case GatewayOpcodes.Dispatch: {
        try {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (__classPrivateFieldGet(this, _Shard_eventHandler, "f")[data.t]) {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            __classPrivateFieldGet(this, _Shard_eventHandler, "f")[data.t](
              data.d,
            );
          }
        } catch (error) {
          __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
            GluonDebugLevels.Error,
            `ERROR at ${data.t}: ${error}`,
          );
          throw error;
        }
        break;
      }
      // Heartbeat
      case GatewayOpcodes.Heartbeat: {
        __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
          GluonDebugLevels.Info,
          "Heartbeat requested",
        );
        __classPrivateFieldGet(
          this,
          _Shard_instances,
          "m",
          _Shard_heartbeat,
        ).call(this, true);
        break;
      }
      // Reconnect
      case GatewayOpcodes.Reconnect: {
        __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
          GluonDebugLevels.Info,
          "Reconnect requested",
        );
        // reconnect to websocket with session id
        __classPrivateFieldGet(
          this,
          _Shard_instances,
          "m",
          _Shard_reconnect,
        ).call(this);
        break;
      }
      // Invalid Session
      case GatewayOpcodes.InvalidSession: {
        __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
          GluonDebugLevels.Danger,
          "Invalid session",
        );
        if (data.d != false)
          __classPrivateFieldGet(
            this,
            _Shard_instances,
            "m",
            _Shard_resume,
          ).call(this);
        else
          setTimeout(
            () => {
              __classPrivateFieldGet(
                this,
                _Shard_instances,
                "m",
                _Shard_identify,
              ).call(this);
            },
            (Math.floor(Math.random() * 6) + 1) * 1000,
          );
        break;
      }
      // Hello
      case GatewayOpcodes.Hello: {
        __classPrivateFieldSet(
          this,
          _Shard_heartbeatInterval,
          data.d.heartbeat_interval,
          "f",
        );
        __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
          GluonDebugLevels.Info,
          "Hello received",
        );
        __classPrivateFieldSet(this, _Shard_lastReconnect, Date.now(), "f");
        __classPrivateFieldGet(
          this,
          _Shard_instances,
          "m",
          _Shard_heartbeatInit,
        ).call(this);
        if (__classPrivateFieldGet(this, _Shard_resuming, "f") !== true)
          __classPrivateFieldGet(
            this,
            _Shard_instances,
            "m",
            _Shard_identify,
          ).call(this);
        else
          __classPrivateFieldGet(
            this,
            _Shard_instances,
            "m",
            _Shard_resume,
          ).call(this);
        break;
      }
      // Heartbeat ACK
      case GatewayOpcodes.HeartbeatAck: {
        __classPrivateFieldSet(this, _Shard_waitingForHeartbeatACK, false, "f");
        __classPrivateFieldSet(
          this,
          _Shard_latencyMs,
          Date.now() -
            __classPrivateFieldGet(this, _Shard_lastHeartbeatTimestamp, "f"),
          "f",
        );
        __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
          GluonDebugLevels.Info,
          "Heartbeat acknowledged",
        );
        break;
      }
      default: {
        __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
          GluonDebugLevels.Warn,
          `Unknown opcode: ${data.op}`,
        );
        break;
      }
    }
  }),
  (_Shard_heartbeatInit = function _Shard_heartbeatInit() {
    setTimeout(
      () => {
        __classPrivateFieldGet(
          this,
          _Shard_instances,
          "m",
          _Shard_heartbeat,
        ).call(this);
        __classPrivateFieldSet(
          this,
          _Shard_heartbeatSetInterval,
          setInterval(
            () => {
              __classPrivateFieldGet(
                this,
                _Shard_instances,
                "m",
                _Shard_heartbeat,
              ).call(this);
            },
            __classPrivateFieldGet(this, _Shard_heartbeatInterval, "f"),
          ),
          "f",
        );
      },
      __classPrivateFieldGet(this, _Shard_heartbeatInterval, "f") *
        this.jitter(),
    );
  }),
  (_Shard_heartbeat = function _Shard_heartbeat(response = false) {
    if (
      __classPrivateFieldGet(this, _Shard_resuming, "f") == true &&
      response != true
    )
      return;
    __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      "Sending heartbeat",
    );
    if (response != true) {
      __classPrivateFieldSet(this, _Shard_waitingForHeartbeatACK, true, "f");
      __classPrivateFieldSet(
        this,
        _Shard_lastHeartbeatTimestamp,
        Date.now(),
        "f",
      );
    }
    __classPrivateFieldGet(this, _Shard_ws, "f").send(
      _heartbeat(__classPrivateFieldGet(this, _Shard__s, "f")),
    );
    // we'll close the websocket if a heartbeat ACK is not received
    // unless its us responding to an opcode 1
    if (response != true)
      setTimeout(() => {
        if (
          __classPrivateFieldGet(this, _Shard_waitingForHeartbeatACK, "f") ==
            true &&
          __classPrivateFieldGet(this, _Shard_resuming, "f") != true
        ) {
          __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
            GluonDebugLevels.Error,
            "Heartbeat ACK not received",
          );
          __classPrivateFieldGet(
            this,
            _Shard_instances,
            "m",
            _Shard_shutDownWebsocket,
          ).call(this, 4000);
        }
      }, 10000);
  }),
  (_Shard_identify = function _Shard_identify() {
    __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      `Identifying with token ${__classPrivateFieldGet(this, _Shard__token, "f")}, shard ${this.shard} (total shards: ${__classPrivateFieldGet(this, _Shard__client, "f").totalShards}) and intents ${__classPrivateFieldGet(this, _Shard__client, "f").intents}`,
    );
    __classPrivateFieldGet(this, _Shard_ws, "f").send(
      _identify(
        __classPrivateFieldGet(this, _Shard__token, "f"),
        [
          this.shard,
          __classPrivateFieldGet(this, _Shard__client, "f").totalShards,
        ],
        __classPrivateFieldGet(this, _Shard__client, "f").intents,
      ),
    );
  }),
  (_Shard_reconnect = function _Shard_reconnect() {
    __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      "Attempting to reconnect",
    );
    __classPrivateFieldSet(this, _Shard_resuming, true, "f");
    __classPrivateFieldGet(
      this,
      _Shard_instances,
      "m",
      _Shard_shutDownWebsocket,
    ).call(this, 4901);
    __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      "Shard reconnecting",
    );
  }),
  (_Shard_resume = function _Shard_resume() {
    __classPrivateFieldSet(this, _Shard_resuming, true, "f");
    __classPrivateFieldSet(this, _Shard_waitingForHeartbeatACK, false, "f");
    __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      `Resuming with token ${__classPrivateFieldGet(this, _Shard__token, "f")}, session id ${__classPrivateFieldGet(this, _Shard__sessionId, "f")} and sequence ${__classPrivateFieldGet(this, _Shard__s, "f")}`,
    );
    if (
      !__classPrivateFieldGet(this, _Shard__sessionId, "f") ||
      !__classPrivateFieldGet(this, _Shard__s, "f")
    ) {
      throw new Error("GLUON: Session ID or sequence not found");
    }
    __classPrivateFieldGet(this, _Shard_ws, "f").send(
      _resume(
        __classPrivateFieldGet(this, _Shard__token, "f"),
        __classPrivateFieldGet(this, _Shard__sessionId, "f"),
        __classPrivateFieldGet(this, _Shard__s, "f"),
      ),
    );
    __classPrivateFieldSet(this, _Shard_resuming, false, "f");
  }),
  (_Shard_addListeners = function _Shard_addListeners() {
    __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      "Adding websocket listeners",
    );
    this.zlib = new ZlibSync.Inflate({
      chunkSize: 128 * 1024,
    });
    __classPrivateFieldGet(this, _Shard_ws, "f").once("open", () => {
      __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
        GluonDebugLevels.Info,
        "Websocket opened",
      );
      clearTimeout(__classPrivateFieldGet(this, _Shard_monitorOpened, "f"));
    });
    __classPrivateFieldGet(this, _Shard_ws, "f").once("close", (data) => {
      __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
        data < 2000 ? GluonDebugLevels.Info : GluonDebugLevels.Error,
        `Websocket closed with code ${data}`,
      );
      __classPrivateFieldGet(this, _Shard_ws, "f").removeAllListeners();
      if (this.terminateSocketTimeout) {
        clearInterval(this.terminateSocketTimeout);
        this.terminateSocketTimeout = null;
      }
      if (__classPrivateFieldGet(this, _Shard_heartbeatSetInterval, "f")) {
        clearInterval(
          __classPrivateFieldGet(this, _Shard_heartbeatSetInterval, "f"),
        );
        __classPrivateFieldSet(this, _Shard_heartbeatSetInterval, null, "f");
      }
      __classPrivateFieldSet(this, _Shard_waitingForHeartbeatACK, false, "f");
      if (
        data < 2000 ||
        data == 4901 ||
        GATEWAY_RECONNECT_CLOSE_CODES.includes(data)
      )
        __classPrivateFieldSet(this, _Shard_resuming, true, "f");
      else process.exit(1);
      if (__classPrivateFieldGet(this, _Shard_retries, "f") <= 5)
        setTimeout(
          () => {
            var _a;
            __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
              GluonDebugLevels.Warn,
              `Attempt ${__classPrivateFieldGet(this, _Shard_retries, "f")} at re-opening websocket`,
            );
            __classPrivateFieldSet(
              this,
              _Shard_retries,
              ((_a = __classPrivateFieldGet(this, _Shard_retries, "f")),
              _a++,
              _a),
              "f",
            );
            __classPrivateFieldSet(
              this,
              _Shard_ws,
              new WebSocket(
                generateWebsocketURL(
                  __classPrivateFieldGet(this, _Shard_resumeGatewayUrl, "f"),
                ),
              ),
              "f",
            );
            __classPrivateFieldSet(
              this,
              _Shard_monitorOpened,
              setTimeout(() => {
                __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
                  GluonDebugLevels.Error,
                  `Attempt ${__classPrivateFieldGet(this, _Shard_retries, "f")} failed to re-open websocket, shutting down websocket with code ${data}`,
                );
                __classPrivateFieldGet(
                  this,
                  _Shard_instances,
                  "m",
                  _Shard_shutDownWebsocket,
                ).call(this, data);
              }, 10000),
              "f",
            );
            __classPrivateFieldGet(
              this,
              _Shard_instances,
              "m",
              _Shard_addListeners,
            ).call(this);
          },
          __classPrivateFieldGet(this, _Shard_retries, "f") * 1000,
        );
      else process.exit(1);
    });
    __classPrivateFieldGet(this, _Shard_ws, "f").on("message", (data) => {
      /* Made with the help of https://github.com/abalabahaha/eris/blob/69f812c43cd8d9591d2ca455f7c8b672267a2ff6/lib/gateway/Shard.js#L2156 */
      if (data instanceof ArrayBuffer) data = Buffer.from(data);
      else if (Array.isArray(data)) data = Buffer.concat(data);
      if (data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xffff) {
        this.zlib?.push(data, ZlibSync.Z_SYNC_FLUSH);
        if (this.zlib?.err) throw new Error(this.zlib.msg ?? undefined);
        if (this.zlib?.result) {
          data = Buffer.from(this.zlib?.result);
        } else {
          throw new Error("Zlib error");
        }
        __classPrivateFieldGet(
          this,
          _Shard_instances,
          "m",
          _Shard_handleIncoming,
        ).call(this, erlpack.unpack(data));
      } else {
        this.zlib?.push(data, false);
      }
    });
    __classPrivateFieldGet(this, _Shard_ws, "f").on("error", (data) => {
      __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
        GluonDebugLevels.Error,
        data?.stack?.toString() ?? data?.message ?? "Unknown error",
      );
      __classPrivateFieldGet(
        this,
        _Shard_instances,
        "m",
        _Shard_shutDownWebsocket,
      ).call(this);
    });
  }),
  (_Shard_shutDownWebsocket = async function _Shard_shutDownWebsocket(
    code = 1000,
  ) {
    __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      `Closing websocket with code ${code}`,
    );
    __classPrivateFieldGet(this, _Shard_ws, "f").close(code);
    this.terminateSocketTimeout = setTimeout(() => {
      __classPrivateFieldGet(this, _Shard__client, "f")._emitDebug(
        GluonDebugLevels.Error,
        "Forcibly terminating websocket",
      );
      __classPrivateFieldGet(this, _Shard_ws, "f").terminate();
      setTimeout(() => {
        __classPrivateFieldGet(this, _Shard__client, "f").softRestartFunction();
      }, 1000);
    }, 5000);
  });
export default Shard;
//# sourceMappingURL=index.js.map
