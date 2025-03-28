import { expect } from "chai";
import combinePermissions from "../combinePermissions.js";
describe("combinePermissions", function () {
  it("should combine multiple permissions into a single permission", function () {
    const result = combinePermissions("1", "2", "4");
    expect(result).to.equal("7");
  });
  it("should throw an error if no permissions are provided", function () {
    expect(() => combinePermissions()).to.throw(
      TypeError,
      "GLUON: Permissions must be provided.",
    );
  });
  it("should throw an error if any permission is not a string", function () {
    expect(() => combinePermissions("1", "2", 4)).to.throw(
      TypeError,
      "GLUON: Permissions must be an array of strings.",
    );
  });
  it('should return "0" if all permissions are "0"', function () {
    const result = combinePermissions("0", "0", "0");
    expect(result).to.equal("0");
  });
  it("should handle a single permission correctly", function () {
    const result = combinePermissions("8");
    expect(result).to.equal("8");
  });
});
//# sourceMappingURL=combinePermissions.spec.js.map
