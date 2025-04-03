import fetch from "node-fetch";
import FormData from "form-data";
import { createReadStream } from "fs";
import hashjs from "hash.js";
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
import { GluonRequestError } from "#typings/errors.js";
import https from "https";
import { randomUUID } from "crypto";
const AbortController = globalThis.AbortController;

interface JsonResponse {
  retry_after?: number;
  global?: boolean;
  [key: string]: unknown;
}

const redis = new Redis();

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

async function incrWithExpire(key: string, expireSeconds = 1): Promise<number> {
  const lua = `
    local current = redis.call('INCR', KEYS[1])
    if tonumber(current) == 1 then
      redis.call('EXPIRE', KEYS[1], ARGV[1])
    end
    return current
  `;
  return redis.eval(lua, 1, key, expireSeconds) as Promise<number>;
}

class BetterRequestHandler {
  #token;
  #authorization;
  #_client;
  #requestURL;
  #maxRetries;
  #fuzz;
  #endpoints;
  #queueWorker: (data: QueueItemData) => Promise<JsonResponse | null>;
  #latencyMs = 0;
  #agent;
  #rpsLimit: number;
  GLOBAL_KEY: string;

  constructor(
    client: ClientType,
    token: string,
    options?: { ip?: string; rpsLimit?: number },
  ) {
    this.#_client = client;
    this.#agent = new https.Agent({ localAddress: options?.ip });
    this.#requestURL = `${API_BASE_URL}/v${VERSION}`;
    this.#token = token;
    this.#authorization = `Bot ${this.#token}`;
    this.#maxRetries = 3;
    this.#fuzz = 500;
    this.#rpsLimit = options?.rpsLimit || 50;
    this.#endpoints = endpoints;
    this.GLOBAL_KEY = `gluon:${this.#token.slice(0, 8)}:global_rate_limit`;

    this.#queueWorker = async (data: QueueItemData) => {
      this.#_client._emitDebug(
        GluonDebugLevels.Info,
        `Processing ${data.hash} (${data.request})`,
      );

      await sleep(Math.random() * 20 + 10); // smooth out request wavefronts

      const nowMs = Date.now();
      // Check global lock
      const globalReset = await redis.get(this.GLOBAL_KEY);
      if (globalReset && nowMs < parseInt(globalReset)) {
        const wait = parseInt(globalReset) - nowMs + this.#fuzz;
        this.#_client._emitDebug(
          GluonDebugLevels.Warn,
          `Global ratelimit: sleeping ${wait}ms`,
        );
        await sleep(wait);
      }

      // Acquire lock for this bucket (distributed mutex)
      const lockKey = `gluon:lock:${data.hash}`;
      const lockId = randomUUID();
      const bucket = await getBucket(data.hash);
      const estimatedReset = bucket
        ? bucket.reset * 1000 - nowMs + this.#fuzz
        : 15000;
      const safeTTL = Math.max(5000, Math.min(estimatedReset, 30000));
      const lock = await redis.set(lockKey, lockId, "PX", safeTTL, "NX");
      if (!lock) {
        this.#_client._emitDebug(
          GluonDebugLevels.Warn,
          `Bucket locked: ${data.hash}`,
        );
        await sleep(200 + Math.random() * 300);
        return this.#queueWorker(data); // retry
      }

      try {
        const bucket = await getBucket(data.hash);
        const nowSec = Date.now() / 1000;

        if (bucket && bucket.remaining === 0 && nowSec < bucket.reset) {
          const delay = Math.ceil((bucket.reset - nowSec) * 1000) + this.#fuzz;
          this.#_client._emitDebug(
            GluonDebugLevels.Warn,
            `Bucket ratelimited: ${data.hash}, sleeping ${delay}ms`,
          );
          await sleep(delay);
        }

        // Enforce global RPS limit
        const baseKey = `gluon:rps:token:${this.#token.slice(0, 10)}`;
        const currentCount = await incrWithExpire(baseKey);
        if (currentCount > this.#rpsLimit) {
          this.#_client._emitDebug(
            GluonDebugLevels.Warn,
            `RPS limit hit: ${currentCount} reqs/s (${data.hash})`,
          );
          await sleep(200 + Math.random() * 300);
          return this.#queueWorker(data);
        }

        return this.#http(
          data.hash,
          data.request,
          data.params,
          data.body,
          data._stack,
        );
      } finally {
        const currentLock = await redis.get(lockKey);
        if (currentLock === lockId) {
          this.#_client._emitDebug(
            GluonDebugLevels.Info,
            `Releasing lock for ${data.hash}`,
          );
          await redis.del(lockKey);
        }
      }
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

    const _stack = new Error().stack as string;
    const data: QueueItemData = { hash, request, params, body, _stack };
    const result = await this.#queueWorker(data);

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
      const clonedBody = { ...body }; // avoid mutating original
      clonedBody.files?.forEach((f, i) => {
        if (f.stream?.readableEnded) {
          throw new Error("Cannot retry: file stream already ended");
        }
        return form?.append(
          `files[${i}]`,
          f.stream || createReadStream(f.attachment as string),
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
        this.#latencyMs = Date.now() - requestTime;
        break;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          this.#_client._emitDebug(
            GluonDebugLevels.Danger,
            `Request timed out ${hash}`,
          );
          throw new GluonRequestError(0, actualRequest.method, path, _stack);
        }
        this.#_client._emitDebug(
          GluonDebugLevels.Warn,
          `Request failed ${hash} ${err}`,
        );
        if (i === this.#maxRetries) throw err;
        await sleep(2 ** i * 200 + Math.random() * 300);
      } finally {
        clearTimeout(timeout);
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
      this.#_client._emitDebug(
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

    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `[Request] bucket: ${res.headers.get("x-ratelimit-bucket")} remaining: ${res.headers.get("x-ratelimit-remaining")} reset: ${res.headers.get("x-ratelimit-reset")}`,
    );
    const resetAfterHeader = res.headers.get("x-ratelimit-reset-after");
    if (resetAfterHeader) {
      const resetAfterSeconds = parseFloat(resetAfterHeader);
      const serverResetTime = Date.now() / 1000 + resetAfterSeconds;
      await handleBucket(
        res.headers.get("x-ratelimit-bucket"),
        res.headers.get("x-ratelimit-remaining"),
        serverResetTime.toString(),
        hash,
        res.status === 429 ? json?.retry_after : 0,
      );
    } else {
      await handleBucket(
        res.headers.get("x-ratelimit-bucket"),
        res.headers.get("x-ratelimit-remaining"),
        res.headers.get("x-ratelimit-reset"),
        hash,
        res.status === 429 ? json?.retry_after : 0,
      );
    }

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
