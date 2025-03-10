import endpoints from "./endpoints.js";
import type { Client as ClientType, FileUpload } from "typings/index.d.ts";
declare class BetterRequestHandler {
  #private;
  constructor(client: ClientType, token: string);
  /**
   * The latency of the request handler.
   * @type {Number}
   * @readonly
   */
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
