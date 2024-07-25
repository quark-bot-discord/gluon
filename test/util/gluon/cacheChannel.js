import { expect } from "chai";
import { TEST_DATA } from "../../../src/constants.js";
import cacheChannel from "../../../src/util/gluon/cacheChannel.js";
import GuildManager from "../../../src/managers/GuildManager.js";
import Guild from "../../../src/structures/Guild.js";

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
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const rawChannel = TEST_DATA.VOICE_CHANNEL;
      const channel = cacheChannel(client, rawChannel, TEST_DATA.GUILD_ID);
      expect(channel).to.be.an("object");
      expect(channel.constructor.name).to.equal("VoiceChannel");
    });
    it("should return a Thread object for thread channels", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const rawThread = TEST_DATA.THREAD;
      const channel = cacheChannel(client, rawThread, TEST_DATA.GUILD_ID);
      expect(channel).to.be.an("object");
      expect(channel.constructor.name).to.equal("Thread");
    });
    it("should return a TextChannel object for other channel types", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const rawChannel = TEST_DATA.TEXT_CHANNEL;
      const channel = cacheChannel(client, rawChannel, TEST_DATA.GUILD_ID);
      expect(channel).to.be.an("object");
      expect(channel.constructor.name).to.equal("TextChannel");
    });
  });
});
