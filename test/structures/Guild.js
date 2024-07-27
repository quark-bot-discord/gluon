import { expect } from "chai";
import { spy } from "sinon";
import Guild from "../../src/structures/Guild.js";
import GuildManager from "../../src/managers/GuildManager.js";
import { TEST_DATA } from "../../src/constants.js";
import Member from "../../src/structures/Member.js";
import User from "../../src/structures/User.js";
import cacheChannel from "../../src/util/gluon/cacheChannel.js";
import GuildEmojisManager from "../../src/managers/GuildEmojisManager.js";
import GuildInviteManager from "../../src/managers/GuildInviteManager.js";
import GuildVoiceStatesManager from "../../src/managers/GuildVoiceStatesManager.js";
import GuildMemberManager from "../../src/managers/GuildMemberManager.js";
import GuildChannelsManager from "../../src/managers/GuildChannelsManager.js";
import GuildCacheOptions from "../../src/managers/GuildCacheOptions.js";
import Role from "../../src/structures/Role.js";

describe("Guild", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Guild).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild).to.have.property("id");
      expect(guild).to.have.property("name");
      expect(guild).to.have.property("displayIconURL");
      expect(guild).to.have.property("ownerId");
      expect(guild).to.have.property("owner");
      expect(guild).to.have.property("verificationLevel");
      expect(guild).to.have.property("defaultMessageNotifications");
      expect(guild).to.have.property("explicitContentFilter");
      expect(guild).to.have.property("roles");
      expect(guild).to.have.property("emojis");
      expect(guild).to.have.property("mfaLevel");
      expect(guild).to.have.property("systemChannel");
      expect(guild).to.have.property("systemChannelId");
      expect(guild).to.have.property("systemChannelFlags");
      expect(guild).to.have.property("rulesChannel");
      expect(guild).to.have.property("rulesChannelId");
      expect(guild).to.have.property("joinedAt");
      expect(guild).to.have.property("unavailable");
      expect(guild).to.have.property("memberCount");
      expect(guild).to.have.property("voiceStates");
      expect(guild).to.have.property("members");
      expect(guild).to.have.property("channels");
      expect(guild).to.have.property("description");
      expect(guild).to.have.property("premiumTier");
      expect(guild).to.have.property("premiumSubscriptionCount");
      expect(guild).to.have.property("premiumProgressBarEnabled");
      expect(guild).to.have.property("preferredLocale");
      expect(guild).to.have.property("nsfwLevel");
      expect(guild).to.have.property("emojis");
      expect(guild).to.have.property("invites");
      expect(guild).to.have.property("_cacheOptions");
      expect(guild).to.have.property("toString");
      expect(guild).to.have.property("toJSON");
      expect(guild).to.have.property("me");
      expect(guild).to.have.property("ban");
      expect(guild).to.have.property("unban");
      expect(guild).to.have.property("kick");
      expect(guild).to.have.property("removeMemberRole");
      expect(guild).to.have.property("fetchAuditLogs");
      expect(guild).to.have.property("fetchInvites");
      expect(guild).to.have.property("fetchChannels");
      expect(guild).to.have.property("fetchBan");
      expect(guild).to.have.property("leave");
      expect(guild).to.have.property("calculateMessageCacheCount");
      expect(guild).to.have.property("calculateMemberCacheCount");
    });
  });
  context("check id", function () {
    it("should have the correct id", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.id).to.equal(TEST_DATA.GUILD.id);
    });
  });
  context("check name", function () {
    it("should have the correct name", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.name).to.equal(TEST_DATA.GUILD.name);
    });
  });
  context("check displayIconURL", function () {
    it("should have the correct displayIconURL", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.displayIconURL).to.equal(TEST_DATA.GUILD.icon);
    });
  });
  context("check ownerId", function () {
    it("should have the correct ownerId", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.ownerId).to.equal(TEST_DATA.GUILD.owner_id);
    });
  });
  context("check owner", function () {
    it("should have the correct owner", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.GUILD.owner_id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(guild.owner.id).to.equal(TEST_DATA.GUILD.owner_id);
    });
  });
  context("check verificationLevel", function () {
    it("should have the correct verificationLevel", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.verificationLevel).to.equal("NONE");
    });
  });
  context("check defaultMessageNotifications", function () {
    it("should have the correct defaultMessageNotifications", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.defaultMessageNotifications).to.equal("ALL_MESSAGES");
    });
  });
  context("check explicitContentFilter", function () {
    it("should have the correct explicitContentFilter", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.explicitContentFilter).to.equal("DISABLED");
    });
  });
  context("check available", function () {
    it("should have the correct available", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.unavailable).to.equal(TEST_DATA.GUILD.unavailable);
    });
  });
  context("check memberCount", function () {
    it("should have the correct memberCount", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.memberCount).to.equal(TEST_DATA.GUILD.member_count);
    });
  });
  context("check description", function () {
    it("should have the correct description", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.description).to.equal(TEST_DATA.GUILD.description);
    });
  });
  context("check mfaLevel", function () {
    it("should have the correct mfaLevel", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.mfaLevel).to.equal("NONE");
    });
  });
  context("check systemChannelId", function () {
    it("should have the correct systemChannelId", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.systemChannelId).to.equal(TEST_DATA.GUILD.system_channel_id);
    });
  });
  context("check systemChannelFlags", function () {
    it("should have the correct systemChannelFlags", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.systemChannelFlags).to.deep.equal([]);
    });
  });
  context("check systemChannel", function () {
    it("should have the correct systemChannel", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      expect(guild.systemChannel.id).to.equal(
        TEST_DATA.GUILD.system_channel_id,
      );
    });
  });
  context("check rulesChannelId", function () {
    it("should have the correct rulesChannelId", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.rulesChannelId).to.equal(TEST_DATA.GUILD.rules_channel_id);
    });
  });
  context("check rulesChannel", function () {
    it("should have the correct rulesChannel", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL_2, TEST_DATA.GUILD_ID);
      expect(guild.rulesChannel.id).to.equal(TEST_DATA.GUILD.rules_channel_id);
    });
  });
  context("check premiumTier", function () {
    it("should have the correct premiumTier", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.premiumTier).to.equal(1);
    });
  });
  context("check premiumSubscriptionCount", function () {
    it("should have the correct premiumSubscriptionCount", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.premiumSubscriptionCount).to.equal(9);
    });
  });
  context("check premiumProgressBarEnabled", function () {
    it("should have the correct premiumProgressBarEnabled", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.premiumProgressBarEnabled).to.equal(true);
    });
  });
  context("check preferredLocale", function () {
    it("should have the correct preferredLocale", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.preferredLocale).to.equal("en-US");
    });
  });
  context("check nsfwLevel", function () {
    it("should have the correct nsfwLevel", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.nsfwLevel).to.equal("DEFAULT");
    });
  });
  context("check emojis", function () {
    it("should have the correct emojis", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.emojis).to.be.an.instanceOf(GuildEmojisManager);
    });
  });
  context("check invites", function () {
    it("should have the correct invites", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.invites).to.be.an.instanceOf(GuildInviteManager);
    });
  });
  context("check voiceStates", function () {
    it("should have the correct voiceStates", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.voiceStates).to.be.an.instanceOf(GuildVoiceStatesManager);
    });
  });
  context("check members", function () {
    it("should have the correct members", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.members).to.be.an.instanceOf(GuildMemberManager);
    });
  });
  context("check channels", function () {
    it("should have the correct channels", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      expect(guild.channels).to.be.an.instanceOf(GuildChannelsManager);
    });
  });
  context("check _cacheOptions", function () {
    it("should have the correct _cacheOptions", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild._cacheOptions).to.be.an.instanceOf(GuildCacheOptions);
    });
  });
  context("check toString", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.toString).to.be.a("function");
    });
    it("should return a string", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.toString()).to.equal(`<Guild: ${TEST_DATA.GUILD_ID}>`);
    });
  });
  context("check toJSON", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.toJSON).to.be.a("function");
    });
    it("should return an object", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.toJSON()).to.be.a("object");
    });
    it("should return the correct object", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.toJSON()).to.deep.equal({
        _attributes: 75800896,
        _cache_options: {},
        channels: {},
        emojis: {},
        icon: null,
        id: TEST_DATA.GUILD_ID,
        invites: {},
        joined_at:
          ((new Date(TEST_DATA.GUILD.joined_at).getTime() / 1000) | 0) * 1000,
        member_count: TEST_DATA.GUILD.member_count,
        members: {},
        name: TEST_DATA.GUILD.name,
        owner_id: TEST_DATA.GUILD.owner_id,
        preferred_locale: TEST_DATA.GUILD.preferred_locale,
        premium_subscription_count: TEST_DATA.GUILD.premium_subscription_count,
        premium_tier: TEST_DATA.GUILD.premium_tier,
        roles: {},
        rules_channel_id: TEST_DATA.GUILD.rules_channel_id,
        system_channel_id: TEST_DATA.GUILD.system_channel_id,
        unavailable: TEST_DATA.GUILD.unavailable,
        voice_states: {},
      });
    });
  });
  context("check me", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.me).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.GUILD.owner_id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(guild.me()).to.be.a("promise");
    });
  });
  context("check ban", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.ban).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.ban()).to.be.a("promise");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.ban()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: BAN_MEMBERS",
      );
    });
    it("should throw an error if no user id is provided", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.ban()).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: user_id",
      );
    });
    it("should throw an error if a reason is provided but it is not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.ban(TEST_DATA.MEMBER_ID, { reason: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: INVALID_TYPE: reason");
    });
    it("should throw an error if seconds is provided but it is not a number", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.ban(TEST_DATA.MEMBER_ID, { seconds: "123" }),
      ).to.be.rejectedWith(TypeError, "GLUON: INVALID_TYPE: seconds");
    });
    it("should throw an error if seconds is provided but it is less than 0", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.ban(TEST_DATA.MEMBER_ID, { seconds: -1 }),
      ).to.be.rejectedWith(RangeError, "GLUON: VALUE_OUT_OF_RANGE: seconds");
    });
    it("should throw an error if seconds is provided but it is too large", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.ban(TEST_DATA.MEMBER_ID, { seconds: 8 * 24 * 60 * 60 }),
      ).to.be.rejectedWith(RangeError, "GLUON: VALUE_OUT_OF_RANGE: seconds");
    });
    it("should throw an error if a reason is provided but it is too long", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.ban(TEST_DATA.MEMBER_ID, { reason: "a".repeat(513) }),
      ).to.be.rejectedWith(RangeError, "GLUON: VALUE_OUT_OF_RANGE: reason");
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.ban(TEST_DATA.MEMBER_ID)).to.not.be.rejected;
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.ban(TEST_DATA.MEMBER_ID, { reason: "test" })).to.not.be
        .rejected;
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.ban(TEST_DATA.MEMBER_ID, { seconds: 1 })).to.not.be
        .rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await guild.ban(TEST_DATA.MEMBER_ID);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("putCreateGuildBan", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
      ]);
    });
  });
  context("check unban", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.unban).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.unban()).to.be.a("promise");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.unban()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: BAN_MEMBERS",
      );
    });
    it("should throw an error if no user id is provided", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.unban()).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: user_id",
      );
    });
    it("should throw an error if a reason is provided but it is not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.unban(TEST_DATA.MEMBER_ID, { reason: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: INVALID_TYPE: reason");
    });
    it("should throw an error if a reason is provided but it is too long", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.unban(TEST_DATA.MEMBER_ID, { reason: "a".repeat(513) }),
      ).to.be.rejectedWith(RangeError, "GLUON: VALUE_OUT_OF_RANGE: reason");
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.unban(TEST_DATA.MEMBER_ID)).to.not.be.rejected;
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.unban(TEST_DATA.MEMBER_ID, { reason: "test" })).to.not
        .be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await guild.unban(TEST_DATA.MEMBER_ID);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("deleteRemoveGuildBan", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
      ]);
    });
  });
  context("check kick", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.kick).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.kick()).to.be.a("promise");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.kick()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: KICK_MEMBERS",
      );
    });
    it("should throw an error if no user id is provided", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.kick()).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: user_id",
      );
    });
    it("should throw an error if a reason is provided but it is not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.kick(TEST_DATA.MEMBER_ID, { reason: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: INVALID_TYPE: reason");
    });
    it("should throw an error if a reason is provided but it is too long", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.kick(TEST_DATA.MEMBER_ID, { reason: "a".repeat(513) }),
      ).to.be.rejectedWith(RangeError, "GLUON: VALUE_OUT_OF_RANGE: reason");
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.kick(TEST_DATA.MEMBER_ID)).to.not.be.rejected;
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.kick(TEST_DATA.MEMBER_ID, { reason: "test" })).to.not
        .be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await guild.kick(TEST_DATA.MEMBER_ID);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("deleteGuildMember", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
      ]);
    });
  });
  context("check removeMemberRole", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.removeMemberRole).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.removeMemberRole()).to.be.a("promise");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.removeMemberRole()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: MANAGE_ROLES",
      );
    });
    it("should throw an error if no user id is provided", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.removeMemberRole()).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: user_id",
      );
    });
    it("should throw an error if no role id is provided", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.removeMemberRole(TEST_DATA.MEMBER_ID),
      ).to.be.rejectedWith(TypeError, "GLUON: INVALID_TYPE: role_id");
    });
    it("should throw an error if a reason is provided but it is not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.removeMemberRole(TEST_DATA.MEMBER_ID, TEST_DATA.ROLE_ADMIN.id, {
          reason: 123,
        }),
      ).to.be.rejectedWith(TypeError, "GLUON: INVALID_TYPE: reason");
    });
    it("should throw an error if a reason is provided but it is too long", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.removeMemberRole(TEST_DATA.MEMBER_ID, TEST_DATA.ROLE_ADMIN.id, {
          reason: "a".repeat(513),
        }),
      ).to.be.rejectedWith(RangeError, "GLUON: VALUE_OUT_OF_RANGE: reason");
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.removeMemberRole(TEST_DATA.MEMBER_ID, TEST_DATA.ROLE_ADMIN.id),
      ).to.not.be.rejected;
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.removeMemberRole(TEST_DATA.MEMBER_ID, TEST_DATA.ROLE_ADMIN.id, {
          reason: "test",
        }),
      ).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await guild.removeMemberRole(
        TEST_DATA.MEMBER_ID,
        TEST_DATA.ROLE_ADMIN.id,
      );
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("deleteRemoveMemberRole", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
        TEST_DATA.ROLE_ADMIN.id,
      ]);
    });
  });
  context("check fetchAuditLogs", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.fetchAuditLogs).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.fetchAuditLogs()).to.be.a("promise");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchAuditLogs()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: VIEW_AUDIT_LOG",
      );
    });
    it("should throw an error if limit is provided but it is not a number", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchAuditLogs({ limit: "123" })).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: limit",
      );
    });
    it("should throw an error if limit is provided but it is less than 1", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchAuditLogs({ limit: 0 })).to.be.rejectedWith(
        RangeError,
        "GLUON: VALUE_OUT_OF_RANGE: limit",
      );
    });
    it("should throw an error if limit is provided but it is greater than 100", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchAuditLogs({ limit: 101 })).to.be.rejectedWith(
        RangeError,
        "GLUON: VALUE_OUT_OF_RANGE: limit",
      );
    });
    it("should throw an error if type is provided but it is not a number", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchAuditLogs({ type: "123" })).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: type",
      );
    });
    it("should throw an error if user id is provided but it is not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchAuditLogs({ user_id: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: user_id",
      );
    });
    it("should throw an error if before is provided but it is not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchAuditLogs({ user_id: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: user_id",
      );
    });
    it("should throw an error if after is provided but it is not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchAuditLogs({ user_id: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: user_id",
      );
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchAuditLogs()).to.not.be.rejected;
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        guild.fetchAuditLogs({
          limit: 1,
          type: 1,
          user_id: TEST_DATA.CLIENT_MEMBER.user.id,
          before: "123",
          after: "123",
        }),
      ).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await guild.fetchAuditLogs();
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getGuildAuditLog", [
        TEST_DATA.GUILD_ID,
      ]);
    });
  });
  context("check fetchInvites", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.fetchInvites).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.fetchInvites()).to.be.a("promise");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchInvites()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: MANAGE_GUILD",
      );
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchInvites()).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await guild.fetchInvites();
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getGuildInvites", [
        TEST_DATA.GUILD_ID,
      ]);
    });
  });
  context("check fetchChannels", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.fetchChannels).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.fetchChannels()).to.be.a("promise");
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => [TEST_DATA.TEXT_CHANNEL] },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchChannels()).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheChannels: true,
        request: { makeRequest: () => [TEST_DATA.TEXT_CHANNEL] },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      await guild.fetchChannels();
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getGuildChannels", [
        TEST_DATA.GUILD_ID,
      ]);
    });
  });
  context("check fetchBan", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.fetchBan).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.fetchBan()).to.be.a("promise");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchBan()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: BAN_MEMBERS",
      );
    });
    it("should throw an error if no user id is provided", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchBan()).to.be.rejectedWith(
        TypeError,
        "GLUON: INVALID_TYPE: user_id",
      );
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(guild.fetchBan(TEST_DATA.MEMBER_ID)).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await guild.fetchBan(TEST_DATA.MEMBER_ID);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getGuildBan", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
      ]);
    });
  });
  context("check leave", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.leave).to.be.a("function");
    });
    it("should return a promise", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.leave()).to.be.a("promise");
    });
    it("should not be rejected if the input is valid", async function () {
      const client = {
        cacheGuilds: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      await expect(guild.leave()).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        request: { makeRequest: () => {} },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      await guild.leave();
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("deleteLeaveGuild", [
        TEST_DATA.GUILD_ID,
      ]);
    });
  });
  context("check calculateMessageCacheCount", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.calculateMessageCacheCount).to.be.a("function");
    });
    it("should return a number", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.calculateMessageCacheCount()).to.be.a("number");
    });
    it("should return the correct number", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.calculateMessageCacheCount()).to.equal(50);
    });
  });
  context("check calculateMemberCacheCount", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.calculateMemberCacheCount).to.be.a("function");
    });
    it("should return a number", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.calculateMemberCacheCount()).to.be.a("number");
    });
    it("should return the correct number", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      expect(guild.calculateMemberCacheCount()).to.equal(249);
    });
  });
  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = { cacheGuilds: true, cacheMembers: true };
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.GUILD.owner_id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const rebundled = new Guild(client, guild.toJSON());
      expect(rebundled.id).to.deep.equal(guild.id);
      expect(rebundled.name).to.deep.equal(guild.name);
      expect(rebundled.displayIconURL).to.deep.equal(guild.displayIconURL);
      expect(rebundled.ownerId).to.deep.equal(guild.ownerId);
      expect(rebundled.verificationLevel).to.deep.equal(
        guild.verificationLevel,
      );
      expect(rebundled.defaultMessageNotifications).to.deep.equal(
        guild.defaultMessageNotifications,
      );
      expect(rebundled.explicitContentFilter).to.deep.equal(
        guild.explicitContentFilter,
      );
      expect(rebundled.roles).to.deep.equal(guild.roles);
      expect(rebundled.emojis).to.deep.equal(guild.emojis);
      expect(rebundled.mfaLevel).to.deep.equal(guild.mfaLevel);
      expect(rebundled.systemChannel).to.deep.equal(guild.systemChannel);
      expect(rebundled.systemChannelId).to.deep.equal(guild.systemChannelId);
      expect(rebundled.systemChannelFlags).to.deep.equal(
        guild.systemChannelFlags,
      );
      expect(rebundled.rulesChannel).to.deep.equal(guild.rulesChannel);
      expect(rebundled.rulesChannelId).to.deep.equal(guild.rulesChannelId);
      expect(rebundled.joinedAt).to.deep.equal(guild.joinedAt);
      expect(rebundled.unavailable).to.deep.equal(guild.unavailable);
      expect(rebundled.memberCount).to.deep.equal(guild.memberCount);
      expect(rebundled.voiceStates).to.deep.equal(guild.voiceStates);
      expect(rebundled.members).to.deep.equal(guild.members);
      expect(rebundled.channels).to.deep.equal(guild.channels);
      expect(rebundled.description).to.deep.equal(guild.description);
    });
  });
});
