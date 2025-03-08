import { GatewayOpcodes, GatewayResume } from "#typings/discord.js";
import erlpack from "erlpack";

/**
 * Creates a buffer containing the resume payload for the gateway.
 *
 * @param token - The authentication token.
 * @param session_id - The session ID to resume.
 * @param seq - The last sequence number received.
 * @returns A buffer containing the packed resume payload.
 */
export function _resume(
  token: string,
  session_id: string,
  seq: number,
): Buffer {
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
