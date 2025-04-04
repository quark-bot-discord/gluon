import { expect } from "chai";
import { PERMISSIONS } from "../../../constants.js";
import checkPermission from "../checkPermission.js";
import combinePermissions from "../combinePermissions.js";

describe("CheckPermission", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(checkPermission).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no permissions are provided", function () {
      expect(() => checkPermission(undefined, String(33n))).to.throw(
        TypeError,
        "GLUON: Permissions must be a String.",
      );
    });
    it("should throw an error if permissions is not a String", function () {
      expect(() => checkPermission(33n, String(33n))).to.throw(
        TypeError,
        "GLUON: Permissions must be a String.",
      );
    });
    it("should throw an error if no specific permission to check for is provided", function () {
      expect(() => checkPermission(String(33n))).to.throw(
        TypeError,
        "GLUON: Permission must be a String.",
      );
    });
    it("should throw an error if specific permission to check for is not a String", function () {
      expect(() => checkPermission(String(33n), 33n)).to.throw(
        TypeError,
        "GLUON: Permission must be a String.",
      );
    });
  });

  context("check calculated permissions", function () {
    it("should return true if the permission is present", function () {
      const permissions = combinePermissions(
        PERMISSIONS.ATTACH_FILES,
        PERMISSIONS.ADD_REACTIONS,
        PERMISSIONS.BAN_MEMBERS,
      );
      const permission = PERMISSIONS.ADD_REACTIONS;
      const calculatedPermission = checkPermission(permissions, permission);
      expect(calculatedPermission).to.equal(true);
    });
    it("should return false if the permission is not present", function () {
      const permissions = combinePermissions(
        PERMISSIONS.ATTACH_FILES,
        PERMISSIONS.ADD_REACTIONS,
        PERMISSIONS.BAN_MEMBERS,
      );
      const permission = PERMISSIONS.CHANGE_NICKNAME;
      const calculatedPermission = checkPermission(permissions, permission);
      expect(calculatedPermission).to.equal(false);
    });
    it("should return true if the permission is not present but administrator permission is present", function () {
      const permissions = combinePermissions(
        PERMISSIONS.ATTACH_FILES,
        PERMISSIONS.ADD_REACTIONS,
        PERMISSIONS.BAN_MEMBERS,
        PERMISSIONS.ADMINISTRATOR,
      );
      const permission = PERMISSIONS.CHANGE_NICKNAME;
      const calculatedPermission = checkPermission(
        permissions,
        permission,
        true,
      );
      expect(calculatedPermission).to.equal(true);
    });
  });
});
