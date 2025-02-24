import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../../../src/testData.js";
describe("PUT /guilds/${guild_id}/members/${user_id}/roles/${role_id}", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("putAddGuildMemberRole")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.js.map
