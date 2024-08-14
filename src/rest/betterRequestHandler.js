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
  #latencyMs;
  constructor(client, token) {
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

    this.#queueWorker = (data) => {
      return new Promise(async (resolve, reject) => {
        const bucket = await getBucket(
          this.#_client,
          this.#localRatelimitCache,
          data.hash,
        );
        if (
          !bucket ||
          bucket.remaining != 0 ||
          (bucket.remaining === 0 &&
            new Date().getTime() / 1000 > bucket.reset + this.#latency)
        )
          this.#http(
            data.hash,
            data.request,
            data.params,
            data.body,
            resolve,
            reject,
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
          if (this.#queues[data.hash].length() > this.#maxQueueSize) {
            this.#_client._emitDebug(
              GLUON_DEBUG_LEVELS.DANGER,
              `KILL QUEUE ${data.hash}`,
            );
            this.#queues[data.hash].kill();
            delete this.#queues[data.hash];
          }
          setTimeout(
            () => {
              this.#http(
                data.hash,
                data.request,
                data.params,
                data.body,
                resolve,
                reject,
              );
            },
            (bucket.reset + this.#latency) * 1000 -
              new Date().getTime() +
              this.#fuzz,
          );
        }
      });
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
    ratelimitBucket,
    ratelimitRemaining,
    ratelimitReset,
    hash,
    retryAfter = 0,
  ) {
    if (!ratelimitBucket) return;

    const bucket = {
      remaining: retryAfter != 0 ? 0 : parseInt(ratelimitRemaining),
      reset:
        retryAfter != 0
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

  async makeRequest(request, params, body) {
    return new Promise(async (resolve, reject) => {
      const actualRequest = this.#endpoints[request];

      const toHash =
        actualRequest.method +
        actualRequest.path(
          params
            ? params.map((v, i) =>
                actualRequest.majorParams.includes(i) ? v : null,
              )
            : [],
        );
      const hash = hashjs.sha256().update(toHash).digest("hex");

      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `ADD ${hash} to request queue`,
      );

      if (!this.#queues[hash])
        this.#queues[hash] = FastQ.promise(this.#queueWorker, 1);

      let retries = 5;

      while (retries--)
        try {
          const result = await this.#queues[hash].push({
            hash,
            request,
            params,
            body,
          });
          if (this.#queues[hash].idle()) delete this.#queues[hash];
          return resolve(result);
        } catch (error) {
          return reject(error);
        }

      return reject(new Error("GLUON: Request ran out of retries"));
    });
  }

  async #http(hash, request, params, body, resolve, reject) {
    const actualRequest = this.#endpoints[request];

    const path = actualRequest.path(...(params ?? []));

    const bucket = await getBucket(
      this.#_client,
      this.#localRatelimitCache,
      hash,
    );

    if (
      !bucket ||
      bucket.remaining != 0 ||
      (bucket.remaining === 0 &&
        new Date().getTime() / 1000 > bucket.reset + this.#latency)
    ) {
      const serialize = (obj) => {
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
        actualRequest.method != "GET" &&
        actualRequest.method != "DELETE"
      )
        headers["Content-Type"] = "application/json";

      if (
        body &&
        actualRequest.useHeaders &&
        actualRequest.useHeaders.length != 0
      )
        for (const [key, value] of Object.entries(body))
          if (actualRequest.useHeaders.includes(key)) {
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
                    actualRequest.method != "GET" &&
                    actualRequest.method != "DELETE"
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

      if (!res) return reject(e);

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
          res.status === 429 ? json.retry_after : 0,
        );
      } catch (error) {
        console.error(error);
      }

      if (res.ok) resolve(json);
      else
        reject(
          new Error(
            `GLUON: ${res.status} ${actualRequest.method} ${actualRequest.path(
              ...(params ?? []),
            )} FAILED`,
          ),
        );

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
    } else {
      const retryNextIn =
        Math.ceil(bucket.reset - new Date().getTime() / 1000) + this.#latency;

      setTimeout(() => {
        reject(
          new Error(`GLUON: 429 - Hit ratelimit, retry in ${retryNextIn}`),
        );
      }, 1500);

      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.WARN,
        `READD ${hash} to request queue`,
      );
    }
  }
}

export default BetterRequestHandler;
