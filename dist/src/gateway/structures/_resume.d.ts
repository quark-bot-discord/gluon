/**
 * Creates a buffer containing the resume payload for the gateway.
 *
 * @param token - The authentication token.
 * @param session_id - The session ID to resume.
 * @param seq - The last sequence number received.
 * @returns A buffer containing the packed resume payload.
 */
export declare function _resume(
  token: string,
  session_id: string,
  seq: number,
): Buffer;
