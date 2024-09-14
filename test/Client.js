import { expect } from "chai";
import Client from "../src/Client.js";
import { INTENTS } from "../src/constants.js";

describe("Client", function () {
  context("check import", function () {
    it("should return a function", function () {
      expect(Client).to.be.a("function");
    });
  });
  context("check constructor", function () {
    it("should return a new instance of Client", function () {
      const client = new Client({ intents: INTENTS.GUILDS });
      expect(client).to.be.instanceOf(Client);
    });
    it("should throw an error if cacheMessages is not a boolean", function () {
      expect(
        () => new Client({ cacheMessages: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache messages is not a boolean.");
    });
    it("should throw an error if cacheUsers is not a boolean", function () {
      expect(
        () => new Client({ cacheUsers: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache users is not a boolean.");
    });
    it("should throw an error if cacheMembers is not a boolean", function () {
      expect(
        () => new Client({ cacheMembers: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache members is not a boolean.");
    });
    it("should throw an error if cacheChannels is not a boolean", function () {
      expect(
        () => new Client({ cacheChannels: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache channels is not a boolean.");
    });
    it("should throw an error if cacheGuilds is not a boolean", function () {
      expect(
        () => new Client({ cacheGuilds: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache guilds is not a boolean.");
    });
    it("should throw an error if cacheVoiceStates is not a boolean", function () {
      expect(
        () => new Client({ cacheVoiceStates: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache voice states is not a boolean.");
    });
    it("should throw an error if cacheRoles is not a boolean", function () {
      expect(
        () => new Client({ cacheRoles: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache roles is not a boolean.");
    });
    it("should throw an error if cacheScheduledEvents is not a boolean", function () {
      expect(
        () =>
          new Client({ cacheScheduledEvents: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache scheduled events is not a boolean.");
    });
    it("should throw an error if cacheEmojis is not a boolean", function () {
      expect(
        () => new Client({ cacheEmojis: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache emojis is not a boolean.");
    });
    it("should throw an error if cacheInvites is not a boolean", function () {
      expect(
        () => new Client({ cacheInvites: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Cache invites is not a boolean.");
    });
    it("should throw an error if defaultMessageExpiry is not a number", function () {
      expect(
        () =>
          new Client({ defaultMessageExpiry: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Default message expiry is not a number.");
    });
    it("should throw an error if defaultUserExpiry is not a number", function () {
      expect(
        () =>
          new Client({ defaultUserExpiry: "true", intents: INTENTS.GUILDS }),
      ).to.throw("GLUON: Default user expiry is not a number.");
    });
    it("should throw an error if no intents are provided", function () {
      expect(() => new Client()).to.throw("GLUON: Intents is not a number.");
    });
    it("should throw an error if totalShards provided and is not a number", function () {
      expect(
        () => new Client({ intents: INTENTS.GUILDS, totalShards: "true" }),
      ).to.throw("GLUON: Total shards is not a number.");
    });
    it("should throw an error if shardIds is provided and is not an array", function () {
      expect(
        () => new Client({ intents: INTENTS.GUILDS, shardIds: "true" }),
      ).to.throw("GLUON: Shard ids is not an array of shard ids (numbers).");
    });
    it("should throw an error if shardIds is provided and not an array of numbers", function () {
      expect(
        () => new Client({ intents: INTENTS.GUILDS, shardIds: ["true"] }),
      ).to.throw("GLUON: Shard ids is not an array of shard ids (numbers).");
    });
    it("should throw an error if sessionData is provided and not an object", function () {
      expect(
        () => new Client({ intents: INTENTS.GUILDS, sessionData: "true" }),
      ).to.throw("GLUON: Session data is not an object.");
    });
    it("should throw an error if initCache is provided and is not an object", function () {
      expect(
        () => new Client({ intents: INTENTS.GUILDS, initCache: "true" }),
      ).to.throw("GLUON: Init cache is not an object.");
    });
    it("should throw an error if softRestartFunction is provided and not a function", function () {
      expect(
        () =>
          new Client({ intents: INTENTS.GUILDS, softRestartFunction: "true" }),
      ).to.throw("GLUON: Soft restart function is not a function.");
    });
  });
});
