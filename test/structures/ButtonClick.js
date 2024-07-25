let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { TEST_DATA } = require("../../src/constants");
const GuildManager = require("../../src/managers/GuildManager");
const Guild = require("../../src/structures/Guild");
const User = require("../../src/structures/User");
const ButtonClick = require("../../src/structures/ButtonClick");
const TextInput = require("../../src/util/builder/textInputBuilder");

describe("ButtonClick", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(ButtonClick).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick).to.have.property("id");
      expect(buttonClick).to.have.property("type");
      expect(buttonClick).to.have.property("guildId");
      expect(buttonClick).to.have.property("channelId");
      expect(buttonClick).to.have.property("member");
      expect(buttonClick).to.have.property("customId");
      expect(buttonClick).to.have.property("message");
      expect(buttonClick).to.have.property("guild");
      expect(buttonClick).to.have.property("channel");
      expect(buttonClick).to.have.property("textPrompt");
      expect(buttonClick).to.have.property("autocompleteResponse");
      expect(buttonClick).to.have.property("reply");
      expect(buttonClick).to.have.property("edit");
      expect(buttonClick).to.have.property("acknowledge");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.id).to.equal(TEST_DATA.BUTTON_CLICK.id);
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.type).to.equal(TEST_DATA.BUTTON_CLICK.type);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.guildId).to.equal(TEST_DATA.BUTTON_CLICK.guild_id);
    });
  });

  context("check channelId", function () {
    it("should have the correct channelId", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.channelId).to.equal(TEST_DATA.BUTTON_CLICK.channel_id);
    });
  });

  context("check member", function () {
    it("should have the correct member", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.member.id).to.equal(
        TEST_DATA.BUTTON_CLICK.member.user.id,
      );
    });
  });

  context("check customId", function () {
    it("should have the correct customId", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.customId).to.equal(TEST_DATA.BUTTON_CLICK.custom_id);
    });
  });

  context("check message", function () {
    it("should have the correct message", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.message.id).to.equal(
        TEST_DATA.BUTTON_CLICK.message.id,
      );
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.guild.id).to.equal(TEST_DATA.GUILD.id);
    });
  });

  context("check channel", function () {
    it("should have the correct channel", function () {
      const client = { cacheChannels: true, cacheGuilds: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.channel.id).to.equal(
        TEST_DATA.BUTTON_CLICK.channel_id,
      );
    });
  });

  context("check textPrompt", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.textPrompt).to.be.a("function");
    });

    it("should throw an error if no title is provided", async function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      const textInput = new TextInput()
        .setCustomID("test 2")
        .setPlaceholder("Test Placeholder")
        .setMaxLength(100)
        .setMinLength(1);
      await expect(
        buttonClick.textPrompt({ customId: "test", textInputModal: textInput }),
      ).to.be.rejectedWith(TypeError, "GLUON: No title provided.");
    });

    it("should throw an error if no customId is provided", async function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      const textInput = new TextInput()
        .setCustomID("test 2")
        .setPlaceholder("Test Placeholder")
        .setMaxLength(100)
        .setMinLength(1);
      await expect(
        buttonClick.textPrompt({ title: "test", textInputModal: textInput }),
      ).to.be.rejectedWith(TypeError, "GLUON: No custom id provided.");
    });

    it("should throw an error if no textInputModal is provided", async function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      await expect(
        buttonClick.textPrompt({ title: "test", customId: "test" }),
      ).to.be.rejectedWith(
        TypeError,
        "GLUON: Text input modal must be provided.",
      );
    });
  });

  context("check autocompleteResponse", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.autocompleteResponse).to.be.a("function");
    });
  });

  context("check reply", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.reply).to.be.a("function");
    });
  });

  context("check edit", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.edit).to.be.a("function");
    });
  });

  context("check acknowledge", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK);
      expect(buttonClick.acknowledge).to.be.a("function");
    });
  });
});
