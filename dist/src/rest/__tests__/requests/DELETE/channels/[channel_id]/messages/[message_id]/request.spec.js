import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../../testData.js";
describe("DELETE /channels/${channel_id}/messages/${message_id}", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("deleteChannelMessage")).to.be
        .fulfilled;
    });
  });
});
//# sourceMappingURL=request.spec.js.map
