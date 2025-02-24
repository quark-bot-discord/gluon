import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../src/testData.js";
describe("POST /channels/${channel_id}/messages", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("postCreateMessage")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.js.map
