import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../src/testData.js";
describe("PUT /guilds/${guild_id}/bans/${user_id}", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("putCreateGuildBan")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.js.map
