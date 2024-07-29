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
