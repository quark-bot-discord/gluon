import { expect } from "chai";
import { spy } from "sinon";
import {
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
  TEST_MEMBERS,
  TEST_ROLES,
} from "../../testData.js";
import { Member } from "../../structures.js";
import { JsonTypes } from "#typings/enums.js";
import { GluonPermissionsError } from "#typings/errors.js";
describe("Member", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Member).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
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
      expect(member).to.have.property("displayAvatarURLNoFallback");
      expect(member).to.have.property("_originalAvatarHash");
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
      expect(member).to.have.property("hashName");
      expect(member).to.have.property("encrypt");
      expect(member).to.have.property("toString");
      expect(member).to.have.property("toJSON");
    });
    it("should have the correct static structure", function () {
      expect(Member).to.have.property("getHashName");
      expect(Member).to.have.property("decrypt");
      expect(Member).to.have.property("shouldCache");
    });
  });
  context("check user", function () {
    it("should have the correct user", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.user).to.be.an("object");
    });
  });
  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });
  context("check joinedAt", function () {
    it("should have the correct joinedAt", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.joinedAt).to.equal(
        (new Date(TEST_DATA.MEMBER.joined_at).getTime() / 1000) | 0,
      );
    });
  });
  context("check id", function () {
    it("should have the correct id", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.id).to.equal(TEST_DATA.MEMBER_ID);
    });
  });
  context("check addRole", function () {
    it("should have the correct addRole", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.addRole).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.addRole(TEST_DATA.ROLE_ID)).to.be.rejectedWith(
        GluonPermissionsError,
        "GLUON: Missing permission ManageRoles",
      );
    });
    it("should throw an error if the role is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.addRole(123)).to.be.rejectedWith(
        TypeError,
        "GLUON: Role ID is not a string.",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(
        member.addRole(TEST_DATA.ROLE_ID, { reason: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Reason is not a string.");
    });
    it("should not throw an error if the input is correct", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.addRole(TEST_DATA.ROLE_ID)).to.not.be.rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.addRole(TEST_DATA.ROLE_ID, { reason: "testing" })).to
        .not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
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
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.removeRole).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.removeRole(TEST_DATA.ROLE_ID)).to.be.rejectedWith(
        GluonPermissionsError,
        "GLUON: Missing permission ManageRoles",
      );
    });
    it("should throw an error if the role is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.removeRole(123)).to.be.rejectedWith(
        TypeError,
        "GLUON: Role ID is not a string.",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(
        member.removeRole(TEST_DATA.ROLE_ID, { reason: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Reason is not a string.");
    });
    it("should not throw an error if the input is correct", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.removeRole(TEST_DATA.ROLE_ID)).to.not.be.rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.removeRole(TEST_DATA.ROLE_ID, { reason: "testing" }))
        .to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
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
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.timeoutAdd).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const timeoutUntil = ((new Date().getTime() / 1000) | 0) + 3600;
      await expect(member.timeoutAdd(timeoutUntil)).to.be.rejectedWith(
        GluonPermissionsError,
        "GLUON: Missing permission ModerateMembers",
      );
    });
    it("should throw an error if the timeoutUntil is not a number", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.timeoutAdd("testing")).to.be.rejectedWith(
        TypeError,
        "GLUON: Timeout until must be a UNIX timestamp.",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.timeoutAdd(123, { reason: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Reason must be a string.",
      );
    });
    it("should not throw an error if the input is correct", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.timeoutAdd(123)).to.not.be.rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.timeoutAdd(123, { reason: "testing" })).to.not.be
        .rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
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
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.timeoutRemove).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.timeoutRemove(TEST_DATA.ROLE_ID)).to.be.rejectedWith(
        GluonPermissionsError,
        "GLUON: Missing permission ModerateMembers",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.timeoutRemove({ reason: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Reason must be a string.",
      );
    });
    it("should not throw an error if the input is correct", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.timeoutRemove()).to.not.be.rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.timeoutRemove({ reason: "testing" })).to.not.be
        .rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
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
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.massUpdateRoles).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(
        member.massUpdateRoles([TEST_DATA.ROLE_ID]),
      ).to.be.rejectedWith(
        GluonPermissionsError,
        "GLUON: Missing permission ManageRoles",
      );
    });
    it("should throw an error if the roles is not an array", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.massUpdateRoles(123)).to.be.rejectedWith(
        TypeError,
        "GLUON: Roles must be an array of role ids.",
      );
    });
    it("should throw an error if the roles contains a non-string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.massUpdateRoles([123])).to.be.rejectedWith(
        TypeError,
        "GLUON: Roles must be an array of role ids.",
      );
    });
    it("should throw an error if a reason is provided and it is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(
        member.massUpdateRoles([TEST_DATA.ROLE_ID], { reason: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Reason must be a string.");
    });
    it("should not throw an error if the input is correct", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(member.massUpdateRoles([TEST_DATA.ROLE_ID])).to.not.be
        .rejected;
    });
    it("should not throw an error if the input is correct and a reason is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      await expect(
        member.massUpdateRoles([TEST_DATA.ROLE_ID], { reason: "testing" }),
      ).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
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
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.toString).to.be.a("function");
    });
  });
  context("check toJSON", function () {
    it("should have the correct toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.toJSON()).to.deep.equal({
        avatar: null,
        communication_disabled_until:
          TEST_DATA.MEMBER.communication_disabled_until,
        flags: TEST_DATA.MEMBER.flags,
        joined_at: TEST_DATA.MEMBER.joined_at,
        nick: TEST_DATA.MEMBER.nick,
        pending: TEST_DATA.MEMBER.pending,
        permissions: "8",
        roles: [],
        user: {
          avatar: TEST_DATA.MEMBER.user.avatar,
          bot: TEST_DATA.MEMBER.user.bot,
          discriminator: TEST_DATA.MEMBER.user.discriminator,
          global_name: TEST_DATA.MEMBER.user.global_name,
          id: TEST_DATA.MEMBER.user.id,
          username: TEST_DATA.MEMBER.user.username,
        },
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.toJSON(JsonTypes.CACHE_FORMAT)).to.deep.equal({
        _attributes: 0,
        avatar: null,
        communication_disabled_until:
          TEST_DATA.MEMBER.communication_disabled_until,
        flags: TEST_DATA.MEMBER.flags,
        joined_at: new Date(TEST_DATA.MEMBER.joined_at).getTime(),
        nick: TEST_DATA.MEMBER.nick,
        permissions: "8",
        roles: [],
        user: {
          _cached: member.user._cached,
          avatar: TEST_DATA.MEMBER.user.avatar,
          bot: TEST_DATA.MEMBER.user.bot,
          discriminator: Number(TEST_DATA.MEMBER.user.discriminator),
          global_name: TEST_DATA.MEMBER.user.global_name,
          id: TEST_DATA.MEMBER.user.id,
          username: TEST_DATA.MEMBER.user.username,
        },
      });
      expect(member.toJSON(JsonTypes.STORAGE_FORMAT)).to.deep.equal({
        _attributes: 0,
        avatar: null,
        communication_disabled_until:
          TEST_DATA.MEMBER.communication_disabled_until,
        flags: TEST_DATA.MEMBER.flags,
        joined_at: new Date(TEST_DATA.MEMBER.joined_at).getTime(),
        nick: TEST_DATA.MEMBER.nick,
        permissions: "8",
        roles: [],
        user: {
          _cached: member.user._cached,
          avatar: TEST_DATA.MEMBER.user.avatar,
          bot: TEST_DATA.MEMBER.user.bot,
          discriminator: Number(TEST_DATA.MEMBER.user.discriminator),
          global_name: TEST_DATA.MEMBER.user.global_name,
          id: TEST_DATA.MEMBER.user.id,
          username: TEST_DATA.MEMBER.user.username,
        },
      });
      expect(member.toJSON(JsonTypes.DISCORD_FORMAT)).to.deep.equal({
        avatar: null,
        communication_disabled_until:
          TEST_DATA.MEMBER.communication_disabled_until,
        flags: TEST_DATA.MEMBER.flags,
        joined_at: TEST_DATA.MEMBER.joined_at,
        nick: TEST_DATA.MEMBER.nick,
        pending: TEST_DATA.MEMBER.pending,
        permissions: "8",
        roles: [],
        user: {
          avatar: TEST_DATA.MEMBER.user.avatar,
          bot: TEST_DATA.MEMBER.user.bot,
          discriminator: TEST_DATA.MEMBER.user.discriminator,
          global_name: TEST_DATA.MEMBER.user.global_name,
          id: TEST_DATA.MEMBER.user.id,
          username: TEST_DATA.MEMBER.user.username,
        },
      });
    });
  });
  context("check nick", function () {
    it("should have the correct nick", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.nick).to.equal(TEST_DATA.MEMBER.nick);
    });
  });
  context("check roles", function () {
    it("should have the correct roles", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.roles).to.be.an("array");
    });
  });
  context("check flags", function () {
    it("should have the correct flags", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.flags).to.equal(TEST_DATA.MEMBER.flags);
    });
  });
  context("check highestRolePosition", function () {
    it("should have the correct highestRolePosition", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.highestRolePosition).to.equal(0);
    });
  });
  context("check rejoined", function () {
    it("should have the correct rejoined", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.rejoined).to.equal(false);
    });
  });
  context("check displayAvatarURL", function () {
    it("should have the correct displayAvatarURL", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.displayAvatarURL).to.equal(
        "https://cdn.discordapp.com/embed/avatars/0.png",
      );
    });
  });
  context("check displayAvatarURLNoFallback", function () {
    it("should have the correct displayAvatarURLNoFallback", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.displayAvatarURLNoFallback).to.be.null;
    });
  });
  context("check _originalAvatarHash", function () {
    it("should have the correct _originalAvatarHash", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member._originalAvatarHash).to.be.null;
    });
  });
  context("check permissions", function () {
    it("should have the correct permissions", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      // 8 since the member is the owner
      expect(member.permissions).to.equal("8");
    });
  });
  context("check avatarIsAnimated", function () {
    it("should have the correct avatarIsAnimated", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.avatarIsAnimated).to.equal(false);
    });
  });
  context("check mention", function () {
    it("should have the correct mention", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.mention).to.equal(`<@${TEST_DATA.MEMBER_ID}>`);
    });
  });
  context("check pending", function () {
    it("should have the correct pending", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.pending).to.equal(TEST_DATA.MEMBER.pending);
    });
  });
  context("check timeoutUntil", function () {
    it("should have the correct timeoutUntil", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.timeoutUntil).to.equal(null);
    });
  });
  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
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
  context("check getAvatarUrl", function () {
    it("should throw an error if no member id is provided", function () {
      expect(() =>
        Member.getAvatarUrl(undefined, TEST_DATA.GUILD_ID, "hash"),
      ).to.throw(TypeError, "GLUON: Member id must be a string.");
    });
    it("should throw an error if no guild id is provided", function () {
      expect(() =>
        Member.getAvatarUrl(TEST_DATA.MEMBER_ID, undefined, "hash"),
      ).to.throw(TypeError, "GLUON: Guild id must be a string.");
    });
    it("should throw an error if the hash is not a string and not null", function () {
      expect(() =>
        Member.getAvatarUrl(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID, 123),
      ).to.throw(TypeError, "GLUON: Member avatar hash must be a string.");
    });
    it("should return a string", function () {
      expect(
        Member.getAvatarUrl(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID, "hash"),
      ).to.be.a("string");
    });
    it("should return null if no hash is provided", function () {
      expect(Member.getAvatarUrl(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID)).to.be
        .null;
    });
    it("should return the correct avatar url", function () {
      expect(
        Member.getAvatarUrl(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID, "hash"),
      ).to.equal(
        `https://cdn.discordapp.com/guilds/${TEST_DATA.GUILD_ID}/users/${TEST_DATA.MEMBER_ID}/avatars/hash.png`,
      );
    });
    it("should return the correct avatar url for a gif", function () {
      expect(
        Member.getAvatarUrl(TEST_DATA.MEMBER_ID, TEST_DATA.GUILD_ID, "a_hash"),
      ).to.equal(
        `https://cdn.discordapp.com/guilds/${TEST_DATA.GUILD_ID}/users/${TEST_DATA.MEMBER_ID}/avatars/a_hash.gif`,
      );
    });
  });
  context("check hashName", function () {
    it("should return the correct hashName", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      expect(member.hashName).to.equal(
        "8aa59de8144e3679c9e2ec87d00e5644b7b2adca0dea60fc1a3dc2bd52907ecf2f09397765e4e5310e840556a4e62b6afa9b85708a2f4ea1120c25a1099105a5",
      );
    });
  });
  context("check encrypt", function () {
    it("should return the correct encrypted member", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const encrypted = member.encrypt();
      expect(encrypted).to.be.a("string");
      // expect(encrypted).to.equal(
      //   "GZhWQoPL07tKRkr0dMP66gDiDBe2GwslYJEWQJKeXa/sWfZq5VJOsNRitkJQvSR/53lS61sYgT97HduWEdRUhC9I4JjrKl7kYIjJfg3GxPLOWODl2JHvOxzsoNBstNXKQdk8n/egEMxFcHz5Imc0m9ZsIf3odUWp/+8+E3+mFT2qDEYN5SYYHu8gnIvhGemNpUvQtA7CIYq66e1XrcaS/iR2lmc05jjIpHpJzD1pINuUweOLPf4oU8IfCBDAi0yRIhP6W1W0gkOHgxdJ2lU+WfYrqkpun+6srNHDDFqOlc1GAVI5+ySo3IMogbThDfiP",
      // );
    });
  });
  context("check decrypt", function () {
    it("should return the correct decrypted message", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const decrypted = Member.decrypt(
        client,
        "GZhWQoPL07tKRkr0dMP66gDiDBe2GwslYJEWQJKeXa/sWfZq5VJOsNRitkJQvSR/prD8QHJqAhp889GoLQfSvEv0NXeiU8NTL4nYIKLIIDWrwVlhSXDIStVEGvqtoP0JFi9OHBujvqofe4hkn6SAjlYWgxeqRZj4gXAgFJ+mWWlX63X+4wUZeL8cy2r3eThvjKFmBzAMp3X2i1WGYSKUyaum/zHiu89K9IZ26ewOAgX6RHz3dNrQpE/APOGrAeBM0fa27jBFqW8YDnsgQhrm185GAt4ky12xqbWvJPu+EEA=",
        TEST_DATA.GUILD_ID,
        TEST_DATA.MEMBER_ID,
      );
      expect(decrypted.id).to.equal(TEST_DATA.MEMBER_ID);
    });
  });
  context("check shouldCache", function () {
    it("should return true if all caches are enabled", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(Member.shouldCache(client._cacheOptions, guild._cacheOptions)).to
        .be.true;
    });
    it("should return false if message caching is disabled for the client", function () {
      const client = TEST_CLIENTS.NO_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(Member.shouldCache(client._cacheOptions, guild._cacheOptions)).to
        .be.false;
    });
    it("should return false if message caching is disabled for the guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.NO_CACHES_ENABLED(client);
      expect(Member.shouldCache(client._cacheOptions, guild._cacheOptions)).to
        .be.false;
    });
  });
  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const rebundled = new Member(client, member.toJSON(), {
        userId: TEST_DATA.MEMBER_ID,
        guildId: TEST_DATA.GUILD_ID,
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
      expect(rebundled.displayAvatarURLNoFallback).to.equal(
        member.displayAvatarURLNoFallback,
      );
      expect(rebundled.pending).to.equal(member.pending);
      expect(rebundled.avatarIsAnimated).to.equal(member.avatarIsAnimated);
      expect(rebundled.mention).to.equal(member.mention);
      expect(rebundled._originalAvatarHash).to.equal(
        member._originalAvatarHash,
      );
    });
    it("should rebundle correctly with custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const rebundled = new Member(
        client,
        member.toJSON(JsonTypes.CACHE_FORMAT),
        {
          userId: TEST_DATA.MEMBER_ID,
          guildId: TEST_DATA.GUILD_ID,
        },
      );
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
      expect(rebundled.displayAvatarURLNoFallback).to.equal(
        member.displayAvatarURLNoFallback,
      );
      expect(rebundled.pending).to.equal(member.pending);
      expect(rebundled.avatarIsAnimated).to.equal(member.avatarIsAnimated);
      expect(rebundled.mention).to.equal(member.mention);
      expect(rebundled._originalAvatarHash).to.equal(
        member._originalAvatarHash,
      );
    });
    it("should rebundle correctly with custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const rebundled = new Member(
        client,
        member.toJSON(JsonTypes.STORAGE_FORMAT),
        {
          userId: TEST_DATA.MEMBER_ID,
          guildId: TEST_DATA.GUILD_ID,
        },
      );
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
      expect(rebundled.displayAvatarURLNoFallback).to.equal(
        member.displayAvatarURLNoFallback,
      );
      expect(rebundled.pending).to.equal(member.pending);
      expect(rebundled.avatarIsAnimated).to.equal(member.avatarIsAnimated);
      expect(rebundled.mention).to.equal(member.mention);
      expect(rebundled._originalAvatarHash).to.equal(
        member._originalAvatarHash,
      );
    });
    it("should rebundle correctly with custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const rebundled = new Member(
        client,
        member.toJSON(JsonTypes.DISCORD_FORMAT),
        {
          userId: TEST_DATA.MEMBER_ID,
          guildId: TEST_DATA.GUILD_ID,
        },
      );
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
      expect(rebundled.displayAvatarURLNoFallback).to.equal(
        member.displayAvatarURLNoFallback,
      );
      expect(rebundled.pending).to.equal(member.pending);
      expect(rebundled.avatarIsAnimated).to.equal(member.avatarIsAnimated);
      expect(rebundled.mention).to.equal(member.mention);
      expect(rebundled._originalAvatarHash).to.equal(
        member._originalAvatarHash,
      );
    });
  });
});
//# sourceMappingURL=Member.spec.js.map
