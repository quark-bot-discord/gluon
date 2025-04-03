import endpoints from "./endpoints.js";
import type { Client as ClientType, FileUpload } from "typings/index.d.ts";
interface JsonResponse {
  retry_after?: number;
  global?: boolean;
  [key: string]: unknown;
}
declare class BetterRequestHandler {
  #private;
  GLOBAL_KEY: string;
  constructor(
    client: ClientType,
    token: string,
    options?: {
      ip?: string;
      rpsLimit?: number;
      apiBaseUrl?: string;
    },
  );
  get latency(): number;
  makeRequest(
    request: keyof typeof endpoints,
    params: string[],
    body: {
      [key: string]: boolean | string | number | unknown;
    } & {
      files?: FileUpload[];
    },
  ): Promise<JsonResponse | null>;
}
export default BetterRequestHandler;
