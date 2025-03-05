import { GatewayHeartbeat, GatewayOpcodes } from "#typings/discord.js";
import erlpack from "erlpack";

function _heartbeat(d: number | null): Buffer {
  const payload: GatewayHeartbeat = {
    op: GatewayOpcodes.Heartbeat,
    d: d ? d : null,
  };
  return erlpack.pack(payload);
}

export default _heartbeat;
