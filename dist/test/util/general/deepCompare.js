import { expect } from "chai";
import deepCompare from "../../../src/util/general/deepCompare.js";
describe("DeepCompare", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(deepCompare).to.be.a("function");
    });
  });
  context("check invalid input", function () {
    it("should throw an error if no object is provided", function () {
      expect(() => deepCompare(undefined, {})).to.throw(
        TypeError,
        "GLUON: First argument must be an object.",
      );
    });
    it("should throw an error if object is not an object", function () {
      expect(() => deepCompare(123456, {})).to.throw(
        TypeError,
        "GLUON: First argument must be an object.",
      );
    });
    it("should throw an error if no object to compare is provided", function () {
      expect(() => deepCompare({}, undefined)).to.throw(
        TypeError,
        "GLUON: Second argument must be an object.",
      );
    });
    it("should throw an error if object to compare is not an object", function () {
      expect(() => deepCompare({}, 123456)).to.throw(
        TypeError,
        "GLUON: Second argument must be an object.",
      );
    });
  });
  context("check deep compare", function () {
    it("should return empty if objects are equal", function () {
      const object = { test: "test" };
      const object2 = { test: "test" };
      const result = deepCompare(object, object2);
      expect(result.length).to.equal(0);
    });
    it("should return array of changed keys if objects are not equal", function () {
      const object = { test: "test" };
      const object2 = { test: "test2" };
      const result = deepCompare(object, object2);
      expect(result).to.deep.equal(["test"]);
    });
  });
});
//# sourceMappingURL=deepCompare.js.map
