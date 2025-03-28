import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../testData.js";
describe("GET /guilds/${guild_id}/channels", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("getGuildChannels")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.spec.js.map
