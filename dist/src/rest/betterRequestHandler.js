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
var _BetterRequestHandler_instances,
  _BetterRequestHandler_token,
  _BetterRequestHandler_authorization,
  _BetterRequestHandler__client,
  _BetterRequestHandler_requestURL,
  _BetterRequestHandler_maxRetries,
  _BetterRequestHandler_endpoints,
  _BetterRequestHandler_latencyMs,
  _BetterRequestHandler_agent,
  _BetterRequestHandler_http;
import fetch from "node-fetch";
import FormData from "form-data";
import { createReadStream } from "fs";
import hashjs from "hash.js";
import { Redis } from "ioredis";
import {
  GLUON_VERSION,
  API_BASE_URL,
  VERSION,
  NAME,
  GLUON_REPOSITORY_URL,
} from "../constants.js";
import endpoints from "./endpoints.js";
import { sleep } from "../util/general/sleep.js";
import { Events, GluonDebugLevels } from "#typings/enums.js";
import { GluonRequestError } from "#typings/errors.js";
import https from "https";
const AbortController = globalThis.AbortController;
const redis = new Redis();
function toQueryParams(obj) {
  const result = {};
  for (const key in obj) {
    const val = obj[key];
    if (val === undefined || val === null) continue;
    result[key] = String(val);
  }
  return result;
}
class BetterRequestHandler {
  constructor(client, token, options) {
    _BetterRequestHandler_instances.add(this);
    _BetterRequestHandler_token.set(this, void 0);
    _BetterRequestHandler_authorization.set(this, void 0);
    _BetterRequestHandler__client.set(this, void 0);
    _BetterRequestHandler_requestURL.set(this, void 0);
    _BetterRequestHandler_maxRetries.set(this, void 0);
    _BetterRequestHandler_endpoints.set(this, void 0);
    _BetterRequestHandler_latencyMs.set(this, 0);
    _BetterRequestHandler_agent.set(this, void 0);
    __classPrivateFieldSet(this, _BetterRequestHandler__client, client, "f");
    __classPrivateFieldSet(
      this,
      _BetterRequestHandler_agent,
      new https.Agent({ localAddress: options?.ip }),
      "f",
    );
    __classPrivateFieldSet(
      this,
      _BetterRequestHandler_requestURL,
      `${options?.apiBaseUrl ?? API_BASE_URL}/v${VERSION}`,
      "f",
    );
    __classPrivateFieldSet(this, _BetterRequestHandler_token, token, "f");
    __classPrivateFieldSet(
      this,
      _BetterRequestHandler_authorization,
      `Bot ${__classPrivateFieldGet(this, _BetterRequestHandler_token, "f")}`,
      "f",
    );
    __classPrivateFieldSet(this, _BetterRequestHandler_maxRetries, 3, "f");
    __classPrivateFieldSet(
      this,
      _BetterRequestHandler_endpoints,
      endpoints,
      "f",
    );
    this.GLOBAL_KEY = `gluon:${__classPrivateFieldGet(this, _BetterRequestHandler_token, "f").slice(0, 8)}:global_rate_limit`;
  }
  get latency() {
    return __classPrivateFieldGet(this, _BetterRequestHandler_latencyMs, "f");
  }
  async makeRequest(request, params, body) {
    const actualRequest = __classPrivateFieldGet(
      this,
      _BetterRequestHandler_endpoints,
      "f",
    )[request];
    const toHash =
      actualRequest.method +
      actualRequest.path(
        ...(params
          ? params.map((v, i) =>
              String(actualRequest.majorParams.includes(i) ? v : null),
            )
          : []),
      );
    const hash = hashjs.sha256().update(toHash).digest("hex");
    __classPrivateFieldGet(this, _BetterRequestHandler__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      `ADD ${hash} to request queue`,
    );
    const _stack = new Error().stack;
    return __classPrivateFieldGet(
      this,
      _BetterRequestHandler_instances,
      "m",
      _BetterRequestHandler_http,
    ).call(this, hash, request, params, body, _stack);
  }
}
(_BetterRequestHandler_token = new WeakMap()),
  (_BetterRequestHandler_authorization = new WeakMap()),
  (_BetterRequestHandler__client = new WeakMap()),
  (_BetterRequestHandler_requestURL = new WeakMap()),
  (_BetterRequestHandler_maxRetries = new WeakMap()),
  (_BetterRequestHandler_endpoints = new WeakMap()),
  (_BetterRequestHandler_latencyMs = new WeakMap()),
  (_BetterRequestHandler_agent = new WeakMap()),
  (_BetterRequestHandler_instances = new WeakSet()),
  (_BetterRequestHandler_http = async function _BetterRequestHandler_http(
    hash,
    request,
    params,
    body,
    _stack,
  ) {
    const actualRequest = __classPrivateFieldGet(
      this,
      _BetterRequestHandler_endpoints,
      "f",
    )[request];
    const path = actualRequest.path(...(params ?? []));
    const headers = {
      Authorization: __classPrivateFieldGet(
        this,
        _BetterRequestHandler_authorization,
        "f",
      ),
      "User-Agent": `DiscordBot (${GLUON_REPOSITORY_URL}, ${GLUON_VERSION}) ${NAME}`,
      Accept: "application/json",
    };
    let form;
    if (body?.files) {
      form = new FormData();
      const clonedBody = { ...body }; // avoid mutating original
      clonedBody.files?.forEach((f, i) => {
        if (f.stream?.readableEnded) {
          throw new Error("Cannot retry: file stream already ended");
        }
        return form?.append(
          `files[${i}]`,
          f.stream || createReadStream(f.attachment),
          f.name,
        );
      });
      delete clonedBody.files;
      form.append("payload_json", JSON.stringify({ ...clonedBody }));
      Object.assign(headers, form.getHeaders());
    } else if (
      actualRequest.method !== "GET" &&
      actualRequest.method !== "DELETE"
    ) {
      headers["Content-Type"] = "application/json";
    }
    if (
      body &&
      actualRequest.useHeaders &&
      actualRequest.useHeaders.length !== 0
    ) {
      for (const [key, value] of Object.entries(body)) {
        if (actualRequest.useHeaders.includes(key)) {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          headers[key] = encodeURIComponent(value);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [key]: _, ...rest } = body;
          body = rest;
        }
      }
    }
    let res;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    const url =
      `${__classPrivateFieldGet(this, _BetterRequestHandler_requestURL, "f")}${path}` +
      (body &&
      (actualRequest.method === "GET" || actualRequest.method === "DELETE")
        ? `?${new URLSearchParams(toQueryParams(body)).toString()}`
        : "");
    for (
      let i = 0;
      i <= __classPrivateFieldGet(this, _BetterRequestHandler_maxRetries, "f");
      i++
    ) {
      try {
        const requestTime = Date.now();
        res = await fetch(url, {
          method: actualRequest.method,
          headers,
          body: form
            ? form
            : body &&
                actualRequest.method !== "GET" &&
                actualRequest.method !== "DELETE"
              ? JSON.stringify(body)
              : undefined,
          compress: true,
          signal: controller.signal,
          agent: __classPrivateFieldGet(this, _BetterRequestHandler_agent, "f"),
        });
        __classPrivateFieldSet(
          this,
          _BetterRequestHandler_latencyMs,
          Date.now() - requestTime,
          "f",
        );
        break;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          __classPrivateFieldGet(
            this,
            _BetterRequestHandler__client,
            "f",
          )._emitDebug(GluonDebugLevels.Danger, `Request timed out ${hash}`);
          throw new GluonRequestError(0, actualRequest.method, path, _stack);
        }
        __classPrivateFieldGet(
          this,
          _BetterRequestHandler__client,
          "f",
        )._emitDebug(GluonDebugLevels.Warn, `Request failed ${hash} ${err}`);
        if (
          i ===
          __classPrivateFieldGet(this, _BetterRequestHandler_maxRetries, "f")
        )
          throw err;
        await sleep(2 ** i * 200 + Math.random() * 300);
      } finally {
        clearTimeout(timeout);
      }
    }
    if (!res) {
      __classPrivateFieldGet(
        this,
        _BetterRequestHandler__client,
        "f",
      )._emitDebug(GluonDebugLevels.Danger, `NO RESPONSE ${hash}`);
      throw new GluonRequestError(0, actualRequest.method, path, _stack);
    }
    let json = null;
    try {
      json = await res.json();
    } catch (err) {
      __classPrivateFieldGet(
        this,
        _BetterRequestHandler__client,
        "f",
      )._emitDebug(GluonDebugLevels.Danger, `NO JSON ${hash} ${err}`);
      json = null;
    }
    if (res.status === 429) {
      __classPrivateFieldGet(
        this,
        _BetterRequestHandler__client,
        "f",
      )._emitDebug(
        GluonDebugLevels.Warn,
        `RATELIMITED ${hash} ${res.status} ${JSON.stringify(json)}`,
      );
      const retryAfter = Math.ceil(Number(json?.retry_after ?? 1)) * 1000;
      if (json?.global)
        await redis.set(this.GLOBAL_KEY, Date.now() + retryAfter);
      throw new GluonRequestError(
        res.status,
        actualRequest.method,
        path,
        _stack,
        JSON.stringify(json),
      );
    }
    __classPrivateFieldGet(this, _BetterRequestHandler__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      `[Request] bucket: ${res.headers.get("x-ratelimit-bucket")} remaining: ${res.headers.get("x-ratelimit-remaining")} reset: ${res.headers.get("x-ratelimit-reset")}`,
    );
    __classPrivateFieldGet(this, _BetterRequestHandler__client, "f").emit(
      Events.REQUEST_COMPLETED,
      {
        status: res.status,
        method: actualRequest.method,
        endpoint: path,
        hash,
      },
    );
    __classPrivateFieldGet(this, _BetterRequestHandler__client, "f")._emitDebug(
      GluonDebugLevels.Info,
      `REMOVE ${hash} from request queue (${__classPrivateFieldGet(this, _BetterRequestHandler_latencyMs, "f")}ms)`,
    );
    if (res.ok) return json;
    throw new GluonRequestError(
      res.status,
      actualRequest.method,
      path,
      _stack,
      JSON.stringify(json),
    );
  });
export default BetterRequestHandler;
//# sourceMappingURL=betterRequestHandler.js.map
