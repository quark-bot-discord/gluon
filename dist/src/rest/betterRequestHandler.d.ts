export default BetterRequestHandler;
declare class BetterRequestHandler {
    constructor(client: any, token: any);
    /**
     * The latency of the request handler.
     * @type {Number}
     * @readonly
     */
    readonly get latency(): number;
    makeRequest(request: any, params: any, body: any): Promise<any>;
    #private;
}
//# sourceMappingURL=betterRequestHandler.d.ts.map