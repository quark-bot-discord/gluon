import { expect } from "chai";
import { encryptText } from "../encryptText.js";
describe("EncryptText", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(encryptText).to.be.a("function");
    });
  });
  context("check invalid input", function () {
    it("should throw an error if the key is not 32 characters long", function () {
      expect(() =>
        encryptText("test", "a".repeat(31), "a".repeat(16)),
      ).to.throw(
        RangeError,
        "GLUON: Encryption key must be 32 characters long.",
      );
    });
    it("should throw an error if the iv is not 16 characters long", function () {
      expect(() =>
        encryptText("test", "a".repeat(32), "a".repeat(15)),
      ).to.throw(
        RangeError,
        "GLUON: Encryption IV must be 16 characters long.",
      );
    });
  });
  context("check encrypted text", function () {
    it("should return the correct encrypted text", function () {
      const text = "test";
      const encryptedText = encryptText(text, "a".repeat(32), "a".repeat(16));
      expect(encryptedText).to.equal("2Jn9Z9HL+ToM05/a/RGQhA==");
    });
  });
});
//# sourceMappingURL=encryptText.spec.js.map
