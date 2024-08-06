import { expect } from "chai";
import { spy } from "sinon";
import { TEST_DATA } from "../../src/constants.js";
import Member from "../../src/structures/Member.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";
import Role from "../../src/structures/Role.js";

describe("Member", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Member).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member).to.have.property("user");
      expect(member).to.have.property("guildId");
      expect(member).to.have.property("guild");
      expect(member).to.have.property("timeoutUntil");
      expect(member).to.have.property("nick");
      expect(member).to.have.property("roles");
      expect(member).to.have.property("flags");
      expect(member).to.have.property("highestRolePosition");
      expect(member).to.have.property("rejoined");
      expect(member).to.have.property("displayAvatarURL");
      expect(member).to.have.property("permissions");
      expect(member).to.have.property("avatarIsAnimated");
      expect(member).to.have.property("mention");
      expect(member).to.have.property("pending");
      expect(member).to.have.property("joinedAt");
      expect(member).to.have.property("id");
      expect(member).to.have.property("addRole");
      expect(member).to.have.property("removeRole");
      expect(member).to.have.property("timeoutAdd");
      expect(member).to.have.property("timeoutRemove");
      expect(member).to.have.property("massUpdateRoles");
      expect(member).to.have.property("toString");
      expect(member).to.have.property("toJSON");
    });
  });

  context("check user", function () {
    it("should have the correct user", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.user).to.be.an("object");
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check joinedAt", function () {
    it("should have the correct joinedAt", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.joinedAt).to.equal(
        (new Date(TEST_DATA.MEMBER.joined_at).getTime() / 1000) | 0,
      );
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.id).to.equal(TEST_DATA.MEMBER_ID);
    });
  });

  context("check addRole", function () {
    it("should have the correct addRole", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.addRole).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, request: { makeRequest: () => {} } };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.addRole(TEST_DATA.ROLE_ID)).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: MANAGE_ROLES",
      );
    });
    it("should throw an error if the role is not a string", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.addRole(123)).to.be.rejectedWith(
        TypeError,
        "GLUON: Role id must be a string.",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        member.addRole(TEST_DATA.ROLE_ID, { reason: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Reason must be a string.");
    });
    it("should not throw an error if the input is correct", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.addRole(TEST_DATA.ROLE_ID)).to.not.be.rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.addRole(TEST_DATA.ROLE_ID, { reason: "testing" })).to
        .not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const request = spy(client.request, "makeRequest");
      await member.addRole(TEST_DATA.ROLE_ID, { reason: "testing" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("putAddGuildMemberRole", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
        TEST_DATA.ROLE_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check removeRole", function () {
    it("should have the correct removeRole", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.removeRole).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, request: { makeRequest: () => {} } };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.removeRole(TEST_DATA.ROLE_ID)).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: MANAGE_ROLES",
      );
    });
    it("should throw an error if the role is not a string", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.removeRole(123)).to.be.rejectedWith(
        TypeError,
        "GLUON: Role ID must be a string.",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        member.removeRole(TEST_DATA.ROLE_ID, { reason: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Reason must be a string.");
    });
    it("should not throw an error if the input is correct", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.removeRole(TEST_DATA.ROLE_ID)).to.not.be.rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.removeRole(TEST_DATA.ROLE_ID, { reason: "testing" }))
        .to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const request = spy(client.request, "makeRequest");
      await member.removeRole(TEST_DATA.ROLE_ID, { reason: "testing" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("deleteRemoveMemberRole", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
        TEST_DATA.ROLE_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check timeoutAdd", function () {
    it("should have the correct timeoutAdd", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.timeoutAdd).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, request: { makeRequest: () => {} } };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const timeoutUntil = ((new Date().getTime() / 1000) | 0) + 3600;
      await expect(member.timeoutAdd(timeoutUntil)).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: MODERATE_MEMBERS",
      );
    });
    it("should throw an error if the timeoutUntil is not a number", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.timeoutAdd("testing")).to.be.rejectedWith(
        TypeError,
        "GLUON: Timeout until must be a UNIX timestamp.",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.timeoutAdd(123, { reason: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Reason must be a string.",
      );
    });
    it("should not throw an error if the input is correct", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.timeoutAdd(123)).to.not.be.rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.timeoutAdd(123, { reason: "testing" })).to.not.be
        .rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const request = spy(client.request, "makeRequest");
      await member.timeoutAdd(123, { reason: "testing" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("patchGuildMember", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check timeoutRemove", function () {
    it("should have the correct timeoutRemove", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.timeoutRemove).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, request: { makeRequest: () => {} } };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.timeoutRemove(TEST_DATA.ROLE_ID)).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: MODERATE_MEMBERS",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.timeoutRemove({ reason: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Reason must be a string.",
      );
    });
    it("should not throw an error if the input is correct", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.timeoutRemove()).to.not.be.rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.timeoutRemove({ reason: "testing" })).to.not.be
        .rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const request = spy(client.request, "makeRequest");
      await member.timeoutRemove({ reason: "testing" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("patchGuildMember", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check massUpdateRoles", function () {
    it("should have the correct massUpdateRoles", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.massUpdateRoles).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheGuilds: true, request: { makeRequest: () => {} } };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        member.massUpdateRoles([TEST_DATA.ROLE_ID]),
      ).to.be.rejectedWith(Error, "MISSING PERMISSIONS: MANAGE_ROLES");
    });
    it("should throw an error if the roles is not an array", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.massUpdateRoles(123)).to.be.rejectedWith(
        TypeError,
        "GLUON: Roles must be an array of role ids.",
      );
    });
    it("should throw an error if the roles contains a non-string", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.massUpdateRoles([123])).to.be.rejectedWith(
        TypeError,
        "GLUON: Roles must be an array of role ids.",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        member.massUpdateRoles([TEST_DATA.ROLE_ID], { reason: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Reason must be a string.");
    });
    it("should not throw an error if the input is correct", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(member.massUpdateRoles([TEST_DATA.ROLE_ID])).to.not.be
        .rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        member.massUpdateRoles([TEST_DATA.ROLE_ID], { reason: "testing" }),
      ).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
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
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const request = spy(client.request, "makeRequest");
      await member.massUpdateRoles([TEST_DATA.ROLE_ID], { reason: "testing" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("patchGuildMember", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check toString", function () {
    it("should have the correct toString", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.toString).to.be.a("function");
    });
  });

  context("check toJSON", function () {
    it("should have the correct toJSON", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.toJSON).to.be.a("function");
    });
  });

  context("check nick", function () {
    it("should have the correct nick", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.nick).to.equal(TEST_DATA.MEMBER.nick);
    });
  });

  context("check roles", function () {
    it("should have the correct roles", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.roles).to.be.an("array");
    });
  });

  context("check flags", function () {
    it("should have the correct flags", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.flags).to.equal(TEST_DATA.MEMBER.flags);
    });
  });

  context("check highestRolePosition", function () {
    it("should have the correct highestRolePosition", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.highestRolePosition).to.equal(0);
    });
  });

  context("check rejoined", function () {
    it("should have the correct rejoined", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.rejoined).to.equal(false);
    });
  });

  context("check displayAvatarURL", function () {
    it("should have the correct displayAvatarURL", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.displayAvatarURL).to.equal(
        "https://cdn.discordapp.com/embed/avatars/0.png",
      );
    });
  });

  context("check permissions", function () {
    it("should have the correct permissions", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      // 8 since the member is the owner
      expect(member.permissions).to.equal("8");
    });
  });

  context("check avatarIsAnimated", function () {
    it("should have the correct avatarIsAnimated", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.avatarIsAnimated).to.equal(false);
    });
  });

  context("check mention", function () {
    it("should have the correct mention", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.mention).to.equal(`<@${TEST_DATA.MEMBER_ID}>`);
    });
  });

  context("check pending", function () {
    it("should have the correct pending", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.pending).to.equal(TEST_DATA.MEMBER.pending);
    });
  });

  context("check timeoutUntil", function () {
    it("should have the correct timeoutUntil", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.timeoutUntil).to.equal(null);
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(member.guild.id).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check getMention", function () {
    it("should return the correct mention", function () {
      expect(Member.getMention(TEST_DATA.MEMBER_ID)).to.equal(
        `<@${TEST_DATA.MEMBER_ID}>`,
      );
    });
    it("should throw an error if the input is not a string", function () {
      expect(() => Member.getMention(123)).to.throw(
        TypeError,
        "GLUON: User ID must be a string.",
      );
    });
  });

  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const member = new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const rebundled = new Member(client, member.toJSON(), {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.id).to.equal(member.id);
      expect(rebundled.user.id).to.equal(member.user.id);
      expect(rebundled.guild.id).to.equal(member.guild.id);
      expect(rebundled.guildId).to.equal(member.guildId);
      expect(rebundled.nick).to.equal(member.nick);
      expect(rebundled.joinedAt).to.equal(member.joinedAt);
      expect(rebundled.timeoutUntil).to.equal(member.timeoutUntil);
      expect(rebundled.flags).to.equal(member.flags);
      expect(rebundled.roles).to.deep.equal(member.roles);
      expect(rebundled.highestRolePosition).to.deep.equal(
        member.highestRolePosition,
      );
      expect(rebundled.rejoined).to.equal(member.rejoined);
      expect(rebundled.permissions).to.equal(member.permissions);
      expect(rebundled.displayAvatarURL).to.equal(member.displayAvatarURL);
      expect(rebundled.pending).to.equal(member.pending);
      expect(rebundled.avatarIsAnimated).to.equal(member.avatarIsAnimated);
      expect(rebundled.mention).to.equal(member.mention);
    });
  });
});
