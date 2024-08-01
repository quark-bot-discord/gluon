import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import VoiceState from "../../src/structures/VoiceState.js";
import Guild from "../../src/structures/Guild.js";
import GuildManager from "../../src/managers/GuildManager.js";
import User from "../../src/structures/User.js";
import cacheChannel from "../../src/util/gluon/cacheChannel.js";
import VoiceChannel from "../../src/structures/VoiceChannel.js";
import Member from "../../src/structures/Member.js";

describe("VoiceState", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(VoiceState).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState).to.have.property("deaf");
      expect(voiceState).to.have.property("mute");
      expect(voiceState).to.have.property("selfDeaf");
      expect(voiceState).to.have.property("selfMute");
      expect(voiceState).to.have.property("selfStream");
      expect(voiceState).to.have.property("selfVideo");
      expect(voiceState).to.have.property("suppress");
      expect(voiceState).to.have.property("guild");
      expect(voiceState).to.have.property("guildId");
      expect(voiceState).to.have.property("channel");
      expect(voiceState).to.have.property("channelId");
      expect(voiceState).to.have.property("member");
      expect(voiceState).to.have.property("memberId");
      expect(voiceState).to.have.property("joined");
      expect(voiceState).to.have.property("requestToSpeakTimestamp");
      expect(voiceState).to.have.property("toString");
      expect(voiceState).to.have.property("toJSON");
    });
  });

  context("check deaf", function () {
    it("should have the correct deaf value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.deaf).to.equal(TEST_DATA.VOICE_STATE.deaf);
    });
  });

  context("check mute", function () {
    it("should have the correct mute value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.mute).to.equal(TEST_DATA.VOICE_STATE.mute);
    });
  });

  context("check selfDeaf", function () {
    it("should have the correct selfDeaf value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.selfDeaf).to.equal(TEST_DATA.VOICE_STATE.self_deaf);
    });
  });

  context("check selfMute", function () {
    it("should have the correct selfMute value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.selfMute).to.equal(TEST_DATA.VOICE_STATE.self_mute);
    });
  });

  context("check selfStream", function () {
    it("should have the correct selfStream value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.selfStream).to.equal(TEST_DATA.VOICE_STATE.self_stream);
    });
  });

  context("check selfVideo", function () {
    it("should have the correct selfVideo value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.selfVideo).to.equal(TEST_DATA.VOICE_STATE.self_video);
    });
  });

  context("check suppress", function () {
    it("should have the correct suppress value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.suppress).to.equal(TEST_DATA.VOICE_STATE.suppress);
    });
  });

  context("check guild", function () {
    it("should have the correct guild value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.guild).to.deep.equal(guild);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check channel", function () {
    it("should have the correct channel value", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      cacheChannel(client, TEST_DATA.VOICE_CHANNEL, TEST_DATA.GUILD_ID);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.channel).to.be.an.instanceOf(VoiceChannel);
    });
  });

  context("check channelId", function () {
    it("should have the correct channelId value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.channelId).to.equal(TEST_DATA.VOICE_STATE.channel_id);
    });
  });

  context("check member", function () {
    it("should have the correct member value", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.MEMBER, {
        guild_id: TEST_DATA.GUILD_ID,
        user_id: TEST_DATA.VOICE_STATE.user_id,
      });
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.member).to.be.an.instanceOf(Member);
    });
  });

  context("check memberId", function () {
    it("should have the correct memberId value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.memberId).to.equal(TEST_DATA.VOICE_STATE.user_id);
    });
  });

  context("check joined", function () {
    it("should have the correct joined value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.joined).to.be.a("number");
      expect(voiceState.joined).to.equal(TEST_DATA.VOICE_STATE.joined);
    });
  });

  context("check requestToSpeakTimestamp", function () {
    it("should have the correct requestToSpeakTimestamp value", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.requestToSpeakTimestamp).to.be.a("number");
      expect(voiceState.requestToSpeakTimestamp).to.equal(
        (new Date(TEST_DATA.VOICE_STATE.request_to_speak_timestamp).getTime() /
          1000) |
          0,
      );
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.toString()).to.be.a("string");
    });
  });

  context("check toJSON", function () {
    it("should return a json", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.toJSON()).to.be.a("object");
    });
    it("should return the correct json", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.MEMBER, {
        guild_id: TEST_DATA.GUILD_ID,
        user_id: TEST_DATA.VOICE_STATE.user_id,
      });
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(voiceState.toJSON()).to.deep.equal({
        deaf: TEST_DATA.VOICE_STATE.deaf,
        mute: TEST_DATA.VOICE_STATE.mute,
        self_deaf: TEST_DATA.VOICE_STATE.self_deaf,
        self_mute: TEST_DATA.VOICE_STATE.self_mute,
        self_stream: TEST_DATA.VOICE_STATE.self_stream,
        self_video: TEST_DATA.VOICE_STATE.self_video,
        suppress: TEST_DATA.VOICE_STATE.suppress,
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.VOICE_STATE.channel_id,
        user_id: TEST_DATA.VOICE_STATE.user_id,
        member: {},
        joined: TEST_DATA.VOICE_STATE.joined,
        request_to_speak_timestamp:
          ((new Date(
            TEST_DATA.VOICE_STATE.request_to_speak_timestamp,
          ).getTime() /
            1000) |
            0) *
          1000,
      });
    });
  });

  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
      };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.MEMBER, {
        guild_id: TEST_DATA.GUILD_ID,
        user_id: TEST_DATA.VOICE_STATE.user_id,
      });
      cacheChannel(client, TEST_DATA.VOICE_CHANNEL, TEST_DATA.GUILD_ID);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      const rebundled = new VoiceState(client, voiceState.toJSON(), {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.guildId).to.equal(voiceState.guildId);
      expect(rebundled.channelId).to.equal(voiceState.channelId);
      expect(rebundled.memberId).to.equal(voiceState.memberId);
      expect(rebundled.deaf).to.equal(voiceState.deaf);
      expect(rebundled.mute).to.equal(voiceState.mute);
      expect(rebundled.selfDeaf).to.equal(voiceState.selfDeaf);
      expect(rebundled.selfMute).to.equal(voiceState.selfMute);
      expect(rebundled.selfStream).to.equal(voiceState.selfStream);
      expect(rebundled.selfVideo).to.equal(voiceState.selfVideo);
      expect(rebundled.suppress).to.equal(voiceState.suppress);
      expect(rebundled.joined).to.equal(voiceState.joined);
      expect(rebundled.requestToSpeakTimestamp).to.equal(
        voiceState.requestToSpeakTimestamp,
      );
      expect(rebundled.guild).to.deep.equal(voiceState.guild);
      expect(rebundled.guild.id).to.equal(voiceState.guild.id);
      expect(rebundled.channel).to.deep.equal(voiceState.channel);
      expect(rebundled.channel.id).to.equal(voiceState.channel.id);
      expect(rebundled.member).to.deep.equal(voiceState.member);
      expect(rebundled.member.id).to.equal(voiceState.member.id);
    });
  });
});
