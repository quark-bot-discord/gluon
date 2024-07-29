import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import ModalResponse from "../../src/structures/ModalResponse.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";

describe("ModalResponse", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(ModalResponse).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const modalResponse = new ModalResponse(client, TEST_DATA.MODAL_RESPONSE);
      expect(modalResponse).to.have.property("id");
      expect(modalResponse).to.have.property("type");
      expect(modalResponse).to.have.property("guildId");
      expect(modalResponse).to.have.property("channelId");
      expect(modalResponse).to.have.property("member");
      expect(modalResponse).to.have.property("customId");
      expect(modalResponse).to.have.property("values");
      expect(modalResponse).to.have.property("guild");
      expect(modalResponse).to.have.property("channel");
      expect(modalResponse).to.have.property("textPrompt");
      expect(modalResponse).to.have.property("autocompleteResponse");
      expect(modalResponse).to.have.property("reply");
      expect(modalResponse).to.have.property("edit");
      expect(modalResponse).to.have.property("acknowledge");
    });
  });

  context("check customId", function () {
    it("should have the correct customId", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const modalResponse = new ModalResponse(client, TEST_DATA.MODAL_RESPONSE);
      expect(modalResponse.customId).to.equal(
        TEST_DATA.MODAL_RESPONSE.data.custom_id,
      );
    });
  });

  context("check values", function () {
    it("should have the correct values", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const modalResponse = new ModalResponse(client, TEST_DATA.MODAL_RESPONSE);
      expect(modalResponse.values).to.equal(
        TEST_DATA.MODAL_RESPONSE.data.components[0].components,
      );
    });
  });
});
