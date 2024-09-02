import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../src/testData.js";

describe("GET /channels/${channel_id}/webhooks", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("getChannelWebhooks")).to.be
        .fulfilled;
    });
  });
});
