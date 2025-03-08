/* eslint-disable @typescript-eslint/no-unused-expressions */
/* global setTimeout */
import { expect } from "chai";
import BaseCacheManager from "../BaseCacheManager.js";
import { TEST_CLIENTS, TEST_GUILDS } from "../../testData.js";
import { GuildEmojisManager } from "../../structures.js";
import GluonCacheRule from "../../util/gluon/gluonCacheRule.js";
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
      expect(baseCacheManager).to.have.property("fetchFromRules");
      expect(baseCacheManager).to.have.property("fetchWithRules");
      expect(baseCacheManager).to.have.property("has");
      expect(baseCacheManager).to.have.property("map");
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
          guildEmojisManager.fetchWithRules("key"),
        ).to.eventually.equal("value");
        done();
      }, 1500);
    });
    it("should return the correct value when using standard cache and cache rules", function (done) {
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
          guildEmojisManager.fetchWithRules("key"),
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
  context("check fetchFromRules", function () {
    it("should fetch the correct value from the cache rules", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
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
      expect(await baseCacheManager.fetchFromRules("key")).to.equal("value");
    });
    it("should return null if it fails to fetch from the cache rules", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
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
      expect(await baseCacheManager.fetchFromRules("key3")).to.be.null;
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
  context("check map", function () {
    it("should map the cache", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value");
      const mapped = baseCacheManager.map((value, key) => {
        return { key, value };
      });
      expect(mapped).to.deep.equal([{ key: 0, value: ["key", "value"] }]);
    });
  });
  context("check has", function () {
    it("should return the correct value", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildEmojisManager = new GuildEmojisManager(client, guild);
      const baseCacheManager = new BaseCacheManager(client, {
        structureType: guildEmojisManager,
      });
      baseCacheManager.set("key", "value");
      expect(baseCacheManager.has("key")).to.be.true;
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
      baseCacheManager.set("key", { value: "value", toJSON: () => "value" });
      expect(baseCacheManager.toJSON()).to.deep.equal(["value"]);
    });
  });
});
//# sourceMappingURL=BaseCacheManager.spec.js.map
