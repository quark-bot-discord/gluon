declare class Shard {
  #private;
  shard: any;
  terminateSocketTimeout: any;
  zlib: any;
  constructor(
    client: any,
    token: any,
    url: any,
    shardId: any,
    sessionId?: null,
    sequence?: null,
    resumeGatewayUrl?: null,
  );
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
  resetRetries(): void;
  /**
   * @param {String} id
   */
  set sessionId(id: any);
  /**
   * @param {String} url
   */
  set resumeGatewayUrl(url: any);
}
export default Shard;
