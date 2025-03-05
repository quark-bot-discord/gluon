import { GatewayOpcodes, GatewayResume } from "#typings/discord.js";
import erlpack from "erlpack";

function _resume(token: string, session_id: string, seq: number): Buffer {
  const payload: GatewayResume = {
    op: GatewayOpcodes.Resume,
    d: {
      token,
      session_id,
      seq,
    },
  };
  return erlpack.pack(payload);
}

export default _resume;
