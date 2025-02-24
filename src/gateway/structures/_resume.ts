import erlpack from "erlpack";
import { Resume } from "src/gateway.js";

function _resume(token: string, session_id: string, seq: number): Buffer {
  const payload: Resume = {
    op: 6,
    d: {
      token,
      session_id,
      seq,
    },
  };
  return erlpack.pack(payload);
}

export default _resume;
