import { expect } from "chai";
import MessageReactionManager from "../../src/managers/MessageReactionManager.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../src/testData.js";
import { TO_JSON_TYPES_ENUM } from "../../src/constants.js";

describe("MessageReactionManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(MessageReactionManager).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should create a new instance of MessageReactionManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      expect(messageReactionManager).to.be.an.instanceOf(
        MessageReactionManager,
      );
      expect(messageReactionManager).to.have.property("_addReaction");
      expect(messageReactionManager).to.have.property("_removeReaction");
      expect(messageReactionManager).to.have.property("toJSON");
    });
  });

  context("check input of constructor", function () {
    it("should throw an error if client is not a Client instance", function () {
      expect(() => new MessageReactionManager()).to.throw(
        TypeError,
        "GLUON: Client must be an instance of Client.",
      );
    });
    it("should throw an error if guild is not a Guild instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      expect(() => new MessageReactionManager(client)).to.throw(
        TypeError,
        "GLUON: Guild must be provided.",
      );
    });
    it("should throw an error if existingReactions is not an object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(() => new MessageReactionManager(client, guild, 123456)).to.throw(
        TypeError,
        "GLUON: Existing reactions must be an object.",
      );
    });
    it("should input the correct data into the cache", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(client, guild);
      messageReactionManager._addReaction(
        "123456",
        TEST_DATA.STANDARD_EMOJI.name,
        TEST_DATA.REACTION,
      );
      expect(
        messageReactionManager.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      ).to.have.property(TEST_DATA.STANDARD_EMOJI.name);
      const messageReactionManager2 = new MessageReactionManager(
        client,
        guild,
        messageReactionManager.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      );
      expect(
        messageReactionManager2.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      ).to.have.property(TEST_DATA.STANDARD_EMOJI.name);
    });
  });

  context("check _addReaction method", function () {
    it("should add a reaction to a message", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      messageReactionManager._addReaction(
        "123456",
        TEST_DATA.STANDARD_EMOJI.name,
        TEST_DATA.REACTION,
      );
      expect(
        messageReactionManager.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      ).to.have.property(TEST_DATA.STANDARD_EMOJI.name);
    });
    it("should throw an error if userId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      expect(() =>
        messageReactionManager._addReaction(
          123456,
          TEST_DATA.STANDARD_EMOJI.name,
          TEST_DATA.REACTION,
        ),
      ).to.throw(TypeError, "GLUON: User ID must be a string.");
    });
    it("should throw an error if emoji is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      expect(() =>
        messageReactionManager._addReaction(
          "123456",
          123456,
          TEST_DATA.REACTION,
        ),
      ).to.throw(TypeError, "GLUON: Emoji must be a string.");
    });
    it("should throw an error if data is not an object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      expect(() =>
        messageReactionManager._addReaction(
          "123456",
          TEST_DATA.STANDARD_EMOJI.name,
          123456,
        ),
      ).to.throw(TypeError, "GLUON: Data must be an object.");
    });
  });

  context("check _removeReaction method", function () {
    it("should remove a reaction from a message", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      messageReactionManager._addReaction(
        "123456",
        TEST_DATA.STANDARD_EMOJI.name,
        TEST_DATA.REACTION,
      );
      messageReactionManager._removeReaction(
        "123456",
        TEST_DATA.STANDARD_EMOJI.name,
      );
      expect(
        messageReactionManager.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      ).to.not.have.property(TEST_DATA.STANDARD_EMOJI.name);
    });
    it("should throw an error if userId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      expect(() =>
        messageReactionManager._removeReaction(
          123456,
          TEST_DATA.STANDARD_EMOJI.name,
        ),
      ).to.throw(TypeError, "GLUON: User ID must be a string.");
    });
    it("should throw an error if emoji is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      expect(() =>
        messageReactionManager._removeReaction("123456", 123456),
      ).to.throw(TypeError, "GLUON: Emoji must be a string.");
    });
    it("should not throw an error if the reaction does not exist", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      expect(() =>
        messageReactionManager._removeReaction(
          "123456",
          TEST_DATA.STANDARD_EMOJI.name,
        ),
      ).to.not.throw();
    });
  });

  context("check toJSON method", function () {
    it("should return the correct cache format", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      messageReactionManager._addReaction(
        "123456",
        TEST_DATA.STANDARD_EMOJI.name,
        TEST_DATA.REACTION,
      );
      expect(
        messageReactionManager.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      ).to.have.property(TEST_DATA.STANDARD_EMOJI.name);
    });
    it("should return the correct storage format", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      messageReactionManager._addReaction(
        "123456",
        TEST_DATA.STANDARD_EMOJI.name,
        TEST_DATA.REACTION,
      );
      expect(
        messageReactionManager.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT),
      ).to.have.property(TEST_DATA.STANDARD_EMOJI.name);
    });
    it("should return the correct discord format", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const messageReactionManager = new MessageReactionManager(
        client,
        guild,
        {},
      );
      messageReactionManager._addReaction(
        "123456",
        TEST_DATA.STANDARD_EMOJI.name,
        TEST_DATA.REACTION,
      );
      expect(
        messageReactionManager.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT),
      ).to.be.an("array");
      expect(
        messageReactionManager.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT)[0],
      ).to.have.property("emoji");
    });
  });
});
