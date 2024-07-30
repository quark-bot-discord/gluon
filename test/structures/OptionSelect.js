import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import OptionSelect from "../../src/structures/OptionSelect.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";

describe("OptionSelect", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(OptionSelect).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT);
      expect(optionSelect).to.have.property("id");
      expect(optionSelect).to.have.property("type");
      expect(optionSelect).to.have.property("guildId");
      expect(optionSelect).to.have.property("channelId");
      expect(optionSelect).to.have.property("member");
      expect(optionSelect).to.have.property("customId");
      expect(optionSelect).to.have.property("message");
      expect(optionSelect).to.have.property("values");
      expect(optionSelect).to.have.property("guild");
      expect(optionSelect).to.have.property("channel");
      expect(optionSelect).to.have.property("textPrompt");
      expect(optionSelect).to.have.property("autocompleteResponse");
      expect(optionSelect).to.have.property("reply");
      expect(optionSelect).to.have.property("edit");
      expect(optionSelect).to.have.property("acknowledge");
    });
  });

  context("check customId", function () {
    it("should have the correct customId", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT);
      expect(optionSelect.customId).to.equal(
        TEST_DATA.OPTION_SELECT.data.custom_id,
      );
    });
  });

  context("check message", function () {
    it("should have the correct message", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT);
      expect(optionSelect.message.id).to.equal(
        TEST_DATA.OPTION_SELECT.message.id,
      );
    });
  });

  context("check values", function () {
    it("should have the correct values", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT);
      expect(optionSelect.values).to.deep.equal(
        TEST_DATA.OPTION_SELECT.data.values,
      );
    });
  });

  context("check toString", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT);
      expect(optionSelect.toString).to.be.a("function");
    });
    it("should return the correct string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT);
      expect(optionSelect.toString()).to.equal(
        `<OptionSelect: ${TEST_DATA.OPTION_SELECT.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT);
      expect(optionSelect.toJSON).to.be.a("function");
    });
    it("should return the correct JSON", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT);
      expect(optionSelect.toJSON()).to.deep.equal({
        id: TEST_DATA.OPTION_SELECT.id,
        type: TEST_DATA.OPTION_SELECT.type,
        guild_id: TEST_DATA.OPTION_SELECT.guild_id,
        channel_id: TEST_DATA.OPTION_SELECT.channel_id,
        member: {},
        custom_id: TEST_DATA.OPTION_SELECT.data.custom_id,
        message: {},
        values: TEST_DATA.OPTION_SELECT.data.values,
      });
    });
  });
});
