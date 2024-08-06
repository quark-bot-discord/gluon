import { expect } from "chai";
import { TEST_DATA } from "../../../src/constants.js";
import GuildManager from "../../../src/managers/GuildManager.js";
import Message from "../../../src/structures/Message.js";
import encryptMessage from "../../../src/util/gluon/encryptMessage.js";

describe("EncryptMessage", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(encryptMessage).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no message is provided", function () {
      expect(() => encryptMessage()).to.throw(
        TypeError,
        "GLUON: Message must be provided.",
      );
    });
    it("should throw an error if the message is not a Message object", function () {
      expect(() => encryptMessage("message")).to.throw(
        TypeError,
        "GLUON: Message must be an instance of Message.",
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channel_id: TEST_DATA.CHANNEL_ID,
        guild_id: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(encryptMessage(message)).to.be.a("string");
    });
    it("should return an encrypted string", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channel_id: TEST_DATA.CHANNEL_ID,
        guild_id: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(encryptMessage(message)).to.equal(
        "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",
      );
    });
  });
});
