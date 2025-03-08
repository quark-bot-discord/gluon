/**
 * Generates a heartbeat payload for the gateway.
 *
 * @param d - The heartbeat interval or null.
 * @returns A Buffer containing the packed heartbeat payload.
 */
export declare function _heartbeat(d: number | null): Buffer;
