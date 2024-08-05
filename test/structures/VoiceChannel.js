import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import VoiceChannel from "../../src/structures/VoiceChannel.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";

describe("VoiceChannel", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(VoiceChannel).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const voiceChannel = new VoiceChannel(client, TEST_DATA.VOICE_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceChannel).to.have.property("id");
      expect(voiceChannel).to.have.property("name");
      expect(voiceChannel).to.have.property("type");
      expect(voiceChannel).to.have.property("guildId");
      expect(voiceChannel).to.have.property("mention");
      expect(voiceChannel).to.have.property("guild");
      expect(voiceChannel).to.have.property("parentId");
      expect(voiceChannel).to.have.property("parent");
      expect(voiceChannel).to.have.property("rateLimitPerUser");
      expect(voiceChannel).to.have.property("nsfw");
      expect(voiceChannel).to.have.property("topic");
      expect(voiceChannel).to.have.property("_cacheOptions");
      expect(voiceChannel).to.have.property("messages");
      expect(voiceChannel).to.have.property("toString");
      expect(voiceChannel).to.have.property("toJSON");
      expect(voiceChannel).to.have.property("send");
      expect(voiceChannel).to.have.property("bitrate");
      expect(voiceChannel).to.have.property("userLimit");
      expect(voiceChannel).to.have.property("rtcRegion");
      expect(voiceChannel).to.have.property("toString");
      expect(voiceChannel).to.have.property("toJSON");
    });
  });

  context("check bitrate", function () {
    it("should have the correct bitrate", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const voiceChannel = new VoiceChannel(client, TEST_DATA.VOICE_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceChannel.bitrate).to.equal(TEST_DATA.VOICE_CHANNEL.bitrate);
    });
  });

  context("check userLimit", function () {
    it("should have the correct userLimit", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const voiceChannel = new VoiceChannel(client, TEST_DATA.VOICE_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceChannel.userLimit).to.equal(
        TEST_DATA.VOICE_CHANNEL.user_limit,
      );
    });
  });

  context("check rtcRegion", function () {
    it("should have the correct rtcRegion", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const voiceChannel = new VoiceChannel(client, TEST_DATA.VOICE_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceChannel.rtcRegion).to.equal(
        TEST_DATA.VOICE_CHANNEL.rtcRegion,
      );
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const voiceChannel = new VoiceChannel(client, TEST_DATA.VOICE_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceChannel.toString()).to.be.a("string");
    });

    it("should return the correct string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const voiceChannel = new VoiceChannel(client, TEST_DATA.VOICE_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceChannel.toString()).to.equal(
        `<VoiceChannel: ${TEST_DATA.VOICE_CHANNEL.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should return an object", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const voiceChannel = new VoiceChannel(client, TEST_DATA.VOICE_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceChannel.toJSON()).to.be.a("object");
    });

    it("should return the correct object", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const voiceChannel = new VoiceChannel(client, TEST_DATA.VOICE_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceChannel.toJSON()).to.deep.equal({
        bitrate: TEST_DATA.VOICE_CHANNEL.bitrate,
        id: TEST_DATA.VOICE_CHANNEL.id,
        messages: [],
        name: TEST_DATA.VOICE_CHANNEL.name,
        parent_id: TEST_DATA.VOICE_CHANNEL.parent_id,
        rate_limit_per_user: TEST_DATA.VOICE_CHANNEL.rate_limit_per_user,
        rtc_region: TEST_DATA.VOICE_CHANNEL.rtc_region,
        topic: TEST_DATA.VOICE_CHANNEL.topic,
        type: TEST_DATA.VOICE_CHANNEL.type,
        user_limit: TEST_DATA.VOICE_CHANNEL.user_limit,
        nsfw: TEST_DATA.VOICE_CHANNEL.nsfw,
        permission_overwrites: [],
      });
    });
  });
});
