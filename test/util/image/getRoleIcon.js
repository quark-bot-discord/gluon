import { expect } from "chai";
import { TEST_DATA } from "../../../src/constants.js";
import getRoleIcon from "../../../src/util/image/getRoleIcon.js";

describe("GetRoleIcon", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(getRoleIcon).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no role id is provided", function () {
      expect(() => getRoleIcon(undefined, "hash")).to.throw(
        TypeError,
        "GLUON: Role id must be provided.",
      );
    });
    it("should throw an error if the hash is not a string and not null", function () {
      expect(() => getRoleIcon(TEST_DATA.ROLE_ID, 123)).to.throw(
        TypeError,
        "GLUON: Role icon hash must be a string.",
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      expect(getRoleIcon(TEST_DATA.ROLE_ID, "hash")).to.be.a("string");
    });
    it("should return null if no hash is provided", function () {
      expect(getRoleIcon(TEST_DATA.ROLE_ID)).to.be.null;
    });
    it("should return the correct icon url", function () {
      expect(getRoleIcon(TEST_DATA.ROLE_ID, "hash")).to.equal(
        `https://cdn.discordapp.com/role-icons/${TEST_DATA.ROLE_ID}/hash.png`,
      );
    });
    it("should return the correct icon url for a gif", function () {
      expect(getRoleIcon(TEST_DATA.GUILD_ID, "a_hash")).to.equal(
        `https://cdn.discordapp.com/role-icons/${TEST_DATA.ROLE_ID}/a_hash.gif`,
      );
    });
  });
});
