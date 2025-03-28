import erlpack from "erlpack";
import { NAME, GLUON_VERSION } from "../../constants.js";
import { GatewayOpcodes, PresenceUpdateStatus } from "#typings/discord.js";
/**
 * Constructs and returns a Buffer containing the identification payload for the gateway.
 *
 * @param token - The authentication token for the gateway.
 * @param shard - An array containing the shard ID and the total number of shards.
 * @param intents - The bitwise value representing the intents for the gateway connection.
 * @returns A Buffer containing the packed identification payload.
 */
export function _identify(token, shard, intents) {
  const payload = {
    op: GatewayOpcodes.Identify,
    d: {
      token,
      properties: {
        os: "linux",
        browser: `${NAME} (${GLUON_VERSION})`,
        device: `${NAME} (${GLUON_VERSION})`,
      },
      large_threshold: 250,
      shard,
      presence: {
        activities: [
          {
            name: `Starting shard ${shard[0]}...`,
            type: 0,
          },
        ],
        status: PresenceUpdateStatus.Idle,
        since: null,
        afk: true,
      },
      intents,
    },
  };
  return erlpack.pack(payload);
}
//# sourceMappingURL=_identify.js.map
