import { expect } from "chai";
import { TEST_DATA } from "../../../src/constants.js";
import getMemberAvatar from "../../../src/util/image/getMemberAvatar.js";

describe("GetMemberAvatar", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(getMemberAvatar).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no member id is provided", function () {
      expect(() =>
        getMemberAvatar(undefined, TEST_DATA.GUILD_ID, "hash"),
      ).to.throw(TypeError, "GLUON: Member id must be provided.");
    });
    it("should throw an error if no guild id is provided", function () {
      expect(() =>
        getMemberAvatar(TEST_DATA.MEMBER_ID, undefined, "hash"),
      ).to.throw(TypeError, "GLUON: Guild id must be provided.");
    });
    it("should throw an error if the hash is not a string and not null", function () {
      expect(() =>
        getMemberAvatar(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID, 123),
      ).to.throw(TypeError, "GLUON: Member avatar hash must be a string.");
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      expect(
        getMemberAvatar(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID, "hash"),
      ).to.be.a("string");
    });
    it("should return null if no hash is provided", function () {
      expect(getMemberAvatar(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID)).to.be
        .null;
    });
    it("should return the correct avatar url", function () {
      expect(
        getMemberAvatar(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID, "hash"),
      ).to.equal(
        `https://cdn.discordapp.com/guilds/${TEST_DATA.GUILD_ID}/users/${TEST_DATA.MEMBER_ID}/avatars/hash.png`,
      );
    });
    it("should return the correct avatar url for a gif", function () {
      expect(
        getMemberAvatar(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID, "a_hash"),
      ).to.equal(
        `https://cdn.discordapp.com/guilds/${TEST_DATA.GUILD_ID}/users/${TEST_DATA.MEMBER_ID}/avatars/a_hash.gif`,
      );
    });
  });
});
