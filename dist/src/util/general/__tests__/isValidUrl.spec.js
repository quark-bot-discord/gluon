import { expect } from "chai";
import isValidUrl from "../isValidUrl.js";
describe("isValidUrl", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(isValidUrl).to.be.a("function");
    });
  });
  context("check valid URLs", function () {
    it("should return true for valid URLs", function () {
      expect(isValidUrl("https://example.com")).to.be.true;
      expect(isValidUrl("http://example.com")).to.be.true;
      expect(isValidUrl("https://example.com/test")).to.be.true;
      expect(isValidUrl("http://example.com/test")).to.be.true;
      expect(isValidUrl("https://example.com/test?query=123")).to.be.true;
      expect(isValidUrl("http://example.com/test?query=123")).to.be.true;
    });
  });
  context("check invalid URLs", function () {
    it("should return false for invalid URLs", function () {
      expect(isValidUrl("example.com")).to.be.false;
      expect(isValidUrl("example")).to.be.false;
    });
  });
});
//# sourceMappingURL=isValidUrl.spec.js.map
