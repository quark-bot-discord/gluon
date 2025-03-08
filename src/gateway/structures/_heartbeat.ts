import { GatewayHeartbeat, GatewayOpcodes } from "#typings/discord.js";
import erlpack from "erlpack";

/**
 * Generates a heartbeat payload for the gateway.
 *
 * @param d - The heartbeat interval or null.
 * @returns A Buffer containing the packed heartbeat payload.
 */
export function _heartbeat(d: number | null): Buffer {
  const payload: GatewayHeartbeat = {
    op: GatewayOpcodes.Heartbeat,
    d: d ? d : null,
  };
  return erlpack.pack(payload);
}
