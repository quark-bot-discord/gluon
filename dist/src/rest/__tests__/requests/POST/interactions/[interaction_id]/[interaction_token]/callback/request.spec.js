import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../../testData.js";
describe("POST /interactions/${interaction_id}/${interaction_token}/callback", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("postInteractionResponse")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.spec.js.map
