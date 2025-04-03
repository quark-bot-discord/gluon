import endpoints from "./endpoints.js";
import type { Client as ClientType, FileUpload } from "typings/index.d.ts";
declare class BetterRequestHandler {
  #private;
  GLOBAL_KEY: string;
  constructor(
    client: ClientType,
    token: string,
    options?: {
      ip?: string;
      rpsLimit?: number;
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
  ): Promise<any>;
}
export default BetterRequestHandler;
