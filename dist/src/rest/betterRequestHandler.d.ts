import endpoints from "./endpoints.js";
import type { Client as ClientType } from "typings/index.d.ts";
declare class BetterRequestHandler {
  #private;
  constructor(client: ClientType, token: string);
  /**
   * The latency of the request handler.
   * @type {Number}
   * @readonly
   */
  get latency(): any;
  makeRequest(
    request: keyof typeof endpoints,
    params: string[],
    body: any,
  ): Promise<any>;
}
export default BetterRequestHandler;
