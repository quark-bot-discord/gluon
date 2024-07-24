let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { TEST_DATA } = require("../../src/constants");
const GuildManager = require("../../src/managers/GuildManager");
const { Guild } = require("../../src/structures");
const Attachment = require("../../src/structures/Attachment");
const TextChannel = require("../../src/structures/TextChannel");

describe("Attachment", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Attachment).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, { guild_id: TEST_DATA.GUILD_ID });
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, { _parentStructure: channel });
      expect(attachment).to.have.property("id");
      expect(attachment).to.have.property("name");
      expect(attachment).to.have.property("size");
      expect(attachment).to.have.property("url");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, { guild_id: TEST_DATA.GUILD_ID });
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, { _parentStructure: channel });
      expect(attachment.id).to.equal(TEST_DATA.ATTACHMENT.id);
    });
  });

  context("check filename", function () {
    it("should have the correct filename", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, { guild_id: TEST_DATA.GUILD_ID });
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, { _parentStructure: channel });
      expect(attachment.name).to.equal(TEST_DATA.ATTACHMENT.filename);
    });
  });

  context("check size", function () {
    it("should have the correct size", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, { guild_id: TEST_DATA.GUILD_ID });
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, { _parentStructure: channel });
      expect(attachment.size).to.equal(TEST_DATA.ATTACHMENT.size);
    });
  });

  context("check url", function () {
    it("should have the correct url", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, { guild_id: TEST_DATA.GUILD_ID });
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, { _parentStructure: channel });
      expect(`${attachment.url}&`).to.equal(TEST_DATA.ATTACHMENT.url);
    });
  });

  context("check toJSON", function () {
    it("should return a valid JSON", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, { guild_id: TEST_DATA.GUILD_ID });
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, { _parentStructure: channel });
      expect(attachment.toJSON()).to.deep.equal({
        id: TEST_DATA.ATTACHMENT.id,
        filename: TEST_DATA.ATTACHMENT.filename,
        size: TEST_DATA.ATTACHMENT.size,
        url: TEST_DATA.ATTACHMENT.url.slice(0, -1),
      });
    });
  })
});
