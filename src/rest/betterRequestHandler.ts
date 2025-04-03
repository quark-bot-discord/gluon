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
import type {
  EndpointIndexItem,
  Client as ClientType,
  FileUpload,
} from "typings/index.d.ts";
import { Events, GluonDebugLevels } from "#typings/enums.js";
import { GluonRequestError } from "#typings/errors.js";
import https from "https";
const AbortController = globalThis.AbortController;

interface JsonResponse {
  retry_after?: number;
  global?: boolean;
  [key: string]: unknown;
}

const redis = new Redis();

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
  #maxRetries;
  #endpoints;
  #latencyMs = 0;
  #agent;
  GLOBAL_KEY: string;

  constructor(
    client: ClientType,
    token: string,
    options?: { ip?: string; rpsLimit?: number; apiBaseUrl?: string },
  ) {
    this.#_client = client;
    this.#agent = new https.Agent({ localAddress: options?.ip });
    this.#requestURL = `${options?.apiBaseUrl ?? API_BASE_URL}/v${VERSION}`;
    this.#token = token;
    this.#authorization = `Bot ${this.#token}`;
    this.#maxRetries = 3;
    this.#endpoints = endpoints;
    this.GLOBAL_KEY = `gluon:${this.#token.slice(0, 8)}:global_rate_limit`;
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

    return this.#http(hash, request, params, body, _stack);
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
