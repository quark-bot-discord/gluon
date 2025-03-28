import { expect } from "chai";
import getTimestampFromSnowflake from "../getTimestampFromSnowflake.js";
describe("GetTimestampFromSnowflake", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(getTimestampFromSnowflake).to.be.a("function");
    });
  });
  context("check invalid input", function () {
    it("should throw an error if no snowflake is provided", function () {
      expect(() => getTimestampFromSnowflake()).to.throw(
        TypeError,
        "GLUON: Snowflake must be provided.",
      );
    });
    it("should throw an error if snowflake is not a string", function () {
      expect(() => getTimestampFromSnowflake(123456)).to.throw(
        TypeError,
        "GLUON: Snowflake must be a string.",
      );
    });
  });
  context("check calculated timestamp", function () {
    it("should return the correct calculated timestamp", function () {
      const snowflake = "301655085954367490";
      const calculatedTimestamp = getTimestampFromSnowflake(snowflake);
      expect(calculatedTimestamp).to.equal(1491990576);
    });
  });
});
//# sourceMappingURL=getTimestampFromSnowflake.spec.js.map
