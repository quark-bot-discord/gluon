import { expect } from "chai";
import { deepCompare } from "../deepCompare.js";
describe("deepCompare", function () {
  it("should return an empty array when both objects are the same", function () {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const result = deepCompare(obj1, obj2);
    expect(result).to.deep.equal([]);
  });
  it("should return an array of keys with different values", function () {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const result = deepCompare(obj1, obj2);
    expect(result).to.deep.equal(["b"]);
  });
  it("should return an array of keys that are only in one of the objects", function () {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, c: 3 };
    const result = deepCompare(obj1, obj2);
    expect(result).to.deep.equal(["b", "c"]);
  });
  it("should handle nested objects correctly", function () {
    const obj1 = { a: { b: 1 }, c: 2 };
    const obj2 = { a: { b: 2 }, c: 2 };
    const result = deepCompare(obj1, obj2);
    expect(result).to.deep.equal(["a"]);
  });
  it("should handle objects with different keys correctly", function () {
    const obj1 = { a: 1, b: 2, d: 4 };
    const obj2 = { a: 1, c: 3 };
    const result = deepCompare(obj1, obj2);
    expect(result).to.deep.equal(["b", "d", "c"]);
  });
  it("should return an empty array when both objects refer to the same reference", function () {
    const obj1 = { a: 1, b: 2 };
    const obj2 = obj1;
    const result = deepCompare(obj1, obj2);
    expect(result).to.deep.equal([]);
  });
});
//# sourceMappingURL=deepCompare.spec.js.map
