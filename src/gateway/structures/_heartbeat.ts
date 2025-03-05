import { GatewayHeartbeat } from "discord-api-types/v10";
import erlpack from "erlpack";

function _heartbeat(d: number | null): Buffer {
  const payload: GatewayHeartbeat = {
    op: 1,
    d: d ? d : null,
  };
  return erlpack.pack(payload);
}

export default _heartbeat;
