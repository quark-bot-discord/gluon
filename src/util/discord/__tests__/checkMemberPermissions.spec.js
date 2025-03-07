import { expect } from "chai";
import { PERMISSIONS } from "../../../constants.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../../testData.js";
import checkMemberPermissions from "../checkMemberPermissions.js";
import Role from "../../../structures/Role.js";
import combinePermissions from "../combinePermissions.js";

describe("CheckMemberPermissions", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(checkMemberPermissions).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no member roles are provided", function () {
      expect(() => checkMemberPermissions()).to.throw(
        TypeError,
        "GLUON: Member roles must be provided.",
      );
    });
    it("should throw an error if an array is not provided", function () {
      expect(() => checkMemberPermissions("test")).to.throw(
        TypeError,
        "GLUON: Member roles must be an array.",
      );
    });
    // it("should throw an error if an array of roles is not provided", function () {
    //   expect(() => checkMemberPermissions(["test"])).to.throw(
    //     TypeError,
    //     "GLUON: Member roles must be an array of Role instances.",
    //   );
    // });
  });

  context("check calculated permissions", function () {
    it("should return the correct calculated permissions", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const roles = [
        new Role(
          client,
          {
            id: TEST_DATA.ROLE_ID,
            permissions: combinePermissions(
              PERMISSIONS.ADD_REACTIONS,
              PERMISSIONS.BAN_MEMBERS,
            ),
          },
          { guildId: TEST_DATA.GUILD_ID },
        ),
        new Role(
          client,
          {
            id: TEST_DATA.ROLE_ID,
            permissions: combinePermissions(
              PERMISSIONS.ATTACH_FILES,
              PERMISSIONS.CHANGE_NICKNAME,
              PERMISSIONS.ADD_REACTIONS,
            ),
          },
          { guildId: TEST_DATA.GUILD_ID },
        ),
        new Role(
          client,
          {
            id: TEST_DATA.ROLE_ID,
            permissions: combinePermissions(PERMISSIONS.BAN_MEMBERS),
          },
          { guildId: TEST_DATA.GUILD_ID },
        ),
      ];
      const calculatedPermissions = checkMemberPermissions(roles);
      expect(calculatedPermissions).to.equal(
        combinePermissions(
          PERMISSIONS.ADD_REACTIONS,
          PERMISSIONS.BAN_MEMBERS,
          PERMISSIONS.ATTACH_FILES,
          PERMISSIONS.CHANGE_NICKNAME,
        ),
      );
    });
  });
});
