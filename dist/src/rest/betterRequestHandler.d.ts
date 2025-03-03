import endpoints from "./endpoints.js";
declare class BetterRequestHandler {
  #private;
  constructor(client: any, token: string);
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
