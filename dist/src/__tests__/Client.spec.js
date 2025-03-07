import { expect } from "chai";
import { spy } from "sinon";
import Client from "#src/Client.js";
import { INTENTS } from "#src/constants.js";
import UserManager from "#src/managers/UserManager.js";
import GuildManager from "#src/managers/GuildManager.js";
import GluonCacheOptions from "#src/managers/GluonCacheOptions.js";
import GuildCacheOptions from "#src/managers/GuildCacheOptions.js";
import { TEST_DATA, TEST_GUILDS } from "#src/testData.js";
import Command from "#src/util/builder/commandBuilder.js";
import User from "#src/structures/User.js";
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
      expect(() => new Client({ intents: "abc" })).to.throw(
        "GLUON: Intents is not a number.",
      );
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
  context("check shardIds", function () {
    it("should return the shardIds", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
        shardIds: [0, 1],
      });
      expect(client.shardIds).to.deep.equal([0, 1]);
    });
  });
  context("check totalShards", function () {
    it("should return the totalShards", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
        totalShards: 2,
      });
      expect(client.totalShards).to.equal(2);
    });
  });
  context("check intents", function () {
    it("should return the intents", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.intents).to.equal(INTENTS.GUILDS);
    });
  });
  context("check users", function () {
    it("should be an instance of UserManager", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.users).to.be.an.instanceOf(UserManager);
    });
  });
  context("check guilds", function () {
    it("should be an instance of GuildManager", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.guilds).to.be.an.instanceOf(GuildManager);
    });
  });
  context("check softRestartFunction", function () {
    it("should return the softRestartFunction", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
        softRestartFunction: () => {},
      });
      expect(client.softRestartFunction).to.be.a("function");
    });
    it("should call the softRestartFunction", function () {
      const spyFunction = spy();
      const client = new Client({
        intents: INTENTS.GUILDS,
        softRestartFunction: spyFunction,
      });
      client.softRestartFunction();
      expect(spyFunction).to.be.calledOnce;
    });
  });
  context("check halt", function () {
    it("should be a function", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.halt).to.be.a("function");
    });
  });
  context("check checkProcess", function () {
    it("should be a function", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.checkProcess).to.be.a("function");
    });
    it("should return an object", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
        shardIds: [0],
        totalShards: 1,
      });
      client.request = { latency: 33 };
      expect(client.checkProcess()).to.be.an("object");
    });
    it("should return the correct object", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
        shardIds: [0],
        totalShards: 1,
      });
      client.request = { latency: 33 };
      expect(client.checkProcess()).to.deep.equal({
        cacheCounts: {
          channels: 0,
          emojis: 0,
          guilds: 0,
          members: 0,
          messages: 0,
          roles: 0,
          users: 0,
          voiceStates: 0,
        },
        guildCount: 0,
        guilds: [],
        memberCount: 0,
        processId:
          "389f7fbc8e058d61efa91d591e1dc5c5ad418fec3fb2d4aa68ec49ae4e7b784e",
        restLatency: 16.5,
        shards: [],
        shardsManaged: [0],
        totalShards: 1,
      });
    });
  });
  context("check _cacheOptions", function () {
    it("should be an instance of GluonCacheOptions", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client._cacheOptions).to.be.an.instanceOf(GluonCacheOptions);
    });
  });
  context("check _defaultGuildCacheOptions", function () {
    it("should be an instance of GuildCacheOptions", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client._defaultGuildCacheOptions).to.be.an.instanceOf(
        GuildCacheOptions,
      );
    });
  });
  context("check getMemberCount", function () {
    it("should be a function", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.getMemberCount).to.be.a("function");
    });
    it("should return the member count", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
        cacheGuilds: true,
      });
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(client.getMemberCount()).to.equal(500);
    });
  });
  context("check bundleCache", function () {
    it("should be a function", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.bundleCache).to.be.a("function");
    });
    it("should return an object", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.bundleCache()).to.be.an("array");
    });
  });
  context("check registerCommands", function () {
    it("should be a function", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.registerCommands).to.be.a("function");
    });
    it("should throw an error if commands is not an array", async function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      await expect(client.registerCommands({})).to.be.rejectedWith(
        "GLUON: Commands is not an array of Command objects.",
      );
    });
    it("should throw an error if commands is not an array of Command objects", async function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      await expect(client.registerCommands([{}])).to.be.rejectedWith(
        "GLUON: Commands is not an array of Command objects.",
      );
    });
    it("should call bulkOverwriteGlobalApplicationCommands with the correct arguments", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      client.request = { makeRequest: () => {} };
      const request = spy(client.request, "makeRequest");
      const command = new Command().setName("test").setDescription("test");
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      client.registerCommands([command]);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith(
        "bulkOverwriteGlobalApplicationCommands",
        [TEST_DATA.CLIENT_USER.id],
        [command],
      );
    });
  });
  context("check fetchEmojis", function () {
    it("should be a function", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.fetchEmojis).to.be.a("function");
    });
    it("should call getGuildEmojis with the correct arguments", async function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      client.request = { makeRequest: () => {} };
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const request = spy(client.request, "makeRequest");
      await client.fetchEmojis();
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getClientEmojis", [
        TEST_DATA.CLIENT_USER.id,
      ]);
    });
  });
  context("check createEmoji", function () {
    it("should be a function", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.createEmoji).to.be.a("function");
    });
    it("should throw an error if name is not a string", async function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      await expect(client.createEmoji({ name: 1 })).to.be.rejectedWith(
        "GLUON: Name is not a string.",
      );
    });
    it("should throw an error if image is not a string", async function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      await expect(
        client.createEmoji({ name: "test", image: 1 }),
      ).to.be.rejectedWith("GLUON: Image is not a string.");
    });
    it("should call createGuildEmoji with the correct arguments", async function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      client.request = { makeRequest: () => {} };
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const request = spy(client.request, "makeRequest");
      await client.createEmoji({ name: "test", image: "testImage" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith(
        "postAddClientEmoji",
        [TEST_DATA.CLIENT_USER.id],
        {
          name: "test",
          image: "testImage",
        },
      );
    });
  });
  context("check setStatus", function () {
    it("should be a function", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.setStatus).to.be.a("function");
    });
    it("should throw an error if status is not a string", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(() => client.setStatus({ name: 1 })).to.throw(
        "GLUON: Name is not a string.",
      );
    });
    it("should throw an error if type is provided and is not a number", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(() => client.setStatus({ type: "def", name: "abc" })).to.throw(
        "GLUON: Type is not a number.",
      );
    });
    it("should throw an error if afk is provided and is not a boolean", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(() => client.setStatus({ afk: 1, name: "abc" })).to.throw(
        "GLUON: AFK is not a boolean.",
      );
    });
    it("should throw an error if since is provided and is not a number", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(() => client.setStatus({ since: "true", name: "abc" })).to.throw(
        "GLUON: Since is not a number.",
      );
    });
  });
  context("check login", function () {
    it("should be a function", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(client.login).to.be.a("function");
    });
    it("should throw an error if token is not a string", function () {
      const client = new Client({
        intents: INTENTS.GUILDS,
      });
      expect(() => client.login(1)).to.throw("GLUON: Token is not a string.");
    });
  });
});
//# sourceMappingURL=Client.spec.js.map
