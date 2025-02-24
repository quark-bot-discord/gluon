import { expect } from "chai";
import { spy } from "sinon";
import GuildRoleManager from "../../src/managers/GuildRoleManager.js";
import Role from "../../src/structures/Role.js";
import {
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
  TEST_ROLES,
} from "../../src/testData.js";
describe("GuildRoleManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GuildRoleManager).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should create a new instance of GuildRoleManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildRoleManager = new GuildRoleManager(client, guild);
      expect(guildRoleManager).to.be.an.instanceOf(GuildRoleManager);
      expect(guildRoleManager).to.have.property("set");
      expect(guildRoleManager).to.have.property("fetch");
      expect(GuildRoleManager).to.have.property("getCacheManager");
      expect(GuildRoleManager).to.have.property("getRole");
      expect(GuildRoleManager).to.have.property("fetchRole");
    });
  });
  context("check set method", function () {
    it("should set the correct values", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildRoleManager = new GuildRoleManager(client, guild);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      guildRoleManager.set("123456", role);
      expect(guildRoleManager.get("123456")).to.deep.equal(role);
    });
    it("should throw an error if role is not a Role instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildRoleManager = new GuildRoleManager(client, guild);
      expect(() => guildRoleManager.set("123456", {})).to.throw(
        TypeError,
        "GLUON: Role must be an instance of Role.",
      );
    });
  });
  context("check fetch method", function () {
    it("should return the correct role from cache", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      const guildRoleManager = new GuildRoleManager(client, guild);
      const fetchedRole = await guildRoleManager.fetch(TEST_DATA.ROLE_ID);
      expect(fetchedRole).to.deep.equal(role);
    });
    it("should return the correct role from API", async function () {
      const client = TEST_CLIENTS.NO_CACHES_ENABLED();
      const guild = TEST_GUILDS.NO_CACHES_ENABLED(client);
      const guildRoleManager = new GuildRoleManager(client, guild);
      const fetchedRole = await guildRoleManager.fetch(TEST_DATA.ROLE_ID);
      expect(fetchedRole).to.be.an.instanceOf(Role);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildRoleManager = new GuildRoleManager(client, guild);
      const request = spy(client.request, "makeRequest");
      await guildRoleManager.fetch(TEST_DATA.ROLE_ID);
      expect(request).to.have.been.calledOnce;
      expect(request).to.have.been.calledWith("getRoles", [guild.id]);
    });
    it("should throw an error if role_id is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildRoleManager = new GuildRoleManager(client, guild);
      await expect(guildRoleManager.fetch(123456)).to.be.rejectedWith(
        TypeError,
        "GLUON: Role ID must be a string.",
      );
    });
  });
  context("check getCacheManager method", function () {
    it("should return the correct cache manager", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(
        GuildRoleManager.getCacheManager(client, TEST_DATA.GUILD_ID),
      ).to.be.an.instanceOf(GuildRoleManager);
    });
    it("should throw an error if client is not a Client instance", function () {
      expect(() => GuildRoleManager.getCacheManager()).to.throw(
        TypeError,
        "GLUON: Client is not a Client instance.",
      );
    });
    it("should throw an error if guildId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      expect(() => GuildRoleManager.getCacheManager(client, 123456)).to.throw(
        TypeError,
        "GLUON: Guild ID is not a string.",
      );
    });
  });
  context("check getRole method", function () {
    it("should return the correct role", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(
        GuildRoleManager.getRole(client, TEST_DATA.GUILD_ID, TEST_DATA.ROLE_ID),
      ).to.deep.equal(role);
    });
    it("should throw an error if client is not a Client instance", function () {
      expect(() => GuildRoleManager.getRole()).to.throw(
        TypeError,
        "GLUON: Client is not a Client instance.",
      );
    });
    it("should throw an error if guildId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      expect(() =>
        GuildRoleManager.getRole(client, 123456, TEST_DATA.ROLE_ID),
      ).to.throw(TypeError, "GLUON: Guild ID is not a string.");
    });
    it("should throw an error if roleId is not a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      expect(() =>
        GuildRoleManager.getRole(client, TEST_DATA.GUILD_ID, 123456),
      ).to.throw(TypeError, "GLUON: Role ID is not a string.");
    });
    it("should return null if the role is not found", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(GuildRoleManager.getRole(client, TEST_DATA.GUILD_ID, "1234")).to.be
        .null;
    });
  });
  context("check fetchRole method", function () {
    it("should return the correct role from cache", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      const fetchedRole = await GuildRoleManager.fetchRole(
        client,
        TEST_DATA.GUILD_ID,
        TEST_DATA.ROLE_ID,
      );
      expect(fetchedRole).to.deep.equal(role);
    });
    it("should return the correct role from API", async function () {
      const client = TEST_CLIENTS.NO_CACHES_ENABLED();
      TEST_GUILDS.NO_CACHES_ENABLED(client);
      const fetchedRole = await GuildRoleManager.fetchRole(
        client,
        TEST_DATA.GUILD_ID,
        TEST_DATA.ROLE_ID,
      );
      expect(fetchedRole).to.be.an.instanceOf(Role);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const request = spy(client.request, "makeRequest");
      await GuildRoleManager.fetchRole(
        client,
        TEST_DATA.GUILD_ID,
        TEST_DATA.ROLE_ID,
      );
      expect(request).to.have.been.calledOnce;
      expect(request).to.have.been.calledWith("getRoles", [TEST_DATA.GUILD_ID]);
    });
    it("should throw an error if  client is not a Client instance", async function () {
      await expect(
        GuildRoleManager.fetchRole({}, TEST_DATA.GUILD_ID, TEST_DATA.ROLE_ID),
      ).to.be.rejectedWith(
        TypeError,
        "GLUON: Client is not a Client instance.",
      );
    });
    it("should throw an error if guildId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(
        GuildRoleManager.fetchRole(client, 123456, TEST_DATA.ROLE_ID),
      ).to.be.rejectedWith(TypeError, "GLUON: Guild ID is not a string.");
    });
    it("should throw an error if roleId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(
        GuildRoleManager.fetchRole(client, TEST_DATA.GUILD_ID, 123456),
      ).to.be.rejectedWith(TypeError, "GLUON: Role ID is not a string.");
    });
  });
});
//# sourceMappingURL=GuildRoleManager.js.map
