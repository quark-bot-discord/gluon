import { expect } from "chai";
import {
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
  TEST_CHANNELS,
} from "../../../testData.js";
import Message from "../../../structures/Message.js";
import structureHashName from "../structureHashName.js";
describe("StructureHashName", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(structureHashName).to.be.a("function");
    });
  });
  context("check invalid input", function () {
    it("should throw an error if no structure is provided", function () {
      expect(() => structureHashName()).to.throw(
        TypeError,
        "GLUON: At least one ID must be provided.",
      );
    });
    it("should throw an error if ids are not strings", function () {
      expect(() => structureHashName(123456)).to.throw(
        TypeError,
        "GLUON: IDs must be strings.",
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
        structureHashName(message.id, message.channelId, message.guildId),
      ).to.be.a("string");
    });
    it("should return a hashed string", function () {
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
        structureHashName(message.id, message.channelId, message.guildId),
      ).to.equal(
        "def816dcc53b409bf035a565474393e7da8e4a86aa5e54c037b3e1d64e267d80d34eb3dc9b2d5c26ebfa664d3afd4de4a4ebe825a8a1df512225ac62dfd924fc",
      );
    });
  });
});
//# sourceMappingURL=structureHashName.spec.js.map
