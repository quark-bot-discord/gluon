import { expect } from "chai";
import { spy } from "sinon";
import { GuildInviteManager, Invite } from "../../src/structures.js";
import {
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
  TEST_MEMBERS,
  TEST_ROLES,
} from "../../src/testData.js";

describe("GuildInviteManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GuildInviteManager).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should create a new instance of GuildInviteManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invitesManager = new GuildInviteManager(client, guild);
      expect(invitesManager).to.be.an.instanceOf(GuildInviteManager);
      expect(invitesManager).to.have.property("fetch");
      expect(invitesManager).to.have.property("set");
    });
  });

  context("check fetch method", function () {
    it("should fetch invites", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invitesManager = new GuildInviteManager(client, guild);
      expect(invitesManager.fetch()).to.be.a("promise");
    });
    it("should fetch an invite from the cache", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const invitesManager = new GuildInviteManager(client, guild);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: guild.id,
      });
      invitesManager.set(TEST_DATA.INVITE.code, invite);
      const invites = await invitesManager.fetch();
      expect(invites).to.be.an.instanceOf(Array);
      expect(invites[0]).to.be.an.instanceOf(Invite);
      expect(invites[0]).to.deep.equal(invite);
    });
    it("should call makeRequest to fetch an invite", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const invitesManager = new GuildInviteManager(client, guild);
      const request = spy(client.request, "makeRequest");
      await invitesManager.fetch();
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getGuildInvites", [
        TEST_DATA.GUILD_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.undefined;
    });
  });

  context("check set method", function () {
    it("should cache an invite", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invitesManager = new GuildInviteManager(client, guild);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: guild.id,
      });
      invitesManager.set(TEST_DATA.INVITE.code, invite);
      expect(invitesManager.get(TEST_DATA.INVITE.code, invite)).to.deep.equal(
        invite,
      );
    });
    it("should throw an error if invite is not an instance of Invite", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invitesManager = new GuildInviteManager(client, guild);
      expect(() => invitesManager.set(TEST_DATA.INVITE.code, {})).to.throw(
        TypeError,
        "GLUON: Invite must be an instance of Invite.",
      );
    });
  });
});
