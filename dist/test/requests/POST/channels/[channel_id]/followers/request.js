import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../src/testData.js";
describe("POST /channels/${channel_id}/followers", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("postFollowNewsChannel")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.js.map
