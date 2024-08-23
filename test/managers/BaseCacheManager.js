import { expect } from "chai";
import BaseCacheManager from "../../src/managers/BaseCacheManager.js";
import { TEST_CLIENTS, TEST_GUILDS } from "../../src/testData.js";
import { GuildEmojisManager } from "../../src/structures.js";
import GluonCacheRule from "../../src/util/gluon/gluonCacheRule.js";

describe("BaseCacheManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(BaseCacheManager).to.be.a("function");
    });
  });

  context("check properties", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      expect(baseCacheManager).to.have.property("get");
      expect(baseCacheManager).to.have.property("set");
      expect(baseCacheManager).to.have.property("expireBucket");
      expect(baseCacheManager).to.have.property("delete");
      expect(baseCacheManager).to.have.property("clear");
      expect(baseCacheManager).to.have.property("_intervalCallback");
      expect(baseCacheManager).to.have.property("size");
      expect(baseCacheManager).to.have.property("forEach");
      expect(baseCacheManager).to.have.property("toJSON");
    });
  });

  context("check get", function () {
    it("should return the correct value", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value");
      expect(baseCacheManager.get("key")).to.equal("value");
    });
    it("should return the correct value when using cache rules", function (done) {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const externalCache = new Map();
      new GluonCacheRule()
        .setStructureType(GuildEmojisManager)
        .setName("test")
        .setHandlerFunction((value) => {
          return externalCache.set("key", value);
        })
        .setRetrieveFunction((key) => {
          return externalCache.get(key);
        })
        .applyRule();
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: GuildEmojisManager,
      });
      baseCacheManager.set("key", "value", 1);
      const expiryDate = new Date(Date.now() + 1 * 1000);
      const bucket = `${expiryDate.getUTCDate()}_${expiryDate.getUTCHours()}_${expiryDate.getUTCMinutes()}`;
      baseCacheManager.expireBucket(bucket);
      setTimeout(async () => {
        await expect(
          guildEmojisManager.get("key", { useRules: true }),
        ).to.eventually.equal("value");
        done();
      }, 1500);
    });
  });

  context("check set", function () {
    it("should set the correct value", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value");
      expect(baseCacheManager.get("key")).to.equal("value");
    });
  });

  context("check expireBucket", function () {
    it("should expire the correct bucket", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value", 500);
      expect(baseCacheManager.get("key")).to.equal("value");
      const expiryDate = new Date(Date.now() + 500 * 1000);
      const bucket = `${expiryDate.getUTCDate()}_${expiryDate.getUTCHours()}_${expiryDate.getUTCMinutes()}`;
      baseCacheManager.expireBucket(bucket);
      expect(baseCacheManager.get("key")).to.be.null;
    });
  });

  context("check delete", function () {
    it("should delete the correct key", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value");
      expect(baseCacheManager.get("key")).to.equal("value");
      baseCacheManager.delete("key");
      expect(baseCacheManager.get("key")).to.be.null;
    });
  });

  context("check clear", function () {
    it("should clear the cache", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value");
      expect(baseCacheManager.get("key")).to.equal("value");
      baseCacheManager.clear();
      expect(baseCacheManager.get("key")).to.be.null;
    });
  });

  context("check _intervalCallback", function () {
    it("should clear stale buckets", function (done) {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value", 1);
      setTimeout(() => {
        baseCacheManager._intervalCallback();
        expect(baseCacheManager.get("key")).to.be.null;
        done();
      }, 1500);
    });
  });

  context("check size", function () {
    it("should return the correct size", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value");
      expect(baseCacheManager.size).to.equal(1);
    });
  });

  context("check forEach", function () {
    it("should iterate over the cache", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value");
      baseCacheManager.forEach((value, key) => {
        expect(value).to.equal("value");
        expect(key).to.equal("key");
      });
    });
  });

  context("check toJSON", function () {
    it("should return the correct JSON representation", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value");
      expect(baseCacheManager.toJSON()).to.deep.equal(["value"]);
    });
  });
});
