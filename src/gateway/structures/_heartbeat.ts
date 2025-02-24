import erlpack from "erlpack";
import { Heartbeat } from "src/gateway.js";

function _heartbeat(d: number): Buffer {
  const payload: Heartbeat = {
    op: 1,
    d: d ? d : null,
  };
  return erlpack.pack(payload);
}

export default _heartbeat;
