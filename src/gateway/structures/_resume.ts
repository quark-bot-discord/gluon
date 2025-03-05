import { GatewayResume } from "discord-api-types/v10";
import erlpack from "erlpack";

function _resume(token: string, session_id: string, seq: number): Buffer {
  const payload: GatewayResume = {
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
