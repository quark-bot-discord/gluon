import { expect } from "chai";
import Emoji from "../../src/structures/Emoji.js";
import { TEST_DATA } from "../../src/constants.js";
import Guild from "../../src/structures/Guild.js";
import GuildManager from "../../src/managers/GuildManager.js";

describe("Emoji", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Emoji).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const emoji = new Emoji(client, TEST_DATA.EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji).to.have.property("id");
      expect(emoji).to.have.property("requireColons");
      expect(emoji).to.have.property("managed");
      expect(emoji).to.have.property("available");
      expect(emoji).to.have.property("mention");
      expect(emoji).to.have.property("name");
      expect(emoji).to.have.property("url");
      expect(emoji).to.have.property("guildId");
      expect(emoji).to.have.property("guild");
      expect(emoji).to.have.property("animated");
      expect(emoji).to.have.property("toString");
      expect(emoji).to.have.property("toJSON");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.id).to.equal(TEST_DATA.EMOJI.id);
    });
    it("should have the correct id for a standard emoji", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.STANDARD_EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.id).to.equal(null);
    });
  });

  context("check name", function () {
    it("should have the correct name", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.name).to.equal("bitcoin");
    });
    it("should have the correct name for a standard emoji", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.STANDARD_EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.name).to.equal(TEST_DATA.STANDARD_EMOJI.name);
    });
  });

  context("check animated", function () {
    it("should have the correct animated", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.animated).to.equal(true);
    });
    it("should have the correct animated for a standard emoji", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.STANDARD_EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.animated).to.equal(false);
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.toString()).to.equal("<Emoji: 844240546246950922>");
    });
    it("should return the correct string for a standard emoji", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.STANDARD_EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.toString()).to.equal(
        `<Emoji: ${TEST_DATA.STANDARD_EMOJI.name}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should return an object", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.toJSON()).to.be.an("object");
    });
    it("should return the correct object", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.toJSON()).to.deep.equal({
        animated: true,
        available: true,
        id: "844240546246950922",
        name: "bitcoin",
        managed: false,
        require_colons: true,
      });
    });
    it("should return the correct object for a standard emoji", function () {
      const client = {};
      const emoji = new Emoji(client, TEST_DATA.STANDARD_EMOJI, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(emoji.toJSON()).to.deep.equal({
        name: TEST_DATA.STANDARD_EMOJI.name,
        id: null,
        animated: false,
        available: true,
        require_colons: true,
        managed: false,
      });
    });
  });
});
