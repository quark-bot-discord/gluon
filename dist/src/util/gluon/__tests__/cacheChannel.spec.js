import { expect } from "chai";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../../testData.js";
import cacheChannel from "../cacheChannel.js";
describe("CacheChannel", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(cacheChannel).to.be.a("function");
    });
  });
  context("check channel type", function () {
    it("should return a VoiceChannel object for voice channels", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const rawChannel = TEST_DATA.VOICE_CHANNEL;
      const channel = cacheChannel(client, rawChannel, TEST_DATA.GUILD_ID);
      expect(channel).to.be.an("object");
      expect(channel.constructor.name).to.equal("VoiceChannel");
    });
    it("should return a Thread object for thread channels", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const rawThread = TEST_DATA.THREAD;
      const channel = cacheChannel(client, rawThread, TEST_DATA.GUILD_ID);
      expect(channel).to.be.an("object");
      expect(channel.constructor.name).to.equal("Thread");
    });
    it("should return a TextChannel object for other channel types", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const rawChannel = TEST_DATA.TEXT_CHANNEL;
      const channel = cacheChannel(client, rawChannel, TEST_DATA.GUILD_ID);
      expect(channel).to.be.an("object");
      expect(channel.constructor.name).to.equal("TextChannel");
    });
  });
});
//# sourceMappingURL=cacheChannel.spec.js.map
