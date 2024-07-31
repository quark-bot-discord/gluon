import { expect } from "chai";
import { spy } from "sinon";
import { TEST_DATA } from "../../src/constants.js";
import TextChannel from "../../src/structures/TextChannel.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";
import Member from "../../src/structures/Member.js";
import Role from "../../src/structures/Role.js";

describe("TextChannel", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(TextChannel).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(textChannel).to.have.property("id");
      expect(textChannel).to.have.property("name");
      expect(textChannel).to.have.property("type");
      expect(textChannel).to.have.property("guildId");
      expect(textChannel).to.have.property("mention");
      expect(textChannel).to.have.property("guild");
      expect(textChannel).to.have.property("parentId");
      expect(textChannel).to.have.property("parent");
      expect(textChannel).to.have.property("rateLimitPerUser");
      expect(textChannel).to.have.property("nsfw");
      expect(textChannel).to.have.property("topic");
      expect(textChannel).to.have.property("_cacheOptions");
      expect(textChannel).to.have.property("messages");
      expect(textChannel).to.have.property("toString");
      expect(textChannel).to.have.property("toJSON");
      expect(textChannel).to.have.property("send");
      expect(textChannel).to.have.property("bulkDelete");
    });
  });

  context("check bulkDelete", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(textChannel.bulkDelete).to.be.a("function");
    });
    it("should return an error if the bot has insufficient permissions", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(textChannel.bulkDelete()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: MANAGE_MESSAGES",
      );
    });
    it("should return an error if messages is not an array of strings", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(textChannel.bulkDelete(["1", 2])).to.be.rejectedWith(
        TypeError,
        "GLUON: Messages is not an array of strings.",
      );
    });
    it("should return an error if reason is provided and not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        textChannel.bulkDelete(["1"], { reason: 1 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Reason is not a string.");
    });
    it("should call makeRequest with the correct parameters", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      const request = spy(client.request, "makeRequest");
      await textChannel.bulkDelete(["1", "2"]);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postBulkDeleteMessages", [
        TEST_DATA.TEXT_CHANNEL.id,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });
});
