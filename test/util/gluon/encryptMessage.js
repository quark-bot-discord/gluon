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
    it("should throw an error if message has no id", function () {
      expect(() =>
        encryptMessage({
          _channel_id: BigInt(TEST_DATA.CHANNEL_ID),
          _guild_id: BigInt(TEST_DATA.GUILD_ID),
        }),
      ).to.throw(
        TypeError,
        "GLUON: Message must have an id, channel id and guild id.",
      );
    });
    it("should throw an error if message has no channel id", function () {
      expect(() =>
        encryptMessage({
          id: TEST_DATA.MESSAGE_ID,
          _guild_id: BigInt(TEST_DATA.GUILD_ID),
        }),
      ).to.throw(
        TypeError,
        "GLUON: Message must have an id, channel id and guild id.",
      );
    });
    it("should throw an error if message has no guild id", function () {
      expect(() =>
        encryptMessage({
          id: BigInt(TEST_DATA.MESSAGE_ID),
          _channel_id: BigInt(TEST_DATA.CHANNEL_ID),
        }),
      ).to.throw(
        TypeError,
        "GLUON: Message must have an id, channel id and guild id.",
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
