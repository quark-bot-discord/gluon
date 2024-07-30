import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import SlashCommand from "../../src/structures/SlashCommand.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";

describe("SlashCommand", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(SlashCommand).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const slashCommand = new SlashCommand(client, TEST_DATA.SLASH_COMMAND);
      expect(slashCommand).to.have.property("id");
      expect(slashCommand).to.have.property("data");
      expect(slashCommand).to.have.property("toString");
    });
  });

  context("check data", function () {
    it("should have the correct data", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const slashCommand = new SlashCommand(client, TEST_DATA.SLASH_COMMAND);
      expect(slashCommand.data).to.equal(TEST_DATA.SLASH_COMMAND.data);
    });
  });

  context("check toString", function () {
    it("should return the correct string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const slashCommand = new SlashCommand(client, TEST_DATA.SLASH_COMMAND);
      expect(slashCommand.toString()).to.equal(
        `<SlashCommand: ${TEST_DATA.SLASH_COMMAND.id}>`,
      );
    });
  });
});
