import ZlibSync from "zlib-sync";
import type { Client as ClientType } from "typings/index.d.ts";
import { PresenceStatus, PresenceType } from "#src/gateway.js";
declare class Shard {
  #private;
  shard: number;
  terminateSocketTimeout: NodeJS.Timeout | null;
  zlib: ZlibSync.Inflate;
  constructor(
    client: ClientType,
    token: string,
    url: string,
    shardId: number,
    sessionId?: string | null,
    sequence?: number | null,
    resumeGatewayUrl?: string | null,
  );
  halt(): void;
  check(): {
    shard: number;
    websocketState: any;
    lastReconnect: any;
    latency: number;
  };
  jitter(): number;
  updatePresence(
    name: string,
    type?: PresenceType,
    status?: PresenceStatus,
    afk?: boolean,
    since?: number | null,
  ): void;
  getSessionData(): {
    sessionId: string | null;
    sequence: number | null;
    resumeGatewayUrl: string | null;
  };
  resetRetries(): void;
  /**
   * @param {String} id
   */
  set sessionId(id: string);
  /**
   * @param {String} url
   */
  set resumeGatewayUrl(url: string);
}
export default Shard;
