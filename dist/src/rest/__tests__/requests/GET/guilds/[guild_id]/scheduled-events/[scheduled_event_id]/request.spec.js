import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../../testData.js";
describe("GET /guilds/${guild_id}/scheduled-events/${scheduled_event_id}", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("getGuildScheduledEvent")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.spec.js.map
