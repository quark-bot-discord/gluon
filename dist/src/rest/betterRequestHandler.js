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
  _BetterRequestHandler_latency,
  _BetterRequestHandler_maxRetries,
  _BetterRequestHandler_maxQueueSize,
  _BetterRequestHandler_fuzz,
  _BetterRequestHandler_endpoints,
  _BetterRequestHandler_queueWorker,
  _BetterRequestHandler_queues,
  _BetterRequestHandler_localRatelimitCache,
  _BetterRequestHandler_latencyMs,
  _BetterRequestHandler_handleBucket,
  _BetterRequestHandler_http;
import fetch from "node-fetch";
import FormData from "form-data";
import { createReadStream } from "fs";
import hashjs from "hash.js";
import NodeCache from "node-cache";
import FastQ from "fastq";
import getBucket from "./getBucket.js";
import {
  GLUON_VERSION,
  API_BASE_URL,
  VERSION,
  NAME,
  GLUON_REPOSITORY_URL,
  GLUON_DEBUG_LEVELS,
} from "../constants.js";
import endpoints from "./endpoints.js";
import sleep from "../util/general/sleep.js";
const AbortController = globalThis.AbortController;
class BetterRequestHandler {
  constructor(client, token) {
    _BetterRequestHandler_instances.add(this);
    _BetterRequestHandler_token.set(this, void 0);
    _BetterRequestHandler_authorization.set(this, void 0);
    _BetterRequestHandler__client.set(this, void 0);
    _BetterRequestHandler_requestURL.set(this, void 0);
    _BetterRequestHandler_latency.set(this, void 0);
    _BetterRequestHandler_maxRetries.set(this, void 0);
    _BetterRequestHandler_maxQueueSize.set(this, void 0);
    _BetterRequestHandler_fuzz.set(this, void 0);
    _BetterRequestHandler_endpoints.set(this, void 0);
    _BetterRequestHandler_queueWorker.set(this, void 0);
    _BetterRequestHandler_queues.set(this, void 0);
    _BetterRequestHandler_localRatelimitCache.set(this, void 0);
    // @ts-expect-error TS(7008): Member '#latencyMs' implicitly has an 'any' type.
    _BetterRequestHandler_latencyMs.set(this, void 0);
    __classPrivateFieldSet(this, _BetterRequestHandler__client, client, "f");
    __classPrivateFieldSet(
      this,
      _BetterRequestHandler_requestURL,
      `${API_BASE_URL}/v${VERSION}`,
      "f",
    );
    __classPrivateFieldSet(
      this,
      _BetterRequestHandler_localRatelimitCache,
      new NodeCache({ stdTTL: 60, checkperiod: 60 }),
      "f",
    );
    __classPrivateFieldSet(this, _BetterRequestHandler_token, token, "f");
    __classPrivateFieldSet(
      this,
      _BetterRequestHandler_authorization,
      `Bot ${__classPrivateFieldGet(this, _BetterRequestHandler_token, "f")}`,
      "f",
    );
    __classPrivateFieldSet(this, _BetterRequestHandler_latency, 1, "f");
    __classPrivateFieldSet(this, _BetterRequestHandler_maxRetries, 3, "f");
    __classPrivateFieldSet(this, _BetterRequestHandler_maxQueueSize, 100, "f");
    __classPrivateFieldSet(this, _BetterRequestHandler_fuzz, 500, "f");
    __classPrivateFieldSet(
      this,
      _BetterRequestHandler_endpoints,
      endpoints,
      "f",
    );
    __classPrivateFieldSet(
      this,
      _BetterRequestHandler_queueWorker,
      async (data) => {
        const bucket = await getBucket(
          __classPrivateFieldGet(this, _BetterRequestHandler__client, "f"),
          __classPrivateFieldGet(
            this,
            _BetterRequestHandler_localRatelimitCache,
            "f",
          ),
          data.hash,
        );
        if (
          !bucket ||
          bucket.remaining !== 0 ||
          (bucket.remaining === 0 &&
            new Date().getTime() / 1000 >
              bucket.reset +
                __classPrivateFieldGet(
                  this,
                  _BetterRequestHandler_latency,
                  "f",
                ))
        )
          return __classPrivateFieldGet(
            this,
            _BetterRequestHandler_instances,
            "m",
            _BetterRequestHandler_http,
          ).call(
            this,
            data.hash,
            data.request,
            data.params,
            data.body,
            data._stack,
          );
        else {
          __classPrivateFieldGet(
            this,
            _BetterRequestHandler__client,
            "f",
          )._emitDebug(
            GLUON_DEBUG_LEVELS.WARN,
            `RATELIMITED ${data.hash} (bucket reset):${bucket.reset} (latency):${__classPrivateFieldGet(this, _BetterRequestHandler_latency, "f")}  (time until retry):${(bucket.reset + __classPrivateFieldGet(this, _BetterRequestHandler_latency, "f")) * 1000 - new Date().getTime()} (current time):${(new Date().getTime() / 1000) | 0}`,
          );
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (
            __classPrivateFieldGet(this, _BetterRequestHandler_queues, "f")[
              data.hash
            ].length() >
            __classPrivateFieldGet(
              this,
              _BetterRequestHandler_maxQueueSize,
              "f",
            )
          ) {
            __classPrivateFieldGet(
              this,
              _BetterRequestHandler__client,
              "f",
            )._emitDebug(GLUON_DEBUG_LEVELS.DANGER, `KILL QUEUE ${data.hash}`);
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            __classPrivateFieldGet(this, _BetterRequestHandler_queues, "f")[
              data.hash
            ].kill();
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            delete __classPrivateFieldGet(
              this,
              _BetterRequestHandler_queues,
              "f",
            )[data.hash];
          }
          await sleep(
            (bucket.reset +
              __classPrivateFieldGet(
                this,
                _BetterRequestHandler_latency,
                "f",
              )) *
              1000 -
              new Date().getTime() +
              __classPrivateFieldGet(this, _BetterRequestHandler_fuzz, "f"),
          );
          return __classPrivateFieldGet(
            this,
            _BetterRequestHandler_instances,
            "m",
            _BetterRequestHandler_http,
          ).call(
            this,
            data.hash,
            data.request,
            data.params,
            data.body,
            data._stack,
          );
        }
      },
      "f",
    );
    __classPrivateFieldSet(this, _BetterRequestHandler_queues, {}, "f");
  }
  /**
   * The latency of the request handler.
   * @type {Number}
   * @readonly
   */
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
      GLUON_DEBUG_LEVELS.INFO,
      `ADD ${hash} to request queue`,
    );
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!__classPrivateFieldGet(this, _BetterRequestHandler_queues, "f")[hash])
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      __classPrivateFieldGet(this, _BetterRequestHandler_queues, "f")[hash] =
        FastQ.promise(
          __classPrivateFieldGet(this, _BetterRequestHandler_queueWorker, "f"),
          1,
        );
    let retries = 5;
    while (retries--)
      try {
        const _stack = new Error().stack;
        const result = await __classPrivateFieldGet(
          this,
          _BetterRequestHandler_queues,
          "f",
        )[hash].push({
          hash,
          request,
          params,
          body,
          _stack,
        });
        if (
          __classPrivateFieldGet(this, _BetterRequestHandler_queues, "f")[
            hash
          ].idle()
        )
          delete __classPrivateFieldGet(
            this,
            _BetterRequestHandler_queues,
            "f",
          )[hash];
        return result;
      } catch (error) {
        throw error;
      }
    throw new Error("GLUON: Request ran out of retries");
  }
}
(_BetterRequestHandler_token = new WeakMap()),
  (_BetterRequestHandler_authorization = new WeakMap()),
  (_BetterRequestHandler__client = new WeakMap()),
  (_BetterRequestHandler_requestURL = new WeakMap()),
  (_BetterRequestHandler_latency = new WeakMap()),
  (_BetterRequestHandler_maxRetries = new WeakMap()),
  (_BetterRequestHandler_maxQueueSize = new WeakMap()),
  (_BetterRequestHandler_fuzz = new WeakMap()),
  (_BetterRequestHandler_endpoints = new WeakMap()),
  (_BetterRequestHandler_queueWorker = new WeakMap()),
  (_BetterRequestHandler_queues = new WeakMap()),
  (_BetterRequestHandler_localRatelimitCache = new WeakMap()),
  (_BetterRequestHandler_latencyMs = new WeakMap()),
  (_BetterRequestHandler_instances = new WeakSet()),
  (_BetterRequestHandler_handleBucket =
    async function _BetterRequestHandler_handleBucket(
      ratelimitBucket,
      ratelimitRemaining,
      ratelimitReset,
      hash,
      retryAfter = 0,
    ) {
      if (!ratelimitBucket) return;
      const bucket = {
        remaining: retryAfter !== 0 ? 0 : parseInt(ratelimitRemaining),
        reset:
          retryAfter !== 0
            ? new Date().getTime() / 1000 + retryAfter
            : Math.ceil(parseFloat(ratelimitReset)),
      };
      let expireFromCache =
        Math.ceil(bucket.reset - new Date().getTime() / 1000) + 60;
      if (expireFromCache < 0) expireFromCache = 60;
      else if (expireFromCache > 2592000) expireFromCache = 2592000;
      try {
        if (
          __classPrivateFieldGet(this, _BetterRequestHandler__client, "f").redis
        )
          await __classPrivateFieldGet(
            this,
            _BetterRequestHandler__client,
            "f",
          ).redis.set(
            `${NAME.toLowerCase()}.paths.${hash}`,
            JSON.stringify(bucket),
            "EX",
            expireFromCache,
          );
        __classPrivateFieldGet(
          this,
          _BetterRequestHandler_localRatelimitCache,
          "f",
        ).set(`${NAME.toLowerCase()}.paths.${hash}`, bucket, expireFromCache);
      } catch (error) {
        __classPrivateFieldGet(
          this,
          _BetterRequestHandler_localRatelimitCache,
          "f",
        ).set(`${NAME.toLowerCase()}.paths.${hash}`, bucket, expireFromCache);
        throw error;
      }
    }),
  (_BetterRequestHandler_http = async function _BetterRequestHandler_http(
    hash,
    request,
    params,
    body,
    _stack,
  ) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const actualRequest = __classPrivateFieldGet(
      this,
      _BetterRequestHandler_endpoints,
      "f",
    )[request];
    const path = actualRequest.path(...(params ?? []));
    const bucket = await getBucket(
      __classPrivateFieldGet(this, _BetterRequestHandler__client, "f"),
      __classPrivateFieldGet(
        this,
        _BetterRequestHandler_localRatelimitCache,
        "f",
      ),
      hash,
    );
    if (
      !bucket ||
      bucket.remaining !== 0 ||
      (bucket.remaining === 0 &&
        new Date().getTime() / 1000 >
          bucket.reset +
            __classPrivateFieldGet(this, _BetterRequestHandler_latency, "f"))
    ) {
      const serialize = (obj) => {
        const str = [];
        for (let p in obj)
          if (Object.prototype.hasOwnProperty.call(obj, p))
            str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        return str.join("&");
      };
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
        for (let i = 0; i < body.files.length; i++)
          form.append(
            `${i}_${body.files[i].name}`,
            body.files[i].stream
              ? body.files[i].stream
              : createReadStream(body.files[i].attachment),
            body.files[i].name,
          );
        delete body.files;
        form.append("payload_json", JSON.stringify(body));
        Object.assign(headers, form.getHeaders());
      } else if (
        actualRequest.method !== "GET" &&
        actualRequest.method !== "DELETE"
      )
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        headers["Content-Type"] = "application/json";
      if (
        body &&
        actualRequest.useHeaders &&
        actualRequest.useHeaders.length !== 0
      )
        for (const [key, value] of Object.entries(body))
          if (actualRequest.useHeaders.includes(key)) {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            headers[key] = encodeURIComponent(value);
            delete body[key];
          }
      let res;
      let e;
      const requestTime = Date.now();
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 30000);
      for (
        let i = 0;
        i <=
        __classPrivateFieldGet(this, _BetterRequestHandler_maxRetries, "f");
        i++
      )
        try {
          /* actually make the request */
          res = await fetch(
            `${__classPrivateFieldGet(this, _BetterRequestHandler_requestURL, "f")}${path}${
              body &&
              (actualRequest.method === "GET" ||
                actualRequest.method === "DELETE")
                ? `?${serialize(body)}`
                : ""
            }`,
            {
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
            },
          );
          __classPrivateFieldSet(
            this,
            _BetterRequestHandler_latencyMs,
            Date.now() - requestTime,
            "f",
          );
          __classPrivateFieldSet(
            this,
            _BetterRequestHandler_latency,
            Math.ceil((Date.now() - requestTime) / 1000),
            "f",
          );
          break;
        } catch (error) {
          console.error(error);
          e = error;
        } finally {
          clearTimeout(timeout);
        }
      if (!res) throw e;
      let json;
      try {
        json = await res.json();
      } catch (error) {
        json = null;
      }
      try {
        await __classPrivateFieldGet(
          this,
          _BetterRequestHandler_instances,
          "m",
          _BetterRequestHandler_handleBucket,
        ).call(
          this,
          res.headers.get("x-ratelimit-bucket"),
          res.headers.get("x-ratelimit-remaining"),
          res.headers.get("x-ratelimit-reset"),
          hash,
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          res.status === 429 ? json.retry_after : 0,
        );
      } catch (error) {
        console.error(error);
      }
      __classPrivateFieldGet(this, _BetterRequestHandler__client, "f").emit(
        "requestCompleted",
        {
          status: res.status,
          method: actualRequest.method,
          endpoint: actualRequest.path(...(params ?? [])),
          hash,
        },
      );
      __classPrivateFieldGet(
        this,
        _BetterRequestHandler__client,
        "f",
      )._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `REMOVE ${hash} from request queue (${__classPrivateFieldGet(this, _BetterRequestHandler_latencyMs, "f")}ms)`,
      );
      if (res.ok) return json;
      else
        throw new Error(
          `GLUON: ${res.status} ${actualRequest.method} ${actualRequest.path(...(params ?? []))} ${json ? JSON.stringify(json) : ""} FAILED (stack): ${_stack}`,
        );
    } else {
      const retryNextIn =
        Math.ceil(bucket.reset - new Date().getTime() / 1000) +
        __classPrivateFieldGet(this, _BetterRequestHandler_latency, "f");
      await sleep(1500);
      __classPrivateFieldGet(
        this,
        _BetterRequestHandler__client,
        "f",
      )._emitDebug(GLUON_DEBUG_LEVELS.WARN, `READD ${hash} to request queue`);
      throw new Error(
        `GLUON: 429 - Hit ratelimit, retry in ${retryNextIn} (stack): ${_stack}`,
      );
    }
  });
export default BetterRequestHandler;
//# sourceMappingURL=betterRequestHandler.js.map
