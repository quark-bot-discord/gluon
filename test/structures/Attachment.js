import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import Attachment from "../../src/structures/Attachment.js";
import TextChannel from "../../src/structures/TextChannel.js";

describe("Attachment", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Attachment).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, {
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(attachment).to.have.property("id");
      expect(attachment).to.have.property("name");
      expect(attachment).to.have.property("size");
      expect(attachment).to.have.property("url");
      expect(attachment).to.have.property("toString");
      expect(attachment).to.have.property("toJSON");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, {
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(attachment.id).to.equal(TEST_DATA.ATTACHMENT.id);
    });
  });

  context("check filename", function () {
    it("should have the correct filename", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, {
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(attachment.name).to.equal(TEST_DATA.ATTACHMENT.filename);
    });
  });

  context("check size", function () {
    it("should have the correct size", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, {
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(attachment.size).to.equal(TEST_DATA.ATTACHMENT.size);
    });
  });

  context("check url", function () {
    it("should have the correct url", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, {
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(`${attachment.url}&`).to.equal(TEST_DATA.ATTACHMENT.url);
    });
  });

  context("check toJSON", function () {
    it("should return a valid JSON", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, {
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(attachment.toJSON()).to.deep.equal({
        id: TEST_DATA.ATTACHMENT.id,
        filename: TEST_DATA.ATTACHMENT.filename,
        size: TEST_DATA.ATTACHMENT.size,
        url: TEST_DATA.ATTACHMENT.url.slice(0, -1),
      });
    });
  });

  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = { cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const attachment = new Attachment(client, TEST_DATA.ATTACHMENT, {
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      const rebundled = new Attachment(client, attachment.toJSON(), {
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(rebundled.id).to.equal(attachment.id);
      expect(rebundled.name).to.equal(attachment.name);
      expect(rebundled.size).to.equal(attachment.size);
      expect(rebundled.url).to.equal(attachment.url);
      expect(rebundled.toJSON()).to.deep.equal(attachment.toJSON());
    });
  });
});
