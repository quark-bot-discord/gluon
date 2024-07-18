let expect;
before(async () => {
  const chai = await import("chai");
  const chaiAsPromised = await import("chai-as-promised");
  chai.use(chaiAsPromised.default);
  expect = chai.expect;
});

const { TEST_DATA } = require("../../../src/constants");
const GuildManager = require("../../../src/managers/GuildManager");
const { Guild } = require("../../../src/structures");
const getMember = require("../../../src/util/gluon/getMember");

describe("GetMember", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(getMember).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no client is provided", async function () {
      await expect(
        getMember(undefined, TEST_DATA.GUILD_ID, TEST_DATA.MEMBER_ID),
      ).to.be.rejectedWith(TypeError, "GLUON: Client must be provided.");
    });
    it("should throw an error if the guild id is not provided", async function () {
      await expect(
        getMember({}, undefined, TEST_DATA.MEMBER_ID),
      ).to.be.rejectedWith(TypeError, "GLUON: Guild id must be a string.");
    });
    it("should throw an error if the member id is not provided", async function () {
      await expect(getMember({}, "test", undefined)).to.be.rejectedWith(
        TypeError,
        "GLUON: Member id must be a string.",
      );
    });
    it("should throw an error if the guild id is not a string", async function () {
      await expect(
        getMember({}, 123456, TEST_DATA.MEMBER_ID),
      ).to.be.rejectedWith(TypeError, "GLUON: Guild id must be a string.");
    });
    it("should throw an error if the member id is not a string", async function () {
      await expect(getMember({}, "test", 123456)).to.be.rejectedWith(
        TypeError,
        "GLUON: Member id must be a string.",
      );
    });
  });

  context("check get member", async function () {
    it("should return the correct member from the cache", async function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      const member = TEST_DATA.MEMBER;
      guild.members.cache.set(TEST_DATA.MEMBER_ID, member);
      client.guilds.cache.set(TEST_DATA.GUILD_ID, guild);
      await expect(
        getMember(client, TEST_DATA.GUILD_ID, TEST_DATA.MEMBER_ID),
      ).to.eventually.deep.equal(TEST_DATA.MEMBER);
      expect(guild.members.cache.size).to.equal(1);
    });
    it("should return the correct member from the cache and delete the member from the cache", async function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      const member = TEST_DATA.MEMBER;
      guild.members.cache.set(TEST_DATA.MEMBER_ID, member);
      client.guilds.cache.set(TEST_DATA.GUILD_ID, guild);
      await expect(
        getMember(client, TEST_DATA.GUILD_ID, TEST_DATA.MEMBER_ID, true),
      ).to.eventually.deep.equal(TEST_DATA.MEMBER);
      expect(guild.members.cache.size).to.equal(0);
    });
  });
});
