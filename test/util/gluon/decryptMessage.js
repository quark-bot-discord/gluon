import { expect } from "chai";
import { TEST_DATA } from "../../../src/constants.js";
import GuildManager from "../../../src/managers/GuildManager.js";
import decryptMessage from "../../../src/util/gluon/decryptMessage.js";

describe("DecryptMessage", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(decryptMessage).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no client is provided", function () {
      expect(() =>
        decryptMessage(
          undefined,
          "test",
          TEST_DATA.MESSAGE_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.GUILD_ID,
        ),
      ).to.throw(TypeError, "GLUON: Client must be provided.");
    });
    it("should throw an error if no text is provided", function () {
      expect(() =>
        decryptMessage(
          {},
          undefined,
          TEST_DATA.MESSAGE_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.GUILD_ID,
        ),
      ).to.throw(TypeError, "GLUON: Encrypted message must be provided.");
    });
  });

  context("check valid output", function () {
    it("should return an object", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      expect(
        decryptMessage(
          client,
          "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",
          TEST_DATA.MESSAGE_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.GUILD_ID,
        ),
      ).to.be.an("object");
    });
    it("should return a message object with the correct content", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = decryptMessage(
        client,
        "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",
        TEST_DATA.MESSAGE_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.GUILD_ID,
      );
      expect(message.content).to.equal(TEST_DATA.MESSAGE.content);
    });
    it("should return a message object with the correct id", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = decryptMessage(
        client,
        "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",
        TEST_DATA.MESSAGE_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.GUILD_ID,
      );
      expect(message.id).to.equal(TEST_DATA.MESSAGE_ID);
    });
    it("should return a message object with the correct channel id", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = decryptMessage(
        client,
        "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",
        TEST_DATA.MESSAGE_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.GUILD_ID,
      );
      expect(message.channelId).to.equal(TEST_DATA.CHANNEL_ID);
    });
  });
});
