import { expect } from "chai";
import { spy } from "sinon";
import Guild from "../../src/structures/Guild.js";
import GuildManager from "../../src/managers/GuildManager.js";
import { TEST_DATA } from "../../src/constants.js";

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
});
