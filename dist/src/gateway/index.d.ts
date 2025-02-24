export default Shard;
declare class Shard {
    constructor(client: any, token: any, url: any, shardId: any, sessionId?: any, sequence?: any, resumeGatewayUrl?: any);
    shard: any;
    halt(): void;
    check(): {
        shard: any;
        websocketState: any;
        lastReconnect: any;
        latency: number;
    };
    jitter(): number;
    updatePresence(name: any, type: any, status: any, afk: any, since: any): void;
    getSessionData(): {
        sessionId: any;
        sequence: any;
        resumeGatewayUrl: any;
    };
    zlib: import("zlib-sync").Inflate;
    terminateSocketTimeout: NodeJS.Timeout;
    resetRetries(): void;
    /**
     * @param {String} id
     */
    set sessionId(id: string);
    /**
     * @param {String} url
     */
    set resumeGatewayUrl(url: string);
    #private;
}
//# sourceMappingURL=index.d.ts.map