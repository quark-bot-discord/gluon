let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { TEST_DATA } = require("../../../src/constants");
const cacheChannel = require("../../../src/util/gluon/cacheChannel");
const GuildManager = require("../../../src/managers/GuildManager");
const GuildChannelsManager = require("../../../src/managers/GuildChannelsManager");
const Guild = require("../../../src/structures/Guild");

describe("CacheChannel", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(cacheChannel).to.be.a("function");
    });
  });

  context("check channel type", function () {
    it("should return a VoiceChannel object for voice channels", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.cache.set(TEST_DATA.GUILD_ID, {
        channels: new GuildChannelsManager(client, guild),
      });
      const rawChannel = TEST_DATA.VOICE_CHANNEL;
      const channel = cacheChannel(client, rawChannel, TEST_DATA.GUILD_ID);
      expect(channel).to.be.an("object");
      expect(channel.constructor.name).to.equal("VoiceChannel");
    });
    it("should return a Thread object for thread channels", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.cache.set(TEST_DATA.GUILD_ID, {
        channels: new GuildChannelsManager(client, guild),
      });
      const rawThread = TEST_DATA.THREAD;
      const channel = cacheChannel(client, rawThread, TEST_DATA.GUILD_ID);
      expect(channel).to.be.an("object");
      expect(channel.constructor.name).to.equal("Thread");
    });
    it("should return a TextChannel object for other channel types", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.cache.set(TEST_DATA.GUILD_ID, {
        channels: new GuildChannelsManager(client, guild),
      });
      const rawChannel = TEST_DATA.TEXT_CHANNEL;
      const channel = cacheChannel(client, rawChannel, TEST_DATA.GUILD_ID);
      expect(channel).to.be.an("object");
      expect(channel.constructor.name).to.equal("TextChannel");
    });
  });
});
