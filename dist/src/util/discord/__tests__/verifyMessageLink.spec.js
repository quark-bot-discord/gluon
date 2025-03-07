import { expect } from "chai";
import verifyMessageLink from "../verifyMessageLink.js";
describe("VerifyMessageLink", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(verifyMessageLink).to.be.a("function");
    });
  });
  context("check invalid input", function () {
    it("should throw an error if no message link is provided", function () {
      expect(() => verifyMessageLink()).to.throw(
        TypeError,
        "GLUON: The text must be a string.",
      );
    });
    it("should throw an error if message link is not a string", function () {
      expect(() => verifyMessageLink(123456)).to.throw(
        TypeError,
        "GLUON: The text must be a string.",
      );
    });
    it("should throw an error if the text provided is too long", function () {
      const messageLink = "a".repeat(4001);
      expect(() => verifyMessageLink(messageLink)).to.throw(
        RangeError,
        "GLUON: Text must be less than 4000 characters.",
      );
    });
  });
  context("check verified message link", function () {
    it("should return the correct verified message link", function () {
      const messageLink =
        "test https://discord.com/channels/12345678/1234567/123456 test";
      const verifiedMessageLink = verifyMessageLink(messageLink);
      expect(verifiedMessageLink).to.equal(
        "https://discord.com/channels/12345678/1234567/123456",
      );
    });
    it("should return null if no message link is found", function () {
      const messageLink = "test test";
      const verifiedMessageLink = verifyMessageLink(messageLink);
      expect(verifiedMessageLink).to.equal(null);
    });
  });
});
//# sourceMappingURL=verifyMessageLink.spec.js.map
