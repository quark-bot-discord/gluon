import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../testData.js";
describe("GET /channels/${channel_id}/messages", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("getChannelMessages")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.spec.js.map
