import { expect } from "chai";
import Client from "../../../../../src/Client.js";
import BetterRequestHandler from "../../../../../src/rest/betterRequestHandler.js";

describe("GET /gateway/bot", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const requestHandler = new BetterRequestHandler(new Client(), "token");
      await expect(requestHandler.makeRequest("getGatewayBot")).to.be.fulfilled;
    });
  });
});
