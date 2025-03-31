import fetch from "node-fetch";
import FormData from "form-data";
import { createReadStream } from "fs";
import hashjs from "hash.js";
import FastQ from "fastq";
import { Redis } from "ioredis";
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

interface JsonResponse {
  retry_after?: number;
  global?: boolean;
  [key: string]: unknown;
}

const redis = new Redis();
const GLOBAL_KEY = "gluon:discord:global_rate_limit";

interface QueueItemData {
  hash: string;
  request: keyof typeof endpoints;
  params: string[];
  body: { [key: string]: boolean | string | number | unknown } & {
    files?: FileUpload[];
  };
  _stack: string;
}

function toQueryParams(obj: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    const val = obj[key];
    if (val === undefined || val === null) continue;
    result[key] = String(val);
  }
  return result;
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
      const now = Date.now();
      const globalReset = await redis.get(GLOBAL_KEY);
      if (globalReset && now < parseInt(globalReset)) {
        await sleep(parseInt(globalReset) - now);
      }

      const bucket = await getBucket(data.hash);
      if (
        !bucket ||
        bucket.remaining > 0 ||
        now / 1000 > bucket.reset + this.#latency
      ) {
        return this.#http(
          data.hash,
          data.request,
          data.params,
          data.body,
          data._stack,
        );
      }

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

      await sleep((bucket.reset + this.#latency) * 1000 - now + this.#fuzz);
      return this.#http(
        data.hash,
        data.request,
        data.params,
        data.body,
        data._stack,
      );
    };
  }

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

    const _stack = new Error().stack as string;
    const data: QueueItemData = { hash, request, params, body, _stack };
    const result = await this.#queues[hash].push(data);

    if (this.#queues[hash].idle()) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [hash]: _, ...rest } = this.#queues;
      this.#queues = rest;
    }

    return result;
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
    const headers: Record<string, string> = {
      Authorization: this.#authorization,
      "User-Agent": `DiscordBot (${GLUON_REPOSITORY_URL}, ${GLUON_VERSION}) ${NAME}`,
      Accept: "application/json",
    };

    let form: FormData | undefined;
    if (body?.files) {
      form = new FormData();
      body.files.forEach((f, i) =>
        form?.append(
          `${i}_${f.name}`,
          f.stream || createReadStream(f.attachment as string),
          f.name,
        ),
      );
      delete body.files;
      form.append("payload_json", JSON.stringify(body));
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
      `${this.#requestURL}${path}` +
      (body &&
      (actualRequest.method === "GET" || actualRequest.method === "DELETE")
        ? `?${new URLSearchParams(toQueryParams(body)).toString()}`
        : "");

    for (let i = 0; i <= this.#maxRetries; i++) {
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
          agent: this.#agent,
        });
        clearTimeout(timeout);
        this.#latencyMs = Date.now() - requestTime;
        this.#latency = Math.ceil(this.#latencyMs / 1000);
        break;
      } catch (err) {
        if (i === this.#maxRetries) throw err;
        await sleep(2 ** i * 100 + Math.random() * 100);
      }
    }

    if (!res) {
      this.#_client._emitDebug(GluonDebugLevels.Danger, `NO RESPONSE ${hash}`);
      throw new GluonRequestError(0, actualRequest.method, path, _stack);
    }

    let json: JsonResponse | null = null;
    try {
      json = (await res.json()) as JsonResponse;
    } catch (err) {
      this.#_client._emitDebug(
        GluonDebugLevels.Danger,
        `NO JSON ${hash} ${err}`,
      );
      json = null;
    }

    if (res.status === 429) {
      const retryAfter = (json?.retry_after || 1) * 1000;
      if (json?.global) await redis.set(GLOBAL_KEY, Date.now() + retryAfter);
      await sleep(retryAfter);
      throw new GluonRatelimitEncountered(
        res.status,
        actualRequest.method,
        path,
        _stack,
        retryAfter / 1000,
      );
    }

    await handleBucket(
      res.headers.get("x-ratelimit-bucket"),
      res.headers.get("x-ratelimit-remaining"),
      res.headers.get("x-ratelimit-reset"),
      hash,
      res.status === 429 ? json?.retry_after : 0,
    );

    this.#_client.emit(Events.REQUEST_COMPLETED, {
      status: res.status,
      method: actualRequest.method,
      endpoint: path,
      hash,
    });
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `REMOVE ${hash} from request queue (${this.#latencyMs}ms)`,
    );

    if (res.ok) return json;

    throw new GluonRequestError(
      res.status,
      actualRequest.method,
      path,
      _stack,
      JSON.stringify(json),
    );
  }
}

export default BetterRequestHandler;
