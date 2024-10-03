import { expect } from "chai";
import escapedString from "../../../src/util/discord/escapedString.js";

describe("escapedString", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(escapedString).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if the input is not a string", function () {
      expect(() => escapedString(123)).to.throw(
        TypeError,
        "GLUON: String must be provided.",
      );
    });
  });

  context("check escaped string", function () {
    it("should return the escaped string", function () {
      const str = "`*~_\\";
      const escapedStr = escapedString(str);
      expect(escapedStr).to.equal("\\`\\*\\~\\_\\\\");
    });
    it("should return the same string if no special characters are present", function () {
      const str = "test";
      const escapedStr = escapedString(str);
      expect(escapedStr).to.equal("test");
    });
  });
});
