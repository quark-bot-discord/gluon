import { expect } from "chai";
import { TEST_DATA } from "../../../src/constants.js";
import getEventImage from "../../../src/util/image/getEventImage.js";

describe("GetEventImage", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(getEventImage).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no event id is provided", function () {
      expect(() => getEventImage(undefined, "hash")).to.throw(
        TypeError,
        "GLUON: Event id must be provided.",
      );
    });
    it("should throw an error if the hash is not a string and not null", function () {
      expect(() => getEventImage(TEST_DATA.EVENT_ID, 123)).to.throw(
        TypeError,
        "GLUON: Event hash must be a string.",
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      expect(getEventImage(TEST_DATA.EVENT_ID, "hash")).to.be.a("string");
    });
    it("should return null if no hash is provided", function () {
      expect(getEventImage(TEST_DATA.EVENT_ID)).to.be.null;
    });
    it("should return the correct event image url", function () {
      expect(getEventImage(TEST_DATA.EVENT_ID, "hash")).to.equal(
        `https://cdn.discordapp.com/guild-events/${TEST_DATA.EVENT_ID}/hash.png`,
      );
    });
    it("should return the correct event image url for gif", function () {
      expect(getEventImage(TEST_DATA.EVENT_ID, "a_hash")).to.equal(
        `https://cdn.discordapp.com/guild-events/${TEST_DATA.EVENT_ID}/a_hash.gif`,
      );
    });
  });
});
