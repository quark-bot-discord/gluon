import { expect } from "chai";
import erlpack from "erlpack";
import { _identify } from "../_identify.js";
import { NAME, GLUON_VERSION } from "../../../constants.js";
import { GatewayOpcodes, PresenceUpdateStatus } from "#typings/discord.js";
describe("_identify", function () {
  const token = "test_token";
  const shard = [0, 1];
  const intents = 513;
  it("should return a Buffer containing the packed identification payload", function () {
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
    const packedPayload = erlpack.pack(payload);
    const result = _identify(token, shard, intents);
    expect(result).to.be.instanceOf(Buffer);
    expect(result).to.deep.equal(packedPayload);
  });
});
//# sourceMappingURL=_identify.spec.js.map
