/**
 * Constructs and returns a Buffer containing the identification payload for the gateway.
 *
 * @param token - The authentication token for the gateway.
 * @param shard - An array containing the shard ID and the total number of shards.
 * @param intents - The bitwise value representing the intents for the gateway connection.
 * @returns A Buffer containing the packed identification payload.
 */
export declare function _identify(
  token: string,
  shard: [number, number],
  intents: number,
): Buffer;
