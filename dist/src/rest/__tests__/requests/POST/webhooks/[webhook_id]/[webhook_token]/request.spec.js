import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../testData.js";
describe("POST /webhooks/${webhook_id}/${webhook_token}", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("postExecuteWebhook")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.spec.js.map
