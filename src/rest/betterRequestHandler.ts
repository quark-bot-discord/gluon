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
import { EndpointIndexItem } from "typings/index.js";
const AbortController = globalThis.AbortController;

class BetterRequestHandler {
  #token;
  #authorization;
  #_client;
  #requestURL;
  #latency;
  #maxRetries;
  #maxQueueSize;
  #fuzz;
  #endpoints;
  #queueWorker;
  #queues;
  #localRatelimitCache;
  // @ts-expect-error TS(7008): Member '#latencyMs' implicitly has an 'any' type.
  #latencyMs;
  constructor(client: any, token: string) {
    this.#_client = client;

    this.#requestURL = `${API_BASE_URL}/v${VERSION}`;

    this.#localRatelimitCache = new NodeCache({ stdTTL: 60, checkperiod: 60 });

    this.#token = token;
    this.#authorization = `Bot ${this.#token}`;

    this.#latency = 1;
    this.#maxRetries = 3;
    this.#maxQueueSize = 100;
    this.#fuzz = 500;

    this.#endpoints = endpoints;

    this.#queueWorker = async (data: any) => {
      const bucket = await getBucket(
        this.#_client,
        this.#localRatelimitCache,
        data.hash,
      );
      if (
        !bucket ||
        bucket.remaining !== 0 ||
        (bucket.remaining === 0 &&
          new Date().getTime() / 1000 > bucket.reset + this.#latency)
      )
        return this.#http(
          data.hash,
          data.request,
          data.params,
          data.body,
          data._stack,
        );
      else {
        this.#_client._emitDebug(
          GLUON_DEBUG_LEVELS.WARN,
          `RATELIMITED ${data.hash} (bucket reset):${
            bucket.reset
          } (latency):${this.#latency}  (time until retry):${
            (bucket.reset + this.#latency) * 1000 - new Date().getTime()
          } (current time):${(new Date().getTime() / 1000) | 0}`,
        );
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (this.#queues[data.hash].length() > this.#maxQueueSize) {
          this.#_client._emitDebug(
            GLUON_DEBUG_LEVELS.DANGER,
            `KILL QUEUE ${data.hash}`,
          );
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          this.#queues[data.hash].kill();
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          delete this.#queues[data.hash];
        }
        await sleep(
          (bucket.reset + this.#latency) * 1000 -
            new Date().getTime() +
            this.#fuzz,
        );
        return this.#http(
          data.hash,
          data.request,
          data.params,
          data.body,
          data._stack,
        );
      }
    };

    this.#queues = {};
  }

  /**
   * The latency of the request handler.
   * @type {Number}
   * @readonly
   */
  get latency() {
    return this.#latencyMs;
  }

  async #handleBucket(
    ratelimitBucket: any,
    ratelimitRemaining: any,
    ratelimitReset: any,
    hash: any,
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
      if (this.#_client.redis)
        await this.#_client.redis.set(
          `${NAME.toLowerCase()}.paths.${hash}`,
          JSON.stringify(bucket),
          "EX",
          expireFromCache,
        );

      this.#localRatelimitCache.set(
        `${NAME.toLowerCase()}.paths.${hash}`,
        bucket,
        expireFromCache,
      );
    } catch (error) {
      this.#localRatelimitCache.set(
        `${NAME.toLowerCase()}.paths.${hash}`,
        bucket,
        expireFromCache,
      );

      throw error;
    }
  }

  async makeRequest(
    request: keyof typeof endpoints,
    params: string[],
    body: any,
  ) {
    const actualRequest = this.#endpoints[request] as EndpointIndexItem;

    const toHash =
      actualRequest.method +
      actualRequest.path(
        ...(params
          ? params.map((v: string, i: number) =>
              String(actualRequest.majorParams.includes(i) ? v : null),
            )
          : []),
      );
    const hash = hashjs.sha256().update(toHash).digest("hex");

    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `ADD ${hash} to request queue`,
    );

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this.#queues[hash])
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      this.#queues[hash] = FastQ.promise(this.#queueWorker, 1);

    let retries = 5;

    while (retries--)
      try {
        const _stack = new Error().stack;
        const result = await this.#queues[hash].push({
          hash,
          request,
          params,
          body,
          _stack,
        });
        if (this.#queues[hash].idle()) delete this.#queues[hash];
        return result;
      } catch (error) {
        throw error;
      }

    throw new Error("GLUON: Request ran out of retries");
  }

  async #http(hash: any, request: any, params: any, body: any, _stack: any) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const actualRequest = this.#endpoints[request];

    const path = actualRequest.path(...(params ?? []));

    const bucket = await getBucket(
      this.#_client,
      this.#localRatelimitCache,
      hash,
    );

    if (
      !bucket ||
      bucket.remaining !== 0 ||
      (bucket.remaining === 0 &&
        new Date().getTime() / 1000 > bucket.reset + this.#latency)
    ) {
      const serialize = (obj: any) => {
        const str = [];
        for (let p in obj)
          if (Object.prototype.hasOwnProperty.call(obj, p))
            str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        return str.join("&");
      };

      const headers = {
        Authorization: this.#authorization,
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

      for (let i = 0; i <= this.#maxRetries; i++)
        try {
          /* actually make the request */
          res = await fetch(
            `${this.#requestURL}${path}${
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

          this.#latencyMs = Date.now() - requestTime;
          this.#latency = Math.ceil((Date.now() - requestTime) / 1000);

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
        await this.#handleBucket(
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

      this.#_client.emit("requestCompleted", {
        status: res.status,
        method: actualRequest.method,
        endpoint: actualRequest.path(...(params ?? [])),
        hash,
      });

      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `REMOVE ${hash} from request queue (${this.#latencyMs}ms)`,
      );

      if (res.ok) return json;
      else
        throw new Error(
          `GLUON: ${res.status} ${actualRequest.method} ${actualRequest.path(
            ...(params ?? []),
          )} ${json ? JSON.stringify(json) : ""} FAILED (stack): ${_stack}`,
        );
    } else {
      const retryNextIn =
        Math.ceil(bucket.reset - new Date().getTime() / 1000) + this.#latency;

      await sleep(1500);

      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.WARN,
        `READD ${hash} to request queue`,
      );

      throw new Error(
        `GLUON: 429 - Hit ratelimit, retry in ${retryNextIn} (stack): ${_stack}`,
      );
    }
  }
}

export default BetterRequestHandler;
