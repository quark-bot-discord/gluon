import { GatewayOpcodes } from "#typings/discord.js";
import erlpack from "erlpack";
/**
 * Generates a heartbeat payload for the gateway.
 *
 * @param d - The heartbeat interval or null.
 * @returns A Buffer containing the packed heartbeat payload.
 */
export function _heartbeat(d) {
  const payload = {
    op: GatewayOpcodes.Heartbeat,
    d: d ? d : null,
  };
  return erlpack.pack(payload);
}
//# sourceMappingURL=_heartbeat.js.map
