import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../../testData.js";

describe("DELETE /guilds/${guild_id}/bans/${user_id}", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("deleteRemoveGuildBan")).to.be
        .fulfilled;
    });
  });
});
