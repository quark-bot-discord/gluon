import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../../testData.js";
describe("POST /channels/${channel_id}/messages/bulk-delete", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("postBulkDeleteMessages")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.spec.js.map
