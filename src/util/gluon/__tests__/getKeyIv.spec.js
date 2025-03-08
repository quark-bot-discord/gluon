import { expect } from "chai";
import { getKeyIv } from "../getKeyIv.js";

describe("GetKeyIv", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(getKeyIv).to.be.a("function");
    });
  });

  context("check valid output", function () {
    it("should return an object", function () {
      expect(getKeyIv("key", "iv")).to.be.an("object");
    });
    it("should return an object with key and iv properties", function () {
      expect(getKeyIv("key", "iv")).to.have.property("key");
      expect(getKeyIv("key", "iv")).to.have.property("iv");
    });
    it("should return an object with key and iv properties that are strings", function () {
      expect(getKeyIv("key", "iv").key).to.be.a("string");
      expect(getKeyIv("key", "iv").iv).to.be.a("string");
    });
  });

  context("check key and iv", function () {
    it("should return the correct key and iv", function () {
      const { key, iv } = getKeyIv("key", "iv");
      expect(key).to.equal("f46274e9a40c018d174e1b7b74dc363f");
      expect(iv).to.equal("2d0e1399e68f31de");
    });
  });
});
