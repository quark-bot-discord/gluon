import { expect } from "chai";
import MessagePollManager from "../../src/managers/MessagePollManager.js";
import { TEST_CLIENTS } from "../../src/testData.js";
import { TO_JSON_TYPES_ENUM } from "../../src/constants.js";

describe("MessagePollManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(MessagePollManager).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should create a new instance of MessagePollManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client, {});
      expect(messagePollManager).to.be.an.instanceOf(MessagePollManager);
      expect(messagePollManager).to.have.property("_addVote");
      expect(messagePollManager).to.have.property("_removeVote");
      expect(messagePollManager).to.have.property("getResult");
      expect(messagePollManager).to.have.property("toJSON");
    });
  });

  context("check input of constructor", function () {
    it("should throw an error if client is not a Client instance", function () {
      expect(() => new MessagePollManager()).to.throw(
        TypeError,
        "GLUON: Client must be an instance of Client.",
      );
    });
    it("should throw an error if existingResponses is not an object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      expect(() => new MessagePollManager(client, 123456)).to.throw(
        TypeError,
        "GLUON: Existing responses must be an object.",
      );
    });
    it("should input the correct data into the cache", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client, {
        1: [123456],
      });
      messagePollManager._addVote("123457", 1);
      expect(
        messagePollManager.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      ).to.deep.equal({
        1: [String(123456), String(123457)],
      });
    });
  });

  context("check addVote method", function () {
    it("should throw an error if user_id is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client);
      expect(() => messagePollManager._addVote(123456, 1)).to.throw(
        TypeError,
        "GLUON: User ID must be a string.",
      );
    });
    it("should throw an error if answer_id is not a number", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client);
      expect(() => messagePollManager._addVote("123456", "1")).to.throw(
        TypeError,
        "GLUON: Answer ID must be a number.",
      );
    });
    it("should add the vote to the cache", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client);
      messagePollManager._addVote("123456", 1);
      expect(
        messagePollManager.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      ).to.deep.equal({
        1: [String(123456)],
      });
    });
  });

  context("check removeVote method", function () {
    it("should throw an error if user_id is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client);
      expect(() => messagePollManager._removeVote(123456, 1)).to.throw(
        TypeError,
        "GLUON: User ID must be a string.",
      );
    });
    it("should throw an error if answer_id is not a number", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client);
      expect(() => messagePollManager._removeVote("123456", "1")).to.throw(
        TypeError,
        "GLUON: Answer ID must be a number.",
      );
    });
    it("should remove the vote from the cache", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client, {
        1: [123456],
      });
      messagePollManager._removeVote("123456", 1);
      expect(
        messagePollManager.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      ).to.deep.equal({
        1: [],
      });
    });
  });

  context("check getResult method", function () {
    it("should throw an error if answerId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client);
      expect(() => messagePollManager.getResult("123456")).to.throw(
        TypeError,
        "GLUON: Answer ID must be a number.",
      );
    });
    it("should return an empty array if the answerId does not exist", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client);
      expect(messagePollManager.getResult(1)).to.deep.equal([]);
    });
    it("should return the correct result for the answerId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client, {
        1: ["123456"],
      });
      expect(messagePollManager.getResult(1)).to.deep.equal(["123456"]);
    });
  });

  context("check toJSON method", function () {
    it("should return the correct cache format", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client, {
        1: [123456],
      });
      expect(
        messagePollManager.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      ).to.deep.equal({
        1: [String(123456)],
      });
    });
    it("should return the correct storage format", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client, {
        1: [123456],
      });
      expect(
        messagePollManager.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT),
      ).to.deep.equal({
        1: [String(123456)],
      });
    });
    it("should return the correct discord format", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const messagePollManager = new MessagePollManager(client, {
        1: [123456],
      });
      expect(
        messagePollManager.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT),
      ).to.deep.equal({
        answer_counts: [
          {
            count: 1,
            id: 1,
            me_voted: false,
          },
        ],
      });
    });
  });
});
