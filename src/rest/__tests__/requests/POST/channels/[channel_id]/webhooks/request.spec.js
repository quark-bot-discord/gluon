import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../../testData.js";

describe("POST /channels/${channel_id}/webhooks", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("postCreateWebhook")).to.be
        .fulfilled;
    });
  });
});
