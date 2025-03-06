import { expect } from "chai";
import { spy } from "sinon";
import GuildChannelsManager from "../../src/managers/GuildChannelsManager.js";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
} from "../../src/testData.js";
import { TextChannel } from "../../src/structures.js";
describe("GuildChannelsManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GuildChannelsManager).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should create a new instance of GuildChannelsManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channelsManager = new GuildChannelsManager(client, guild);
      expect(channelsManager).to.be.an.instanceOf(GuildChannelsManager);
      expect(channelsManager).to.have.property("set");
      expect(channelsManager).to.have.property("fetch");
      expect(GuildChannelsManager).to.have.property("getChannel");
      expect(GuildChannelsManager).to.have.property("getCacheManager");
      expect(GuildChannelsManager).to.have.property("fetchChannel");
    });
  });
  context("check set method", function () {
    it("should set a channel", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const textChannel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const channelsManager = new GuildChannelsManager(client, guild);
      channelsManager.set(textChannel.id, textChannel);
      const channel = channelsManager.get(textChannel.id);
      expect(channel).to.be.an.instanceOf(TextChannel);
    });
  });
  context("check fetch method", function () {
    it("should fetch a channel", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = GuildChannelsManager.fetchChannel(
        client,
        guild.id,
        TEST_DATA.CHANNEL_ID,
      );
      await expect(channel).to.eventually.be.an.instanceOf(TextChannel);
    });
    it("should throw an error when the client is not a Client instance", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      await expect(
        GuildChannelsManager.fetchChannel(null, guild.id, TEST_DATA.CHANNEL_ID),
      ).to.be.rejectedWith(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error when the guildId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      await expect(
        GuildChannelsManager.fetchChannel(client, 123, TEST_DATA.CHANNEL_ID),
      ).to.be.rejectedWith(TypeError, "GLUON: Guild ID is not a string.");
    });
    it("should throw an error when the channelId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      await expect(
        GuildChannelsManager.fetchChannel(client, guild.id, 123),
      ).to.be.rejectedWith(TypeError, "GLUON: Channel ID is not a string.");
    });
    it("should call makeRequest when the channel is not in the cache", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const request = spy(client.request, "makeRequest");
      await GuildChannelsManager.fetchChannel(
        client,
        guild.id,
        TEST_DATA.CHANNEL_ID,
      );
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannel", [
        TEST_DATA.CHANNEL_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.undefined;
    });
    it("should cache the channel when fetched", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = await GuildChannelsManager.fetchChannel(
        client,
        guild.id,
        TEST_DATA.CHANNEL_ID,
      );
      expect(guild.channels.get(channel.id)).to.deep.equal(channel);
    });
  });
  context("check getCacheManager method", function () {
    it("should return the cache manager for a guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const cacheManager = GuildChannelsManager.getCacheManager(
        client,
        guild.id,
      );
      expect(cacheManager).to.deep.equal(guild.channels);
    });
    it("should throw an error when the client is not a Client instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(() => {
        GuildChannelsManager.getCacheManager(null, guild.id);
      }).to.throw(TypeError, "GLUON: Client must be a Client instance.");
    });
    it("should throw an error when the guildId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(() => {
        GuildChannelsManager.getCacheManager(client, 123);
      }).to.throw(TypeError, "GLUON: Guild ID must be a string.");
    });
  });
  context("check getChannel method", function () {
    it("should return the channel for a guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const textChannel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      guild.channels.set(textChannel.id, textChannel);
      const channel = GuildChannelsManager.getChannel(
        client,
        guild.id,
        textChannel.id,
      );
      expect(channel).to.deep.equal(textChannel);
    });
    it("should throw an error when the client is not a Client instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(() => {
        GuildChannelsManager.getChannel(null, guild.id, TEST_DATA.CHANNEL_ID);
      }).to.throw(TypeError, "GLUON: Client must be a Client instance.");
    });
    it("should throw an error when the guildId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(() => {
        GuildChannelsManager.getChannel(client, 123, TEST_DATA.CHANNEL_ID);
      }).to.throw(TypeError, "GLUON: Guild ID must be a string.");
    });
    it("should throw an error when the channelId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(() => {
        GuildChannelsManager.getChannel(client, guild.id, 123);
      }).to.throw(TypeError, "GLUON: Channel ID must be a string.");
    });
  });
});
//# sourceMappingURL=GuildChannelsManager.js.map
