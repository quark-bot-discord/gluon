let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const resolveEmoji = require("../../../src/util/discord/resolveEmoji");

describe("ResolveEmoji", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(resolveEmoji).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no emoji is provided", function () {
      expect(() => resolveEmoji()).to.throw(
        TypeError,
        "GLUON: The emoji must be a string."
      );
    });
    it("should throw an error if emoji is not a string", function () {
      expect(() => resolveEmoji(123456)).to.throw(
        TypeError,
        "GLUON: The emoji must be a string."
      );
    });
  });

  context("check resolved emoji", function () {
    it("should return the correct resolved emoji", function () {
      const emoji = "<:test:123456>";
      const resolvedEmoji = resolveEmoji(emoji);
      expect(resolvedEmoji.name).to.equal("test");
      expect(resolvedEmoji.id).to.equal("123456");
    });
    it("should return the correct resolved emoji without id", function () {
      const emoji = "☦️";
      const resolvedEmoji = resolveEmoji(emoji);
      expect(resolvedEmoji.name).to.equal("☦️");
      expect(resolvedEmoji.id).to.equal(null);
    });
  });
});
