import fetch from "node-fetch";
import FormData from "form-data";
import { createReadStream } from "fs";
import hashjs from "hash.js";
import FastQ from "fastq";
import { getBucket, handleBucket } from "./bucket.js";
import {
  GLUON_VERSION,
  API_BASE_URL,
  VERSION,
  NAME,
  GLUON_REPOSITORY_URL,
} from "../constants.js";
import endpoints from "./endpoints.js";
import { sleep } from "../util/general/sleep.js";
import type {
  EndpointIndexItem,
  Client as ClientType,
  FileUpload,
} from "typings/index.d.ts";
import { Events, GluonDebugLevels } from "#typings/enums.js";
import {
  GluonRatelimitEncountered,
  GluonRequestError,
} from "#typings/errors.js";
import https from "https";
const AbortController = globalThis.AbortController;

interface QueueItemData {
  hash: string;
  request: keyof typeof endpoints;
  params: string[];
  body: { [key: string]: boolean | string | number | unknown } & {
    files?: FileUpload[];
  };
  _stack: string;
}

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
  #queues: { [key: string]: FastQ.queueAsPromised<QueueItemData> } = {};
  #latencyMs = 0;
  #agent;
  constructor(client: ClientType, token: string, options?: { ip?: string }) {
    this.#_client = client;

    this.#agent = new https.Agent({ localAddress: options?.ip });

    this.#requestURL = `${API_BASE_URL}/v${VERSION}`;

    this.#token = token;
    this.#authorization = `Bot ${this.#token}`;

    this.#latency = 1;
    this.#maxRetries = 3;
    this.#maxQueueSize = 100;
    this.#fuzz = 500;

    this.#endpoints = endpoints;

    this.#queueWorker = async (data: QueueItemData) => {
      const bucket = await getBucket(data.hash);
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
          GluonDebugLevels.Warn,
          `RATELIMITED ${data.hash} (bucket reset):${
            bucket.reset
          } (latency):${this.#latency}  (time until retry):${
            (bucket.reset + this.#latency) * 1000 - new Date().getTime()
          } (current time):${(new Date().getTime() / 1000) | 0}`,
        );
        if (this.#queues[data.hash].length() > this.#maxQueueSize) {
          this.#_client._emitDebug(
            GluonDebugLevels.Danger,
            `KILL QUEUE ${data.hash}`,
          );
          this.#queues[data.hash].kill();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [data.hash]: _, ...rest } = this.#queues;
          this.#queues = rest;
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
  }

  /**
   * The latency of the request handler.
   * @type {Number}
   * @readonly
   */
  get latency() {
    return this.#latencyMs;
  }

  async makeRequest(
    request: keyof typeof endpoints,
    params: string[],
    body: { [key: string]: boolean | string | number | unknown } & {
      files?: FileUpload[];
    },
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
      GluonDebugLevels.Info,
      `ADD ${hash} to request queue`,
    );

    if (!this.#queues[hash]) {
      this.#queues[hash] = FastQ.promise(this.#queueWorker, 1);
    }

    let retries = 5;

    while (retries--) {
      const _stack = new Error().stack as string;
      const data: QueueItemData = {
        hash,
        request,
        params,
        body,
        _stack,
      };
      const result = await this.#queues[hash].push(data);
      if (this.#queues[hash].idle()) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [hash]: _, ...rest } = this.#queues;
        this.#queues = rest;
      }
      return result;
    }

    throw new Error("GLUON: Request ran out of retries");
  }

  async #http(
    hash: string,
    request: keyof typeof endpoints,
    params: string[],
    body: { [key: string]: boolean | string | number | unknown } & {
      files?: FileUpload[];
    },
    _stack: string,
  ) {
    const actualRequest = this.#endpoints[request] as EndpointIndexItem;

    const path = actualRequest.path(...(params ?? []));

    const bucket = await getBucket(hash);

    if (
      !bucket ||
      bucket.remaining !== 0 ||
      (bucket.remaining === 0 &&
        new Date().getTime() / 1000 > bucket.reset + this.#latency)
    ) {
      const serialize = (obj: Record<string, number | boolean | string>) => {
        const str = [];
        for (const p in obj)
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
              : createReadStream(body.files[i].attachment as string),
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [key]: _, ...rest } = body;
            body = rest;
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
                ? `?${serialize(body as Record<string, number | boolean | string>)}`
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
              agent: this.#agent,
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        json = null;
      }

      try {
        await handleBucket(
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

      this.#_client.emit(Events.REQUEST_COMPLETED, {
        status: res.status,
        method: actualRequest.method,
        endpoint: actualRequest.path(...(params ?? [])),
        hash,
      });

      this.#_client._emitDebug(
        GluonDebugLevels.Info,
        `REMOVE ${hash} from request queue (${this.#latencyMs}ms)`,
      );

      if (res.ok) {
        return json;
      } else {
        throw new GluonRequestError(
          res.status,
          actualRequest.method,
          actualRequest.path(...(params ?? [])),
          _stack,
          JSON.stringify(json),
        );
      }
    } else {
      const retryNextIn =
        Math.ceil(bucket.reset - new Date().getTime() / 1000) + this.#latency;

      await sleep(1500);

      this.#_client._emitDebug(
        GluonDebugLevels.Warn,
        `READD ${hash} to request queue`,
      );

      throw new GluonRatelimitEncountered(
        429,
        actualRequest.method,
        actualRequest.path(...(params ?? [])),
        _stack,
        retryNextIn,
      );
    }
  }
}

export default BetterRequestHandler;
