import { expect } from "chai";
import { spy } from "sinon";
import GuildEmojisManager from "../../src/managers/GuildEmojisManager.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../src/testData.js";
import { Emoji } from "../../src/structures.js";
describe("GuildEmojisManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GuildEmojisManager).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should create a new instance of GuildEmojisManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const emojisManager = new GuildEmojisManager(client, guild);
      expect(emojisManager).to.be.an.instanceOf(GuildEmojisManager);
      expect(emojisManager).to.have.property("fetch");
      expect(emojisManager).to.have.property("set");
    });
  });
  context("check fetch method", function () {
    it("should fetch emojis", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const emojisManager = new GuildEmojisManager(client, guild);
      expect(emojisManager.fetch()).to.be.a("promise");
    });
    it("should throw an error if no emoji id is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const emojisManager = new GuildEmojisManager(client, guild);
      await expect(emojisManager.fetch()).to.be.rejectedWith(
        TypeError,
        "GLUON: Emoji ID must be a string.",
      );
    });
    it("should throw an error if emoji id is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const emojisManager = new GuildEmojisManager(client, guild);
      await expect(emojisManager.fetch(123456)).to.be.rejectedWith(
        TypeError,
        "GLUON: Emoji ID must be a string.",
      );
    });
    it("should fetch an emoji from the cache", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const emojisManager = new GuildEmojisManager(client, guild);
      emojisManager.set(
        TEST_DATA.EMOJI.id,
        new Emoji(client, TEST_DATA.EMOJI, { guildId: guild.id }),
      );
      const emoji = await emojisManager.fetch(TEST_DATA.EMOJI.id);
      expect(emoji).to.be.an.instanceOf(Emoji);
      expect(emoji.id).to.equal(TEST_DATA.EMOJI.id);
    });
    it("should call makeRequest to fetch an emoji", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const emojisManager = new GuildEmojisManager(client, guild);
      const request = spy(client.request, "makeRequest");
      await emojisManager.fetch(TEST_DATA.EMOJI.id);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getEmoji", [
        TEST_DATA.GUILD_ID,
        TEST_DATA.EMOJI.id,
      ]);
      expect(request.firstCall.args[2]).to.be.undefined;
    });
  });
  context("check set method", function () {
    it("should cache an emoji", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const emojisManager = new GuildEmojisManager(client, guild);
      const emoji = new Emoji(client, TEST_DATA.EMOJI, { guildId: guild.id });
      emojisManager.set(TEST_DATA.EMOJI.id, emoji);
      expect(emojisManager.get(TEST_DATA.EMOJI.id, emoji)).to.deep.equal(emoji);
    });
    it("should throw an error if emoji is not an instance of Emoji", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const emojisManager = new GuildEmojisManager(client, guild);
      expect(() => emojisManager.set(TEST_DATA.EMOJI.id, {})).to.throw(
        TypeError,
        "GLUON: Emoji must be an instance of Emoji.",
      );
    });
  });
});
//# sourceMappingURL=GuildEmojisManager.js.map
