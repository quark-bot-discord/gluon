let expect;
before(async () => {
  const chai = await import("chai");
  const chaiAsPromised = await import("chai-as-promised");
  chai.use(chaiAsPromised.default);
  expect = chai.expect;
});

const {
  TEST_DATA,
  DEFAULT_MESSAGE_EXPIRY_SECONDS,
  DEFAULT_INCREASE_CACHE_BY,
} = require("../../../src/constants");
const GuildManager = require("../../../src/managers/GuildManager");
const { Guild, TextChannel } = require("../../../src/structures");
const getMessage = require("../../../src/util/gluon/getMessage");

describe("GetMessage", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(getMessage).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no client is provided", async function () {
      await expect(
        getMessage(
          undefined,
          TEST_DATA.GUILD_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.MESSAGE_ID
        )
      ).to.be.rejectedWith(TypeError, "GLUON: Client must be provided.");
    });
    it("should throw an error if the guild id is not provided", async function () {
      await expect(
        getMessage({}, undefined, TEST_DATA.CHANNEL_ID, TEST_DATA.MESSAGE_ID)
      ).to.be.rejectedWith(TypeError, "GLUON: Guild id must be a string.");
    });
    it("should throw an error if the channel id is not provided", async function () {
      await expect(
        getMessage({}, TEST_DATA.GUILD_ID, undefined, TEST_DATA.MESSAGE_ID)
      ).to.be.rejectedWith(TypeError, "GLUON: Channel id must be a string.");
    });
    it("should throw an error if the message id is not provided", async function () {
      await expect(
        getMessage({}, TEST_DATA.GUILD_ID, TEST_DATA.CHANNEL_ID, undefined)
      ).to.be.rejectedWith(TypeError, "GLUON: Message id must be a string.");
    });
    it("should throw an error if the guild id is not a string", async function () {
      await expect(
        getMessage({}, 123456, TEST_DATA.CHANNEL_ID, TEST_DATA.MESSAGE_ID)
      ).to.be.rejectedWith(TypeError, "GLUON: Guild id must be a string.");
    });
    it("should throw an error if the channel id is not a string", async function () {
      await expect(
        getMessage({}, TEST_DATA.GUILD_ID, 123456, TEST_DATA.MESSAGE_ID)
      ).to.be.rejectedWith(TypeError, "GLUON: Channel id must be a string.");
    });
    it("should throw an error if the message id is not a string", async function () {
      await expect(
        getMessage({}, TEST_DATA.GUILD_ID, TEST_DATA.CHANNEL_ID, 123456)
      ).to.be.rejectedWith(TypeError, "GLUON: Message id must be a string.");
    });
  });

  context("check get message", async function () {
    it("should return the correct message from the cache", async function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      const channel = new TextChannel(
        client,
        TEST_DATA.TEXT_CHANNEL,
        TEST_DATA.GUILD_ID
      );
      const message = TEST_DATA.MESSAGE;
      channel.messages.cache.set(TEST_DATA.MESSAGE_ID, message);
      guild.channels.cache.set(TEST_DATA.CHANNEL_ID, channel);
      client.guilds.cache.set(TEST_DATA.GUILD_ID, guild);
      client.increasedCacheMultipliers = new Map();
      client.increasedCache = new Map();
      client.defaultMessageExpiry = DEFAULT_MESSAGE_EXPIRY_SECONDS;
      client.increaseCacheBy = DEFAULT_INCREASE_CACHE_BY;
      client.increasedCacheMultipliers.set(TEST_DATA.GUILD_ID, 1);
      client.increasedCache.set(TEST_DATA.GUILD_ID, true);
      await expect(
        getMessage(
          client,
          TEST_DATA.GUILD_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.MESSAGE_ID
        )
      ).to.eventually.deep.equal(message);
    });
  });
});
