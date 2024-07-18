let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const hexToInt = require("../../../src/util/general/hexToInt");

describe("HexToInt", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(hexToInt).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no hex is provided", function () {
      expect(() => hexToInt(undefined)).to.throw(
        TypeError,
        "GLUON: Hex string must be a string."
      );
    });
    it("should throw an error if hex is not a string", function () {
      expect(() => hexToInt(123456)).to.throw(
        TypeError,
        "GLUON: Hex string must be a string."
      );
    });
    it("should throw an error if hex is not a valid hex string", function () {
      expect(() => hexToInt("test")).to.throw(
        TypeError,
        "GLUON: Hex string must be a valid hex string."
      );
    });
  });

  context("check hex to int", function () {
    it("should return the correct integer", function () {
      const result = hexToInt("deadbeef");
      expect(result).to.equal(3735928559);
    });
  });
});
