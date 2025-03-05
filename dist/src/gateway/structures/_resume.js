import { GatewayOpcodes } from "#typings/discord.js";
import erlpack from "erlpack";
function _resume(token, session_id, seq) {
  const payload = {
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
//# sourceMappingURL=_resume.js.map
