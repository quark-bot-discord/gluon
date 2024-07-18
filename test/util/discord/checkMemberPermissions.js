let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { PERMISSIONS } = require("../../../src/constants");
const checkMemberPermissions = require("../../../src/util/discord/checkMemberPermissions");

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
        "GLUON: Member roles must be provided."
      );
    });
    it("should throw an error if an array is not provided", function () {
      expect(() => checkMemberPermissions("test")).to.throw(
        TypeError,
        "GLUON: Member roles must be an array."
      );
    });
  });

  context("check calculated permissions", function () {
    it("should return the correct calculated permissions", function () {
      const permissions = [
        { permissions: PERMISSIONS.ADD_REACTIONS | PERMISSIONS.BAN_MEMBERS },
        {
          permissions:
            PERMISSIONS.ATTACH_FILES |
            PERMISSIONS.CHANGE_NICKNAME |
            PERMISSIONS.ADD_REACTIONS,
        },
        { permissions: PERMISSIONS.BAN_MEMBERS },
      ];
      const calculatedPermissions = checkMemberPermissions(permissions);
      expect(calculatedPermissions).to.equal(
        PERMISSIONS.ADD_REACTIONS |
          PERMISSIONS.BAN_MEMBERS |
          PERMISSIONS.ATTACH_FILES |
          PERMISSIONS.CHANGE_NICKNAME
      );
    });
  });
});
