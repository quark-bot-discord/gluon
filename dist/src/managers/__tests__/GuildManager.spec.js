import { expect } from "chai";
import GuildManager from "../GuildManager.js";
import Guild from "../../structures/Guild.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../testData.js";
describe("GuildManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GuildManager).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should create a new instance of GuildManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guildManager = new GuildManager(client);
      expect(guildManager).to.be.an.instanceOf(GuildManager);
      expect(guildManager).to.have.property("set");
      expect(GuildManager).to.have.property("getCacheManager");
      expect(GuildManager).to.have.property("getGuild");
    });
  });
  context("check set method", function () {
    it("should set the correct values", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guildManager = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      guildManager.set("123456", guild);
      expect(guildManager.get("123456")).to.deep.equal(guild);
    });
    it("should throw an error if guild is not a Guild instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guildManager = new GuildManager(client);
      expect(() => guildManager.set("123456", {})).to.throw(
        TypeError,
        "GLUON: Guild must be an instance of Guild.",
      );
    });
  });
  context("check getCacheManager method", function () {
    it("should return the correct cache manager", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      expect(GuildManager.getCacheManager(client)).to.be.an.instanceOf(
        GuildManager,
      );
    });
    it("should throw an error if client is not a Client instance", function () {
      expect(() => GuildManager.getCacheManager()).to.throw(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
  });
  context("check getGuild method", function () {
    it("should return the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(GuildManager.getGuild(client, TEST_DATA.GUILD_ID)).to.deep.equal(
        guild,
      );
    });
    it("should throw an error if client is not a Client instance", function () {
      expect(() => GuildManager.getGuild()).to.throw(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error if guildId is not a string", function () {
      expect(() =>
        GuildManager.getGuild(TEST_CLIENTS.ALL_CACHES_ENABLED(), 123456),
      ).to.throw(TypeError, "GLUON: Guild ID must be a string.");
    });
  });
});
//# sourceMappingURL=GuildManager.spec.js.map
