import { expect } from "chai";
import decryptText from "../../../src/util/general/decryptText.js";

describe("DecryptText", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(decryptText).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no text is provided", function () {
      expect(() =>
        decryptText(undefined, "a".repeat(32), "a".repeat(16)),
      ).to.throw(TypeError, "GLUON: Text to decrypt must be a string.");
    });
    it("should throw an error if text is not a string", function () {
      expect(() =>
        decryptText(123456, "a".repeat(32), "a".repeat(16)),
      ).to.throw(TypeError, "GLUON: Text to decrypt must be a string.");
    });
    it("should throw an error if no key is provided", function () {
      expect(() => decryptText("test", undefined, "a".repeat(16))).to.throw(
        TypeError,
        "GLUON: Decryption key must be a string.",
      );
    });
    it("should throw an error if key is not a string", function () {
      expect(() => decryptText("test", 123456, "a".repeat(16))).to.throw(
        TypeError,
        "GLUON: Decryption key must be a string.",
      );
    });
    it("should throw an error if no iv is provided", function () {
      expect(() => decryptText("test", "a".repeat(32), undefined)).to.throw(
        TypeError,
        "GLUON: Decryption IV must be a string.",
      );
    });
    it("should throw an error if iv is not a string", function () {
      expect(() => decryptText("test", "a".repeat(32), 123456)).to.throw(
        TypeError,
        "GLUON: Decryption IV must be a string.",
      );
    });
    it("should throw an error if the key is not 32 characters long", function () {
      expect(() =>
        decryptText("test", "a".repeat(31), "a".repeat(16)),
      ).to.throw(
        RangeError,
        "GLUON: Decryption key must be 32 characters long.",
      );
    });
    it("should throw an error if the iv is not 16 characters long", function () {
      expect(() =>
        decryptText("test", "a".repeat(32), "a".repeat(15)),
      ).to.throw(
        RangeError,
        "GLUON: Decryption IV must be 16 characters long.",
      );
    });
  });

  context("check decrypted text", function () {
    it("should return the correct decrypted text", function () {
      const text = "2Jn9Z9HL+ToM05/a/RGQhA==";
      const decryptedText = decryptText(text, "a".repeat(32), "a".repeat(16));
      expect(decryptedText).to.equal("test");
    });
  });
});
