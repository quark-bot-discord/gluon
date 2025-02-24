import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../../src/testData.js";
describe("PATCH /webhooks/${interaction_id}/${interaction_token}/messages/@original", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(
        client.request.makeRequest("patchOriginalInteractionResponse"),
      ).to.be.fulfilled;
    });
  });
});
//# sourceMappingURL=request.js.map
