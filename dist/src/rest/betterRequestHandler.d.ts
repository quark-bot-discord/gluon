declare class BetterRequestHandler {
  #private;
  constructor(client: any, token: any);
  /**
   * The latency of the request handler.
   * @type {Number}
   * @readonly
   */
  get latency(): any;
  makeRequest(request: any, params: any, body: any): Promise<any>;
}
export default BetterRequestHandler;
