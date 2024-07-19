let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const getGuildIcon = require("../../../src/util/image/getGuildIcon");
const { TEST_DATA } = require("../../../src/constants");

describe("GetGuildIcon", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(getGuildIcon).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no guild id is provided", function () {
      expect(() => getGuildIcon(undefined, "hash")).to.throw(
        TypeError,
        "GLUON: Guild id must be provided.",
      );
    });
    it("should throw an error if the hash is not a string and not null", function () {
      expect(() => getGuildIcon(TEST_DATA.GUILD_ID, 123)).to.throw(
        TypeError,
        "GLUON: Guild icon hash must be a string.",
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      expect(getGuildIcon(TEST_DATA.GUILD_ID, "hash")).to.be.a("string");
    });
    it("should return null if no hash is provided", function () {
      expect(getGuildIcon(TEST_DATA.GUILD_ID)).to.be.null;
    });
    it("should return the correct icon url", function () {
      expect(getGuildIcon(TEST_DATA.GUILD_ID, "hash")).to.equal(
        `https://cdn.discordapp.com/icons/${TEST_DATA.GUILD_ID}/hash.png`,
      );
    });
    it("should return the correct icon url for a gif", function () {
      expect(getGuildIcon(TEST_DATA.GUILD_ID, "a_hash")).to.equal(
        `https://cdn.discordapp.com/icons/${TEST_DATA.GUILD_ID}/a_hash.gif`,
      );
    });
  });
});
