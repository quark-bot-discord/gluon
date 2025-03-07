import { expect } from "chai";
import { spy } from "sinon";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
} from "../../testData.js";
import TextInput from "../../util/builder/textInputBuilder.js";
import { Interaction, TextChannel } from "../../structures.js";

describe("Interaction", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Interaction).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction).to.have.property("id");
      expect(interaction).to.have.property("type");
      expect(interaction).to.have.property("guildId");
      expect(interaction).to.have.property("channelId");
      expect(interaction).to.have.property("member");
      expect(interaction).to.have.property("guild");
      expect(interaction).to.have.property("channel");
      expect(interaction).to.have.property("token");
      expect(interaction).to.have.property("textPrompt");
      expect(interaction).to.have.property("autocompleteResponse");
      expect(interaction).to.have.property("reply");
      expect(Interaction).to.have.property("edit");
      expect(interaction).to.have.property("acknowledge");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.id).to.equal(TEST_DATA.INTERACTION.id);
    });
  });

  context("check token", function () {
    it("should have the correct token", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.token).to.equal(TEST_DATA.INTERACTION.token);
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.type).to.equal(TEST_DATA.INTERACTION.type);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.guildId).to.equal(TEST_DATA.INTERACTION.guild_id);
    });
  });

  context("check channelId", function () {
    it("should have the correct channelId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.channelId).to.equal(TEST_DATA.INTERACTION.channel_id);
    });
  });

  context("check member", function () {
    it("should have the correct member", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.member.id).to.equal(
        TEST_DATA.INTERACTION.member.user.id,
      );
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.guild.id).to.equal(TEST_DATA.GUILD.id);
    });
  });

  context("check channel", function () {
    it("should have the correct channel", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.channel.id).to.equal(TEST_DATA.INTERACTION.channel_id);
      expect(interaction.channel).to.be.an.instanceOf(TextChannel);
    });
  });

  context("check textPrompt", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.textPrompt).to.be.a("function");
    });

    it("should throw an error if no title is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      const textInput = new TextInput()
        .setCustomID("test 2")
        .setPlaceholder("Test Placeholder")
        .setMaxLength(100)
        .setMinLength(1);
      await expect(
        interaction.textPrompt({ customId: "test", textInputModal: textInput }),
      ).to.be.rejectedWith(TypeError, "GLUON: No title provided.");
    });

    it("should throw an error if no customId is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      const textInput = new TextInput()
        .setCustomID("test 2")
        .setPlaceholder("Test Placeholder")
        .setMaxLength(100)
        .setMinLength(1);
      await expect(
        interaction.textPrompt({ title: "test", textInputModal: textInput }),
      ).to.be.rejectedWith(TypeError, "GLUON: No custom id provided.");
    });

    it("should throw an error if no textInputModal is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await expect(
        interaction.textPrompt({ title: "test", customId: "test" }),
      ).to.be.rejectedWith(
        TypeError,
        "GLUON: Text input modal must be provided.",
      );
    });

    it("should not throw an error if all required fields are provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      const textInput = new TextInput()
        .setCustomID("test 2")
        .setPlaceholder("Test Placeholder")
        .setLabel("Test Label")
        .setStyle(1)
        .setMaxLength(100)
        .setMinLength(1);
      await expect(
        interaction.textPrompt({
          title: "test",
          customId: "test",
          textInputModal: textInput,
        }),
      ).to.not.be.rejected;
    });

    it("should call makeRequest with the correct parameters", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const request = spy(client.request, "makeRequest");
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      const textInput = new TextInput()
        .setCustomID("test 2")
        .setPlaceholder("Test Placeholder")
        .setLabel("Test Label")
        .setStyle(1)
        .setMaxLength(100)
        .setMinLength(1);
      await interaction.textPrompt({
        title: "test",
        customId: "test",
        textInputModal: textInput,
      });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postInteractionResponse", [
        TEST_DATA.INTERACTION.id,
        TEST_DATA.INTERACTION.token,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check autocompleteResponse", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.autocompleteResponse).to.be.a("function");
    });
    it("should throw an error if no choices are provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await expect(interaction.autocompleteResponse({})).to.be.rejectedWith(
        Error,
        "GLUON: No choices provided.",
      );
    });
    it("should not throw an error if choices are provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await expect(interaction.autocompleteResponse({ choices: [] })).to.not.be
        .rejected;
    });
    it("should call makeRequest with the correct parameters", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const request = spy(client.request, "makeRequest");
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await interaction.autocompleteResponse({ choices: [] });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postInteractionResponse", [
        TEST_DATA.INTERACTION.id,
        TEST_DATA.INTERACTION.token,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check reply", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.reply).to.be.a("function");
    });
    it("should throw an error if no content, files, embeds, or components are provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await expect(interaction.reply({})).to.be.rejectedWith(
        Error,
        "GLUON: No content, files, embed, or components provided.",
      );
    });
    it("should throw an error if content is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await expect(interaction.reply({ content: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Content must be a string.",
      );
    });
    it("should throw an error if embeds is not an array of embeds", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await expect(interaction.reply({ embeds: "test" })).to.be.rejectedWith(
        TypeError,
        "GLUON: Embeds must be an array of embeds.",
      );
    });
    it("should not throw an error if content is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await expect(interaction.reply({ content: "test" })).to.not.be.rejected;
    });
    it("should call makeRequest with the correct parameters", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const request = spy(client.request, "makeRequest");
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await interaction.reply({ content: "test" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postInteractionResponse", [
        TEST_DATA.INTERACTION.id,
        TEST_DATA.INTERACTION.token,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check edit", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(Interaction.edit).to.be.a("function");
    });
    it("should throw an error if client is not an instance of Client", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      await expect(Interaction.edit(null, "24fvdsd", {})).to.be.rejectedWith(
        Error,
        "GLUON: Client must be an instance of Client",
      );
    });
    it("should throw an error if interactionToken is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      await expect(Interaction.edit(client, 123, {})).to.be.rejectedWith(
        Error,
        "GLUON: Interaction token must be a string",
      );
    });
    it("should throw an error if no content, files, embeds, or components are provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      await expect(
        Interaction.edit(client, "vcsfdjhdfkjvhkdf", {}),
      ).to.be.rejectedWith(
        Error,
        "GLUON: Must provide content, embeds, components or files",
      );
    });
    it("should not throw an error if content is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Interaction(client, TEST_DATA.INTERACTION);
      await expect(
        Interaction.edit(client, "vcsfdjhdfkjvhkdf", { content: "test" }),
      ).to.not.be.rejected;
    });
    it("should call makeRequest with the correct parameters", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const request = spy(client.request, "makeRequest");
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      await Interaction.edit(client, "vcsfdjhdfkjvhkdf", { content: "test" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("patchOriginalInteractionResponse", [
        TEST_DATA.CLIENT_USER.id,
        "vcsfdjhdfkjvhkdf",
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check acknowledge", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      expect(interaction.acknowledge).to.be.a("function");
    });
    it("should call makeRequest with the correct parameters", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const request = spy(client.request, "makeRequest");
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const interaction = new Interaction(client, TEST_DATA.INTERACTION);
      await interaction.acknowledge();
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postInteractionResponse", [
        TEST_DATA.INTERACTION.id,
        TEST_DATA.INTERACTION.token,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });
});
