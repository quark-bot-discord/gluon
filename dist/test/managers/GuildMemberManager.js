import { expect } from "chai";
import { spy } from "sinon";
import GuildMemberManager from "../../src/managers/GuildMemberManager.js";
import {
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
  TEST_MEMBERS,
} from "../../src/testData.js";
import { Guild, Member } from "../../src/structures.js";
describe("GuildMemberManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GuildMemberManager).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should create a new instance of GuildMemberManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildMemberManager = new GuildMemberManager(client, guild);
      expect(guildMemberManager).to.be.an.instanceOf(GuildMemberManager);
      expect(guildMemberManager).to.have.property("set");
      expect(guildMemberManager).to.have.property("fetch");
      expect(guildMemberManager).to.have.property("guild");
      expect(guildMemberManager).to.have.property("search");
      expect(GuildMemberManager).to.have.property("getCacheManager");
      expect(GuildMemberManager).to.have.property("fetchMember");
      expect(GuildMemberManager).to.have.property("search");
    });
  });
  context("check set method", function () {
    it("should set the correct values", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildMemberManager = new GuildMemberManager(client, guild);
      const guildMember = TEST_MEMBERS.GENERIC_MEMBER(client);
      guildMemberManager.set("123456", guildMember);
      expect(guildMemberManager.get("123456")).to.deep.equal(guildMember);
    });
    it("should throw an error if guildMember is not a GuildMember instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildMemberManager = new GuildMemberManager(client, guild);
      expect(() => guildMemberManager.set("123456", {})).to.throw(
        TypeError,
        "GLUON: Member must be a Member instance.",
      );
    });
  });
  context("check guild property", function () {
    it("should return the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildMemberManager = new GuildMemberManager(client, guild);
      expect(guildMemberManager.guild).to.deep.equal(guild);
      expect(guildMemberManager.guild).to.be.an.instanceOf(Guild);
    });
  });
  context("check getCacheManager method", function () {
    it("should return the correct cache manager", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(
        GuildMemberManager.getCacheManager(client, TEST_DATA.GUILD_ID),
      ).to.be.an.instanceOf(GuildMemberManager);
    });
    it("should throw an error if client is not a Client instance", function () {
      expect(() => GuildMemberManager.getCacheManager()).to.throw(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error if guildId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      expect(() => GuildMemberManager.getCacheManager(client)).to.throw(
        TypeError,
        "GLUON: Guild ID must be a string.",
      );
    });
  });
  context("check fetchMember method", function () {
    it("should return the correct member from cache", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const fetchedMember = await GuildMemberManager.fetchMember(
        client,
        guild.id,
        member.id,
      );
      expect(fetchedMember).to.deep.equal(member);
    });
    it("should return the correct member from the API", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const fetchedMember = await GuildMemberManager.fetchMember(
        client,
        guild.id,
        member.id,
      );
      expect(fetchedMember).to.be.an.instanceOf(Member);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const request = spy(client.request, "makeRequest");
      await GuildMemberManager.fetchMember(
        client,
        guild.id,
        TEST_DATA.MEMBER_ID,
      );
      expect(request).to.have.been.calledOnce;
      expect(request).to.have.been.calledWith("getGuildMember", [
        guild.id,
        TEST_DATA.MEMBER_ID,
      ]);
    });
    it("should throw an error if client is not a Client instance", async function () {
      await expect(GuildMemberManager.fetchMember()).to.be.rejectedWith(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error if guildId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(GuildMemberManager.fetchMember(client)).to.be.rejectedWith(
        TypeError,
        "GLUON: Guild ID is not a string.",
      );
    });
    it("should throw an error if userId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(
        GuildMemberManager.fetchMember(client, TEST_DATA.GUILD_ID),
      ).to.be.rejectedWith(TypeError, "GLUON: User ID is not a string.");
    });
  });
  context("check search method", function () {
    it("should return the correct members", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const members = await GuildMemberManager.search(
        client,
        guild.id,
        member.user.username,
      );
      expect(members).to.be.an("array");
      expect(members).to.have.lengthOf(1);
      expect(members[0]).to.deep.equal(member);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const member = TEST_MEMBERS.GENERIC_MEMBER(client);
      const request = spy(client.request, "makeRequest");
      await GuildMemberManager.search(client, guild.id, member.user.username);
      expect(request).to.have.been.calledOnce;
      expect(request).to.have.been.calledWith("getSearchGuildMembers", [
        guild.id,
      ]);
      expect(request.firstCall.args[2]).to.deep.equal({
        query: member.user.username,
        limit: 1000,
      });
    });
    it("should throw an error if client is not a Client instance", async function () {
      await expect(GuildMemberManager.search()).to.be.rejectedWith(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error if guildId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(GuildMemberManager.search(client)).to.be.rejectedWith(
        TypeError,
        "GLUON: Guild ID is not a string.",
      );
    });
    it("should throw an error if query is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(
        GuildMemberManager.search(client, TEST_DATA.GUILD_ID),
      ).to.be.rejectedWith(TypeError, "GLUON: Query is not a string.");
    });
  });
});
//# sourceMappingURL=GuildMemberManager.js.map
