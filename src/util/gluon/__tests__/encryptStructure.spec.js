import { expect } from "chai";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
} from "../../../testData.js";
import Message from "../../../structures/Message.js";
import encryptStructure from "../encryptStructure.js";

describe("EncryptStructure", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(encryptStructure).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no message is provided", function () {
      expect(() => encryptStructure()).to.throw(
        TypeError,
        "GLUON: Structure must be provided.",
      );
    });
    it("should throw an error if the structure does not have a toJSON method", function () {
      expect(() => encryptStructure({})).to.throw(
        TypeError,
        "GLUON: Structure must have a toJSON method.",
      );
    });
    it("should throw an error if encryption keys are not provided", function () {
      expect(() => encryptStructure({ toJSON: () => null })).to.throw(
        TypeError,
        "GLUON: An encryption key must be provided.",
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(
        encryptStructure(
          message,
          message.id,
          message.channelId,
          message.guildId,
        ),
      ).to.be.a("string");
    });
    it("should return an encrypted string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(
        encryptStructure(
          message,
          message.id,
          message.channelId,
          message.guildId,
        ),
      ).to.be.a("string");
      // .to.equal(
      //   "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",
      // );
    });
  });
});
