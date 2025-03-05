import { expect } from "chai";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
} from "../../src/testData.js";
import { VoiceChannel } from "../../src/structures.js";
import { JsonTypes } from "#typings/enums.js";
describe("VoiceChannel", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(VoiceChannel).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
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
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(voiceChannel.bitrate).to.equal(TEST_DATA.VOICE_CHANNEL.bitrate);
    });
  });
  context("check userLimit", function () {
    it("should have the correct userLimit", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(voiceChannel.userLimit).to.equal(
        TEST_DATA.VOICE_CHANNEL.user_limit,
      );
    });
  });
  context("check rtcRegion", function () {
    it("should have the correct rtcRegion", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(voiceChannel.rtcRegion).to.equal(
        TEST_DATA.VOICE_CHANNEL.rtcRegion,
      );
    });
  });
  context("check toString", function () {
    it("should return a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(voiceChannel.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(voiceChannel.toString()).to.equal(
        `<VoiceChannel: ${TEST_DATA.VOICE_CHANNEL.id}>`,
      );
    });
  });
  context("check toJSON", function () {
    it("should return an object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(voiceChannel.toJSON()).to.be.a("object");
    });
    it("should return the correct object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(voiceChannel.toJSON()).to.deep.equal({
        bitrate: TEST_DATA.VOICE_CHANNEL.bitrate,
        id: TEST_DATA.VOICE_CHANNEL.id,
        messages: [],
        name: TEST_DATA.VOICE_CHANNEL.name,
        parent_id: TEST_DATA.VOICE_CHANNEL.parent_id,
        position: TEST_DATA.VOICE_CHANNEL.position,
        rate_limit_per_user: TEST_DATA.VOICE_CHANNEL.rate_limit_per_user,
        rtc_region: TEST_DATA.VOICE_CHANNEL.rtc_region,
        topic: TEST_DATA.VOICE_CHANNEL.topic,
        type: TEST_DATA.VOICE_CHANNEL.type,
        user_limit: TEST_DATA.VOICE_CHANNEL.user_limit,
        nsfw: TEST_DATA.VOICE_CHANNEL.nsfw,
        permission_overwrites: [],
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(voiceChannel.toJSON(JsonTypes.CACHE_FORMAT)).to.deep.equal({
        _attributes: 0,
        _cacheOptions: 1023,
        bitrate: TEST_DATA.VOICE_CHANNEL.bitrate,
        id: TEST_DATA.VOICE_CHANNEL.id,
        messages: [],
        name: TEST_DATA.VOICE_CHANNEL.name,
        parent_id: TEST_DATA.VOICE_CHANNEL.parent_id,
        position: TEST_DATA.VOICE_CHANNEL.position,
        rate_limit_per_user: TEST_DATA.VOICE_CHANNEL.rate_limit_per_user,
        rtc_region: TEST_DATA.VOICE_CHANNEL.rtc_region,
        topic: TEST_DATA.VOICE_CHANNEL.topic,
        type: TEST_DATA.VOICE_CHANNEL.type,
        user_limit: TEST_DATA.VOICE_CHANNEL.user_limit,
        permission_overwrites: [],
      });
      expect(voiceChannel.toJSON(JsonTypes.STORAGE_FORMAT)).to.deep.equal({
        _attributes: 0,
        _cacheOptions: 1023,
        bitrate: TEST_DATA.VOICE_CHANNEL.bitrate,
        id: TEST_DATA.VOICE_CHANNEL.id,
        messages: [],
        name: TEST_DATA.VOICE_CHANNEL.name,
        parent_id: TEST_DATA.VOICE_CHANNEL.parent_id,
        position: TEST_DATA.VOICE_CHANNEL.position,
        rate_limit_per_user: TEST_DATA.VOICE_CHANNEL.rate_limit_per_user,
        rtc_region: TEST_DATA.VOICE_CHANNEL.rtc_region,
        topic: TEST_DATA.VOICE_CHANNEL.topic,
        type: TEST_DATA.VOICE_CHANNEL.type,
        user_limit: TEST_DATA.VOICE_CHANNEL.user_limit,
        permission_overwrites: [],
      });
      expect(voiceChannel.toJSON(JsonTypes.DISCORD_FORMAT)).to.deep.equal({
        bitrate: TEST_DATA.VOICE_CHANNEL.bitrate,
        id: TEST_DATA.VOICE_CHANNEL.id,
        messages: [],
        name: TEST_DATA.VOICE_CHANNEL.name,
        parent_id: TEST_DATA.VOICE_CHANNEL.parent_id,
        position: TEST_DATA.VOICE_CHANNEL.position,
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
  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      const rebundled = new VoiceChannel(client, voiceChannel.toJSON(), {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.id).to.equal(voiceChannel.id);
      expect(rebundled.name).to.equal(voiceChannel.name);
      expect(rebundled.bitrate).to.equal(voiceChannel.bitrate);
      expect(rebundled.userLimit).to.equal(voiceChannel.userLimit);
      expect(rebundled.rtcRegion).to.equal(voiceChannel.rtcRegion);
      expect(rebundled.topic).to.equal(voiceChannel.topic);
      expect(rebundled.toJSON()).to.deep.equal(voiceChannel.toJSON());
    });
    it("should bundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      const rebundled = new VoiceChannel(
        client,
        voiceChannel.toJSON(JsonTypes.CACHE_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.id).to.equal(voiceChannel.id);
      expect(rebundled.name).to.equal(voiceChannel.name);
      expect(rebundled.bitrate).to.equal(voiceChannel.bitrate);
      expect(rebundled.userLimit).to.equal(voiceChannel.userLimit);
      expect(rebundled.rtcRegion).to.equal(voiceChannel.rtcRegion);
      expect(rebundled.topic).to.equal(voiceChannel.topic);
      expect(rebundled.toJSON()).to.deep.equal(voiceChannel.toJSON());
    });
    it("should bundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      const rebundled = new VoiceChannel(
        client,
        voiceChannel.toJSON(JsonTypes.STORAGE_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.id).to.equal(voiceChannel.id);
      expect(rebundled.name).to.equal(voiceChannel.name);
      expect(rebundled.bitrate).to.equal(voiceChannel.bitrate);
      expect(rebundled.userLimit).to.equal(voiceChannel.userLimit);
      expect(rebundled.rtcRegion).to.equal(voiceChannel.rtcRegion);
      expect(rebundled.topic).to.equal(voiceChannel.topic);
      expect(rebundled.toJSON()).to.deep.equal(voiceChannel.toJSON());
    });
    it("should bundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceChannel =
        TEST_CHANNELS.VOICE_CHANNEL_ALL_CACHES_ENABLED(client);
      const rebundled = new VoiceChannel(
        client,
        voiceChannel.toJSON(JsonTypes.DISCORD_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.id).to.equal(voiceChannel.id);
      expect(rebundled.name).to.equal(voiceChannel.name);
      expect(rebundled.bitrate).to.equal(voiceChannel.bitrate);
      expect(rebundled.userLimit).to.equal(voiceChannel.userLimit);
      expect(rebundled.rtcRegion).to.equal(voiceChannel.rtcRegion);
      expect(rebundled.topic).to.equal(voiceChannel.topic);
      expect(rebundled.toJSON()).to.deep.equal(voiceChannel.toJSON());
    });
  });
});
//# sourceMappingURL=VoiceChannel.js.map
